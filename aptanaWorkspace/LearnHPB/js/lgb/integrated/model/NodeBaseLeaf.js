goog.provide('lgb.integrated.model.NodeBaseLeaf');

goog.require('lgb.integrated.model.NodeBase');


lgb.integrated.model.NodeBaseLeaf = function(  ) {
    
    lgb.integrated.model.NodeBase.call(this);
};
goog.inherits(lgb.integrated.model.NodeBaseLeaf, lgb.integrated.model.NodeBase);




lgb.integrated.model.NodeBaseLeaf.prototype.parseSrcObj = function(srcObj) {

    this.name_simulation = srcObj.modName;
    this.name_scenario = srcObj.abbr;
    
    return;
  
};



lgb.integrated.model.NodeBaseLeaf.prototype.calcAndGetLeafNodes = function() {

    return [this];
    
};

lgb.integrated.model.NodeBaseLeaf.prototype.calcAndGetIntegratedVariables = function() {

    return [this];
    
};

