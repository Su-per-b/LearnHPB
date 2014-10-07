/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.model.MainModel');

goog.require('lgb.core.BaseModel');
goog.require('lgb.core.Config');
goog.require('lgb.simulation.model.WebSocketConnectionState');
goog.require('lgb.simulation.model.DisplayUnitSystem');
goog.require('lgb.simulation.model.voClient.MergedResults');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.simulation.model.MainModel = function() {


  /**@const */
  this._TITLE = 'MainModel';
  lgb.core.BaseModel.call(this);

  this.simStateNative = lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_0_uninitialized;
  this.webSocketConnectionState = lgb.simulation.model.WebSocketConnectionState.uninitialized;
  this.socketServerURL = null;
  this.messageStruct = null;
  this.xmlParsedInfo = null;
  this.scalarValueResults = null;
  this.scalarValueResultsConverted = null;
  this.modNameToVarMap_ = {};
  this.displayUnitSystem = lgb.simulation.model.DisplayUnitSystem.getInstance();
 // this.mergedResults = null; // new lgb.simulation.model.voManaged.MergedResults();
      
};
goog.inherits(lgb.simulation.model.MainModel, lgb.core.BaseModel);


/**
 * Handler used for websocket init
 * @private
 */
lgb.simulation.model.MainModel.prototype.init = function(hostname) {
  
  this.socketServerURL = "ws://" + hostname + ":8081/";
  this.listenTo(this.displayUnitSystem, e.DataModelChangedEx, this.onChange_displayUnitSystemValue_);
  
};


lgb.simulation.model.MainModel.prototype.toggleUnitSystem = function(currentDisplayedUnitSystem) {
  
  this.displayUnit_.toggle(currentDisplayedUnitSystem);
  
};



lgb.simulation.model.MainModel.prototype.updateDisplayUnitSystem = function(displayUnitSystem) {



    
};


lgb.simulation.model.MainModel.prototype.onChange_displayUnitSystemValue_ = function(displayUnitSystemValue) {


   // this.mergedResults.updateDisplayUnitSystem();
    
};


// lgb.simulation.model.MainModel.prototype.setScalarValueResults = function(scalarValueResults) {
// 
	// this.scalarValueResults = scalarValueResults;
    // this.mergedResults.updateResults(scalarValueResults);
    // this.dispatchChangedEx('mergedResults', this.mergedResults);
//     
// };



lgb.simulation.model.MainModel.prototype.setWebSocketConnectionState = function(webSocketConnectionState) {

    this.changePropertyEx('webSocketConnectionState', webSocketConnectionState);

};



lgb.simulation.model.MainModel.prototype.getWebSocketConnectionState = function() {
    return this.webSocketConnectionState;
};





lgb.simulation.model.MainModel.prototype.getSimStateNative = function() {

    return this.simStateNative; 
};



lgb.simulation.model.MainModel.prototype.getIdxFromModelicaName = function(modelicaName) {

    
    return this.modNameToVarMap_[modelicaName]; 
};





lgb.simulation.model.MainModel.prototype.setXmlParseInfo = function(xmlParsedInfo) {

  this.xmlParsedInfo = xmlParsedInfo;
  
 // this.mergedResults = new lgb.simulation.model.voManaged.MergedResults(xmlParsedInfo);
  
  
  // var inputVarList = xmlParseInfo.scalarVariablesAll_.input_.realVarList_;
  // this.each(inputVarList, this.idxOneInput_);
    //   
  // var outputVarList = xmlParseInfo.scalarVariablesAll_.output.realVarList_;
  // this.eachIdx(outputVarList, this.idxOneOutput_);
  

  this.dispatchChangedEx('xmlParsedInfo', xmlParsedInfo);
  //this.dispatchChangedEx('mergedResults', this.mergedResults);
    
};


// 
// lgb.simulation.model.MainModel.prototype.idxOneInput_ = function(theVar) {
// 
  // var theName = theVar.name_;
//   
  // if (undefined == theName) {
    // debugger;
  // }
//   
  // this.modNameToVarMap_[theName] = theVar;
//   
//   
// };


// lgb.simulation.model.MainModel.prototype.idxOneOutput_ = function(theVar, idx) {
// 
  // var theName = theVar.name_;
//   
  // if (undefined == theName) {
    // debugger;
  // }
//   
  // if (this.modNameToVarMap_.hasOwnProperty(theName)) {
      // debugger;
  // } else {
    // this.modNameToVarMap_[theName] = theVar; 
  // }
//   
  // //var mergeVariable = 
//   
  // //this.mergedResults[idx] = new lgb.simulation.model.voClient.MergedVariableReal(theVar);
  // this.mergedResults.addScalarVariable(theVar, idx);
//   
//   
//   
//   
// };
// 






// 
// lgb.simulation.model.MainModel.prototype.calcScalarValueResultsConverted = function( ) {
// 
    // // var msecPerMinute = 1000 * 60;
    // // var msecPerHour = msecPerMinute * 60;
    // // var msecPerDay = msecPerHour * 24;
//     
// 
    // var totalSec = this.scalarValueResults.time_;
    // var totalHours = parseInt( totalSec / 3600 );
//     
    // var days = Math.floor(totalHours / 24);
//     
    // var date = new Date(2000,0,1,0,0,0,0);
    // var str = date.toString();
//     
//     
    // var dateMsec = date.getTime();
    // var dateMsec2 = dateMsec + (totalSec * 1000);
    // var date2 = new Date(dateMsec2);
//     
    // var str2 = date.toString();
//     
// 
    // var timeHours = totalHours % 24;
    // var timeMinutes = parseInt( totalSec / 60 ) % 60;
    // var timeSeconds = totalSec % 60;
// 
    // var friendlyTime = (timeHours < 10 ? "0" + timeHours : timeHours) + ":" + 
        // (timeMinutes < 10 ? "0" + timeHours : timeMinutes) + ":" + 
        // (timeSeconds  < 10 ? "0" + timeHours : timeSeconds);
// 
// 
    // var friendlyDate = 
    // {
      // year:date2.getFullYear(),
      // month:date2.getMonth(),
      // date:date2.getDate()
    // };
//         
//         
    // var outAry = this.convertRealValueList(
      // this.scalarValueResults.output.realList_, 
      // this.xmlParsedInfo.scalarVariablesAll_.output_.realVarList_);
//       
//       
    // var inAry = this.convertRealValueList(
      // this.scalarValueResults.input.realList_, 
      // this.xmlParsedInfo.scalarVariablesAll_.input_.realVarList_);
//     
//     
    // this.scalarValueResultsConverted = {
      // time_:friendlyTime,
      // date_:friendlyDate,
      // dateObject_:date2,
      // input:{realList:inAry},
      // output:{realList:outAry}
    // };
//     
//     
//     
//     
    // this.dispatchChangedEx('scalarValueResultsConverted', this.scalarValueResultsConverted);
//     
// 
// };

// 
// lgb.simulation.model.MainModel.prototype.convertRealValueList = function(valueList, variableList) {
//   
//   
    // var len = valueList.length;
    // var newValueList = [];
//     
    // for (var i=0; i < len; i++) {
//       
      // var valueVo = valueList[i];
      // var variableVo = variableList[i];
// 
      // var v = this.convertRealValue(valueVo, variableVo.typeSpecReal_.unit);
//       
      // newValueList.push( { value_ :  v} );
    // };
//     
//     
  // return newValueList;
// };
// 





 
