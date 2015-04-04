'''
Created on May 7, 2013

@author: raj
'''
import os
import shutil
import compiler
import scene_mod
from json_mod import JsonConfig
from hpb.parser import HTMLblockParser

INDEX_SOURCE_FILE = r'../LearnHPB/index.src.html'

ROOT_MIN = "temp\\min\\"
ROOT_SRC = "temp\\src\\"
ROOT_ORIG = "..\\LearnHPB\\"

    
allFolders = {}
    
def main(argv=None):
    
    clean()
    copy1("templates\\min\\index.html", ROOT_MIN)
    copy1("templates\\src\\index.html", ROOT_SRC)

    
    blockMap = parseIndexSourceFile()
    copySrc()
    
    printBanner('Compile LGB')
    lgbIncludes = blockMap['LGB']
    compiler.buildLgb(lgbIncludes)

    printBanner('Compile three.js')
    threeIncludes = blockMap['Three']
    compiler.buildThreeJs(threeIncludes)

    printBanner('Compile CSS')
    compiler.buildCSS()

    printBanner('Copy 3d Assets')
    scene_mod.process3Dassets()

    addLicenses()

    deployMin()
    deploySrc()
    printBanner('* Build Completed')

    return

    

def parseIndexSourceFile():

    p = HTMLblockParser()
    fileList = []

    with open(INDEX_SOURCE_FILE, 'r') as f:
        str = f.read()
        p.parse(str)
        blockMap = p.getBlockMap()

    for key in blockMap:
        #theList = blockMap[key]
        
        for idx,filePath in enumerate(blockMap[key]):
            relativePath = '../LearnHPB/%s' % filePath
            #absolutePath = os.path.abspath(relativePath)
            blockMap[key][idx] = relativePath
    
            

    
    return blockMap

def clean():
    printBanner('Clean')
    jsonConfig = JsonConfig(r'build-config\copy.json')

    global allFolders
    allFolders = jsonConfig.root['folders']

    #for folderListName in allFolders:
    folderListName = 'tempSource'
    print '* Cleaning ' + folderListName
    jsonFolderList = allFolders[folderListName]
    recreateJsonFolder(jsonFolderList)

    folderListName = 'tempMin'
    print '* Cleaning ' + folderListName
    jsonFolderList = allFolders[folderListName]
    recreateJsonFolder(jsonFolderList)
    
    
def recreateJsonFolder(jsonFolderList):
    rootPath = str(jsonFolderList['rootPath'])
    recreateFolder(rootPath)

    folderList = jsonFolderList['folderList']
    recreateFolderList(rootPath, folderList)


def addLicenses():
    addLicensesHelper('three_license.txt', r'temp\min\js\three.min.js')
    addLicensesHelper('lgb_license.txt', r'temp\min\js\lgb.min.js')
    addLicensesHelper('css_header.txt', r'temp\min\css\lgb.min.css')

def addLicensesHelper(licenceTemplateFile, codeFile):
    licenceTemplateFile = 'templates' + os.sep + licenceTemplateFile
    with open(licenceTemplateFile,'r') as f: licenseText = f.read()
    with open(codeFile,'r') as f: codeText = f.read()
    with open(codeFile,'w') as f: f.write("%s %s" % ( licenseText, codeText))


def printBanner(title):
    print '=============================================================='
    print '  ' + title
    print '=============================================================='

