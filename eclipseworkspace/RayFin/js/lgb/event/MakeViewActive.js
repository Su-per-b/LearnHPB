goog.provide('lgb.event.MakeViewActive');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {boolean} makeActiveFlag
 * @extends {goog.events.Event}
 */
lgb.event.MakeViewActive = function(makeActiveFlag) {
	
	goog.events.Event.call(this, lgb.event.MakeViewActive.TYPE);
 
  /**
   * The event payload
   * @type {boolean}
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
    

