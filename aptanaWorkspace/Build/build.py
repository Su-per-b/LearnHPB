'''
Created on Apr 25, 2013

@author: raj
'''
import os
import shutil
import compiler

rootFolder = '..' + os.sep + 'LearnHPB' + os.sep + 'bin' + os.sep + 'normal'
tempFolder = 'temp'
tempSrc = 'temp' + os.sep + 'src'
tempMin= 'temp' + os.sep + 'min'

cssFolder = rootFolder + os.sep + "css"
xmlFolder = rootFolder + os.sep + "xml"
jsFolder = rootFolder + os.sep + "js"

def main(argv=None):
	
	clean()
	
	printBanner('Compile three.js')
	compiler.buildThreeJs()
	
	printBanner('Compile CSS')
	compiler.buildCSS()
	
	printBanner('Compile LGB')
	compiler.buildLgb()
	
	addLicenses()
	#copy3Dassets()
	copy()

	
	return


#def copy3Dassets():
	
	
def clean():
	printBanner('Clean')
	recreateFolder(rootFolder)
	recreateFolder(tempFolder)
	recreateFolder(tempSrc)
	recreateFolder(tempMin)
	
	recreateFolder(cssFolder)
	recreateFolder(xmlFolder)
	recreateFolder(jsFolder)
	
def addLicenses():	
	addLicensesHelper('three_license.txt', r'temp\min\three.min.js')
	addLicensesHelper('lgb_license.txt', r'temp\min\lgb.min.js')
	
def addLicensesHelper(licenceTemplateFile, codeFile):
	
	licenceTemplateFile = 'templates' + os.sep + licenceTemplateFile
	
	with open(licenceTemplateFile,'r') as f: licenseText = f.read()
	with open(codeFile,'r') as f: codeText = f.read()
	with open(codeFile,'w') as f: f.write("%s %s" % ( licenseText, codeText))
	
	


#def compileKendo():
#	printBanner('Compile Kendo')
#	compiler.buildKendo()
	

	
	
def printBanner(title):
	print '=============================================================='
	print '  ' + title
	print '==============================================================' 
	
			 
def copy():
	printBanner('Copy')
	
	copyHelper("templates", 'index.html', '')
	copyHelper("templates", 'htaccess.txt', '', '.htaccess')

	mainSrcFolder = "..\\LearnHPB"
	
	#xml
	srcFolder = mainSrcFolder + os.sep + 'xml'
	copyHelper(srcFolder, 'ps8.xml', 'xml')
	copyHelper(srcFolder, 'DefaultScenario.xml', 'xml')
	
	#images
	srcFolder = mainSrcFolder + os.sep + 'images'
	destFolder = rootFolder + os.sep + 'images'
	deleteFolder(destFolder)
	shutil.copytree(srcFolder, destFolder)
	
	#css
	srcFolder = mainSrcFolder + os.sep + 'css'
	shutil.copytree(mainSrcFolder+ '\\css\\Silver', rootFolder + os.sep + 'css\\Silver')
	copyHelper("temp\\min", 'lgb.min.css', 'css')
	copyHelper(srcFolder, 'highlight.png', 'css')
	
	#js
	copyHelper("temp\\min", 'lgb.min.js', 'js')
	copyHelper("temp\\min", 'three.min.js', 'js')

	#3d assets
	srcFolder = mainSrcFolder + os.sep + '3d-assets'
	
	destFolder = rootFolder + os.sep + '3d-assets'
	deleteFolder(destFolder)
	shutil.copytree(srcFolder, destFolder)
	
	
	
def copyHelper(srcFolder, srcFile, destFolder='', destFile=''):
	
	if destFile == '':
		destFile = srcFile
		
	srcPath = srcFolder + os.sep + srcFile
	
	if destFolder != '':
		destPath = rootFolder + os.sep + destFolder + os.sep + destFile
	else:
		destPath = rootFolder + os.sep + destFile
		
	shutil.copyfile(srcPath, destPath)
	
	
def deleteFolder(folder):
	exists = os.path.exists(folder)
	
	if exists:
		size1 = get_size(folder)
		print 'path "' + folder + '" exists - size: ' + str(size1)
		shutil.rmtree(folder)
	else:
		print 'path "' + folder + '" does NOT exist no need to remove'
		
def recreateFolder(folder):
	
	deleteFolder(folder)
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