def copy1(indexFile, deployWebRoot):
    printBanner('Copy 1 ' + deployWebRoot)
    
    shutil.copyfile(indexFile, deployWebRoot + 'index.html')
    
    shutil.copyfile("templates\\htaccess.txt", deployWebRoot + '.htaccess')
    
    shutil.copytree(ROOT_ORIG + 'images', deployWebRoot + 'images')
    
    
    shutil.copytree(ROOT_ORIG + 'info-pages', deployWebRoot + 'info-pages')
    shutil.copyfile(ROOT_ORIG + 'css\\info.css', deployWebRoot + 'css\\info.css')
    shutil.copyfile(ROOT_ORIG + 'css\\normalize.css', deployWebRoot + 'css\\normalize.css')
    shutil.copyfile(ROOT_ORIG + 'css\\chartIframe.css', deployWebRoot + 'css\\chartIframe.css')
    shutil.copytree(ROOT_ORIG + '3d-assets\\textures', deployWebRoot + '3d-assets\\textures')
    
    shutil.copyfile(ROOT_ORIG + 'xml\\scene.xml', deployWebRoot + 'xml\\scene.xml')
    shutil.copyfile(ROOT_ORIG + 'xml\\Complete.xml', deployWebRoot + 'xml\\Complete.xml')
    shutil.copyfile(ROOT_ORIG + 'xml\\VerySimpleScenario1.xml', deployWebRoot + 'xml\\VerySimpleScenario1.xml')
    shutil.copyfile(ROOT_ORIG + 'xml\\VerySimpleScenario5.xml', deployWebRoot + 'xml\\VerySimpleScenario5.xml')
    shutil.copyfile(ROOT_ORIG + 'xml\\VerySimpleScenario9.xml', deployWebRoot + 'xml\\VerySimpleScenario9.xml')
    shutil.copyfile(ROOT_ORIG + 'xml\\SimpleScenario1.xml', deployWebRoot + 'xml\\SimpleScenario1.xml')
    
def copySrc():
    printBanner('Copy Src')
    
    jsonConfig = JsonConfig(r'build-config\css.json')
    
    #concatinatedOutputFile = jsonConfig.getConcatinatedOutputFile()
    #minifiedOutputFile = jsonConfig.getMinifiedOutputFile()


    includesFileNameList = jsonConfig.getFileNameList()
    for fileName in includesFileNameList:
        sourcePath = ROOT_ORIG + 'css\\' + fileName
        destPath = ROOT_SRC + 'css\\' + fileName
        shutil.copyfile(sourcePath, destPath)
    
    
    #shutil.copyfile(ROOT_ORIG + 'css\\kendo.common.css', ROOT_SRC + 'css\\kendo.common.css')
    #shutil.copyfile(ROOT_ORIG + 'css\\kendo.lgb.css', ROOT_SRC + 'css\\kendo.lgb.css')
    #shutil.copyfile(ROOT_ORIG + 'css\\lhpb.css', ROOT_SRC + 'css\\lhpb.css')
    #shutil.copyfile(ROOT_ORIG + 'css\\panels.css', ROOT_SRC + 'css\\panels.css')
    #shutil.copyfile(ROOT_ORIG + 'css\\tipped.css', ROOT_SRC + 'css\\tipped.css')
    #shutil.copyfile(ROOT_ORIG + 'js\\lib\\jquery.src.js', ROOT_SRC + 'js\\jquery.src.js')


    
def deploySrc():
    printBanner('Deploy Src')
    
    jsonFolderList = allFolders['deploySrc']
    rootDeploySrc = str(jsonFolderList['rootPath'])
    
    deleteFolder(rootDeploySrc)
    shutil.copytree(ROOT_SRC, rootDeploySrc)
    
def deployMin():
    printBanner('Deploy Min')
    
    jsonFolderList = allFolders['deployMin']
    rootDeployMin = str(jsonFolderList['rootPath'])
    
    deleteFolder(rootDeployMin)
    shutil.copytree(ROOT_MIN, rootDeployMin)
    

def deleteFolder(folder):
    exists = os.path.exists(folder)

    if exists:
        size1 = get_size(folder)
        print 'path "' + folder + '" exists - size: ' + str(size1)
        print 'deleting path ' + folder
        shutil.rmtree(folder)
    else:
        print 'path "' + folder + '" does NOT exist no need to remove'

def recreateFolderList( rootPath, folderList):
    for folder in folderList:
        fullPath = rootPath + os.sep + str(folder)
        recreateFolder(fullPath)

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

if __name__ == '__main__':
    main()
