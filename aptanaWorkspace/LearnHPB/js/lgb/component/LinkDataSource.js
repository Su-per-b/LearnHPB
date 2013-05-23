/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.LinkDataSource');
goog.require('lgb.component.BaseDataSource');


/**
 * @constructor
 * @extends lgb.component.BaseDataSource
 * @param {string} title The HTML title in the Link.
 * @param {string} parentHtmlID The CSS ID of the parent in the DOM.
 * @param {string} subID The second part of the CSS ID for this element.
 */
lgb.component.LinkDataSource = function(title, parentHtmlID, subID) {

  lgb.component.BaseDataSource.call(this);

  this.title = title;
  this.parentHtmlID = parentHtmlID;
  this.htmlID = parentHtmlID + '-' + subID;
  this.theSelectedOne = null;
  this.data = null;
  this.isEnabled = true;
};
goog.inherits(lgb.component.LinkDataSource, lgb.component.BaseDataSource);
