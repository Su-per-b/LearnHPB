goog.provide('lgb.integrated.model.VariableBoolean');

goog.require('lgb.integrated.model.unit.Factory');
goog.require('lgb.integrated.model.vo.Boolean');
goog.require('lgb.integrated.model.VariableBase');


lgb.integrated.model.VariableBoolean = function(  ) {
    
    lgb.integrated.model.VariableBase.call(this);
    
    this.value = new lgb.integrated.model.vo.Boolean();
    this.start = new lgb.integrated.model.vo.Boolean();

    this.valueListDisplayString = [];
    this.valueListInternal = [];
    
    this.scalarVariableName = "{not set}";
    this.name = "{not set}";
    
    this.unit = null; 
    
};
goog.inherits(lgb.integrated.model.VariableBoolean, lgb.integrated.model.VariableBase);


lgb.integrated.model.VariableBoolean.prototype.setScalarVariable = function(scalarVariable) {


    this.scalarVariable_ = scalarVariable;
    this.scalarVariableName = scalarVariable.getName();
    
    this.makeUnitFromString(scalarVariable.typeSpecBoolean_.unit);
    this.start.setInternalValue(scalarVariable.typeSpecBoolean_.start);
    
    this.setInternalValue(scalarVariable.typeSpecBoolean_.start);
    
    return;
  
};


lgb.integrated.model.VariableBoolean.prototype.setScalarValue = function(scalarValue) {

    this.setInternalValue(scalarValue.getValue());
    return;
  
};





lgb.integrated.model.VariableBoolean.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {

    this.unit.changeDisplayUnitSystem(displayUnitSystem);
    
    this.start.changeDisplayUnitSystem(displayUnitSystem);
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
    this.start.setUnitObject(this.unit);


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


