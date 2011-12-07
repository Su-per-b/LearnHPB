goog.provide('lgb.component.LinkDataSource');
goog.require('lgb.component.DataSourceBase');


/**
 * @constructor
 * @extends lgb.component.DataSourceBase
 * @param {string} title The HTML title in the Link.
 * @param {string} parentHtmlID The CSS ID of the parent in the DOM.
 * @param {string} subID The second part of the CSS ID for this element.
 */
lgb.component.LinkDataSource = function(title, parentHtmlID, subID) {
  lgb.component.DataSourceBase.call(this);

  this.title = title;
  this.parentHtmlID = parentHtmlID;
  this.htmlID = parentHtmlID + '-' + subID;
  this.theSelectedOne = null;
  this._NAME = 'lgb.component.LinkDataSource';
  this.data = null;
};
goog.inherits(lgb.component.LinkDataSource, lgb.component.DataSourceBase);
