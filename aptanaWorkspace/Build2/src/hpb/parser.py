import sgmllib

class HTMLblockParser(sgmllib.SGMLParser):
    "A simple parser class."

    def parse(self, s):
        "Parse the given string 's'."
        self.feed(s)
        self.close()

    def __init__(self, verbose=0):
        "Initialize an object, passing 'verbose' to the superclass."

        sgmllib.SGMLParser.__init__(self, verbose)

        self.comments = []
        self.currentBlockName = None
        
        self.scripts = { 'included':{}, 
                         'excluded':{},
                         'all':{}
                         }
        
        self.blockMap = {} # used to categorize all inculded scripts - block name is the key
        #self.scriptMap = {} #used to check for dupe scripts - script src path is the key
        
    def getBlockMap(self):
        return self.blockMap
        
    def handle_comment(self, comment):
        "Process a comment and its ."
        self.comments.append(comment)

        #BLOCK_START
        subStringIdx = comment.find('{BLOCK_START')

        if subStringIdx > -1:
            self.processBlockTag(comment, 'BLOCK_START')

        #BLOCK_END
        subStringIdx = comment.find('{BLOCK_END')

        if subStringIdx > -1:
            self.processBlockTag(comment, 'BLOCK_END')
            
        
        return

    def processBlockTag(self, comment, tagName):
        
        tagStr = '{' + tagName + ':'
        
        subStringIdx = comment.find(tagStr)
        if subStringIdx != 0:
            raise Exception("improperly formatted tag: %s" % comment)

        ary = comment.split(":")
        if len (ary) != 2:
            raise Exception("improperly formatted tag: %s" % comment)
        
        
        blockName = ary[1].split('}')[0]
        
        if tagName == 'BLOCK_START':
            self.currentBlockName = blockName
        elif tagName == 'BLOCK_END':
            
            if self.currentBlockName != blockName:
                raise Exception("improperly formatted block: %s" % self.currentBlockName)
            else:
                self.currentBlockName = None
        else:
            raise Exception("improperly formatted tag: %s" % comment)
            
            
        return


    def start_script(self, attributes):
        "Process a script and its 'attributes'."

        for name, value in attributes:
            if name == "src":
                src = value
                
                self.logScript('all', src)
                
                if self.currentBlockName:
                    self.addScriptToBlock(src)
                else:
                    self.logScript('excluded', src)


               
    def logScript(self, category, src):
        
        theDict = self.scripts[category]
        
        if theDict.has_key(src):
            raise Exception("Duplicate Script: %s" % src)
        else:
            theDict[src] = True
            

                   
                
    def addScriptToBlock(self, src):
        
        if self.currentBlockName == None:
            raise Exception("Error processing script: %s" % src)
        
        self.logScript('included', src)
                                        
        if not self.blockMap.has_key(self.currentBlockName):
            self.blockMap[self.currentBlockName] = []
            
        self.blockMap[self.currentBlockName].append(src)

