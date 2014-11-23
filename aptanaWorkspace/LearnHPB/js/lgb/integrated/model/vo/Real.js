goog.provide('lgb.integrated.model.vo.Real');



lgb.integrated.model.vo.Real = function() {
    
    this.internalValue_ = null;
    this.displayValue_ = null;
    this.displayString_ = "{not set}";
    this.unitObject_ = null;
    
};
goog.inherits(lgb.integrated.model.vo.Real, lgb.integrated.model.Variable);



lgb.integrated.model.vo.Real.prototype.setInternalValue = function(internal) {

    this.internalValue_ = internal;
    this.calcDisplayValues_();
};

lgb.integrated.model.vo.Real.prototype.getInternalValue = function() {

    return this.internalValue_;

};


lgb.integrated.model.vo.Real.prototype.setUnitObject = function(unitObject) {

    this.unitObject_ = unitObject;
};

lgb.integrated.model.vo.Real.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {

    this.calcDisplayValues_();
};




lgb.integrated.model.vo.Real.prototype.calcDisplayValues_ = function() {
    
    
    var displayValue;
    
    if(undefined == this.internalValue_) {
        debugger;
    }
    
    if(null == this.unitObject_) {
        displayValue = this.internalValue_;
    } else {
        
        displayValue = this.unitObject_.convertInternalToDisplayValue(this.internalValue_);
        
    }
    

    var str = displayValue.toPrecision(4);
    this.displayValue_ = parseFloat(str);
    
    
    this.displayString_ = str;

    
   //this.displayValue_ = parseFloat(this.displayValue);
    return;
};


lgb.integrated.model.vo.Real.prototype.getDisplayString = function() {
    
    return this.displayString_;
    
};


lgb.integrated.model.vo.Real.prototype.getDisplayValue = function() {
    
    return this.displayValue_;
    
};

lgb.integrated.model.vo.Real.prototype.getInternalValue = function() {
    
    return this.internalValue_;
    
};


