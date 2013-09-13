/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.world.view.FurnitureView');
goog.require('lgb.world.view.BaseWorldView');
goog.require('lgb.world.model.GridModel');
goog.require('lgb.core.ThreeUtils');

goog.require('lgb.world.model.BuildingHeightModel');
goog.require('lgb.world.model.vo.VisibilityNode');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.world.model.FurnitureModel} dataModel The model to display.
 */
lgb.world.view.FurnitureView = function(dataModel) {

  this._ASSETS_FOLDER = 'furniture';
  this._TITLE = 'Furniture';

  lgb.world.view.BaseWorldView.call(this, dataModel);

};
goog.inherits(lgb.world.view.FurnitureView, lgb.world.view.BaseWorldView);

lgb.world.view.FurnitureView.prototype.onSceneLoaded_ = function() {
  this.dispatchViewpointNodes_();
  this.dispatchVisibilityNodes_();
};

lgb.world.view.FurnitureView.prototype.dispatchVisibilityNodes_ = function() {
  var node = new lgb.world.model.vo.VisibilityNode('Funiture', this.masterGroup_, 1);
  this.triggerLocal(e.VisibilityNodesLoaded, node);
};

lgb.world.view.FurnitureView.prototype.dispatchViewpointNodes_ = function() {
  var node = new lgb.world.model.vo.ViewpointNode.makeFromObject3D(this.masterGroup_, 2);
  this.triggerLocal(e.ViewpointNodesLoaded, node);
};

