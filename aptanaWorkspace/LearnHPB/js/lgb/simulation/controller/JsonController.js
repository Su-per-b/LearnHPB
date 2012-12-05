/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.controller.JsonController');

goog.require('lgb.simulation.events.MessageEvent');
goog.require('lgb.simulation.events.SimStateNativeNotify');



lgb.simulation.controller.JsonController = function() {

  this.init_();
};
goog.inherits(lgb.simulation.controller.JsonController, lgb.controller.ControllerBase);


/**
 * @private
 */
lgb.simulation.controller.JsonController.prototype.init_ = function() {
    
    this.classMap = {
        "com.sri.straylight.fmuWrapper.event.MessageEvent" : new lgb.simulation.events.MessageEvent(),
        "com.sri.straylight.fmuWrapper.event.SimStateNativeNotify" : new lgb.simulation.events.SimStateNativeNotify(),
    }
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.simulation.controller.JsonController.prototype.bind_ = function() {

  this.listen(
    lgb.events.EnvelopeModelChanged.TYPE,
    this.onEnvelopeModelChanged_
    );

  this.makeAddToWorldRequestGlobal();

  this.listenTo(
    this.adminview,
    lgb.events.RequestZoneVisiblityChange.TYPE,
    this.onRequestZoneVisiblityChange_
    );

  this.listenTo(
    this.adminview,
    lgb.events.RequestGoToViewPointName.TYPE,
    this.onRequestGoToViewPointName_
    );




};

lgb.simulation.controller.JsonController.prototype.deSerialize = function(jsonString) {


    var deserializedObj = JSON && JSON.parse(jsonString) || $.parseJSON(jsonString);
    
    var typeStr = deserializedObj.type;
    var protoObj = this.classMap[typeStr];
    
    if (undefined === protoObj) {
        throw ("JsonController.deSerialize() failed due to unknwon type: "+ typeStr);
    }
    
    var typedObj = protoObj.fromJson(deserializedObj);
    
      
    return typedObj;


};


/*
lgb.simulation.controller.JsonController.prototype.toJson = function(event) {

    event.type = event.getServerType();
    var jsonString = JSON.stringify(event, null, 2);

    
      
    return jsonString;


};

*/
