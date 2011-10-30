goog.provide('lgb.events.DataModelCreated');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {!lgb.model.ModelBase} dataModel The dataModel that was created.
 * @extends {goog.events.Event}
 */
lgb.events.DataModelCreated = function(dataModel) {

	goog.events.Event.call(this, lgb.events.DataModelCreated.TYPE);
	/**
	* The event payload
	* @type {Object}
	*/
	this.payload = dataModel;
};
goog.inherits(lgb.events.DataModelCreated, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.DataModelCreated.TYPE = 'lgb.events.DataModelCreated';