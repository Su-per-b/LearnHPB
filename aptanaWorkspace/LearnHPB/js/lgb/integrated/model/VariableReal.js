goog.provide('lgb.integrated.model.VariableReal');

goog.require('lgb.integrated.model.VariableBase');
goog.require('lgb.integrated.model.vo.Real');


lgb.integrated.model.VariableReal = function(  ) {
    
    lgb.integrated.model.VariableBase.call(this);
    
    this.value = new lgb.integrated.model.vo.Real();
    this.start = new lgb.integrated.model.vo.Real();
    this.min = new lgb.integrated.model.vo.Real();
    this.max = new lgb.integrated.model.vo.Real();
    
    this.valueListDisplayString = [];
    this.valueListInternal = [];
    
    this.unit_ = null; 
    
};
goog.inherits(lgb.integrated.model.VariableReal, lgb.integrated.model.VariableBase);



lgb.integrated.model.VariableReal.prototype.setScalarVariable = function(scalarVariable) {

    
    this.setScalarVariableBase_(scalarVariable);
    
    this.min.setInternalValue(scalarVariable.typeSpecReal_.min);
    this.max.setInternalValue(scalarVariable.typeSpecReal_.max);
    this.start.setInternalValue(scalarVariable.typeSpecReal_.start);
    
    this.setInternalValue(scalarVariable.typeSpecReal_.start);
    
    
    return;
  
};


lgb.integrated.model.VariableReal.prototype.setScalarValue = function(scalarValue) {

    var currentValue = this.value.getInternalValue();
    var newValue = scalarValue.getValue();
    
    this.setInternalValue(scalarValue.getValue());
    
    return;
  
};


// lgb.integrated.model.VariableReal.prototype.convertStringToValue = function(str) {
// 
    // return  parseFloat(str);
//   
// };


lgb.integrated.model.VariableReal.prototype.calcDisplayValues = function() {

    this.start.calcDisplayValues();
    this.min.calcDisplayValues();
    this.max.calcDisplayValues();
    this.value.calcDisplayValues();
    
    return;
  
};



lgb.integrated.model.VariableReal.prototype.setUnitObject = function(unitObject) {
    
    this.unit_ = unitObject;
    
    this.value.setUnitObject(this.unit_);
    this.start.setUnitObject(this.unit_);
    this.min.setUnitObject(this.unit_);
    this.max.setUnitObject(this.unit_);

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





lgb.integrated.model.VariableReal.prototype.isNewValue = function(newDisplayValueStr) {
    
    var newDisplayValueFloat = parseFloat(newDisplayValueStr);
    var existingDisplayValueFloat = this.value.getDisplayValue();
    
    var isNewValue = (newDisplayValueFloat != existingDisplayValueFloat);
    return isNewValue;
};


lgb.integrated.model.VariableReal.prototype.isNewValue = function(newDisplayValueStr) {
    
    var newDisplayValueFloat = parseFloat(newDisplayValueStr);
    var existingDisplayValueFloat = this.value.getDisplayValue();
    
    var isNewValue = (newDisplayValueFloat != existingDisplayValueFloat);
    return isNewValue;
};



