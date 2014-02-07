from json_mod import JsonConfig
import json_mod
import json
import os
import shutil





class SceneAsset:

    sceneFileName = 'scene.json'

    def __init__(self, rootInputPath, parentFolderName):

        #self.rootInputPath = rootInputPath
        #self.parentFolderName = parentFolderName
        #self.fileName = 'scene.json'
        #self.parentFolderPath = rootInputPath + os.sep + parentFolderName
        #self.filePath = self.parentFolderPath + os.sep + self.fileName
        self.jsonFileAssetList =[]
        self.binFileAssetList =[]

        self.sceneFileAsset = FileAsset(rootInputPath, parentFolderName, SceneAsset.sceneFileName )
        self.sceneFileAsset.copyToSrc()
        self.sceneFileAsset.minify()

        folder = self.sceneFileAsset.getFolder()
        imagesFolder = folder + os.sep + 'images'

        if os.path.exists(imagesFolder):
            self.imagesFolder = imagesFolder
        else:
            self.imagesFolder = None




    def process(self):

        #parse scene file
        with open(self.sceneFileAsset.fullInputPath,'r') as f: sceneJson = json.load(f)
        if sceneJson.has_key("geometries") == True:
            geomList = sceneJson["geometries"]
            self.processGeometryList(geomList)

        self.processLinked()

    def processLinked(self):
        if self.imagesFolder:

            srcPath = os.path.split(self.sceneFileAsset.outputFileSrc)[0]
            destFolder = srcPath + os.sep + 'images'

            shutil.copytree(self.imagesFolder, destFolder)

            minPath = os.path.split(self.sceneFileAsset.outputFileMin)[0]
            destFolder2 = minPath + os.sep + 'images'

            shutil.copytree(self.imagesFolder, destFolder2)





    def processGeometryList(self, geomList):
        for geom in geomList:
            g = geomList[geom]
            if g.has_key('type'):
                if str(g['type']) == 'embedded':
                    continue

            if g.has_key('url'):
                fileName = str(g['url'])
                self.processGeometry(fileName)


    def processGeometry(self, fileName):

        #copy to output source folder
        #shutil.copyfile(self.filePath , self.outputSrcFilePath)


        jsonFileAsset = FileAsset(self.sceneFileAsset.rootInputPath ,
                                                        self.sceneFileAsset.parentFolderName,
                                                        fileName)
        jsonFileAsset.copyToSrc()

        self.jsonFileAssetList.append(jsonFileAsset)


        print 'processing json file: ' + fileName
        ary = fileName.split('.')
        ary.pop()
        ary.append('bin')

        binFilename = '.'.join(ary)


        binFileAsset = FileAsset(self.sceneFileAsset.rootInputPath ,
                                                        self.sceneFileAsset.parentFolderName,
                                                        binFilename)

        if (binFileAsset.exists) :
            binFileAsset.copyToSrc()
            binFileAsset.copyToMin()
            self.binFileAssetList.append(binFileAsset)

        jsonFileAsset.minify()

        return





class AssetManager:

    outputSrcFolder = 'temp/src/3d-assets'
    outputMinFolder = 'temp/min/3d-assets'

    def __init__(self):
        #self.asset3dList = None
        return

    def process(self):
        self.jsonConfig = JsonConfig(r'build-config\3d.json')

        #sceneFoldersList = self.jsonConfig.getFolderList('sceneFolders')

        inputFolderList = self.jsonConfig.root['sceneFolders']['folderList']
        rootInputPath = str (self.jsonConfig.root['sceneFolders']['rootPath'] )

        for folderName in inputFolderList:
            sceneFileOutput = self.outputSrcFolder + os.sep + folderName
            #sceneFileInput = rootInputPath + os.sep + folderName + os.sep + 'scene.json'

            sceneAsset = SceneAsset(rootInputPath, folderName)
            sceneAsset.process()



    def copyJsonFileName(self, jsonFileName, rootFolder):

        print 'processing json file: ' + jsonFileName
        ary = jsonFileName.split('.')
        ary.pop()
        ary.append('bin')

        binFilename = '.'.join(ary)

        fullJsonFilePath = rootFolder + os.sep + jsonFileName
        fullBinFilePath = rootFolder + os.sep + binFilename

        shutil.copyfile(fullJsonFilePath, self.outputSrcFolder + jsonFileName)
        shutil.copyfile(fullBinFilePath, self.outputSrcFolder + binFilename)

        return
    
    

def process3Dassets():

    assetManager = AssetManager()
    assetManager.process()



class Asset3d:


    def __init__(self, inputFile):
        self.inputFile = inputFile



class FileAsset:

    outputSrcFolder = 'temp/src/3d-assets'
    outputMinFolder = 'temp/min/3d-assets'

    def __init__(self, rootInputPath, parentFolderName, fileName):

        self.rootInputPath = rootInputPath
        self.parentFolderName = parentFolderName
        self.fileName = fileName

        self.parentFolderPath = rootInputPath + os.sep + parentFolderName
        self.fullInputPath = self.parentFolderPath + os.sep + self.fileName

        #assert (  os.path.exists(self.fullInputPath))

        self.exists = os.path.exists(self.fullInputPath)


        #if os.path.exists(self.fullInputPath) == False :
            #raise Exception("file does not exist: " + self.fullInputPath)

        if self.exists:

            self.outputFileSrc = FileAsset.outputSrcFolder + os.sep + \
                    self.parentFolderName + os.sep + \
                    self.fileName

            self.outputFileMin = FileAsset.outputMinFolder + os.sep + \
                    self.parentFolderName + os.sep + \
                    self.fileName



    def getFolder(self):
        path, filename = os.path.split(self.fullInputPath)
        #print tail
        return path
    def getFileName(self):
        path, filename = os.path.split(self.fullInputPath)
        #print tail
        return filename

    def getFileExtension(self):
        extension = os.path.splitext(self.fullInputPath)[1]
        return str(extension).lower()

    def copyToSrc(self):

        path, filename = os.path.split(self.outputFileSrc)

        if os.path.exists(path) == False :
            os.mkdir(path)

        shutil.copyfile(self.fullInputPath , self.outputFileSrc)

    def copyToMin(self):

        path, filename = os.path.split(self.outputFileMin)

        if os.path.exists(path) == False :
            os.mkdir(path)

        shutil.copyfile(self.fullInputPath , self.outputFileMin)

    def minify(self):

        path, filename = os.path.split(self.outputFileMin)

        if os.path.exists(path) == False :
            os.mkdir(path)

        ext = self.getFileExtension()
        if ext != '.json':
            self.copyToMin()
        else:

            with open(self.fullInputPath,'r') as f:
                #jsonObj = json.load(f)
                stringObj = str(f.read())
                stringObjMin = minifiedStr = json_mod.json_minify (stringObj)

            with open(self.outputFileMin, 'w')      as fMin:
                fMin.write(stringObjMin)
        return
