goog.provide('lgb.simulation.model.voManaged.SerializableVector');

goog.require('lgb.simulation.model.BaseModel');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.SerializableVector = function(itemTypeString, itemArray) {

  this.itemTypeString_ = itemTypeString;
  
  
  if (undefined == itemArray) {
    this.itemTypeString_ = null;
  } else {
    this.itemTypeString_ = itemTypeString;
  }
  
  if (undefined == itemArray || null == itemArray) {
    this.itemArray_ = [];
  } else {
    this.itemArray_ = itemArray;
  }
  


};
goog.inherits(lgb.simulation.model.voManaged.SerializableVector, lgb.simulation.model.BaseModel);




lgb.simulation.model.voManaged.SerializableVector.prototype.get = function(idx) {

  return this.itemArray_[idx];

};



lgb.simulation.model.voManaged.SerializableVector.prototype.add = function(item) {

  
  this.itemArray_.push(item);
  
  var itemTypeString = item.getClassName();
  
  
  if (null == this.itemTypeString_) {
    this.itemTypeString_ = itemTypeString;
  } else {
  
    var result = this.itemTypeString_.localeCompare(itemTypeString);
    
    if (result != 0) {
      debugger;
    }

  }


};



lgb.simulation.model.voManaged.SerializableVector.prototype.getItemTypeString = function() {
  return this.itemTypeString_;
};



lgb.simulation.model.voManaged.SerializableVector.prototype.toArray = function() {
  return this.itemArray_ ;
};

lgb.simulation.model.voManaged.SerializableVector.prototype.toJSON = function() {
    
    var ary = [];
    var len = this.itemArray_.length;
    
    var itemArray = [];
    
    
    for (var i=0; i < len; i++) {
     this.itemArray_[i].serializeType = false;
     
     var obj = this.itemArray_[i].toJSON();
     itemArray.push(obj);
     
    };
    
    var jsonObj = {
      t:this.getClassName(),
      itemType:this.itemTypeString_,
      itemArray:itemArray
    };
    
    
    return jsonObj;
};



lgb.simulation.model.voManaged.SerializableVector.prototype.makeTyped = function(deserializedObj) {
  
    this.itemTypeString_ = deserializedObj.itemType;
    
    //this.fromJSONHelper_(deserializedObj);
    
    this.itemArray_  = [];
    
    
    if (undefined == deserializedObj.itemArray) {
      debugger;
    }
    
    var len = deserializedObj.itemArray.length;
    
    for (var i=0; i < len; i++) {
      
      var deserializedItem =  deserializedObj.itemArray[i];
      deserializedItem.t = this.itemTypeString_;
      
      var typedItem =  lgb.simulation.controller.JsonController().makeTyped(deserializedItem);
      this.itemArray_ .push(typedItem);
    };

  
};



// lgb.simulation.model.voManaged.SerializableVector.fieldPrimitivesEx_ = {
   // itemTypeString_: "itemType" 
// };


// lgb.simulation.model.voManaged.SerializableVector.prototype.fromJSON = function(deserializedObj) {
//     
// 
    // this.fromJSONHelper_(deserializedObj);
//     
    // this.itemArray_  = [];
//     
//     
    // if (undefined == deserializedObj.itemArray) {
      // debugger;
    // }
//     
    // var len = deserializedObj.itemArray.length;
//     
    // for (var i=0; i < len; i++) {
//       
      // var deserializedItem =  deserializedObj.itemArray[i];
      // deserializedItem.t = this.itemTypeString_;
//       
      // var typedItem =  lgb.simulation.controller.JsonController().makeTyped(deserializedItem);
      // this.itemArray_ .push(typedItem);
    // };
// 
// 
// };





