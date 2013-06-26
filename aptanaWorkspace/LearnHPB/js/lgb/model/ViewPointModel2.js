/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewPointModel2');

goog.require('lgb.model.BaseModel');
goog.require('lgb.model.vo.ViewPointNode');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.ViewPointModel2 = function() {

  /**@const */
  this._TITLE = 'ViewPointModel2';
  lgb.model.BaseModel.call(this);
  this.init_();
  this.name = "";
};
goog.inherits(lgb.model.ViewPointModel2, lgb.model.BaseModel);



lgb.model.ViewPointModel2.prototype.init_ = function() {
 
  this.nodeList_= [];
  
  return;
};
 
 
lgb.model.ViewPointModel2.prototype.addNode = function(visibilityNode) {
 
  this.nodeList_.push(visibilityNode);
  this.dispatchChange(visibilityNode);
  
  return;
};
 



lgb.model.ViewPointModel2.prototype.getViewPoint = function(kNode) {
  
   var idx = kNode.idx;
   var viewPointNode = lgb.model.vo.ViewPointNode.getNodeByIdx(idx);
    
    
    
    var cam = viewPointNode.generateCamera();
    
    return viewPointNode;

};
