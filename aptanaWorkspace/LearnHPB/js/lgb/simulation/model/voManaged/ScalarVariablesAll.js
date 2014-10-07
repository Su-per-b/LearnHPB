goog.provide('lgb.simulation.model.voManaged.ScalarVariablesAll');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voManaged.ScalarVariableCollection');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.ScalarVariablesAll = function() {

  this.input_ = null;
  this.output_ = null;
  this.internal_ = null;


};
goog.inherits(lgb.simulation.model.voManaged.ScalarVariablesAll, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.ScalarVariablesAll.prototype.setInput = function(input) {
  this.input_ = input;
};

lgb.simulation.model.voManaged.ScalarVariablesAll.prototype.setOutput = function(output) {
  this.output_ = output;
};

lgb.simulation.model.voManaged.ScalarVariablesAll.prototype.setInternal = function(internal) {
  this.internal_ = internal;
};



lgb.simulation.model.voManaged.ScalarVariablesAll.prototype.getInput = function() {
  return this.input_;
};

lgb.simulation.model.voManaged.ScalarVariablesAll.prototype.getOutput = function() {
  return this.output_;
};

lgb.simulation.model.voManaged.ScalarVariablesAll.prototype.getInternal = function() {
  return this.internal_;
};


lgb.simulation.model.voManaged.ScalarVariablesAll.prototype.getAll = function() {
    
  var all = this.input_.realVarList_.concat(this.output_.realVarList_); 

  return all;
};



lgb.simulation.model.voManaged.ScalarVariablesAll.fieldObjectsEx_ = {
  
   input_: {
     jsonFieldName : "input",
     classReference : lgb.simulation.model.voManaged.ScalarVariableCollection
   },
   output_: {
     jsonFieldName : "output",
     classReference : lgb.simulation.model.voManaged.ScalarVariableCollection
   },
   internal_: {
     jsonFieldName : "internal",
     classReference : lgb.simulation.model.voManaged.ScalarVariableCollection
   }
       
};






