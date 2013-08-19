/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.view.FurnitureView');
goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.GridModel');
goog.require('lgb.ThreeUtils');

goog.require('lgb.model.BuildingHeightModel');
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

};
goog.inherits(lgb.view.FurnitureView, lgb.view.BaseView3dScene);

lgb.view.FurnitureView.prototype.onSceneLoaded_ = function() {
  this.dispatchViewpointNodes_();
  this.dispatchVisibilityNodes_();
};

lgb.view.FurnitureView.prototype.dispatchVisibilityNodes_ = function() {
  var node = new lgb.model.vo.VisibilityNode('Funiture', this.masterGroup_, 1);
  this.triggerLocal(e.VisibilityNodesLoaded, node);
}

lgb.view.FurnitureView.prototype.dispatchViewpointNodes_ = function() {
  var node = new lgb.model.vo.ViewpointNode.makeFromObject3D(this.masterGroup_, 2);
  this.triggerLocal(e.ViewpointNodesLoaded, node);
}

