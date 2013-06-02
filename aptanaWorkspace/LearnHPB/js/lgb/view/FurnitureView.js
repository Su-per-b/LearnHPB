/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.view.FurnitureView');
goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.GridModel');
goog.require('lgb.ThreeUtils');




goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.ViewPointNode');
goog.require('lgb.model.ViewPointCollection');
goog.require('lgb.model.vo.VisibilityNode');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.model.FurnitureModel} dataModel The model to display.
 */
lgb.view.FurnitureView = function(dataModel) {

  this._ASSETS_FOLDER = 'furniture';
  this._TITLE = 'Furniture';

 lgb.view.BaseView3dScene.call(this, dataModel);

  this.topFloorMinY_ = null;
  this.sceneY_ = null;

};
goog.inherits(lgb.view.FurnitureView,lgb.view.BaseView3dScene);



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

  this.dispatchViewpoints_();
  this.dispatchVisibilityNodes_();

};

lgb.view.FurnitureView.prototype.dispatchVisibilityNodes_ = function() {


  var node = new lgb.model.vo.VisibilityNode('Funiture', this.masterGroup_, 1 );

  this.triggerLocal(e.VisibilityNodesLoaded, node);
  
  return;
}

lgb.view.FurnitureView.prototype.dispatchViewpoints_ = function() {

  var viewPointNodeCollection = new lgb.model.ViewPointCollection(this._TITLE, this.masterGroup_.children);

    this.triggerLocal(e.ViewPointCollectionLoaded, viewPointNodeCollection);
}

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

