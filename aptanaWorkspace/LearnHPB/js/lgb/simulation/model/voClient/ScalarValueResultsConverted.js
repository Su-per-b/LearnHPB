goog.provide('lgb.simulation.model.voClient.ScalarValueResultsConverted');

goog.require('lgb.simulation.model.BaseModel');



 /**
 * @constructor
 */
lgb.simulation.model.voClient.ScalarValueResultsConverted = function(scalarValueResults, xmlParsedInfo) {

    var year2000Date = new Date(2000,0,1,0,0,0,0);
    this.year2000ms_ = year2000Date.getTime();
    
    var msAfterYear2000 = scalarValueResults.time_ * 1000;
    var dateMs = msAfterYear2000 + this.year2000ms_;
    
    this.dateObject_ = new Date(dateMs);
    
    var outAry = this.convertRealValueList(
      scalarValueResults.output.realList_, 
      xmlParsedInfo.scalarVariablesAll_.output_.realVarList_);
      
      
    var inAry = this.convertRealValueList(
      scalarValueResults.input.realList_, 
      xmlParsedInfo.scalarVariablesAll_.input_.realVarList_);
    
    this.input = {realList:inAry};
    this.output = {realList:outAry};
     
    //this.displayUnitSystem_ = lgb.simulation.model.DisplayUnitSystem.
     
    return;
};
goog.inherits(lgb.simulation.model.voClient.ScalarValueResultsConverted, lgb.simulation.model.BaseModel);





lgb.simulation.model.voClient.ScalarValueResultsConverted.prototype.getTimeAndDateString = function() {
    var dateStr = this.dateObject_.toDateString();
    var timeStr = this.dateObject_.toTimeString()();
    
    return dateStr + " " + timeStr;

};



lgb.simulation.model.voClient.ScalarValueResultsConverted.prototype.convertRealValueList = function(valueList, variableList) {
  
    var len = valueList.length;
    var newValueList = [];
    
    for (var i=0; i < len; i++) {
      
      var valueVo = valueList[i];
      var variableVo = variableList[i];

      var v = this.convertRealValue(valueVo, variableVo.typeSpecReal_.unit);
      
      newValueList.push( { value_ :  v} );
    };

    return newValueList;
};




lgb.simulation.model.voClient.ScalarValueResultsConverted.prototype.convertRealValue = function(realVo, unit) {
        
      
      
      var v = 0.0;
      
      switch(unit) {
        case "K" :
          //v = (realVo.value_-273.15);
          v = realVo.value_;
          break;
        case "C" :
          v = (realVo.value_-273.15);
          break;
        case "F" :
          v = (realVo.value_-273.15);
          v = v * 1.80 + 32.00;
          break;
        default :
          v = realVo.value_;
          break;
      }
      
  
      v = v.toFixed(2);
      return v;

};

