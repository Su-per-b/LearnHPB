goog.provide('lgb.integrated.model.VariableOption');

goog.require('lgb.integrated.model.Variable');




lgb.integrated.model.VariableOption = function(  ) {
    
    lgb.integrated.model.NodeBaseLeaf.call(this);
     
};
goog.inherits(lgb.integrated.model.VariableOption, lgb.integrated.model.NodeBaseLeaf);



lgb.integrated.model.VariableOption.prototype.parseSrcObj = function(srcObj) {

    this.name = srcObj.name;
    this.description = srcObj.description;
    this.dflt = srcObj.dflt;
    this.disabled = srcObj.disabled;
    
    return;
};


lgb.integrated.model.VariableOption.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {


    
    return;
};



