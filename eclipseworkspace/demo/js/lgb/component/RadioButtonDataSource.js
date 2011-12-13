/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.RadioButtonDataSource');
goog.require('lgb.component.DataSourceBase');


/**
 * @constructor
 * @extends lgb.component.DataSourceBase
 * @param {string} title The HTML title in the Link.
 * @param {string} parentHtmlID The CSS ID of the parent in the DOM.
 * @param {string} subID The second part of the CSS ID for this element.
 */
lgb.component.RadioButtonDataSource = function(title, parentHtmlID, subID) {
  lgb.component.DataSourceBase.call(this);

  this.title = title;
  this.parentHtmlID = parentHtmlID;
  this.htmlID = parentHtmlID + '-' + subID;
  this.selectionItems = [];
  this.theSelectedOne = null;
  this._NAME = 'lgb.component.RadioButtonDataSource';
};
goog.inherits(
  lgb.component.RadioButtonDataSource,
  lgb.component.DataSourceBase
  );


/**
 * @param {number} idx The index of the item to set as selected.
 */
lgb.component.RadioButtonDataSource.prototype.selectIdx = function(idx) {

  var isNull = (null === this.theSelectedOne);

  if (!isNull &&
    idx != this.theSelectedOne.idx)
  {
    this.theSelectedOne = this.selectionItems[idx];
    this.dispatchChange();
  }
};

/**
 * @param {!string} label The radio button label.
 * @param {!string|number} value The value used when the item is selected.
 * @param {boolean=} isSelected Is this selected or not.
 */
lgb.component.RadioButtonDataSource.prototype.addItem = function(
  label, value, isSelected) {
  if (isSelected === undefined) {
    isSelected = false;
  }

  var item = {
    label: label,
    value: value,
    isSelected: isSelected,
    htmlID: '',
    idx: this.selectionItems.length
  };

  this.selectionItems.push(item);

  if (isSelected) {
    this.theSelectedOne = item;
  }


};
