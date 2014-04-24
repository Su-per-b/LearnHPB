goog.provide('lgb.simulation.model.voManaged.SerializableVector');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.controller.JsonController');


lgb.simulation.model.voManaged.SerializableVector = function(itemTypeString, itemArray) {

  this.itemTypeString_ = itemTypeString;
  this.itemArray_ = itemArray;

};
goog.inherits(lgb.simulation.model.voManaged.SerializableVector, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.SerializableVector.prototype.toArray = function() {
  return this.itemArray_ ;
};

lgb.simulation.model.voManaged.SerializableVector.prototype.toJSON = function() {
    
    var ary = [];
    var len = this.itemArray_.length;
    for (var i=0; i < len; i++) {
      
     this.itemArray_[i].serializeType = false;

    };
    
    var jsonObj = {
      t:this.getClassName(),
      itemType:this.itemTypeString_,
      itemArray:this.itemArray_
    };
    
    
    return jsonObj;
};



lgb.simulation.model.voManaged.SerializableVector.prototype.fromJSON = function(deserializedObj) {
    

    this.fromJSONHelper_(deserializedObj);
    
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




lgb.simulation.model.voManaged.SerializableVector.fieldPrimativesEx_ = {
   itemTypeString_: "itemType" ,
};
