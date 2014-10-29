goog.provide('lgb.integrated.model.VariableInteger');

goog.require('lgb.integrated.model.Variable');
goog.require('lgb.integrated.model.unit.Factory');
goog.require('lgb.integrated.model.vo.Real');


lgb.integrated.model.VariableInteger = function(  ) {
    
    lgb.integrated.model.Variable.call(this);
    
    this.value = new lgb.integrated.model.vo.Real();
    this.dflt = new lgb.integrated.model.vo.Real();
    this.min = new lgb.integrated.model.vo.Real();
    this.max = new lgb.integrated.model.vo.Real();
    
    this.valueListDisplayString = [];
    this.valueListInternal = [];
    
    this.name_simulation = "{not set}";
    this.name_scenario = "{not set}";
    
    this.unit = null; 
    
};
goog.inherits(lgb.integrated.model.VariableInteger, lgb.integrated.model.Variable);



lgb.integrated.model.VariableInteger.prototype.setScalarVariable = function(scalarVariable) {


    this.scalarVariable_ = scalarVariable;
    this.name_simulation = scalarVariable.getNormalizedName();
    
    this.makeUnitFromString(scalarVariable.typeSpecReal_.unit);
    
    this.min.setInternalValue(scalarVariable.typeSpecReal_.min);
    this.max.setInternalValue(scalarVariable.typeSpecReal_.max);
    this.dflt.setInternalValue(scalarVariable.typeSpecReal_.start);
    
    this.setInternalValue(scalarVariable.typeSpecReal_.start);
    
    
    return;
  
};


lgb.integrated.model.VariableInteger.prototype.setScalarValue = function(scalarValue) {

    this.setInternalValue(scalarValue.getValue());
    
    return;
  
};





lgb.integrated.model.VariableInteger.prototype.parseSrcObj = function(srcObj) {

    this.name = srcObj.name;
    this.abbr = srcObj.abbr;
    
    this.scenarioVariable_ = srcObj;
    
    this.name_simulation = srcObj.modName;
    this.name_scenario = srcObj.abbr;
    
    this.makeUnitFromString(srcObj.unit);
    
    var child = srcObj.getChildren()[0];

    this.min.setInternalValue(child.min);
    this.max.setInternalValue(child.max);
    this.dflt.setInternalValue(child.dflt);
    
    this.setInternalValue(child.dflt);
    
    return;
  
};


lgb.integrated.model.VariableInteger.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {


    this.unit.changeDisplayUnitSystem(displayUnitSystem);
    
    this.dflt.changeDisplayUnitSystem(displayUnitSystem);
    this.min.changeDisplayUnitSystem(displayUnitSystem);
    this.max.changeDisplayUnitSystem(displayUnitSystem);
    this.value.changeDisplayUnitSystem(displayUnitSystem);
    
    return;
  
};



lgb.integrated.model.VariableInteger.prototype.makeUnitFromString = function(unitString) {
    
    var unitObject = lgb.integrated.model.unit.Factory.makeUnitFromString(unitString);
    this.setUnitObject(unitObject);
    
    
};


lgb.integrated.model.VariableInteger.prototype.setUnitObject = function(unitObject) {
    
    this.unit = unitObject;
    
    this.value.setUnitObject(this.unit);
    this.dflt.setUnitObject(this.unit);
    this.min.setUnitObject(this.unit);
    this.max.setUnitObject(this.unit);

};



lgb.integrated.model.VariableInteger.prototype.setInternalValue = function(internalValue) {
    
    this.value.setInternalValue(internalValue);
    this.valueListInternal.push(internalValue);
    this.valueListDisplayString.push(this.value.getDisplayString());

};


lgb.integrated.model.VariableInteger.prototype.getUnitDisplaySymbol = function() {
  
    if (null == this.unit) {
        return null;
    } else {
        return this.unit.getUnitDisplaySymbol();
    }
    
};


