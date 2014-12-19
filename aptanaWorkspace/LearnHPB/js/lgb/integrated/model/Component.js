goog.provide('lgb.integrated.model.Component');


goog.require('lgb.integrated.model.NodeBaseLeaf');


lgb.integrated.model.Component = function(  ) {
    
    lgb.integrated.model.NodeBaseLeaf.call(this);
    
};
goog.inherits(lgb.integrated.model.Component, lgb.integrated.model.NodeBaseLeaf);






lgb.integrated.model.Component.prototype.calcAndGetLeafNodes = function() {
    return null;
};
