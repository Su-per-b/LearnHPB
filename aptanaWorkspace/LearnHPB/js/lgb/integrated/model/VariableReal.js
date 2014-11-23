goog.provide('lgb.integrated.model.VariableReal');

goog.require('lgb.integrated.model.Variable');
goog.require('lgb.integrated.model.unit.Factory');
goog.require('lgb.integrated.model.vo.Real');


lgb.integrated.model.VariableReal = function(  ) {
    
    lgb.integrated.model.Variable.call(this);
    
    this.value = new lgb.integrated.model.vo.Real();
    this.dflt = new lgb.integrated.model.vo.Real();
    this.min = new lgb.integrated.model.vo.Real();
    this.max = new lgb.integrated.model.vo.Real();
    
    this.valueListDisplayString = [];
    this.valueListInternal = [];
    
    this.unit = null; 
    
};
goog.inherits(lgb.integrated.model.VariableReal, lgb.integrated.model.Variable);



lgb.integrated.model.VariableReal.prototype.setScalarVariable = function(scalarVariable) {

    
    this.setScalarVariableBase_(scalarVariable);
    
    this.makeUnitFromString(scalarVariable.typeSpecReal_.unit);
    
    this.min.setInternalValue(scalarVariable.typeSpecReal_.min);
    this.max.setInternalValue(scalarVariable.typeSpecReal_.max);
    this.dflt.setInternalValue(scalarVariable.typeSpecReal_.start);
    
    this.setInternalValue(scalarVariable.typeSpecReal_.start);
    
    
    return;
  
};

lgb.integrated.model.VariableReal.prototype.setChangeCallback = function(changeCallbackDelegate) {

    this.changeCallbackDelegate_ = changeCallbackDelegate;
    
    return;
};

lgb.integrated.model.VariableReal.prototype.setScalarValue = function(scalarValue) {


    var currentValue = this.value.getInternalValue();
    var newValue = scalarValue.getValue();
    
    this.setInternalValue(scalarValue.getValue());
    

    return;
  
};





lgb.integrated.model.VariableReal.prototype.parseSrcObj = function(srcObj) {

    this.name = srcObj.name;
    
    this.scenarioVariable_ = srcObj;
    
    this.name_simulation = srcObj.modName;
    this.name_scenario = srcObj.abbr;
    this.scope = srcObj.scope;
    
    this.makeUnitFromString(srcObj.unit);
    
    var child = srcObj.getChildren()[0];

    this.min.setInternalValue(child.min);
    this.max.setInternalValue(child.max);
    this.dflt.setInternalValue(child.dflt);
    
    this.setInternalValue(child.dflt);
    
    return;
  
};


lgb.integrated.model.VariableReal.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {


    this.unit.changeDisplayUnitSystem(displayUnitSystem);
    
    this.dflt.changeDisplayUnitSystem(displayUnitSystem);
    this.min.changeDisplayUnitSystem(displayUnitSystem);
    this.max.changeDisplayUnitSystem(displayUnitSystem);
    this.value.changeDisplayUnitSystem(displayUnitSystem);
    
    return;
  
};



lgb.integrated.model.VariableReal.prototype.makeUnitFromString = function(unitString) {
    
    var unitObject = lgb.integrated.model.unit.Factory.makeUnitFromString(unitString);
    this.setUnitObject(unitObject);
    
    
};


lgb.integrated.model.VariableReal.prototype.setUnitObject = function(unitObject) {
    
    this.unit = unitObject;
    
    this.value.setUnitObject(this.unit);
    this.dflt.setUnitObject(this.unit);
    this.min.setUnitObject(this.unit);
    this.max.setUnitObject(this.unit);

};



lgb.integrated.model.VariableReal.prototype.setInternalValue = function(newValue) {
    
    var currentValue = this.value.getInternalValue();

    this.value.setInternalValue(newValue);
    this.valueListInternal.push(newValue);
    this.valueListDisplayString.push(this.value.getDisplayString());
    
    if (this.changeCallbackDelegate_) {
        
        if (currentValue != newValue) {
            this.changeCallbackDelegate_(this.value);
        }
    }
    


};


lgb.integrated.model.VariableReal.prototype.getUnitDisplaySymbol = function() {
  
    if (null == this.unit) {
        return null;
    } else {
        return this.unit.getUnitDisplaySymbol();
    }
    
};


