goog.provide('lgb.integrated.model.vo.Boolean');

goog.require('lgb.core.BaseModel');


lgb.integrated.model.vo.Boolean = function() {
    
    this.internalValue_ = null;
    this.displayValue_ = null;
    this.displayString_ = "{not set}";
    this.unitObject_ = null;
    
    lgb.core.BaseModel.call(this);
};
goog.inherits(lgb.integrated.model.vo.Boolean, lgb.core.BaseModel);



lgb.integrated.model.vo.Boolean.prototype.setInternalValue = function(internal) {

    this.internalValue_ = internal;
    this.calcDisplayValues_();
};


lgb.integrated.model.vo.Boolean.prototype.setUnitObject = function(unitObject) {

    this.unitObject_ = unitObject;
};

lgb.integrated.model.vo.Boolean.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {

    this.calcDisplayValues_();
};




lgb.integrated.model.vo.Boolean.prototype.calcDisplayValues_ = function() {
    
    var displayValue;
    
    if(undefined == this.internalValue_) {
        debugger;
    }
    
    if(null == this.unitObject_) {
        displayValue = this.internalValue_;
    } else {
        displayValue = this.unitObject_.convertInternalToDisplayValue(this.internalValue_);
    }
    
    this.displayValue_ = displayValue;
    this.displayString_ = this.displayValue_.toString();

    return;
};



lgb.integrated.model.vo.Boolean.prototype.getDisplayString = function() {
    return this.displayString_;
};


lgb.integrated.model.vo.Boolean.prototype.getDisplayValue = function() {
    return this.displayValue_;
};


lgb.integrated.model.vo.Boolean.prototype.getInternalValue = function() {
    return this.internalValue_;
};


