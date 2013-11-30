/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.view.SceneView');

goog.require('goog.userAgent');
goog.require('lgb.core.ThreeUtils');
goog.require('lgb.world.view.BaseWorldView');




/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {test.world.model.EnvelopeModel} dataModel The model to display.
 */
test.world.view.SceneView = function(dataModel, assetFolder, fileName) {
    

  this._ASSETS_FOLDER = assetFolder;
  this._TITLE = 'SceneView';
  
  this.filename = fileName;
  
  lgb.world.view.BaseWorldView.call(this, dataModel);
};

goog.inherits(test.world.view.SceneView, lgb.world.view.BaseWorldView);



test.world.view.SceneView.prototype.onSceneLoaded_ = function() {
  
  if (this.masterGroup_.children.length < 1) {
    this.addAlltoMasterGroup_();
  }

};











