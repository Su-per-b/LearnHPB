/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.VisibilityModel');

goog.require('lgb.model.BaseModel');
goog.require('lgb.model.vo.VisibilityNode');



lgb.model.VisibilityModel = function() {
  this.init_();

};
goog.inherits(lgb.model.VisibilityModel, lgb.model.BaseModel);



lgb.model.VisibilityModel.prototype.init_ = function() {
  this.nodeList_= [];
};
 
 
 
lgb.model.VisibilityModel.prototype.addNode = function(visibilityNode) {
 
  this.nodeList_.push(visibilityNode);
  
  if (this.nodeList_.length == 1) {
    this.dispatchChangedEx('init', visibilityNode);
  } else {
    this.dispatchChangedEx('addNode', visibilityNode);
  }

};


lgb.model.VisibilityModel.prototype.changeVisibility = function(changeRequestAry) {
  
    var changeRequest = changeRequestAry[0];
    var visibilityNode = lgb.model.vo.VisibilityNode.getNodeByIdx(changeRequest.id);
         
     if (visibilityNode) {
       visibilityNode.setVisible(changeRequest.newValue);
     } else {
       debugger;
     }
}



