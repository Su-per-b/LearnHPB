#!/usr/bin/python
# -*- coding: utf-8 -*-

__author__ = 'nnaze@google.com (Nathan Naze)'
__author__ = 'raj@pcdigi.com (Raj Dye)'

import logging
import optparse
import os
import sys

import depstree
import jscompiler
import source
import treescan


def _GetInputByPath(path, sources):
    """Get the source identified by a path.

  Args:
    path: str, A path to a file that identifies a source.
    sources: An iterable collection of source objects.

  Returns:
    The source from sources identified by path, if found.  Converts to
    real paths for comparison.
  """

    for js_source in sources:

    # Convert both to real paths for comparison.

        if os.path.realpath(path) \
            == os.path.realpath(js_source.GetPath()):
            return js_source


def _GetClosureBaseFile(sources, baseFileName):
    """Given a set of sources, returns the one base.js file.

  Note that if zero or two or more base.js files are found, an error message
  will be written and the program will be exited.

  Args:
    sources: An iterable of _PathSource objects.

  Returns:
    The _PathSource representing the base Closure file.
  """

    base_files = [js_source for js_source in sources
                  if _IsClosureBaseFile(js_source, baseFileName)]

    if not base_files:
        logging.error('No Closure base.js file found.')
        sys.exit(1)
    if len(base_files) > 1:
        logging.error('More than one Closure base.js files found at these paths:'
                      )
        for base_file in base_files:
            logging.error(base_file.GetPath())
        sys.exit(1)
    return base_files[0]


def _IsClosureBaseFile(js_source, baseFileName):
    """Returns true if the given _PathSource is the Closure base.js source."""

    return os.path.basename(js_source.GetPath()) == baseFileName \
        and js_source.provides == set(['goog'])


class _PathSource(source.Source):

    """Source file subclass that remembers its file path."""

    def __init__(self, path):
        """Initialize a source.

    Args:
      path: str, Path to a JavaScript file.  The source string will be read
        from this file.
    """

        super(_PathSource, self).__init__(source.GetFileContents(path))

        self._path = path

    def __str__(self):
        return 'PathSource %s' % self._path

    def GetPath(self):
        """Returns the path."""

        return self._path


def _WrapGoogModuleSource(src):
    return '''goog.loadModule(function(exports) {{"use strict";{0}
;return exports}});
'''.format(src)  # terminate any trailing single line comment.


def make(
    myIncludes=[],
    inputAry=[],
    namespaceAry=[],
    rootAry=[],
    output_mode='list',
    compiler_jar=None,
    compiler_flags=[],
    jvm_flags=[],
    output_file='',
    baseFileName='base.js',
    ):

    logging.basicConfig(format=sys.argv[0] + ': %(message)s',
                        level=logging.INFO)

    if output_mode:
        out = open(output_file, 'w')
    else:
        out = sys.stdout

    sources = set()

    logging.info('Scanning paths...')
    for path in rootAry:
        for js_path in treescan.ScanTreeForJsFiles(path):
            sources.add(_PathSource(js_path))

    logging.info('sources added by rootPath scan: %s', len(sources))

  # Add scripts specified on the command line.
  # logging.info('Adding myIncludes...')
  # for js_path in myIncludes:
    # sources.add(_PathSource(js_path))

  # logging.info('sources added by myIncludes: %s', len(myIncludes))

    logging.info('sources added total: %s', len(sources))

  # Though deps output doesn't need to query the tree, we still build it
  # to validate dependencies.

    logging.info('Building dependency tree..')
    tree = depstree.DepsTree(sources)

    input_namespaces = set()
    inputs = inputAry or []
    for input_path in inputs:
        js_input = _GetInputByPath(input_path, sources)
        if not js_input:
            logging.error('No source matched input %s', input_path)
            sys.exit(1)
        input_namespaces.update(js_input.provides)

    input_namespaces.update(namespaceAry)

    if not namespaceAry:
        logging.error('No namespaces found. At least one namespace must be specified with the --namespace or --input flags.'
                      )
        sys.exit(2)

  # The Closure Library base file must go first.

    base = _GetClosureBaseFile(sources, baseFileName)
    logging.info('Using base file %s', base)

    deps = [base] + tree.GetDependencies(input_namespaces)

  # Add scripts specified on the command line.

    logging.info('Adding myIncludes...')
    
    myIncludesPathSource = []
    for js_path in myIncludes:
        myIncludesPathSource.append(_PathSource(js_path))

    
    newDeps = []
    newDeps.extend(myIncludesPathSource);
    newDeps.extend(deps);
    
    #for theFile in myIncludes:
    # deps.insert(0,_PathSource(theFile))
        #deps.insert(0, _PathSource(theFile))

    logging.info('sources added by myIncludes: %s', len(myIncludes))

    if output_mode == 'list':
        out.writelines([js_source.GetPath() + '\n' for js_source in
                       newDeps])

    # out.write('test \n')

        out.close()
        exists = os.path.exists(output_file)
        if exists:
            logging.info('Wrote source list to %s', output_file)
        else:
            logging.error('failed to write source list to %s',
                          output_file)
    elif output_mode == 'script':

        for js_source in newDeps:
            src = js_source.GetSource()
            if js_source.is_goog_module:
                src = _WrapGoogModuleSource(src)
            out.write(src + '\n')
        exists = os.path.exists(output_file)
        if exists:
            logging.info('Wrote source script to %s', output_file)
        else:
            logging.error('failed to write source script to %s',
                          output_file)
    elif output_mode == 'compiled':
        logging.warning("""\
Closure Compiler now natively understands and orders Closure dependencies and
is prefererred over using this script for performing JavaScript compilation.
Please migrate your codebase.
See:
https://github.com/google/closure-compiler/wiki/Manage-Closure-Dependencies
""")

    # Make sure a .jar is specified.

        if not compiler_jar:
            logging.error('--compiler_jar flag must be specified if --output is "compiled"'
                          )
            sys.exit(2)

    # Will throw an error if the compilation fails.

        compiled_source = jscompiler.Compile(compiler_jar,
                [js_source.GetPath() for js_source in newDeps],
                jvm_flags=jvm_flags, compiler_flags=compiler_flags)

        logging.info('JavaScript compilation succeeded.')
        out.write(compiled_source)
        out.close()
        exists = os.path.exists(output_file)
        if exists:
            logging.info('Wrote compiled script to %s', output_file)
        else:
            logging.error('failed to write compiled script to %s',
                          output_file)
    else:

        logging.error('Invalid value for --output flag.')
        sys.exit(2)



            