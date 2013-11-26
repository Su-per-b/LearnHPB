/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.view.ParticleSystemView');

goog.require('goog.userAgent');
goog.require('lgb.core.ThreeUtils');
goog.require('lgb.world.view.BaseWorldView');




/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {test.world.model.EnvelopeModel} dataModel The model to display.
 */
test.world.view.ParticleSystemView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'test';
  this._TITLE = 'ParticleSystemView';
  
  this.filename = 'particle-systems2.json';
  
  lgb.world.view.BaseWorldView.call(this, dataModel);
};

goog.inherits(test.world.view.ParticleSystemView, lgb.world.view.BaseWorldView);




// /**
 // * Event handler called when the the scene is loaded.
 // * @private
 // * @param {Object} result From the THREE.js lib.
 // */
// test.world.view.ParticleSystemView.prototype.onSceneLoaded_ = function(result) {
//   
 // // this.addAlltoMasterGroup_();
// 
// };











