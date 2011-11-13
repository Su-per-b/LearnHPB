goog.provide('lgb.events.ScenarioParsed');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {lgb.model.scenario.Base} scenarioBase The Data Model.
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
 * @const
 * @type {string}
 */
lgb.events.ScenarioParsed.TYPE = 'lgb.events.ScenarioParsed';
