/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.model.MainModel');

goog.require('lgb.world.model.BaseModel');
goog.require('lgb.core.Config');
goog.require('lgb.simulation.model.WebSocketConnectionState');


/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.simulation.model.MainModel = function() {


  /**@const */
  this._TITLE = 'MainModel';
  lgb.world.model.BaseModel.call(this);

  this.simStateNative = lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_0_uninitialized;
  this.webSocketConnectionState = lgb.simulation.model.WebSocketConnectionState.uninitialized;
  
  this.socketServerURL = null;
  this.messageStruct = null;
  this.xmlParsedInfo = null;
  this.scalarValueResults = null;
  
  this.scalarValueResultsConverted = null;
  
  this.modNameToVarMap_ = {};

};
goog.inherits(lgb.simulation.model.MainModel, lgb.world.model.BaseModel);


/**
 * Handler used for websocket init
 * @private
 */
lgb.simulation.model.MainModel.prototype.init = function(hostname) {
  

  this.socketServerURL = "ws://" + hostname + ":8081/";
  
};



lgb.simulation.model.MainModel.prototype.setScalarValueResults = function(scalarValueResults ) {


    this.scalarValueResults = scalarValueResults;
    this.dispatchChangedEx('scalarValueResults', scalarValueResults);
    
    this.calcScalarValueResultsConverted();
    

};



lgb.simulation.model.MainModel.prototype.calcScalarValueResultsConverted = function( ) {

    var totalSec = this.scalarValueResults.time_;
    
    var hours = parseInt( totalSec / 3600 ) % 24;
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds = totalSec % 60;

    var friendlyTime = (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds  < 10 ? "0" + seconds : seconds);




    var outAry = this.convertRealValueList(
      this.scalarValueResults.output.realList_, 
      this.xmlParsedInfo.scalarVariablesAll_.output_.realVarList_);
      
      
    var inAry = this.convertRealValueList(
      this.scalarValueResults.input.realList_, 
      this.xmlParsedInfo.scalarVariablesAll_.input_.realVarList_);
    
    
    this.scalarValueResultsConverted = {
      time_:friendlyTime,
      input:{realList:inAry},
      output:{realList:outAry}
    };
    
    this.dispatchChangedEx('scalarValueResultsConverted', this.scalarValueResultsConverted);
    

};


lgb.simulation.model.MainModel.prototype.convertRealValueList = function(valueList, variableList) {
  
  
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



lgb.simulation.model.MainModel.prototype.convertRealValue = function(realVo, unit) {

      
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





lgb.simulation.model.MainModel.prototype.setXmlParseInfo = function(xmlParseInfo) {

  this.xmlParsedInfo = xmlParseInfo;
  
  var varList = xmlParseInfo.scalarVariablesAll_.input_.realVarList_;
  this.each(varList, this.idxOne_);
  
  
  this.dispatchChangedEx('xmlParsedInfo', xmlParseInfo);
  
};


lgb.simulation.model.MainModel.prototype.idxOne_ = function(theVar) {

  var theName = theVar.name_;
  
  if (undefined == theName) {
    debugger;
  }
  
  this.modNameToVarMap_[theName] = theVar;
};








 
