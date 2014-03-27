goog.provide('lgb.simulation.model.voNative.ScalarValueRealStruct');


goog.require('lgb.simulation.model.voNative.BaseModel');

lgb.simulation.model.voNative.ScalarValueRealStruct = function(idx, value) {

  this.idx = idx || 0;
  this.value = value || 0.0;

};

goog.inherits(lgb.simulation.model.voNative.ScalarValueRealStruct, lgb.simulation.model.voNative.BaseModel);



lgb.simulation.model.voNative.ScalarValueRealStruct.prototype.toJson = function() {
    
    var jsonObj = {
      type:this.getRemoteTypeString(),
      idx:this.idx,
      value:this.value,
    };
    
    var jsonString = lgb.simulation.controller.JsonController.stringify.stringify(jsonObj);
    return jsonString;
};
