goog.provide('lgb.simulation.model.voClient.MergedResults');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voClient.MergedVariableReal');
goog.require('lgb.simulation.model.voClient.Utils');

 /**
 * @constructor
 */
lgb.simulation.model.voClient.MergedResults = function(  ) {
    
    this.mergedVariableMapByIdx_ = {};
    this.mergedVariableMapByName_simulation_ = {};
    
    this.dateObject_ = null;
    this.mergedVariableList = [];
    this.xmlParsedInfo_ = null;
    this.scalarVariablesAll_ = null;
    
};
goog.inherits(lgb.simulation.model.voClient.MergedResults, lgb.simulation.model.BaseModel);



lgb.simulation.model.voClient.MergedResults.prototype.initXmlParsedInfo = function(xmlParsedInfo) {

    this.xmlParsedInfo_ = xmlParsedInfo;
    this.scalarVariablesAll_ = xmlParsedInfo.scalarVariablesAll_;
    
    // this.output_ = xmlParsedInfo.scalarVariablesAll_.output_;
    // this.outputVars_ = xmlParsedInfo.scalarVariablesAll_.output_.realVarList_;

    //this.mergedVariableListAll_ = [];
    //this.mergedVariableListInput_ = this.makeMergedVariableList_(xmlParsedInfo.scalarVariablesAll_.input_.realVarList_);
    //this.mergedVariableListOutput_ = this.makeMergedVariableList_(xmlParsedInfo.scalarVariablesAll_.output_.realVarList_);

    return;
    
};

lgb.simulation.model.voClient.MergedResults.prototype.initScenarioModel = function(scenarioModel) {
    
    var scenarioVariableList = scenarioModel.getVarList();
    
    var len = scenarioVariableList.length;
    for (var i=0; i < len; i++) {
      
      var scenarioVariable = scenarioVariableList[i];
      var mergedVariable = lgb.simulation.model.voClient.Utils.makeMergedVariable(scenarioVariable);
        
      this.mergedVariableMapByIdx_[i] = mergedVariable;
      this.mergedVariableMapByName_simulation_[mergedVariable.name_simulation] = mergedVariable;
      this.mergedVariableList.push(mergedVariable);
      
      scenarioVariable.setMergedVariable(mergedVariable);
      
    };
    
    return;
};





lgb.simulation.model.voClient.MergedResults.prototype.updateDisplayUnitSystem = function() {

    this.updateDisplayUnitSystemList_(this.mergedVariableListInput_);
    this.updateDisplayUnitSystemList_(this.mergedVariableListOutput_);
    
};


lgb.simulation.model.voClient.MergedResults.prototype.updateDisplayUnitSystemList_ = function(mergedVariableList) {


    var len = mergedVariableList.length;
    
    for (var i=0; i < len; i++) {
      
      var mergedVariable = mergedVariableList[i];
      mergedVariable.updateDisplayUnitSystem();
      
    }
    
};



lgb.simulation.model.voClient.MergedResults.prototype.updateResults = function(scalarValueResults) {

    this.updateTime_(scalarValueResults);
    this.updateMergedVariableList_(scalarValueResults.input.realList_);
    this.updateMergedVariableList_(scalarValueResults.output.realList_);

   
};

lgb.simulation.model.voClient.MergedResults.prototype.updateTime_ = function(scalarValueResults) {
    
    var year2000Date = new Date(2000,0,1,0,0,0,0);
    this.year2000ms_ = year2000Date.getTime();
    
    var msAfterYear2000 = scalarValueResults.time_ * 1000;
    var dateMs = msAfterYear2000 + this.year2000ms_;
    
    this.dateObject_ = new Date(dateMs);
    
};


lgb.simulation.model.voClient.MergedResults.prototype.getTimeAndDateString = function() {
    
    if (null == this.dateObject_) {
        return null;
        
    } else {
        var dateStr = this.dateObject_.toDateString();
        var timeStr = this.dateObject_.toTimeString();
        
        return dateStr + " " + timeStr;
    }

};


lgb.simulation.model.voClient.MergedResults.prototype.getDateAndTimeStringAbbr = function() {
    
    if (null == this.dateObject_) {
        return null;
    } else {
        
        var fullYear = this.dateObject_.getFullYear();
        var dayOfMonth = this.dateObject_.getDate();
        var monthNumber = this.dateObject_.getMonth() + 1;
        
        var hour = this.dateObject_.getHours();
        var minutes = this.dateObject_.getMinutes();
        var seconds = this.dateObject_.getSeconds();
        
        var dateAbbr = this.getDateStr();
        var timeAbbr = this.getTimeStr();
        var dateAndTimeString = dateAbbr + " " + timeAbbr;
        
        return dateAndTimeString;
        
    }
};


lgb.simulation.model.voClient.MergedResults.prototype.getDateStr = function() {
    
    if (null == this.dateObject_) {
        return null;
    } else {

        var fullYear = this.dateObject_.getFullYear();
        var dayOfMonth = this.dateObject_.getDate();
        var monthNumber = this.dateObject_.getMonth() + 1;
        
        var dateStr = "{0}/{1}/{2}".format(monthNumber, dayOfMonth, fullYear);
        
        return dateStr;
    }

};




lgb.simulation.model.voClient.MergedResults.prototype.getTimeStr = function() {
    
    if (null == this.dateObject_) {
        return null;
    } else {

        var hours = this.dateObject_.getHours();
        var minutes = this.dateObject_.getMinutes();
        var seconds = this.dateObject_.getSeconds();
        
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
    
    
        var timeStr = "{0}:{1}:{2}".format(hours, minutes, seconds);
        
        return timeStr;
    }

};






lgb.simulation.model.voClient.MergedResults.prototype.updateMergedVariableList_ = function(realValList) {
  
    var len = realValList.length;
    
    for (var i=0; i < len; i++) {
      
      var sVal = realValList[i];
      var idx = sVal.getIdx();
      
      this.mergedVariableMapByIdx_[idx].update(sVal);
      
    }
    
};


// 
// lgb.simulation.model.voClient.MergedResults.prototype.makeMergedVariableList_ = function(realVarList) {
//     
    // var mergedVariableList = [];
    // var len = realVarList.length;
// 
    // for (var i=0; i < len; i++) {
//       
      // var sVar = realVarList[i];
      // switch (sVar.typeSpecReal_.unit) {
//           
          // case "K" : {
                // var mergedVariable = new lgb.simulation.model.voClient.MergedVariableTemp(sVar);
                // break;
          // }
          // default: {
                // var mergedVariable = new lgb.simulation.model.voClient.MergedVariableReal(sVar);
              // break;
          // }
      // }
//       
      // var idx = sVar.getIdx();
      // this.mergedVariableMapByIdx_[idx] = mergedVariable;
//       
      // mergedVariableList.push(mergedVariable);
//       
//       
    // };
// 
// 
    // return mergedVariableList;
// };




