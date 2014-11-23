goog.provide('lgb.integrated.model.Variable');


goog.require('lgb.integrated.model.NodeBaseLeaf');


lgb.integrated.model.Variable = function(  ) {
    
    lgb.integrated.model.NodeBaseLeaf.call(this);
    this.name_simulation = "";
    this.name_scenario = "";
};
goog.inherits(lgb.integrated.model.Variable, lgb.integrated.model.NodeBaseLeaf);



lgb.integrated.model.Variable.prototype.parseSrcObj = function(srcObj) {

    this.name_scenario = srcObj.abbr;
    this.name_simulation = srcObj.modName;
    return;
};


lgb.integrated.model.Variable.prototype.changeDisplayUnitSystem = function(srcObj) {
    debugger; //should override
    return;
};



lgb.integrated.model.Variable.prototype.setScalarVariableBase_ = function(scalarVariable) {

   // this.scalarVariable_ = scalarVariable;
    this.idx_ = scalarVariable.getIdx();
    this.name_simulation = scalarVariable.getName();
    
    return;
  
};







lgb.integrated.model.Variable.prototype.setScalarValue = function(scalarValue) {

    debugger; //should override
};



lgb.integrated.model.Variable.prototype.getIdx = function() {

    return this.idx_;
};



