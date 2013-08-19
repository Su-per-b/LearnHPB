/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewpointModel');

goog.require('lgb.model.BaseModel');
goog.require('lgb.model.vo.ViewpointNode');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.ViewpointModel = function() {

  /**@const */
  this._TITLE = 'ViewpointModel2';
  lgb.model.BaseModel.call(this);
  this.init_();
  this.name = "";
};
goog.inherits(lgb.model.ViewpointModel, lgb.model.BaseModel);



lgb.model.ViewpointModel.prototype.init_ = function() {
 
  this.nodeList_= [];

};
 
 
lgb.model.ViewpointModel.prototype.addNode = function(viewpointNode) {
 
  this.nodeList_.push(viewpointNode);
  this.dispatchChangedEx("viewpointNode", viewpointNode);

};
 
 
lgb.model.ViewpointModel.prototype.setAnchors = function(anchors) {
 
  this.anchors_ = anchors;

};
 





lgb.model.ViewpointModel.prototype.getViewpoint = function(kNode) {
  
   var id = kNode.id;
   var viewpointNode = lgb.model.vo.ViewpointNode.getNodeByIdx(id);

   return viewpointNode;

};
