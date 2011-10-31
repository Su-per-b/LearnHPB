goog.provide('lgb.component.RadioButtonDataSource');
goog.require('lgb.component.DataSourceBase');


/**
 * @constructor
 * @extends lgb.component.DataSourceBase
 * @param {string} title
 * @param {string} parentHtmlID
 * @param {string} subID
 */
lgb.component.RadioButtonDataSource = function(title, parentHtmlID, subID){
	lgb.component.DataSourceBase.call(this);
	
	this.title = title;
	this.parentHtmlID = parentHtmlID;
	this.htmlID = parentHtmlID + '-' + subID;
	this.selectionItems = [];
	this.theSelectedOne = null;
};
goog.inherits(lgb.component.RadioButtonDataSource, lgb.component.DataSourceBase);


/**
 * @public
 * @param {number} idx The index of the item to set as selected.
 */
lgb.component.RadioButtonDataSource.prototype.selectIdx = function(idx) {
	if (null != this.theSelectedOne &&
		idx != this.theSelectedOne.idx) 
	{
		this.theSelectedOne = this.selectionItems[idx];
		this.dispatchChange()
	}
}

/**
 * @public
 * @param {string} label
 * @param {string} value
 * @param {string} isSelected
 */
lgb.component.RadioButtonDataSource.prototype.addItem = function(label, value, isSelected) {
	if (isSelected === undefined) {
		isSelected = false;
	};
	
	var item = {
		label : label,
		value : value,
		isSelected : isSelected,
		htmlID : '',
		idx : this.selectionItems.length 
	};
		
	this.selectionItems.push(item);
	
	if (isSelected) {
		this.theSelectedOne = item;
	};

	
};
