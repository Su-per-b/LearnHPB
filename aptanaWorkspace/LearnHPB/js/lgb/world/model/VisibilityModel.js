/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.VisibilityModel');

goog.require('lgb.world.model.BaseModel');
goog.require('lgb.world.model.vo.VisibilityNode');



lgb.world.model.VisibilityModel = function() {
  this.init_();

};
goog.inherits(lgb.world.model.VisibilityModel, lgb.world.model.BaseModel);



lgb.world.model.VisibilityModel.prototype.init_ = function() {
  this.nodeList_= [];
};
 
 
 
lgb.world.model.VisibilityModel.prototype.addNode = function(visibilityNode) {
 
  this.nodeList_.push(visibilityNode);
  
  if (this.nodeList_.length == 1) {
    this.dispatchChangedEx('init', visibilityNode);
  } else {
    this.dispatchChangedEx('addNode', visibilityNode);
  }

};


lgb.world.model.VisibilityModel.prototype.changeVisibility = function(changeRequestAry) {
  
    var changeRequest = changeRequestAry[0];
    var visibilityNode = lgb.world.model.vo.VisibilityNode.getNodeByIdx(changeRequest.id);
         
     if (visibilityNode) {
       visibilityNode.setVisible(changeRequest.newValue);
     } else {
       debugger;
     }
}



