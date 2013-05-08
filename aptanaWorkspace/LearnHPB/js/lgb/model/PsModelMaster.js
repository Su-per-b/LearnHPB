/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.model.PsModelMaster');

goog.require('goog.array');
goog.require('lgb.Config');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.model.BaseModel');
goog.require('lgb.model.PsModel');
goog.require('lgb.utils.XmlParser');

/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.PsModelMaster = function() {

  /**@const */
  this._NAME = 'lgb.model.PsModelMaster';

  /**@const */
  this._TITLE = 'Mutiple Particle System';

  lgb.model.BaseModel.call(this);
  this.init_();
  
};
goog.inherits(lgb.model.PsModelMaster, lgb.model.BaseModel);


/**
 * @private
 */
lgb.model.PsModelMaster.prototype.init_ = function() {
    
  this.xml = null;
  this.xpathResult = null;
  this.currentNode = null;

  this.isSceneLoaded = false;
  this.isXMLloaded = false;
  this.configs = {};
  this.systems = {};
  this.psModelList = [];
  
  this.masterViewPointList_ = [];
  this.kendoDSactive = new kendo.data.HierarchicalDataSource({});
  this.kendoDSboxes = new kendo.data.HierarchicalDataSource({});
  this.kendoDScurves = new kendo.data.HierarchicalDataSource({});
};





lgb.model.PsModelMaster.prototype.requestChange = function(stateObject) {
    
    
    
    
    var requestedIsStartedArray = stateObject.isStartedArray;
    
    if(requestedIsStartedArray) {
        this.requestChangeIsStartedArray(requestedIsStartedArray);
    }
    
    
    var requestedRunningArray = stateObject.isRunningArray;
    if(requestedRunningArray) {
        this.requestChangeIsRunning(requestedRunningArray);
    }

    var requestedShowBoxesArray = stateObject.showBoxesArray;
    if(requestedShowBoxesArray) {
        this.requestChangeShowBoxes(requestedShowBoxesArray);
    }
    
    var requestedShowCurvesArray = stateObject.showCurvesArray;
    if(requestedShowCurvesArray) {
        this.requestChangeShowCurves(requestedShowCurvesArray);
    }
    
};


lgb.model.PsModelMaster.prototype.requestChangeIsStartedArray = function(requestedStartedArray) {
  
    var len2 =  this.psModelList.length;
    
    
    var isStartedAry = [len2];
    var newIsStartedAry = [len2];
    
    for (var i = 0; i < len2; i++) {
        isStartedAry[i] = this.psModelList[i].isStarted;
        newIsStartedAry[i] = false;
    }
    

    
    var len1 =  requestedStartedArray.length;
    for (var j = 0; j < len1; j++) {
        
        var idx = requestedStartedArray[j] -1;
        newIsStartedAry[idx] = true;
        
    }
    
    for (var k = 0; k < len2; k++) {

        if (this.psModelList[k].isStarted != newIsStartedAry[k]) {
            
            var stateObject = {
                isStarted:newIsStartedAry[k]
            };
            
            this.psModelList[k].change(stateObject);
            
        }
        
    }
};

lgb.model.PsModelMaster.prototype.requestChangeShowCurves = function(requestedShowCurvesArray) {
   
    var len2 =  this.psModelList.length;
    var isAry = [len2];
    var newAry = [len2];
    
    for (var i = 0; i < len2; i++) {
        isAry[i] = this.psModelList[i].showCurves;
        newAry[i] = false;
    }
   
    var len1 =  requestedShowCurvesArray.length;
    for (var j = 0; j < len1; j++) {
        var idx = requestedShowCurvesArray[j] -1;
        newAry[idx] = true;
    }
    
    for (var k = 0; k < len2; k++) {
        if (this.psModelList[k].showCurves != newAry[k]) {
            var stateObject = {
                showCurves:newAry[k]
            };
            
            this.psModelList[k].change(stateObject);
        }
    }
};


lgb.model.PsModelMaster.prototype.requestChangeShowBoxes = function(requestedShowBoxesArray) {
   
    var len2 =  this.psModelList.length;
    var isAry = [len2];
    var newAry = [len2];
    
    for (var i = 0; i < len2; i++) {
        isAry[i] = this.psModelList[i].showBoxes;
        newAry[i] = false;
    }
   
    var len1 =  requestedShowBoxesArray.length;
    for (var j = 0; j < len1; j++) {
        var idx = requestedShowBoxesArray[j] -1;
        newAry[idx] = true;
    }
    
    for (var k = 0; k < len2; k++) {
        if (this.psModelList[k].showBoxes != newAry[k]) {
            var stateObject = {
                showBoxes:newAry[k]
            };
            
            this.psModelList[k].change(stateObject);
        }
    }
}

lgb.model.PsModelMaster.prototype.requestChangeIsEmitting = function(requestedEmittingArray) {
   
    var len2 =  this.psModelList.length;
    
    
    var isEmittingAry = [len2];
    var newIsEmittingAry = [len2];
    
    for (var i = 0; i < len2; i++) {
        isEmittingAry[i] = this.psModelList[i].isEmitting;
        newIsEmittingAry[i] = false;
    }
    

    
    var len1 =  requestedEmittingArray.length;
    for (var j = 0; j < len1; j++) {
        
        var idx = requestedEmittingArray[j] -1;
        newIsEmittingAry[idx] = true;
        
    }
    
    for (var k = 0; k < len2; k++) {

        if (this.psModelList[k].isEmitting != newIsEmittingAry[k]) {
            
            var stateObject = {
                isEmitting:newIsEmittingAry[k]
            };
            
            this.psModelList[k].change(stateObject);
            
        }
        
    }
}

