goog.provide('lgb.events.NotifyVisibilityChanged');

goog.require('goog.events.Event');

/**
 * @param {!lgb.model.BuildingModel.Group} visiblityGroup
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.NotifyVisibilityChanged = function(visiblityGroup) {

	goog.events.Event.call(this, lgb.events.NotifyVisibilityChanged.TYPE);

  /**
   * The event payload
   * @type {!lgb.model.BuildingModel.Group}
   */
  this.payload = visiblityGroup;
};
goog.inherits(lgb.events.NotifyVisibilityChanged, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.NotifyVisibilityChanged.TYPE = 'lgb.events.NotifyVisibilityChanged';