goog.provide('lgb.simulation.model.voManaged.ScalarValueResults');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.ScalarValueResults = function() {


    
    
};
goog.inherits(lgb.simulation.model.voManaged.ScalarValueResults, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.ScalarValueResults.prototype.getTime = function() {
    return this.time_;
};


lgb.simulation.model.voManaged.ScalarValueResults.prototype.getInput = function() {
    return this.input;
};


lgb.simulation.model.voManaged.ScalarValueResults.prototype.getOutput = function() {
    return this.output;
};


lgb.simulation.model.voManaged.ScalarValueResults.prototype.getAllReal = function() {
    
    var all = this.output.realList_.concat(this.input.realList_.slice(0));
    
    return all;
};


lgb.simulation.model.voManaged.ScalarValueResults.fieldObjectsEx_ = {
  
   input: {
     jsonFieldName : "input",
     classReference : lgb.simulation.model.voManaged.ScalarValueCollection
   },
   output: {
     jsonFieldName : "output",
     classReference : lgb.simulation.model.voManaged.ScalarValueCollection
   }
       
};


lgb.simulation.model.voManaged.ScalarValueResults.fieldPrimitivesEx_ = {
   time_: "time_" 
};
