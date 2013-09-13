/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.world.view.UtilityAxisView');
goog.require('lgb.world.view.BaseWorldView');


/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.world.model.FurnitureModel} dataModel The model to display.
 */
lgb.world.view.UtilityAxisView = function() {
    

  this._ASSETS_FOLDER = 'utility';
 lgb.world.view.BaseWorldView.call(this, null);

  this.filename = 'axis_flipped.json';
};
goog.inherits(lgb.world.view.UtilityAxisView,lgb.world.view.BaseWorldView);



/**
 * Event handler called when the scene file is loaded
 * and all needed assets have been loaded .
 * @private
 */
lgb.world.view.UtilityAxisView.prototype.onSceneLoaded_ = function() {
 
  this.masterGroup_.addChildren(this.scene_);
  
};

