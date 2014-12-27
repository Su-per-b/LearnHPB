/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.ViewpointModel');

goog.require('lgb.core.BaseModel');
goog.require('lgb.world.model.vo.ViewpointNode');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.ViewpointModel = function() {

  /**@const */
  this._TITLE = 'ViewpointModel2';
  lgb.core.BaseModel.call(this);
  this.init_();
  this.name = "";
};
goog.inherits(lgb.world.model.ViewpointModel, lgb.core.BaseModel);



lgb.world.model.ViewpointModel.prototype.init_ = function() {
 
  this.nodeList_= [];

};
 
 
lgb.world.model.ViewpointModel.prototype.addNode = function(viewpointNode) {
 
  this.nodeList_.push(viewpointNode);
  this.dispatchChangedEx("viewpointNode", viewpointNode);

};
 
 
lgb.world.model.ViewpointModel.prototype.setAnchors = function(anchors) {
 
  this.anchors_ = anchors;

};
 





lgb.world.model.ViewpointModel.prototype.getViewpoint = function(kNode) {
  
   var id = kNode.id;
   var viewpointNode = lgb.world.model.vo.ViewpointNode.getNodeByIdx(id);

   return viewpointNode;

};
