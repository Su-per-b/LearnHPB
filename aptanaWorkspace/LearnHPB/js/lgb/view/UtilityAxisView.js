/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.view.UtilityAxisView');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.FurnitureModel} dataModel The model to display.
 */
lgb.view.UtilityAxisView = function() {
    
  this._NAME = 'lgb.view.UtilityAxisView';
  this._ASSETS_FOLDER = 'utility/axis';
  lgb.view.ViewBase.call(this, null);

  this.filename = 'axis_flipped.json';
};
goog.inherits(lgb.view.UtilityAxisView, lgb.view.ViewBase);



/**
 * Event handler called when the scene file is loaded
 * and all needed assets have been loaded .
 * @private
 */
lgb.view.UtilityAxisView.prototype.onSceneLoaded_ = function() {
 
  this.masterGroup_.addChildren(this.scene_);
  
};

