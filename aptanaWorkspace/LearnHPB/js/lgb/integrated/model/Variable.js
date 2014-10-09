goog.provide('lgb.integrated.model.Variable');


goog.require('lgb.integrated.model.NodeBaseLeaf');


lgb.integrated.model.Variable = function(  ) {
    
    lgb.integrated.model.NodeBaseLeaf.call(this);
    this.name_simulation = "{not set}";

    
};
goog.inherits(lgb.integrated.model.Variable, lgb.integrated.model.NodeBaseLeaf);



lgb.integrated.model.Variable.prototype.parseSrcObj = function(srcObj) {

    this.name = srcObj.name;
    this.abbr = srcObj.abbr;
    

    
    return;
  
};


lgb.integrated.model.Variable.prototype.changeDisplayUnitSystem = function(srcObj) {


    debugger; //should override

    
    return;
  
};


lgb.integrated.model.Variable.prototype.getNormalizedName = function() {

    var normalizedName = this.name_simulation.replace("[", "_");
    var normalizedName = normalizedName.replace("]", "");
    
    return normalizedName;
  
};

lgb.integrated.model.Variable.prototype.setScalarVariable = function(scalarVariable) {

    this.scalarVariable_ = scalarVariable;
    
    
    return;
  
};

lgb.integrated.model.Variable.prototype.setScalarValue = function(scalarValue) {


    
    
    return;
  
};
