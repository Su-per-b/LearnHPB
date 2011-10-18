goog.provide('lgb.event.ViewClosed');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {mesh} 
 * @extends {goog.events.Event}
 */
lgb.event.ViewClosed = function(scenarioBase) {
	
	goog.events.Event.call(this, lgb.event.ViewClosed.TYPE);
 
  /**
   * The event payload
   * @type {Object}
   */
  this.payload = scenarioBase;
  
};

goog.inherits(lgb.event.ViewClosed , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.ViewClosed.TYPE =
    goog.events.getUniqueId('ViewClosed');
    

