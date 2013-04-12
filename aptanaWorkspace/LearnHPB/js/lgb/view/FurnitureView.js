/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.view.FurnitureView');
goog.require('lgb.view.ViewBase');
goog.require('lgb.model.GridModel');
goog.require('lgb.ThreeUtils');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.events.ViewPointLoaded');
goog.require('lgb.events.ViewPointListLoaded');
goog.require('lgb.model.ViewPointNode');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.FurnitureModel} dataModel The model to display.
 */
lgb.view.FurnitureView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  this._NAME = 'lgb.view.FurnitureView';
  this._ASSETS_FOLDER = 'furniture';
  this.topFloorMinY_ = null;
  this.sceneY_ = null;
  
};
goog.inherits(lgb.view.FurnitureView, lgb.view.ViewBase);



lgb.view.FurnitureView.prototype.setBuildingHeight = function(buildingHeightModel) {
   
  this.topFloorMinY_ = buildingHeightModel.topFloorMinY;
  this.setY_();
};

lgb.view.FurnitureView.prototype.setY_ = function() {
    
  if (null != this.topFloorMinY_ && null != this.sceneY_) {
      this.masterGroup_.position.y = this.topFloorMinY_ + this.sceneY_;
  }
  
};



lgb.view.FurnitureView.prototype.onSceneLoaded_ = function() {
    
    this.sceneY_ = this.masterGroup_.position.y;
    this.setY_();
  
    var nodeList = lgb.model.ViewPointNode.makeArray(this.masterGroup_.children);
    
    var event = new lgb.events.ViewPointListLoaded(nodeList);
    this.dispatchLocal(event);
    
};


/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.FurnitureView.prototype.updateVisible_ = function() {
  var m = this.masterGroup_.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup_.children[i].visible = this.dataModel.isVisible;
  }
};




