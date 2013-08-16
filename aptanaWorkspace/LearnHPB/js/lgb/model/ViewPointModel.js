/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewPointModel');

goog.require('lgb.model.BaseModel');
goog.require('lgb.model.vo.ViewPointNode');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.ViewPointModel = function() {

  /**@const */
  this._TITLE = 'ViewPointModel2';
  lgb.model.BaseModel.call(this);
  this.init_();
  this.name = "";
};
goog.inherits(lgb.model.ViewPointModel, lgb.model.BaseModel);



lgb.model.ViewPointModel.prototype.init_ = function() {
 
  this.nodeList_= [];

};
 
 
lgb.model.ViewPointModel.prototype.addNode = function(viewPointNode) {
 
  this.nodeList_.push(viewPointNode);
  this.dispatchChangedEx("viewPointNode", viewPointNode);

};
 
 
lgb.model.ViewPointModel.prototype.setAnchors = function(anchors) {
 
  this.anchors_ = anchors;

};
 





lgb.model.ViewPointModel.prototype.getViewPoint = function(kNode) {
  
   var id = kNode.id;
   var viewPointNode = lgb.model.vo.ViewPointNode.getNodeByIdx(id);

   return viewPointNode;

};
