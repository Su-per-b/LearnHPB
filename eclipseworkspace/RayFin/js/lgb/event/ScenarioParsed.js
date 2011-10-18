goog.provide('lgb.event.ScenarioParsed');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {mesh} 
 * @extends {goog.events.Event}
 */
lgb.event.ScenarioParsed = function(scenarioBase) {
	
	goog.events.Event.call(this, lgb.event.ScenarioParsed.TYPE);
 
  /**
   * The event payload
   * @type {Object}
   */
  this.payload = scenarioBase;
  
};

goog.inherits(lgb.event.ScenarioParsed , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.ScenarioParsed.TYPE =
    goog.events.getUniqueId('ScenarioParsed');
    

