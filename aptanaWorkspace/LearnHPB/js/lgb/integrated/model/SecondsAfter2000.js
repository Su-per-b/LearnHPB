goog.provide('lgb.integrated.model.SecondsAfter2000');

goog.require('lgb.integrated.model.VariableBase');
goog.require('lgb.integrated.model.vo.Integer');


lgb.integrated.model.SecondsAfter2000 = function(  ) {
    
    lgb.integrated.model.VariableBase.call(this);
    
    this.value = new lgb.integrated.model.vo.Integer();
    this.start = new lgb.integrated.model.vo.Integer();
    this.min = new lgb.integrated.model.vo.Integer();
    this.max = new lgb.integrated.model.vo.Integer();
    
    this.valueListDisplayString = [];
    this.valueListInternal = [];
    
    this.unit_ = null; 
    
};
goog.inherits(lgb.integrated.model.SecondsAfter2000, lgb.integrated.model.VariableBase);



lgb.integrated.model.SecondsAfter2000.prototype.setScalarVariable = function(scalarVariable) {

    
   debugger;
  
};


lgb.integrated.model.SecondsAfter2000.prototype.setScalarValue = function(scalarValue) {


   debugger;
  
};



lgb.integrated.model.SecondsAfter2000.prototype.calcDisplayValues = function() {

    this.start.calcDisplayValues();
    this.min.calcDisplayValues();
    this.max.calcDisplayValues();
    this.value.calcDisplayValues();
    
    return;
  
};



lgb.integrated.model.SecondsAfter2000.prototype.setUnitObject = function(unitObject) {
    
    this.unit_ = unitObject;
    
    this.value.setUnitObject(this.unit_);
    this.start.setUnitObject(this.unit_);
    this.min.setUnitObject(this.unit_);
    this.max.setUnitObject(this.unit_);

};



lgb.integrated.model.SecondsAfter2000.prototype.setInternalValue = function(newValue) {
    
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



lgb.integrated.model.SecondsAfter2000.prototype.calcDateObject = function() {

    //this.secondsAfter2000 = srcObj.secondsAfter2000;
    
    //secondsAfter2000this.secondsAfter2000 = this.value.getInternalValue();
    
    var value = this.value.getInternalValue();
    
    var ms = this.CONST_MillisecondsBetween1970And2000_();
    var ms = ms + (value * 1000);
     
    this.dateObject_  = new Date(ms);

    return;
};


lgb.integrated.model.SecondsAfter2000.prototype.setHoursAndMinutes = function(hours, minutes) {
  
  this.dateObject_.setHours(hours);
  this.dateObject_.setMinutes(minutes);
  
  this.calcSecondsAfter2000();
  
  this.dispatchChangedEx('dateObject',this.dateObject_);
      
  return;
};


lgb.integrated.model.SecondsAfter2000.prototype.setYearMonthDate = function(year, month, date) {
  
  this.dateObject_.setFullYear(year);
  this.dateObject_.setMonth(month);
  this.dateObject_.setDate(date);

  this.calcSecondsAfter2000();
  
  this.dispatchChangedEx('dateObject',this.dateObject_);
  
  return;
};


lgb.integrated.model.SecondsAfter2000.prototype.calcSecondsAfter2000 = function() {

    var msBetween1970AndCurrentTime = this.dateObject_.getTime();
    var sBetween1970AndCurrentTime = msBetween1970AndCurrentTime / 1000;
    
    var value = sBetween1970AndCurrentTime - this.CONST_secondsBetween1970And2000_();
    
    this.setInternalValue(value);
    
};



lgb.integrated.model.SecondsAfter2000.prototype.getDateStr = function() {

    
    if (null == this.dateObject_) {
        return null;
    } else {

        var fullYear = this.dateObject_.getFullYear();
        var dayOfMonth = this.dateObject_.getDate();
        var monthNumber = this.dateObject_.getMonth() + 1;
        
        var dateStr = "{0}/{1}/{2}".format(monthNumber, dayOfMonth, fullYear);
        
        return dateStr;
    }
};


lgb.integrated.model.SecondsAfter2000.prototype.getTimeStr = function() {


    if (null == this.dateObject_) {
        return null;
    } else {

        var hours = this.dateObject_.getHours();
        var minutes = this.dateObject_.getMinutes();
        var seconds = this.dateObject_.getSeconds();
        
        var amPM; // = "AM";
        
        if (hours > 12) {
            hours = hours -12;
            amPM = "PM";
        } else {
            amPM = "AM";
        }
        
        
        //if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
    
    
        var timeStr = "{0}:{1} {2}".format(hours, minutes, amPM);
        
        return timeStr;
    }
};


lgb.integrated.model.SecondsAfter2000.prototype.getInternalValue = function() {

    return this.value.internalValue_;

};

lgb.integrated.model.SecondsAfter2000.prototype.CONST_MillisecondsBetween1970And2000_ = function() {
    var date = this.CONST_year2000Date_();
    return date.getTime();
};


lgb.integrated.model.SecondsAfter2000.prototype.CONST_year2000Date_ = function() {
    return new Date(2000,0,1,0,0,0,0);
};


lgb.integrated.model.SecondsAfter2000.prototype.CONST_secondsBetween1970And2000_ = function() {
    var ms = this.CONST_MillisecondsBetween1970And2000_();
    return ms / 1000;
};


//lgb.integrated.model.SecondsAfter2000.year2000Date = new Date(2000,0,1,0,0,0,0);

//lgb.integrated.model.SecondsAfter2000.millisecondsBetween1970And2000 = lgb.integrated.model.SecondsAfter2000.year2000Date.getTime();

// lgb.integrated.model.SecondsAfter2000.secondsBetween1970And2000 = 
    // lgb.integrated.model.SecondsAfter2000.millisecondsBetween1970And2000 / 1000;