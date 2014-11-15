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


lgb.integrated.model.vo.Real.prototype.setUnitObject = function(unitObject) {

    this.unitObject_ = unitObject;
};

lgb.integrated.model.vo.Real.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {

    this.calcDisplayValues_();
};




lgb.integrated.model.vo.Real.prototype.calcDisplayValues_ = function() {
    
    if(undefined == this.internalValue_) {
        debugger;
    }
    
    if(null == this.unitObject_) {
        this.displayValue_ = this.internalValue_;
    } else {
        
        this.displayValue_ = this.unitObject_.convertInternalToDisplayValue(this.internalValue_);
        
    }
    

    
    this.displayString_ = this.displayValue_.toFixed(2);
    this.displayValue_ = this.displayValue_.toPrecision(4);

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


