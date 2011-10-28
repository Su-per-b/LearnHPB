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
		this.listenForChange();
	}

	this.parentHTMLid = 'theBody';
	this.htmlID = '';

};
goog.inherits(lgb.view.ViewBase, lgb.BaseClass);


lgb.view.ViewBase.prototype.append = function(html) {
	this.jqParent().append(html);
};

//lgb.BaseClass.prototype.dispatch = function(event) {

	//alert('You should not do a ')

	//throw Error('You should not do a global event dispatch from a View object');
//};

/**
 * if user clicks on this element, then with prevent that click event
 * from reaching the WebGL canvas
 * @public
 */
lgb.view.ViewBase.prototype.stopClickPropigation = function() {
		
		this.jq().bind('mouseup', this.d(this.stopClickPropigationHandler_));
		this.jq().bind('mousedown', this.d(this.stopClickPropigationHandler_));
		
};

/**
 * blocks the event
 * @param {Event} event The mousedown or mouseup event to block.
 * @protected
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


lgb.view.ViewBase.prototype.jqParent = function() {
	var selector = $('#{0}'.format(this.parentHTMLid));
	return selector;
};



lgb.view.ViewBase.prototype.onChange = function(event) {
	//throw Error('this should be overriden');
};


lgb.view.ViewBase.prototype.listenForChange = function() {
	this.listenHelper_(this.dataModel, lgb.events.DataModelChanged.TYPE, this, this.onChange);
};
















