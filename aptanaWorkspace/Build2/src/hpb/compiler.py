#!/usr/bin/env python


from json_mod import JsonConfig
import subprocess

CLOSURE_COMPILER_FILE = r'compilers\closure-compiler.jar'
YUI_COMPILER_FILE = r'compilers\yuicompressor-2.4.2.jar'


def printFileList(title, fileList):
    print '    ================= %s =================' % title
    print "    Total files: %s" % str(len(fileList))
    map(printFile, fileList)

    print '    ====================================================='
    
def printFile(fileName):
    print '    ' + fileName

def buildThreeJs(includesFileList=None):

    jsonConfig = JsonConfig(r'build-config\three.json')
        
    concatinatedOutputFile = jsonConfig.getConcatinatedOutputFile()
    minifiedOutputFile = jsonConfig.getMinifiedOutputFile()
    
    if (includesFileList == None):
        includesFileList = jsonConfig.getFileList('includes')


    printFileList('Concatenating files for Three.Js', includesFileList)
    
    concatinateFiles(includesFileList, concatinatedOutputFile);

    externsStr = jsonConfig.getCommandClause('externs' , '--externs ')

    cmd = 'java -jar %s  --version --language_in=ECMASCRIPT5 --warning_level=VERBOSE --jscomp_off=globalThis %s ' + \
    '--jscomp_off=checkTypes --jscomp_off=internetExplorerChecks --js %s ' + \
    '--js_output_file %s'

    cmd = cmd % (CLOSURE_COMPILER_FILE, externsStr, concatinatedOutputFile, minifiedOutputFile)

    print 'compiling using command: '+ cmd

    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, error = p.communicate()

    print 'return code: '+ str(p.returncode)

    if p.returncode == 0:
        print 'SUCCESS: ' + out
    else:
        print 'FAILED: ' + out
        msg =  'Compiling %s failed %s' % (minifiedOutputFile, error)
        print msg
        raise Exception(msg)




def buildCSS():
    
    outputFileBase = r'lgb'
    #includeList = [r'css\minimal.json']

    jsonConfig = JsonConfig(r'build-config\css.json')
    
    concatinatedOutputFile = jsonConfig.getConcatinatedOutputFile()
    minifiedOutputFile = jsonConfig.getMinifiedOutputFile()


    includesFileList = jsonConfig.getFileList('includes')

    concatinateFiles(includesFileList, concatinatedOutputFile);

    print ' * Compiling concatinated source file: %s > %s' % (concatinatedOutputFile, minifiedOutputFile)

    cmd = 'java -jar %s --charset utf-8 --type %s %s' % (YUI_COMPILER_FILE, 'css', concatinatedOutputFile)
    print 'compiling using command: '+ cmd

    minifiedOutputFileH = open(minifiedOutputFile, 'a+')
    p = subprocess.Popen(cmd, shell=True, stdout=minifiedOutputFileH, stderr=subprocess.PIPE)
    out, error = p.communicate()

    print 'return code: '+ str(p.returncode)

    if p.returncode == 0:
        print 'SUCCESS: '
    else:
        print 'FAILED: '
        msg =  'Compiling %s failed %s' % (minifiedOutputFile, error)
        print msg
        raise (msg)


def getCommandClause( fileList, prefix):
    
    ary = []
    
    for idx,item in enumerate(fileList):
        
        clauseStr = prefix + item
        ary.append (clauseStr)
               
    outputStr = ' '.join(ary)

    return str(outputStr)


def getCommandAry(fileList, prefix):
    ary = []
    
    for idx,filePath in enumerate(fileList):
        ary.append (prefix)
        ary.append (filePath)
               
    return ary


    
def buildLgb(includesFileList=None):

    jsonConfig = JsonConfig(r'build-config\lgb.json')
    
    concatinatedOutputFile = jsonConfig.getConcatinatedOutputFile()
    minifiedOutputFile = jsonConfig.getMinifiedOutputFile()
    
    if(includesFileList == None):
        includesFileList = jsonConfig.getFileList('includes')
    
    
    includeAry = getCommandAry(includesFileList , '-i')
    printFileList('Processing includes for LGB', includesFileList)
    
    pathList = jsonConfig.getFileList('paths')
    pathAry = getCommandAry(pathList , '-p')
    printFileList('Processing paths for LGB', pathList)
    
    
    externFileList = jsonConfig.getFileList('externs')
    printFileList('Processing externs for LGB', externFileList)

    cmdAry1 = []
    
    cmdAry1 += [r'C:\python\Python2.7\python.exe', r'compilers\calcdeps.py']
    cmdAry1 += includeAry
    cmdAry1 += pathAry
    cmdAry1 += ['--output_mode', 'script']
    cmdAry1 += ['--output_file', concatinatedOutputFile]
    
    p = subprocess.Popen(cmdAry1, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, error = p.communicate()

    print 'return code: '+ str(p.returncode)
    print 'out: '+ out
    print 'error: '+ error
    

    cmdAry2 = []
    
    cmdAry2 += [r'C:\python\Python2.7\python.exe', r'compilers\calcdeps.py']
    cmdAry2 += includeAry
    cmdAry2 += pathAry
    cmdAry2 += ['--output_mode', 'compiled']
    cmdAry2 += ['--compiler_jar', CLOSURE_COMPILER_FILE]
    cmdAry2 += ['--output_file', minifiedOutputFile]
    
    p = subprocess.Popen(cmdAry2, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, error = p.communicate()

    print 'return code: '+ str(p.returncode)
    print 'out: '+ out
    print 'error: '+ error
    
    
    return

def concatinateFiles(fileList, outputFile):

    print ' * Concatinating files to %s' % (outputFile)

    outputFileH = open(outputFile, 'w')

    for file in fileList:
        with open(file, 'r') as f: outputFileH.write(f.read())

    outputFileH.close()




