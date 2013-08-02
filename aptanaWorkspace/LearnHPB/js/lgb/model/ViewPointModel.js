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
  
  return;
};
 
 
lgb.model.ViewPointModel.prototype.addNode = function(visibilityNode) {
 
  this.nodeList_.push(visibilityNode);
  this.dispatchChange(visibilityNode);
  
  return;
};
 



lgb.model.ViewPointModel.prototype.getViewPoint = function(kNode) {
  
   var idx = kNode.idx;
   var viewPointNode = lgb.model.vo.ViewPointNode.getNodeByIdx(idx);
    
    
    
    viewPointNode.generateCamera();
    
    return viewPointNode;

};
