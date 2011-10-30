goog.provide('lgb.events.ScenarioParsed');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {lgb.model.scenario.Base} scenarioBase
 * @extends {goog.events.Event}
 */
lgb.events.ScenarioParsed = function(scenarioBase) {

	goog.events.Event.call(this, lgb.events.ScenarioParsed.TYPE);

  /**
   * The event payload
   * @type {lgb.model.scenario.Base}
   */
  this.payload = scenarioBase;

};
goog.inherits(lgb.events.ScenarioParsed, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.ScenarioParsed.TYPE = 'lgb.events.ScenarioParsed';