/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.view.FurnitureView');

goog.require('goog.userAgent');
goog.require('lgb.core.ThreeUtils');
goog.require('lgb.world.view.BaseWorldView');




/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {test.world.model.EnvelopeModel} dataModel The model to display.
 */
test.world.view.FurnitureView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'furniture';
  this._TITLE = 'FurnitureView';
  
  this.filename = 'scene.json';
  
  lgb.world.view.BaseWorldView.call(this, dataModel);
};

goog.inherits(test.world.view.FurnitureView, lgb.world.view.BaseWorldView);













