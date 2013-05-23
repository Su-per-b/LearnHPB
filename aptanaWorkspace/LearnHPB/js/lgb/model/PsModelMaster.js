/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.model.PsModelMaster');

goog.require('goog.array');
goog.require('lgb.Config');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.DataModelInitialized');
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

};



lgb.model.PsModelMaster.prototype.getPsModelList = function() {

  return this.psModelList;
};



lgb.model.PsModelMaster.prototype.changeAry = function(changeRequestAry) {

  var changeRequest = changeRequestAry[0];
  var propertyName = changeRequestAry.propertyName;
  
  if (changeRequest.idx in this.psModelList) {
     var psModel = this.psModelList[changeRequest.idx];
     psModel.changeProperty(propertyName, changeRequest.isChecked);
  }
  
  return;
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


  var i = this.scene_.children.length;
  while (i--) {
    var mesh = this.scene_.children.shift();
    if (null != mesh.geometry) {
      
        mesh.bakeTransformsIntoGeometry();
        mesh.position = this.scene_.position;
        mesh.rotation = this.scene_.rotation;
        mesh.scale = this.scene_.scale;
        mesh.bakeTransformsIntoGeometry();
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

    var psModel = new lgb.model.PsModel(sys, this.psModelList.length);
    this.psModelList.push(psModel);

    
  }

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

