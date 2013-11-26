/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.view.TestView3');

goog.require('goog.userAgent');
goog.require('lgb.core.ThreeUtils');
goog.require('lgb.world.view.BaseWorldView');




/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {test.world.model.EnvelopeModel} dataModel The model to display.
 */
test.world.view.TestView3 = function(dataModel) {
    

  this._ASSETS_FOLDER = 'test';
  this._TITLE = 'TestView1';
  
  this.filename = 'world3.json';
  
  lgb.world.view.BaseWorldView.call(this, dataModel);
};

goog.inherits(test.world.view.TestView3, lgb.world.view.BaseWorldView);



/**
 * Initiates the loading of the scene
 * @param {string} the folder name form which to load the 'scene.json' file
 * @protected
 */
test.world.view.TestView3.prototype.loadSceneFromFolder_ = function(folderName) {

  var path = lgb.core.Config.ASSETS_BASE_PATH + folderName + '/' + this.filename;
  
  this.loader_ = new THREE.SceneLoader();
  this.loader_.addGeometryHandler( "binary", THREE.BinaryLoader );
  
  this.loader_.load(path, this.d(this.onSceneLoadedBase_));
  
  
};



test.world.view.TestView3.prototype.onSceneLoaded_ = function() {
  
  this.addAlltoMasterGroup_();
  
};











