goog.provide('lgb.view.ViewBase');

goog.require('lgb.BaseClass');
goog.require('lgb.utils');
goog.require('lgb.events.DataModelChanged');



/**
 * MVC View base class
 * @constructor
 * @extends {lgb.BaseClass}
 * @param {lgb.model.ModelBase=} dataModel that the view with display.
 */
lgb.view.ViewBase = function(dataModel) {
	lgb.BaseClass.call(this);

	if (null !== dataModel && undefined !== dataModel) {
		this.dataModel = dataModel;
		this.listenForChange_();
	}

	this.parentHTMLid = 'theBody';
	this.htmlID = '';

};
goog.inherits(lgb.view.ViewBase, lgb.BaseClass);

/**
 * injects html into the DOM
 * @param {string} html the HTML string to append.
 * @protected
 */
lgb.view.ViewBase.prototype.append = function(html) {
	this.jqParent().append(html);
};

/**
 * @depricated
 */
lgb.view.ViewBase.prototype.stopClickPropigation = function() {
		
		this.jq().bind('mouseup', this.d(this.stopClickPropigationHandler_));
		this.jq().bind('mousedown', this.d(this.stopClickPropigationHandler_));
		
};

/**
 * blocks the event
 * @param {Event} event The mousedown or mouseup event to block.
 * @protected
 * @depricated
 */
lgb.view.ViewBase.prototype.stopClickPropigationHandler_ = function(event) {
		event.preventDefault();
		event.stopPropagation();
};



/**
 * makes a unique css ID for a child element
 * @param {!string} id The last part of the CSS ID
 * @return {string}
 */
lgb.view.ViewBase.prototype.makeID = function(id) {
	var newID = '{0}-{1}'.format(this.htmlID, id);
	return newID;
};

/**
 * converts and id into a Jquery object
 * @param {string=} id The css id
 * @return {jQuery}
 */
lgb.view.ViewBase.prototype.jq = function(id) {
	
	var str = '';
	if (undefined === id) {
		str = this.htmlID;
	} else {
		str = id;
	}

	var selector = '#{0}'.format(str);

	var jq = $(selector);
	return jq;
};

/**
 * converts an id into a Jquery object
 * refers to the parent in the DOM
 * @return {jQuery}
 */
lgb.view.ViewBase.prototype.jqParent = function() {
	var selector = $('#{0}'.format(this.parentHTMLid));
	return selector;
};


/**
 * Event Handler that fires when the data model changes
 * @param {goog.events.Event} event The event.
 * @protected
 */
lgb.view.ViewBase.prototype.onChange = function(event) {
	throw('this should be overriden Class name: ' + this._NAME);
};

/**
 * Binds an event listener to handle when the MVC data model changes.
 * @param {goog.events.Event} event The event.
 * @private
 */
lgb.view.ViewBase.prototype.listenForChange_ = function() {
	this.listenHelper_(this.dataModel, lgb.events.DataModelChanged.TYPE, this, this.onChange);
};














