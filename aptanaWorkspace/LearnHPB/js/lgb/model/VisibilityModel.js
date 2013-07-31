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
  
  return;
};
 
 
 
lgb.model.VisibilityModel.prototype.addNode = function(visibilityNode) {
 
  this.nodeList_.push(visibilityNode);
  this.dispatchChange(visibilityNode);
  
  return;
};
 


lgb.model.VisibilityModel.prototype.changeAry = function(changeRequestAry) {
  
    var propertyName = changeRequestAry.propertyName;
    
  if ("isVisible" == propertyName) {
    
    var changeRequest = changeRequestAry[0];
    var node = lgb.model.vo.VisibilityNode.getNodeByIdx(changeRequest.idx);
         
     if (node) {
       node.setVisible(changeRequest.newValue);
     } else {
       debugger;
     }
  } else {
    debugger;
  }
  



}