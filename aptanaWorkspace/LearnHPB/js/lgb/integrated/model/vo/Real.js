goog.provide('lgb.integrated.model.vo.Real');


goog.require('lgb.core.BaseModel');




lgb.integrated.model.vo.Real = function() {
    
    this.internalValue_ = null;
    this.displayValue_ = null;
    this.displayString_ = "";
    
    lgb.core.BaseModel.call(this);
};
goog.inherits(lgb.integrated.model.vo.Real, lgb.core.BaseModel);




lgb.integrated.model.vo.Real.prototype.setInternalValue = function(internal) {

    this.internalValue_ = internal;
    this.calcDisplayValues();
};

lgb.integrated.model.vo.Real.prototype.getInternalValue = function() {

    return this.internalValue_;

};



lgb.integrated.model.vo.Real.prototype.setUnitObject = function(unit) {

    this.unit_ = unit;
    this.calcDisplayValues();
};


lgb.integrated.model.vo.Real.prototype.calcDisplayValues = function() {
    
    
    var displayValue;
    
    if(undefined == this.internalValue_) {
        debugger;
    }
    
    if(null == this.unit_) {
        displayValue = this.internalValue_;
    } else {
        
        displayValue = this.unit_.convertInternalToDisplayValue(this.internalValue_);
    }
    

    var str = displayValue.toPrecision(4);
    this.displayValue_ = parseFloat(str);
    
    
    this.displayString_ = str;

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


