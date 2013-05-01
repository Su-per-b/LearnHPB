#!/usr/bin/env python


import json
import subprocess

closureCompilerPath = r'compilers\closure-compiler.jar'
yuiCompilerPath = r'compilers\yuicompressor-2.4.2.jar'


class JsonConfig:
	
	def __init__(self, jsonFile):
		with open(jsonFile,'r') as f: self.root = json.load(f)

	def getFileList(self, nodeName):
		node = self.root[nodeName]
		
		fileList = node['fileList']
		rootPath = node['rootPath']
    	
		outputAry = fileList[:]
		self.prepend(outputAry, rootPath)
		return outputAry
		
		
	def getCommandClause(self, nodeName, prefix):
		
		outputAry = self.getFileList(nodeName)
						
		self.prepend(outputAry, prefix)
		outputStr = ' '.join(outputAry)
		
		return str(outputStr)
	
	
	def prepend(self, ary, prefix):
		
		for idx,item in enumerate(ary):
			ary[idx]= str(prefix + item)
    	
		return ary
	
	def getMinifiedOutputFile(self):
		node = self.root['config']
		outputFileNameBase = node['outputFileNameBase']
		outputFileExtension = node['outputFileExtension']
		
		fileName = "temp\\min\\%s.min.%s" % (outputFileNameBase,outputFileExtension)
		return str(fileName)
	
	def getConcatinatedOutputFile(self):
		node = self.root['config']
		outputFileNameBase = node['outputFileNameBase']
		outputFileExtension = node['outputFileExtension']
		
		fileName = "temp\\src\\%s.src.%s" % (outputFileNameBase,outputFileExtension)
		return str(fileName)
	

def buildThreeJs():
	jsonConfig = JsonConfig(r'build-config\three.json')
	concatinatedOutputFile = jsonConfig.getConcatinatedOutputFile()
	minifiedOutputFile = jsonConfig.getMinifiedOutputFile()
	includesFileList = jsonConfig.getFileList('includes')
	
	concatinateFiles(includesFileList, concatinatedOutputFile);
	
	externsStr = jsonConfig.getCommandClause('externs' , '--externs ')
	
	cmd = 'java -jar %s  --version --warning_level=VERBOSE --jscomp_off=globalThis %s ' + \
	'--jscomp_off=checkTypes --jscomp_off=internetExplorerChecks --js %s ' + \
	'--js_output_file %s'     
	
	cmd = cmd % (closureCompilerPath, externsStr, concatinatedOutputFile, minifiedOutputFile)
	
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
	includesFileList = jsonConfig.getFileList('includes')
	concatinatedOutputFile = jsonConfig.getConcatinatedOutputFile()
	minifiedOutputFile = jsonConfig.getMinifiedOutputFile()
	
	concatinateFiles(includesFileList, concatinatedOutputFile);
	
	print ' * Compiling concatinated source file: %s > %s' % (concatinatedOutputFile, minifiedOutputFile)
	
	cmd = 'java -jar %s --charset utf-8 --type %s %s' % (yuiCompilerPath, 'css', concatinatedOutputFile)
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
	
	
def buildLgb():
	
	jsonConfig = JsonConfig(r'build-config\lgb.json')
	
	includeStr = jsonConfig.getCommandClause('includes' , '-i ')
	pathStr = jsonConfig.getCommandClause('paths' , '-p ')
	externsStr = jsonConfig.getCommandClause('externs' , '--compiler_flag=--externs=')
	
	minifiedOutputFile = jsonConfig.getMinifiedOutputFile()
	
	compilerFile = r'compilers\closure-compiler.jar'
	
	cmd = 'compilers\calcdeps.py %s %s %s ' + \
	'--output_mode compiled ' + \
	'--compiler_jar %s ' + \
	'--output_file %s'
	
	cmd = cmd % (includeStr, pathStr, externsStr, compilerFile, minifiedOutputFile)
	
	print 'compiling using command: '+ cmd
	
	p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	out, error = p.communicate()
	
	print 'return code: '+ str(p.returncode)
	print 'out: '+ out
	


def concatinateFiles(fileList, outputFile):
	
	print ' * Concatinating files to %s' % (outputFile)
	
	outputFileH = open(outputFile, 'w')
	
	for file in fileList:
		with open(file, 'r') as f: outputFileH.write(f.read())
		
	outputFileH.close()
			
	

