/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.PsMasterView');

goog.require('lgb.view.BaseView');
goog.require('lgb.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {lgb.view.BaseView}
 * @param {lgb.model.LightingModel} dataModel The model to display.
 */
lgb.view.PsMasterView = function(dataModel) {
    
  this._NAME = 'lgb.view.PsMasterView';
  lgb.view.BaseView.call(this, dataModel);
  
  this.buildingHeightModel_ = null;
  this.sceneY_ = null;
  this.psControllers_ = [];
  this.bind_();
  
};
goog.inherits(lgb.view.PsMasterView, lgb.view.BaseView);


lgb.view.PsMasterView.prototype.init = function() {

  this.masterGroup_ = this.dataModel.masterGroup_;

  var len = this.dataModel.psModelList.length;
  for (var i = 0; i < len; i++) {

    var dataModel = this.dataModel.psModelList[i];
    var controller = new lgb.controller.PsController(dataModel, this.masterGroup_);
    
    this.psControllers_.push(controller);
  }
  
  this.sceneY_ = this.masterGroup_.position.y;
  this.setY_();
   
  this.requestAddToWorld(this.masterGroup_);
};



lgb.view.PsMasterView.prototype.bind_ = function() {
  
  this.listenTo(this.dataModel,
    lgb.events.DataModelInitialized.TYPE,
    this.onDataModelInitialized_);

};



lgb.view.PsMasterView.prototype.onDataModelInitialized_ = function(event) {
   
  this.init();
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



/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.PsMasterView.prototype.onSceneLoaded_ = function() {
  




};


