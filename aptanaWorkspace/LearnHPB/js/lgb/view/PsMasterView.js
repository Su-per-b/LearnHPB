/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.PsMasterView');

goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.model.LightingModel} dataModel The model to display.
 */
lgb.view.PsMasterView = function(dataModel) {
    
 lgb.view.BaseView3dScene.call(this, dataModel);
  
};
goog.inherits(lgb.view.PsMasterView,lgb.view.BaseView3dScene);



lgb.view.PsMasterView.prototype.init = function() {

  this.requestAddToWorld(this.masterGroup_);
};



lgb.view.PsMasterView.prototype.addChild = function(child) {
   
   this.masterGroup_.add(child);

};
    



