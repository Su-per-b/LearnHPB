/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.simulation.model.voNative.BaseModel');

lgb.simulation.model.voNative.BaseModel  = function() {



};



lgb.simulation.model.voNative.BaseModel.prototype.getLocalTypeString = function() {
  
  var fullClassName = this.getFullClassName();
  return fullClassName;
  
};

lgb.simulation.model.voNative.BaseModel.prototype.getRemoteTypeString = function() {
  
    var className = this.getClassName();
    var typeStr = "com.sri.straylight.fmuWrapper.voNative." + className;
    
    return typeStr;
};


lgb.simulation.model.voNative.BaseModel.prototype.getClassName = function() {
  
  var fullClassName = this.getFullClassName();
  var ary = fullClassName.split('.');
  
  var len = ary.length;
  var className = ary[len-1];
  
  return className;
};



//must implement in subclass
// lgb.simulation.model.voNative.BaseModel.prototype.getPayloadType = function() { debugger;};