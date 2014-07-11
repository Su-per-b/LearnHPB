goog.provide('lgb.simulation.model.voManaged.SessionControlModel');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voManaged.SessionControlAction');

 /**
 * @constructor
 */
lgb.simulation.model.voManaged.SessionControlModel = function(action, value) {

  this.setAction (action);
  this.setValue (value);
  
};
goog.inherits(lgb.simulation.model.voManaged.SessionControlModel, lgb.simulation.model.BaseModel);


lgb.simulation.model.voManaged.SessionControlModel.prototype.getAction  = function() {
    return this.action_;
};

lgb.simulation.model.voManaged.SessionControlModel.prototype.getActionAsInt  = function() {
    return this.action_.getIntValue();
};


lgb.simulation.model.voManaged.SessionControlModel.prototype.getActionAsString  = function() {
  
    if (undefined == this.action_) {
      return "{undefined}";
    } else {
      return this.action_.toString();
    }
};


lgb.simulation.model.voManaged.SessionControlModel.prototype.getValue  = function() {
    return this.value_;
};



lgb.simulation.model.voManaged.SessionControlModel.prototype.setAction  = function(action) {
  this.action_ = action;
};

lgb.simulation.model.voManaged.SessionControlModel.prototype.setValue  = function(value) {

  if (undefined == value) {
    this.value_ = "";
  } else {
    this.value_ = value;
  }

};


lgb.simulation.model.voManaged.SessionControlModel.prototype.toString  = function(  ) {
  
  var str = this.getActionAsString() + ":" + this.getValue();
  return str;
};


lgb.simulation.model.voManaged.SessionControlModel.fieldObjectsEx_ = {
  
   action_: {
     jsonFieldName : "action",
     classReference : lgb.simulation.model.voManaged.ScalarVariableCollection
   }
       
};


lgb.simulation.model.voManaged.SessionControlModel.fieldPrimitivesEx_ = {
   value_: "v"
};

