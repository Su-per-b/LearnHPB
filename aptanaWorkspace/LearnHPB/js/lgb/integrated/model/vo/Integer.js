goog.provide('lgb.integrated.model.vo.Integer');

goog.require('lgb.core.BaseModel');



lgb.integrated.model.vo.Integer = function() {
    
    this.internalValue_ = null;
    this.displayValue_ = null;
    this.displayString_ = "{not set}";
    this.unit_ = null;
    
    lgb.core.BaseModel.call(this);
};
goog.inherits(lgb.integrated.model.vo.Integer, lgb.core.BaseModel);



lgb.integrated.model.vo.Integer.prototype.setInternalValue = function(internal) {

    this.internalValue_ = internal;
    this.calcDisplayValues();
};

lgb.integrated.model.vo.Integer.prototype.getInternalValue = function() {

    return this.internalValue_;

};


lgb.integrated.model.vo.Integer.prototype.setUnitObject = function(unitObject) {

    this.unit_ = unitObject;
    this.calcDisplayValues();
};




lgb.integrated.model.vo.Integer.prototype.calcDisplayValues = function() {
    
    
    var displayValue;
    
    if(undefined == this.internalValue_) {
        debugger;
    }
    
    if(null == this.unit_) {
        displayValue = this.internalValue_;
    } else {
        
        displayValue = this.unit_.convertInternalToDisplayValue(this.internalValue_);
        
    }
    

    //var str = displayValue.toPrecision(4);
    this.displayValue_ = parseInt(displayValue);
    
    
    this.displayString_ = displayValue.toString();

    
   //this.displayValue_ = parseFloat(this.displayValue);
    return;
};



lgb.integrated.model.vo.Integer.prototype.getDisplayString = function() {
    
    return this.displayString_;
    
};

lgb.integrated.model.vo.Integer.prototype.getDisplayValue = function() {
    
    return this.displayValue_;
    
};

lgb.integrated.model.vo.Integer.prototype.getInternalValue = function() {
    
    return this.internalValue_;
    
};


