goog.provide('lgb.integrated.model.VariableInteger');

goog.require('lgb.integrated.model.VariableBase');
goog.require('lgb.integrated.model.vo.Integer');


lgb.integrated.model.VariableInteger = function(  ) {
    
    lgb.integrated.model.VariableBase.call(this);
    
    this.value = new lgb.integrated.model.vo.Integer();
    this.start = new lgb.integrated.model.vo.Integer();
    this.min = new lgb.integrated.model.vo.Integer();
    this.max = new lgb.integrated.model.vo.Integer();
    
    this.valueListDisplayString = [];
    this.valueListInternal = [];
    
    this.unit_ = null; 
    
};
goog.inherits(lgb.integrated.model.VariableInteger, lgb.integrated.model.VariableBase);



lgb.integrated.model.VariableInteger.prototype.setScalarVariable = function(scalarVariable) {

    
    this.setScalarVariableBase_(scalarVariable);
    
    this.min.setInternalValue(scalarVariable.typeSpecInteger_.min);
    this.max.setInternalValue(scalarVariable.typeSpecInteger_.max);
    this.start.setInternalValue(scalarVariable.typeSpecInteger_.start);
    
    this.setInternalValue(scalarVariable.typeSpecInteger_.start);
    
    
    return;
  
};


lgb.integrated.model.VariableInteger.prototype.setScalarValue = function(scalarValue) {


    var currentValue = this.value.getInternalValue();
    var newValue = scalarValue.getValue();
    
    this.setInternalValue(scalarValue.getValue());
    
    return;
  
};



lgb.integrated.model.VariableInteger.prototype.calcDisplayValues = function() {

    this.start.calcDisplayValues();
    this.min.calcDisplayValues();
    this.max.calcDisplayValues();
    this.value.calcDisplayValues();
    
    return;
  
};



lgb.integrated.model.VariableInteger.prototype.setUnitObject = function(unitObject) {
    
    this.unit_ = unitObject;
    
    this.value.setUnitObject(this.unit_);
    this.start.setUnitObject(this.unit_);
    this.min.setUnitObject(this.unit_);
    this.max.setUnitObject(this.unit_);

};



lgb.integrated.model.VariableInteger.prototype.setInternalValue = function(newValue) {
    


    this.value.setInternalValue(newValue);
    this.valueListInternal.push(newValue);
    this.valueListDisplayString.push(this.value.getDisplayString());
    
    if (this.changeCallbackDelegate_) {
        var currentValue = this.value.getInternalValue();
        
        if (currentValue != newValue) {
            this.changeCallbackDelegate_(this.value);
        }
    }

};

lgb.integrated.model.VariableInteger.prototype.getInternalValue = function() {

    return this.value.internalValue_;

};





lgb.integrated.model.VariableInteger.prototype.isNewValue = function(newDisplayValueStr) {
    
    var newDisplayValueInt = parseInt(newDisplayValueStr);
    var existingDisplayValueInt = this.value.getDisplayValue();
    
    var isNewValue = (newDisplayValueInt != existingDisplayValueInt);
    
    return isNewValue;

};