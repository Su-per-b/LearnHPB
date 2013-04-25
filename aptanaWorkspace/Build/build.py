'''
Created on Apr 25, 2013

@author: raj
'''
import os
import shutil
import compiler

rootFolder = '../LearnHPB/bin/bin-normal'
tempFolder = 'temp'
cssFolder = rootFolder + "/css"
xmlFolder = rootFolder + "/xml"

def main(argv=None):
	
	clean()
	compileThreeJS()
	compileKendo()

	path = "normal"
	result = os.chdir(path)
	
	compileCSS()
	compile()
	copy()
	
	return

def clean():
	printBanner('Clean')
	recreateFolder(rootFolder)
	recreateFolder(tempFolder)
	recreateFolder(cssFolder)
	recreateFolder(xmlFolder)
	
def compileThreeJS():
	printBanner('Compile three.js')
	compiler.buildThree()

def compileKendo():
	printBanner('Compile Kendo')
	compiler.buildKendo()
	
def compileCSS():
	printBanner('compileCSS')
	os.system('2-css.bat')
	
def compile():
	printBanner('compile')
	os.system('3-compile.bat')
	
def copy():
	printBanner('copy')
	os.system('5-copy.bat')
	
	
		
		
def printBanner(title):
	print '=============================================================='
	print '  ' + title
	print '==============================================================' 
	
			 
		
def recreateFolder(folder):
	exists = os.path.exists(folder)
	
	if exists:
		size1 = get_size(folder)
		print 'path "' + folder + '" exists - size: ' + str(size1)
		shutil.rmtree(folder)
	else:
		print 'path "' + folder + '" does NOT exist no need to remove'
	
	os.mkdir(folder)
	
	exists2 = os.path.exists(folder)
	if not exists2: 
		raise Exception("error creating file")
		
	size2 = get_size(folder)
	
	if size2 != 0 :
		raise Exception("new folder not empty")
	
	print folder + " recreated - size: " + str(size2)
	
	
	#os.mkdir(destinationPath)

def get_size(start_path = '.'):
	total_size = 0
	for dirpath, dirnames, filenames in os.walk(start_path):
		for f in filenames:
			fp = os.path.join(dirpath, f)
			total_size += os.path.getsize(fp)
	return total_size


if __name__ == "__main__":
  main()