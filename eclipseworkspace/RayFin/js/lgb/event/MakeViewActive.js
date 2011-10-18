goog.provide('lgb.event.MakeViewActive');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {Boolean} 
 * @extends {goog.events.Event}
 */
lgb.event.MakeViewActive = function(makeActiveFlag) {
	
	goog.events.Event.call(this, lgb.event.MakeViewActive.TYPE);
 
  /**
   * The event payload
   * @type {Boolean}
   */
  this.payload = makeActiveFlag;
  
};

goog.inherits(lgb.event.MakeViewActive , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.MakeViewActive.TYPE =
    goog.events.getUniqueId('MakeViewActive');
    

