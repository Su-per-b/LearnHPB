/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.PsMasterView');

goog.require('lgb.world.view.BaseView3dScene');
goog.require('lgb.world.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.world.model.LightingModel} dataModel The model to display.
 */
lgb.world.view.PsMasterView = function(dataModel) {
    
 lgb.world.view.BaseView3dScene.call(this, dataModel);
  
};
goog.inherits(lgb.world.view.PsMasterView,lgb.world.view.BaseView3dScene);



lgb.world.view.PsMasterView.prototype.init = function() {

  this.requestAddToWorld(this.masterGroup_);
};



lgb.world.view.PsMasterView.prototype.addChild = function(child) {
   
   this.masterGroup_.add(child);

};
    



