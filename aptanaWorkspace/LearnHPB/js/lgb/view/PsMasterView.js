/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.PsMasterView');

goog.require('BaseView3dScene');
goog.require('lgb.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.model.LightingModel} dataModel The model to display.
 */
lgb.view.PsMasterView = function(dataModel) {
    
  this._NAME = 'lgb.view.PsMasterView';
  BaseView3dScene.call(this, dataModel);
  
  this.buildingHeightModel_ = null;
  this.sceneY_ = null;
  
};
goog.inherits(lgb.view.PsMasterView, BaseView3dScene);



lgb.view.PsMasterView.prototype.init = function() {

  this.sceneY_ = this.masterGroup_.position.y;
  this.setY_();
   
  this.requestAddToWorld(this.masterGroup_);
};



lgb.view.PsMasterView.prototype.addChild = function(child) {
   
   this.masterGroup_.add(child);
   return;
};
    

    
lgb.view.PsMasterView.prototype.setBuildingHeight = function(buildingHeightModel) {
   
  this.buildingHeightModel_ = buildingHeightModel;
  this.setY_();
};


lgb.view.PsMasterView.prototype.setY_ = function() {
    
  if (null != this.buildingHeightModel_ && null != this.sceneY_) {
      this.masterGroup_.position.y = this.buildingHeightModel_.topFloorMaxY + this.sceneY_;
  }
};



