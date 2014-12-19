goog.provide('lgb.integrated.model.VariableBase');


goog.require('lgb.integrated.model.NodeBaseContainer');


lgb.integrated.model.VariableBase = function(  ) {
    
    lgb.integrated.model.NodeBaseContainer.call(this);
};
goog.inherits(lgb.integrated.model.VariableBase, lgb.integrated.model.NodeBaseContainer);


lgb.integrated.model.VariableBase.prototype.setUnitObject = function() { lgb.mustOverride(); };
lgb.integrated.model.VariableBase.prototype.changeDisplayUnitSystem = function() { lgb.mustOverride(); };
lgb.integrated.model.VariableBase.prototype.setScalarValue = function() { lgb.mustOverride(); };


lgb.integrated.model.VariableBase.prototype.setChangeCallback = function(changeCallbackDelegate) {
    this.changeCallbackDelegate_ = changeCallbackDelegate;
};


lgb.integrated.model.VariableBase.prototype.setScalarVariableBase_ = function(scalarVariable) {

    this.idx_ = scalarVariable.getIdx();
    this.scalarVariableName = scalarVariable.getName();

};


lgb.integrated.model.VariableBase.prototype.getIdx = function() {

    return this.idx_;
};


lgb.integrated.model.VariableBase.prototype.getUnitDisplaySymbol = function() {
  
    if (null == this.unit_) {
        return null;
    } else {
        return this.unit_.getUnitDisplaySymbol();
    }
    
};



lgb.integrated.model.VariableBase.prototype.setInternalValue = function(newValue) {
    
    var currentValue = this.typeSpec.value.getInternalValue();

    this.typeSpec.value.setInternalValue(newValue);
    this.valueListInternal.push(newValue);
    this.valueListDisplayString.push(this.value.getDisplayString());
    
    if (this.changeCallbackDelegate_) {
        
        if (currentValue != newValue) {
            this.changeCallbackDelegate_(this.typeSpec.value);
        }
    }
};



lgb.integrated.model.VariableBase.prototype.getUnit = function() {
   
   return this.unit_;
    
};

lgb.integrated.model.VariableBase.prototype.convertDisplayToInternalValue = function(displayValue) {
    
   return this.unit_.convertDisplayToInternalValue(displayValue);
    
};