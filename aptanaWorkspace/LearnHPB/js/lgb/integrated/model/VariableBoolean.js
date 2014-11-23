goog.provide('lgb.integrated.model.VariableBoolean');

goog.require('lgb.integrated.model.Variable');
goog.require('lgb.integrated.model.unit.Factory');
goog.require('lgb.integrated.model.vo.Boolean');


lgb.integrated.model.VariableBoolean = function(  ) {
    
    lgb.integrated.model.Variable.call(this);
    
    this.value = new lgb.integrated.model.vo.Boolean();
    this.dflt = new lgb.integrated.model.vo.Boolean();

    this.valueListDisplayString = [];
    this.valueListInternal = [];
    
    this.name_simulation = "{not set}";
    this.name_scenario = "{not set}";
    
    this.unit = null; 
    
};
goog.inherits(lgb.integrated.model.VariableBoolean, lgb.integrated.model.Variable);



lgb.integrated.model.VariableBoolean.prototype.setScalarVariable = function(scalarVariable) {


    this.scalarVariable_ = scalarVariable;
    this.name_simulation = scalarVariable.getName();
    
    this.makeUnitFromString(scalarVariable.typeSpecBoolean_.unit);
    this.dflt.setInternalValue(scalarVariable.typeSpecBoolean_.start);
    
    this.setInternalValue(scalarVariable.typeSpecBoolean_.start);
    
    return;
  
};


lgb.integrated.model.VariableBoolean.prototype.setScalarValue = function(scalarValue) {

    this.setInternalValue(scalarValue.getValue());
    return;
  
};





lgb.integrated.model.VariableBoolean.prototype.parseSrcObj = function(srcObj) {

    this.name = srcObj.name;
    this.abbr = srcObj.abbr;
    
    this.scenarioVariable_ = srcObj;
    
    this.name_simulation = srcObj.modName;
    this.name_scenario = srcObj.abbr;
    
    this.makeUnitFromString(srcObj.unit);
    
    var child = srcObj.getChildren()[0];
    this.dflt.setInternalValue(child.dflt);
    this.setInternalValue(child.dflt);
    
    return;
  
};


lgb.integrated.model.VariableBoolean.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {

    this.unit.changeDisplayUnitSystem(displayUnitSystem);
    
    this.dflt.changeDisplayUnitSystem(displayUnitSystem);
    this.value.changeDisplayUnitSystem(displayUnitSystem);
    
    return;
  
};



lgb.integrated.model.VariableBoolean.prototype.makeUnitFromString = function(unitString) {
    
    var unitObject = lgb.integrated.model.unit.Factory.makeUnitFromString(unitString);
    this.setUnitObject(unitObject);
    
    
};


lgb.integrated.model.VariableBoolean.prototype.setUnitObject = function(unitObject) {
    
    this.unit = unitObject;
    
    this.value.setUnitObject(this.unit);
    this.dflt.setUnitObject(this.unit);


};



lgb.integrated.model.VariableBoolean.prototype.setInternalValue = function(internalValue) {
    
    this.value.setInternalValue(internalValue);
    this.valueListInternal.push(internalValue);
    this.valueListDisplayString.push(this.value.getDisplayString());

};


lgb.integrated.model.VariableBoolean.prototype.getUnitDisplaySymbol = function() {
  
    if (null == this.unit) {
        return null;
    } else {
        return this.unit.getUnitDisplaySymbol();
    }
    
};


