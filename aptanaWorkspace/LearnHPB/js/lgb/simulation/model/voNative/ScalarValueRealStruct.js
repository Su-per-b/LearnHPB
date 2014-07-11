goog.provide('lgb.simulation.model.voNative.ScalarValueRealStruct');


goog.require('lgb.simulation.model.BaseModel');


 /**
 * @constructor
 */
lgb.simulation.model.voNative.ScalarValueRealStruct = function(idx, value) {

  this.idx = idx;
  this.value = value;
  lgb.simulation.model.BaseModel.call(this);
};

goog.inherits(lgb.simulation.model.voNative.ScalarValueRealStruct, lgb.simulation.model.BaseModel);




lgb.simulation.model.voNative.ScalarValueRealStruct.fieldPrimitivesEx_ = {
   idx: "idx",
   value : "value"
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

  
  if (undefined != classReference.fieldPrimitivesEx_) {
    
    var fieldPrimitivesEx = classReference.fieldPrimitivesEx_;

    for(var jsFieldName in fieldPrimitivesEx) {
      var jsonFieldName = fieldPrimitivesEx[jsFieldName];
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
          
            if (fieldValue.itemArray_ instanceof Array) {
    
              var sv = new lgb.simulation.model.voManaged.SerializableVector(fieldObject.itemTypeString, fieldValue.itemArray_);
              jsonObject[jsonFieldName] = sv;
              
            } else {
              
              debugger;
            }
        

        }

        
      } else {
        jsonObject[jsonFieldName] = fieldValue;
      }

      }

    }
  }
  

  return jsonObject;
};

