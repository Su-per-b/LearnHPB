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
  
  //this.rootNode_ = new lgb.model.vo.VisibilityNode('Visible');
  
  return;
};
 
 
 
lgb.model.VisibilityModel.prototype.addNode = function(visibilityNode) {
 

  this.nodeList_.push(visibilityNode);
  
  //this.rootNode_.add(visibilityNode);
  
  //this.rootNode_.generateIdx();
  
  
  //this.visibilityNodeList_.push(visibilityNode);
  this.dispatchChange(visibilityNode);
  
  return;
};
 


lgb.model.VisibilityModel.prototype.changeAry = function(changeRequestAry) {

  var changeRequest = changeRequestAry[0];
  var propertyName = changeRequestAry.propertyName;
  
  
  // var node = this.rootNode_.getNodeByIdx(changeRequest.idx);
  var node = lgb.model.vo.VisibilityNode.getNodeByIdx(changeRequest.idx);
  
  
   if (node) {
     
     node.setVisible(changeRequest.newValue);
     
   }
 
 
/*
  if (changeRequest.idx in this.rootNode_.addNodes) {
    
     var node = this.rootNode_.addNodes[changeRequest.idx];
     


  }
  
  return;*/

}


 
/*
 
lgb.model.VisibilityModel.prototype.makeNode_ = function(title, idx) {

  var node = new lgb.model.vo.VisibilityNode(title, true, idx);
  
  this.listenTo(node,
    e.DataModelChanged,
    this.onDataModelChanged_
    )
  
  this.visibilityGroupList_.push(node);
  
}
*/



