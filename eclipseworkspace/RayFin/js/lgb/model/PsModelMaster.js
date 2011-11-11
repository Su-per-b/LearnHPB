goog.provide('lgb.model.PsModelMaster');

goog.require('goog.array');
goog.require('lgb.Config');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.model.ModelBase');
goog.require('lgb.model.PsModel');
goog.require('lgb.utils.XmlParser');


/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.PsModelMaster = function() {


  /**@const */
  this._NAME = 'lgb.model.PsModelMaster';

  /**@const */
  this._TITLE = 'Mutiple Particle System';

  lgb.model.ModelBase.call(this);

  this.xml = null;
  this.xpathResult = null;
  this.currentNode = null;

  this.isSceneLoaded = false;
  this.isXMLloaded = false;
  this.configs = {};
  this.systems = {};
  this.psModelList = [];

};
goog.inherits(lgb.model.PsModelMaster, lgb.model.ModelBase);

lgb.model.PsModelMaster.prototype.load = function() {
  this.loadScene_();

};


lgb.model.PsModelMaster.prototype.loadScene_ = function() {
  //var path = lgb.Config.ASSETS_BASE_PATH + 'particle-systems/ps6.js';

  /**@type {THREE.SceneLoaderEx} */
  this.loader_ = new THREE.SceneLoaderEx();
  this.loader_.callbackSync = this.d(this.onSceneLoadedSync_);
  this.loader_.load(lgb.Config.PARTICLE_SYSTEM_SCENE);
  this.loadXML_();
};


lgb.model.PsModelMaster.prototype.onSceneLoadedSync_ = function(result) {

  var scene = result['scene'];

  this.masterGroup = new THREE.Object3D();

  var i = scene.objects.length;
  while (i--) {
      var mesh = scene.objects.shift();
      if (null != mesh.geometry) {
      mesh.bakeTransformsIntoGeometry();

      mesh.position = scene.position;
      mesh.rotation = scene.rotation;
      mesh.scale = scene.scale;
      mesh.bakeTransformsIntoGeometry();

        this.masterGroup.add(mesh);
      }


  }


  /**@type Object */
  this.meshGroups  = result['groups'];

  for (var groupName in this.meshGroups) {
    goog.array.sortObjectsByKey(this.meshGroups[groupName], 'name');
  }

  this.isSceneLoaded = true;
  this.checkForInitComplete_();

};

lgb.model.PsModelMaster.prototype.checkForInitComplete_ = function() {
  if (this.isXMLloaded && this.isSceneLoaded)
  {

    this.startFactory_();
    this.dispatchLocal(new lgb.events.DataModelInitialized());
  }
};

lgb.model.PsModelMaster.prototype.startFactory_ = function() {

  for (var key in this.systems) {

    var sys = this.systems[key];
    var l = sys.meshGroupNames.length;

    sys.meshes = [];
    for (var i = 0; i < l; i++) {
      var groupName = sys.meshGroupNames[i];
      sys.meshes = sys.meshes.concat(sys.meshes, this.meshGroups[groupName]);
    }

    sys.translate = this.translate;
    sys.rotate = this.rotate;

    var onePS = new lgb.model.PsModel(sys);
    this.psModelList.push(onePS);

  }


};


lgb.model.PsModelMaster.prototype.loadXML_ = function() {

    jQuery.ajax({
      type: 'GET',
      url: lgb.Config.PARTICLE_SYSTEM_XML,
      dataType: 'xml',
      success: this.d(this.parse)
    });

};




lgb.model.PsModelMaster.prototype.parse = function(xml) {

  var parser = new lgb.utils.XmlParser(xml);

  parser.makeRootNode('/particleSystems/@translate');
  this.translate = parser.getFloatArray();

  parser.makeRootNode('/particleSystems/@rotate');
  this.rotate = parser.getFloatArray();

  parser.makeRootNode('/particleSystems/system');
  while (parser.currentNode) {

    var theID = parser.getId();

    var sys = {  id: theID,
          particleCount: parser.getContentAsFloat('particleCount'),
          particleSize: parser.getContentAsFloat('particleSize'),
          meshGroupNames: parser.getTextArray('meshGroupNames'),
          title: parser.getContent('title'),
          launchDelayBetweenParticles: parser.getContent('launchDelayBetweenParticles'),
          lifeSpanInSeconds: parser.getContentAsFloat('lifeSpanInSeconds')
    };


    this.systems[theID] = sys;
    parser.next();
    }

  this.isXMLloaded = true;
  this.checkForInitComplete_();


};














