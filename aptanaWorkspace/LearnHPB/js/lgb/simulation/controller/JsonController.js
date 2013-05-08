/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.controller.JsonController');

goog.require('lgb.simulation.events.MessageEvent');
goog.require('lgb.simulation.events.SimStateNativeNotify');
goog.require('lgb.simulation.events.ConfigChangeNotify');
goog.require('lgb.simulation.events.XMLparsedEvent');
goog.require('lgb.simulation.events.ResultEvent');


lgb.simulation.controller.JsonController = function() {

  this.init_();
};
goog.inherits(lgb.simulation.controller.JsonController, lgb.controller.BaseController);


/**
 * @private
 */
lgb.simulation.controller.JsonController.prototype.init_ = function() {
    
    var e1 = new lgb.simulation.events.MessageEvent();
    var e2 = new lgb.simulation.events.SimStateNativeNotify();
    var e3 = new lgb.simulation.events.ConfigChangeNotify();
    var e4 = new lgb.simulation.events.XMLparsedEvent();
    var e5 = new lgb.simulation.events.ResultEvent();

    
    this.classMap = {
        "com.sri.straylight.fmuWrapper.event.MessageEvent" : e1,
        "com.sri.straylight.fmuWrapper.event.SimStateNativeNotify" : e2,
        "com.sri.straylight.fmuWrapper.event.ConfigChangeNotify" : e3,
        "com.sri.straylight.fmuWrapper.event.XMLparsedEvent" : e4,
        "com.sri.straylight.fmuWrapper.event.ResultEvent" : e5
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




};

lgb.simulation.controller.JsonController.prototype.deSerialize = function(jsonString) {


    var deserializedObj = JSON && JSON.parse(jsonString) || $.parseJSON(jsonString);
    
    var typeStr = deserializedObj.type;
    var protoObj = this.classMap[typeStr];
    
    if (! protoObj ) {
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
