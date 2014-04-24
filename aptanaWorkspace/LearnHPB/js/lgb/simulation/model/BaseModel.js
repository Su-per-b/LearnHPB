/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.simulation.model.BaseModel');

goog.require('lgb.core.BaseClass');




lgb.simulation.model.BaseModel  = function() {


};




lgb.simulation.model.BaseModel.prototype.getClassName = function() {
  
  var fullClassName = this.getFullClassName();
  var ary = fullClassName.split('.');
  
  var len = ary.length;
  var className = ary[len-1];
  
  return className;
};


lgb.simulation.model.BaseModel.prototype.getClassReference = function() {
  
  var fullClassName = this.getFullClassName();
  var classReference = eval(fullClassName);
  
  return classReference;
};




lgb.simulation.model.BaseModel.prototype.toJSON = function() { 
    return this.toJSONHelper_();
};


lgb.simulation.model.BaseModel.prototype.toJSONHelper_ = function() { 
  

  var serializeType = this.serializeType;

  if ( undefined == serializeType) {
    serializeType = true;
  }

  var jsonObject = {};
  
  if (serializeType) {
     jsonObject.t = this.getClassName();
  }

  
  var classReference = this.getClassReference();

  
  if (undefined != classReference.fieldPrimativesEx_) {
    
    var fieldPrimativesEx = classReference.fieldPrimativesEx_;

    for(var jsFieldName in fieldPrimativesEx) {
      var jsonFieldName = fieldPrimativesEx[jsFieldName];
      jsonObject[jsonFieldName] = this[jsFieldName];
    }
  }
  
  if (undefined != classReference.fieldObjectsEx_) {
    
    var fieldObjectsEx = classReference.fieldObjectsEx_;

    for(var jsFieldName in fieldObjectsEx) {
      
      var fieldObject = fieldObjectsEx[jsFieldName];
       
      var jsonFieldName = fieldObject.jsonFieldName;
      var fieldClassReference = fieldObject.classReference;
      

      
      if (this[jsFieldName] != null) {
        
      var fieldValue = this[jsFieldName];
      
      if (fieldClassReference == lgb.simulation.model.voManaged.SerializableVector) {
        
        if (fieldValue instanceof Array) {

          var sv = new lgb.simulation.model.voManaged.SerializableVector(fieldObject.itemTypeString, fieldValue);
          jsonObject[jsonFieldName] = sv;
          
        } else {
          debugger;
        }

        
      } else {
        jsonObject[jsonFieldName] = fieldValue;
      }

      }

    }
  }
  

  return jsonObject;
};


lgb.simulation.model.BaseModel.prototype.fromJSON = function(deserializedObj) {
  
  this.fromJSONHelper_(deserializedObj);
  
};



lgb.simulation.model.BaseModel.prototype.fromJSONHelper_ = function(deserializedObj) {
    
  //if (undefined == classReference) {
    var classReference = this.getClassReference();
  //}

   
  if (undefined != classReference.fieldPrimativesEx_) {
    
    var fieldPrimativesEx = classReference.fieldPrimativesEx_;

    for(var jsFieldName in fieldPrimativesEx) {
      
      var jsonFieldName = fieldPrimativesEx[jsFieldName];
      this[jsFieldName] = deserializedObj[jsonFieldName];
      
    }
  }
  
  if (undefined != classReference.fieldObjectsEx_) {
    
    var fieldObjectsEx = classReference.fieldObjectsEx_;

    for(var jsFieldName in fieldObjectsEx) {
      
      var fieldObject = fieldObjectsEx[jsFieldName];   
      var jsonFieldName = fieldObject.jsonFieldName;
      var fieldClassReference = fieldObject.classReference;
      
      
      if (null == fieldClassReference) {
        debugger;
      }
      
      var childDeserializedObj = deserializedObj[jsonFieldName];
      
      

      
      if (null != childDeserializedObj) { 
        
        var childTypedObject = new fieldClassReference();
        childTypedObject.fromJSON(childDeserializedObj);
        
        if (fieldClassReference == lgb.simulation.model.voManaged.SerializableVector) {
        
          this[jsFieldName] = childTypedObject.toArray();
          
        } else {

          this[jsFieldName] = childTypedObject;
          
        }
      
      }

    }
    
  }
  

};

