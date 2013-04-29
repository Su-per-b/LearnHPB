#!/usr/bin/env python

import argparse
import json
import os
import shutil
import tempfile
import subprocess

tempFolder = 'temp/'
includesFolder = 'build-config\\includes'
externsFolder = r'externs'
compilerPath = r'compilers\compiler.jar'
yuiCompilerPath = r'compilers\yuicompressor-2.4.2.jar'

tempSrc = r'temp\src'
tempMin= r'temp\min'

def buildThree():
	
	outputFileBase = r'three'
	includeList = [r'three\common.json', r'three\extras.json']
	externCommand = r'--externs ' + externsFolder + r'\three\common.js'
	sourceFolder = r'..\LearnHPB\js\three'
	compileHelper(outputFileBase, includeList, externCommand, sourceFolder)

	
def buildKendo():
	outputFileBase = r'kendo'
	includeList = [r'kendo\minimal.json']
	externCommand = r''
	sourceFolder = r'../LearnHPB/js/kendo'
	compileYUIHelper(outputFileBase, includeList, externCommand, sourceFolder, 'js')
		
		
def buildCSS():
	outputFileBase = r'lgb'
	includeList = [r'css\minimal.json']
	externCommand = r''
	sourceFolder = r'../LearnHPB/css'
	compileYUIHelper(outputFileBase, includeList, externCommand, sourceFolder, 'css')
	
def buildMain():
	os.system('compile-main.bat')
	
	
def compileHelper(outputFileBase, includeList, externCommand, sourceFolder):
	
	fileType = 'js'
	concatinatedSource = tempSrc + '\\' + outputFileBase + '.src.' + fileType
	outputFile = tempMin + '\\' + outputFileBase + '.min.'+ fileType
	
	print(' * Building ' + outputFile)
	print(' * Concatinating included files to:  ' + concatinatedSource)
	
	open(concatinatedSource, 'a').close()
	outputFileHandle = open(outputFile, 'a+')
	
	#fd, tempFilePath = tempfile.mkstemp(".js", "compile_")
	#tmp = open(tempFilePath, 'w')
	
	concatinatedSourceHandle = open(concatinatedSource, 'w')
	
	print 'Output File Path: ' + outputFile
	print 'Temp File: ' + concatinatedSourceHandle.name

	
	for include in includeList:
		with open(includesFolder + '\\' + include ,'r') as f: files = json.load(f)
		for filename in files:
			with open(sourceFolder + '/' + filename, 'r') as f: concatinatedSourceHandle.write(f.read())

	concatinatedSourceHandle.close()
	
	print ' * Compiling concatinated source file: %s > %s' % (concatinatedSource, outputFile)
	

	cmd = 'java -jar %s  --version --warning_level=VERBOSE --jscomp_off=globalThis %s --jscomp_off=checkTypes --jscomp_off=internetExplorerChecks --js %s --js_output_file %s' % (compilerPath, externCommand, concatinatedSource, outputFile)
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



def compileYUIHelper(outputFileBase, includeList, externCommand, sourceFolder, fileType):
	
	concatinatedSource = tempSrc + '\\' + outputFileBase + '.src.' + fileType
	outputFile = tempMin + '\\' + outputFileBase + '.min.'+ fileType

	print(' * Concatinating included files to:  ' + concatinatedSource)
	
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
	
	print ' * Compiling concatinated source file: %s > %s' % (concatinatedSource, outputFile)
	
	cmd = 'java -jar %s --charset utf-8 --type %s %s' % (yuiCompilerPath, fileType, concatinatedSource)
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
