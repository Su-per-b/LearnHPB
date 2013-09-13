/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.component.TabStripDataSource');
goog.require('lgb.component.BaseDataSource');

/**
 * @constructor
 * @extends lgb.component.BaseDataSource
 * @param {string} title The HTML title in the Link.
 * @param {string} parentHtmlID The CSS ID of the parent in the DOM.
 * @param {string} subID The second part of the CSS ID for this element.
 */
lgb.component.TabStripDataSource = function(title, htmlID, parentHtmlID) {

  lgb.component.BaseDataSource.call(this);
  
  this.title = title;
  
  if (undefined == title || '' == title) {
    debugger;
  }
  
  
  this.parentHtmlID = parentHtmlID;
  
  if (undefined === htmlID) {
    this.htmlID = title;
    //debugger;
  } else {
    this.htmlID = htmlID;
  }
  


  this.isEnabled = true;

  this.showIcon = false;
  this.tabCollection = [];

};
goog.inherits(lgb.component.TabStripDataSource, lgb.component.BaseDataSource);

lgb.component.TabStripDataSource.prototype.setIcon = function(imageUrl, iconHeight, iconWidth) {

  this.imageUrl = imageUrl;
  this.iconHeight = iconHeight;
  this.iconWidth = iconWidth;
  this.showIcon = true;

};


lgb.component.TabStripDataSource.prototype.getTabCount = function() {
  return this.tabCollection.length;
};


lgb.component.TabStripDataSource.prototype.addTab = function(title, content, xPosition) {

  if (undefined == title || '' == title) {
   // debugger;
  }
  if (null == xPosition) { 
    xPosition = this.tabCollection.length + 1;
  };

  if (null == content) { 
    content = '<br />';
  };


  var cssClassName = 'tab' + (xPosition);

  var tab = {
    title : title,
    content : content,
    cssClass : cssClassName,
    xPosition : xPosition
  };

  this.tabCollection.push(tab);
  
  if (this.kendoDS) {
    this.kendoDS.add(tab);
  }
  
  this.dispatchChangedEx('addTab', tab);
};

