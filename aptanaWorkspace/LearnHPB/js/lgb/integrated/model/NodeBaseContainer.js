goog.provide('lgb.integrated.model.NodeBaseContainer');

goog.require('lgb.core.BaseModel');



lgb.integrated.model.NodeBaseContainer = function() {
    
    lgb.core.BaseModel.call(this);
    
    this.children_ = [];
    
};
goog.inherits(lgb.integrated.model.NodeBaseContainer, lgb.core.BaseModel);




lgb.integrated.model.NodeBaseContainer.prototype.getChildren = function() {
  
  return this.children_;
    
};