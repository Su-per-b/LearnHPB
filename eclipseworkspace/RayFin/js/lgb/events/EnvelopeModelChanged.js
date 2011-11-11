goog.provide('lgb.events.EnvelopeModelChanged');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {!lgb.model.EnvelopeModel} envelopeModel The model which has changed.
 * what has changed in the data model.
 * @extends {goog.events.Event}
 */
lgb.events.EnvelopeModelChanged = function(envelopeModel) {

	goog.events.Event.call(this, lgb.events.EnvelopeModelChanged.TYPE);

  /**
   * The event payload
   * @type {!lgb.model.EnvelopeModel}
   */
  this.payload = envelopeModel;
};
goog.inherits(lgb.events.EnvelopeModelChanged, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.EnvelopeModelChanged.TYPE = 'lgb.events.EnvelopeModelChanged';
