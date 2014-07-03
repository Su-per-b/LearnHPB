goog.provide('lgb.simulation.model.voManaged.ScalarVariableReal');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voNative.Enu');
goog.require('lgb.simulation.model.voNative.TypeSpecReal');



 /**
 * @constructor
 */
lgb.simulation.model.voManaged.ScalarVariableReal = function(typeSpecReal) {
  
  this.name_ = "";
  this.idx_ = 0;
  this.causality_ = 0;
  this.variability_ = 0;
  this.description_ = "";
  this.unit_ = 0;
  this.valueReference_ = 0;
  this.typeSpecReal_ = typeSpecReal;
  this.serializeType = true;
  
};
goog.inherits(lgb.simulation.model.voManaged.ScalarVariableReal, lgb.simulation.model.BaseModel);




lgb.simulation.model.voManaged.ScalarVariableReal.prototype.setName = function(name) {
  this.name_ = name;
};

lgb.simulation.model.voManaged.ScalarVariableReal.prototype.setIdx = function(idx) {
  this.idx_ = idx;
};

lgb.simulation.model.voManaged.ScalarVariableReal.prototype.setCausality = function(causality) {
  this.causality_ = causality;
};

lgb.simulation.model.voManaged.ScalarVariableReal.prototype.setVariability = function(variability) {
  this.variability_ = variability;
};

lgb.simulation.model.voManaged.ScalarVariableReal.prototype.setDescription = function(description) {
  this.description_ = description;
};


lgb.simulation.model.voManaged.ScalarVariableReal.prototype.setValueReference = function(valueReference) {
  this.valueReference_ = valueReference;
};

lgb.simulation.model.voManaged.ScalarVariableReal.prototype.setTypeSpecReal = function(typeSpecReal) {
  this.typeSpecReal_ = typeSpecReal;
};


lgb.simulation.model.voManaged.ScalarVariableReal.prototype.getName = function() {
  return this.name_;
};

lgb.simulation.model.voManaged.ScalarVariableReal.prototype.getIdx = function() {
  return this.idx_;
};


lgb.simulation.model.voManaged.ScalarVariableReal.prototype.getCausalityAsInt = function() {
  return this.causality_;
};

lgb.simulation.model.voManaged.ScalarVariableReal.prototype.getCausalityAsEnum = function() {
  var theEnum = new lgb.simulation.model.voNative.Enu(this.causality_);
  return theEnum;
};


lgb.simulation.model.voManaged.ScalarVariableReal.prototype.getVariabilityAsInt = function() {
  return this.variability_;
};


lgb.simulation.model.voManaged.ScalarVariableReal.prototype.getVariabilityAsEnum = function() {
  var theEnum = new lgb.simulation.model.voNative.Enu(this.variability_);
  return theEnum;
};


lgb.simulation.model.voManaged.ScalarVariableReal.prototype.getDescription = function() {
  return this.description_;
};
                                                            
lgb.simulation.model.voManaged.ScalarVariableReal.prototype.getValueReference = function() {
  return this.valueReference_;
};

lgb.simulation.model.voManaged.ScalarVariableReal.prototype.getTypeSpecReal = function() {
  return this.typeSpecReal_;
};





lgb.simulation.model.voManaged.ScalarVariableReal.fieldPrimativesEx_ = {
   name_: "n" ,
   idx_: "i" ,
   causality_: "c" ,
   variability_: "vb" ,
   description_: "d" ,
   valueReference_: "vr" 
};


lgb.simulation.model.voManaged.ScalarVariableReal.fieldObjectsEx_ = {
  
   typeSpecReal_: {
     jsonFieldName : "typeSpecReal",
     classReference : lgb.simulation.model.voNative.TypeSpecReal
   }  
       
};







