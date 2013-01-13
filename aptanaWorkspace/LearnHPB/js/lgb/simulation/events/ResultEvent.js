/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.ResultEvent');

goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.voManaged.ScalarValueResults');

/**
 * @constructor
 * @param {lgb.model.scenario.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.ResultEvent = function(payload) {
  lgb.simulation.events.BaseEvent.call(this, lgb.simulation.events.ResultEvent.TYPE,  payload);
};

goog.inherits(lgb.simulation.events.ResultEvent, lgb.simulation.events.BaseEvent);





lgb.simulation.events.ResultEvent.prototype.fromJson = function(deserializedObj) {
    

    var payload =  lgb.simulation.model.voManaged.ScalarValueResults.fromJson(deserializedObj.payload);
    var typedObj = new lgb.simulation.events.ResultEvent(payload);
    
    return typedObj;
    
};


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.simulation.events.ResultEvent.TYPE = 'lgb.simulation.events.ResultEvent';

/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.ResultEvent.SERVER_TYPE = 'com.sri.straylight.fmuWrapper.event.ResultEvent';