lgb.model.PsModelMaster.prototype.requestChangeIsRunning = function(requestedRunningArray) {
   
    var len2 =  this.psModelList.length;
    
    
    var isRunningAry = [len2];
    var newIsRunningAry = [len2];
    
    for (var i = 0; i < len2; i++) {
        isRunningAry[i] = this.psModelList[i].isRunning;
        newIsRunningAry[i] = false;
    }
    

    
    var len1 =  requestedRunningArray.length;
    for (var j = 0; j < len1; j++) {
        
        var idx = requestedRunningArray[j] -1;
        newIsRunningAry[idx] = true;
        
    }
    
    for (var k = 0; k < len2; k++) {

        if (this.psModelList[k].isRunning != newIsRunningAry[k]) {
            
            var stateObject = {
                isRunning:newIsRunningAry[k]
            };
            
            this.psModelList[k].change(stateObject);
            
        }
        
    }
}



/**
 * The Particle system data is located in remotes files.
 * this triggers the process of downloading and parsing those files.
 */
lgb.model.PsModelMaster.prototype.load = function() {

  /**@type {THREE.SceneLoaderEx} */
  this.loader_ = new THREE.SceneLoaderEx();
  //  this.loader_.callbackSync = this.d(this.onSceneLoadedSync_);
  this.loader_.load(lgb.Config.PARTICLE_SYSTEM_SCENE, this.d(this.onSceneLoadedSync_));

  this.loadXML_();
};

/**
 * Event hander called then the LS file is loaded.
 * @param {Object} result Contains the scene.
 * @private
 */
lgb.model.PsModelMaster.prototype.onSceneLoadedSync_ = function(result) {

  this.scene_ = result['scene'];
  this.groups_ = result['groups'];
  this.cameras_ = result['cameras'];

  this.masterGroup_ = new THREE.Object3D();
  this.masterGroup_.name = this._NAME;
  this.masterGroup_.position = this.scene_.position;
  this.masterGroup_.rotation = this.scene_.rotation;
  this.masterGroup_.scale = this.scene_.scale;

  var i = this.scene_.children.length;
  while (i--) {
    var mesh = this.scene_.children.shift();
    if (null != mesh.geometry) {
      mesh.bakeTransformsIntoGeometry();
      
    //  mesh.position = this.scene_.position;
    //  mesh.rotation = this.scene_.rotation;
      //mesh.scale = this.scene_.scale;
      
      //mesh.bakeTransformsIntoGeometry();
      //this.masterGroup_.add(mesh);
    }
  }

  for (var groupName in this.groups_) {
    goog.array.sortObjectsByKey(this.groups_[groupName], 'name');
  }

  this.isSceneLoaded = true;
  this.checkForInitComplete_();

};



/**
 * used to determine if both the XML file and the JS file are
 * loaded.
 * @private
 */
lgb.model.PsModelMaster.prototype.checkForInitComplete_ = function() {
  
  if (this.isXMLloaded && this.isSceneLoaded) {
    this.startFactory_();
    this.dispatchLocal(new lgb.events.DataModelInitialized());
  }
  
};

/**
 * affter all needed data files are loaded, creates the data models.
 * @private
 */
lgb.model.PsModelMaster.prototype.startFactory_ = function() {

  var items = [];
  
  for (var key in this.systems) {

    var sys = this.systems[key];
    var l = sys.meshGroupNames.length;

    sys.meshes = [];
    for (var i = 0; i < l; i++) {
      var groupName = sys.meshGroupNames[i];
      sys.meshes = sys.meshes.concat(sys.meshes, this.groups_[groupName]);
    }

    sys.translate = this.translate;
    sys.rotate = this.rotate;

    var onePS = new lgb.model.PsModel(sys);
    this.psModelList.push(onePS);
    
    var d = onePS.getTreeData();
    items.push(d);

    
  }
  
    var active = { 
        text: "Active Zones" ,
        items: items
        }; 
    this.kendoDSactive.add(active);
    
    
    var boxes = { 
        text: "Show Boxes" ,
        items: items
        };
    this.kendoDSboxes.add(boxes);
  
    
    var curves = { 
        text: "Show Paths" ,
        items: items
        };
    this.kendoDScurves.add(curves);
  
};

/**
 * uses AJAX to download the remote XML files.
 * @private
 */
lgb.model.PsModelMaster.prototype.loadXML_ = function() {

  jQuery.ajax({
    type : 'GET',
    url : lgb.Config.PARTICLE_SYSTEM_XML,
    dataType : 'xml',
    success : this.d(this.parse_)
  });

};

/**
 * after the XML files is loaded it must be parsed.
 * @param {Document} xml The downloaded XML doc.
 * @private
 */
lgb.model.PsModelMaster.prototype.parse_ = function(xml) {

  var parser = new lgb.utils.XmlParser(xml);

  parser.makeRootNode('/particleSystems/@translate');
  this.translate = parser.getFloatArray();

  parser.makeRootNode('/particleSystems/@rotate');
  this.rotate = parser.getFloatArray();

  parser.makeRootNode('/particleSystems/system');
  while (parser.currentNode) {

    var theID = parser.getId();

    var sys = {
      id : theID,
      particleCount : parser.getContentAsFloat('particleCount'),
      particleSize : parser.getContentAsFloat('particleSize'),
      meshGroupNames : parser.getTextArray('meshGroupNames'),
      title : parser.getContent('title'),
      launchDelayBetweenParticles : parser.getContent('launchDelayBetweenParticles'),
      lifeSpanInSeconds : parser.getContentAsFloat('lifeSpanInSeconds')
    };

    this.systems[theID] = sys;
    parser.next();
  }

  this.isXMLloaded = true;
  this.checkForInitComplete_();

};

