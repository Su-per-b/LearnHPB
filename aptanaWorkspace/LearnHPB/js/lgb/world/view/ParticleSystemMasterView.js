/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.ParticleSystemMasterView');

goog.require('lgb.world.view.BaseWorldView');
goog.require('lgb.world.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.world.model.LightingModel} dataModel The model to display.
 */
lgb.world.view.ParticleSystemMasterView = function(dataModel) {
    
 lgb.world.view.BaseWorldView.call(this, dataModel);
  
};
goog.inherits(lgb.world.view.ParticleSystemMasterView,lgb.world.view.BaseWorldView);



lgb.world.view.ParticleSystemMasterView.prototype.init = function() {

  this.requestAddToWorld(this.masterGroup_);
};



lgb.world.view.ParticleSystemMasterView.prototype.addChild = function(child) {
   
   this.masterGroup_.add(child);

};
    



