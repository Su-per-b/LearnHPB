goog.provide('lgb.view.component.RadioButtonGroup');
goog.require('lgb.view.ViewBase');


/**
 * Html radio button group that will be inserted into the DOM
 * @param {string} title The title to display above all items.
 * @param {Object} selectionItems contains Key / Value pair items to display.
 * @example {'label 1': 1, 'label 2' : 2}
 * @constructor
 * @extends {lgb.BaseClass}
 */
lgb.view.component.RadioButtonGroup = function(title, parentID, subID,  selectionItems) {
	lgb.BaseClass.call(this);
	this.title = title;
	this.selectionItems = selectionItems;
	this.parentID = parentID;
	this.htmlID = parentID + subID;
};
goog.inherits(lgb.view.component.RadioButtonGroup, lgb.view.ViewBase);

/**
 * @public
 * @return {string} The html string.
 */
lgb.view.component.RadioButtonGroup.prototype.getHTML = function() {

	var htmlAry = [];

	var i = 0;
	for (var key in this.selectionItems) {
	   var value = this.selectionItems[key];
		var str = '<input type="radio" id={0} name="{1}" value="{2}"{3}>' +
		+'<span class="radioButtonText">{4}</span>';

		str = str.format(id, this.dataModel.id, oneItem.value.toString(), chk, oneItem.label);

		htmlAry.push(str);
		i++;
	}

	var title = '<h5>{0}</h5>'.format(this.title);
	var radioButtons = htmlAry.join('<br />');
	var htmlStr = '<div class="radioButtonGroup">' + title + radioButtons + '</div>';

	return htmlStr;
};

/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @public
 */
lgb.view.component.RadioButtonGroup.prototype.bind = function() {
	var selectionItems = this.selectionItems;
	var len = selectionItems.length;
	var delegateClick = this.d(this.onClick);

	for (var i = 0; i < len; i++) {
		var oneSectionItem = selectionItems[i];
		var selector = '#{0} input'.format(this.htmlID);

		$(selector).click(delegateClick);
	}
};




lgb.view.component.RadioButtonGroup.prototype.selectByIdx = function(idx) {
	var x = $('#' + this.htmlID + ' input');

	var y = 0;
};


lgb.view.component.RadioButtonGroup.prototype.onClick = function(event) {
	//this.dispatch(this.dataModel.eventName, event.target.value);
	var x = 0;
	//this.dataModel.selectOnly(event.target.value);

};









