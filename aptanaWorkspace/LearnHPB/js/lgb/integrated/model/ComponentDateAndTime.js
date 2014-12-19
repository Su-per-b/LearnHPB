goog.provide('lgb.integrated.model.ComponentDateAndTime');


goog.require('lgb.integrated.model.NodeBaseLeaf');


lgb.integrated.model.ComponentDateAndTime = function(  ) {
    
    lgb.integrated.model.NodeBaseLeaf.call(this);
     
};
goog.inherits(lgb.integrated.model.ComponentDateAndTime, lgb.integrated.model.NodeBaseLeaf);






lgb.integrated.model.ComponentDateAndTime.prototype.parseSrcObj = function(srcObj) {

    this.secondsAfter2000 = srcObj.secondsAfter2000;
    
    var ms = lgb.integrated.model.ComponentDateAndTime.millisecondsBetween1970And2000
     + (this.secondsAfter2000 * 1000);
     
    this.dateObject_  = new Date(ms);

    return;
};


    
lgb.integrated.model.ComponentDateAndTime.prototype.setHoursAndMinutes = function(hours, minutes) {
  
  this.dateObject_.setHours(hours);
  this.dateObject_.setMinutes(minutes);
  
  this.calcSecondsAfter2000();
  
  this.dispatchChangedEx('dateObject',this.dateObject_);
      
  return;
};


lgb.integrated.model.ComponentDateAndTime.prototype.setYearMonthDate = function(year, month, date) {
  
  this.dateObject_.setFullYear(year);
  this.dateObject_.setMonth(month);
  this.dateObject_.setDate(date);

  this.calcSecondsAfter2000();
  
  this.dispatchChangedEx('dateObject',this.dateObject_);
  
  return;
};


lgb.integrated.model.ComponentDateAndTime.prototype.calcSecondsAfter2000 = function() {

    var msBetween1970AndCurrentTime = this.dateObject_.getTime();
    var secondsSince1970 = msBetween1970AndCurrentTime / 1000;
    
    this.secondsAfter2000 = secondsSince1970 - lgb.integrated.model.ComponentDateAndTime.secondsBetween1970And2000;
    
};


lgb.integrated.model.ComponentDateAndTime.prototype.getSecondsAfter2000 = function() {
    
    return this.secondsAfter2000;
    
};




lgb.integrated.model.ComponentDateAndTime.prototype.getDateStr = function() {

    
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


lgb.integrated.model.ComponentDateAndTime.prototype.getTimeStr = function() {


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

lgb.integrated.model.ComponentDateAndTime.year2000Date = new Date(2000,0,1,0,0,0,0);

lgb.integrated.model.ComponentDateAndTime.millisecondsBetween1970And2000 = lgb.integrated.model.ComponentDateAndTime.year2000Date.getTime();

lgb.integrated.model.ComponentDateAndTime.secondsBetween1970And2000 = 
    lgb.integrated.model.ComponentDateAndTime.millisecondsBetween1970And2000 / 1000;

