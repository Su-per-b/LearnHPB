#!/usr/bin/env python

import argparse
import json
import os
import shutil
import tempfile
import subprocess

tempFolder = 'temp/'
includesFolder = 'includes'
compilerPath = r'closure-compiler\compiler.jar'
yuiCompilerPath = r'yuicompressor-2.4.2.jar'


def buildThree():
	
	outputFile = r'temp\three.min.js'
	includeList = [r'three\common.json', r'three/extras.json']
	externCommand = r'--externs  three-externs\common.js'
	sourceFolder = r'../LearnHPB/js/three'
	
	compileHelper(outputFile, includeList, externCommand, sourceFolder)

	with open(outputFile,'r') as f: text = f.read()
	with open(outputFile,'w') as f: f.write(("// %s - http://github.com/mrdoob/three.js\n" % os.path.basename(outputFile)) + text)

		
def buildKendo():
	outputFileBase = r'kendo'
	includeList = [r'kendo\minimal.json']
	externCommand = r''
	sourceFolder = r'../LearnHPB/js/kendo'
	compileYUIHelper(outputFileBase, includeList, externCommand, sourceFolder)
	
	
def compileHelper(outputFile, includeList, externCommand, sourceFolder):
	

	print(' * Building ' + outputFile)
	
	fd, tempFilePath = tempfile.mkstemp(".js", "compile_")
	tmp = open(tempFilePath, 'w')
	
	print 'Output File Path: ' + outputFile
	print 'Temp File: ' + tmp.name
	
	for include in includeList:
		with open(includesFolder + '\\' + include ,'r') as f: files = json.load(f)
		for filename in files:
			with open(sourceFolder + '/' + filename, 'r') as f: tmp.write(f.read())

	tmp.close()

	cmd = 'java -jar %s  --version --warning_level=VERBOSE --jscomp_off=globalThis %s --jscomp_off=checkTypes --jscomp_off=internetExplorerChecks --js %s --js_output_file %s' % (compilerPath, externCommand, tempFilePath, outputFile)
	print 'compiling using command: '+ cmd
	
	p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	out, error = p.communicate()
	
	print 'return code: '+ str(p.returncode)
	
	if p.returncode == 0:
		print 'SUCCESS: ' + out
	else:
		print 'FAILED: ' + out
		msg =  'Compiling %s failed %s' % (outputFile, error)
		print msg
		raise (msg)

	os.close(fd)
	os.remove(tempFilePath)

def compileYUIHelper(outputFileBase, includeList, externCommand, sourceFolder):
	

	outputFile = 'temp/' + outputFileBase + '.min.js'
	concatinatedSource = 'temp/' + outputFileBase + '.src.js'
	
	print(' * Building ' + outputFile)
	
	#fd, concatinatedSource = tempfile.mkstemp(".js", "compile_")
	open(concatinatedSource, 'a').close()
	outputFileHandle = open(outputFile, 'a+')
	
	tmp = open(concatinatedSource, 'w')
	
	print 'Output File Path: ' + outputFile
	print 'Temp File: ' + tmp.name
	
	for include in includeList:
		with open(includesFolder + '\\' + include ,'r') as f: files = json.load(f)
		for filename in files:
			with open(sourceFolder + '/' + filename, 'r') as f: tmp.write(f.read())

	tmp.close()


		
	cmd = 'java -jar %s --charset utf-8 --type js %s' % (yuiCompilerPath, concatinatedSource)
	print 'compiling using command: '+ cmd
	
	p = subprocess.Popen(cmd, shell=True, stdout=outputFileHandle, stderr=subprocess.PIPE)
	out, error = p.communicate()
	
	print 'return code: '+ str(p.returncode)
	
	if p.returncode == 0:
		print 'SUCCESS: '
	else:
		print 'FAILED: '
		msg =  'Compiling %s failed %s' % (outputFile, error)
		print msg
		raise (msg)
	
		#os.close(fd)
		#os.remove(concatinatedSource)
