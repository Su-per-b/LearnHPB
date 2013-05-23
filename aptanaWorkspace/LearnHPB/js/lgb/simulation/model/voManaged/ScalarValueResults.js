goog.provide('lgb.simulation.model.voManaged.ScalarValueResults');



lgb.simulation.model.voManaged.ScalarValueResults = function() {


};


lgb.simulation.model.voManaged.ScalarValueResults.fromJson = function(deserializedObj) {

    
    var typedObj = new lgb.simulation.model.voManaged.ScalarValueResults();
    
    typedObj.time_ = deserializedObj.time_;
    typedObj.input = deserializedObj.input;
    typedObj.output = deserializedObj.output;


    return typedObj;

};




