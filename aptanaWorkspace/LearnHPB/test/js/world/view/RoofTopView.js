/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.view.RoofTopView');

goog.require('goog.userAgent');
goog.require('lgb.core.ThreeUtils');
goog.require('lgb.world.view.BaseWorldView');




/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {test.world.model.EnvelopeModel} dataModel The model to display.
 */
test.world.view.RoofTopView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'rooftop';
  this._TITLE = 'RoofTopView';
  
  this.filename = 'scene.json';
  
  lgb.world.view.BaseWorldView.call(this, dataModel);
};

goog.inherits(test.world.view.RoofTopView, lgb.world.view.BaseWorldView);













