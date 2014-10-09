goog.provide('lgb.integrated.model.NodeBaseLeaf');

goog.require('lgb.integrated.model.NodeBase');


lgb.integrated.model.NodeBaseLeaf = function(  ) {
    
    lgb.integrated.model.NodeBase.call(this);
};
goog.inherits(lgb.integrated.model.NodeBaseLeaf, lgb.integrated.model.NodeBase);




lgb.integrated.model.NodeBaseLeaf.prototype.parseSrcObj = function(srcObj) {

    this.name = srcObj.name;
    this.abbr = srcObj.abbr;
    
    return;
  
};



lgb.integrated.model.NodeBaseLeaf.prototype.getLeafNodes = function() {

    return [this];
    
};

