/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.TabStripDataSource');
goog.require('lgb.component.DataSourceBase');


/**
 * @constructor
 * @extends lgb.component.DataSourceBase
 * @param {string} title The HTML title in the Link.
 * @param {string} parentHtmlID The CSS ID of the parent in the DOM.
 * @param {string} subID The second part of the CSS ID for this element.
 */
lgb.component.TabStripDataSource = function(title, parentHtmlID, htmlID) {
    
  this._NAME = 'lgb.component.TabStripDataSource';
  lgb.component.DataSourceBase.call(this);

  this.title = title;
  this.parentHtmlID = parentHtmlID;
  this.htmlID = htmlID;

  this.isEnabled = true;
  
  this.showIcon = false;
  this.tabCollection = [];
  
};
goog.inherits(lgb.component.TabStripDataSource, lgb.component.DataSourceBase);




lgb.component.TabStripDataSource.prototype.setIcon = function(imageUrl, iconHeight, iconWidth) {
    
  this.imageUrl = imageUrl;
  this.iconHeight = iconHeight;
  this.iconWidth = iconWidth;
  this.showIcon = true;
  
};




lgb.component.TabStripDataSource.prototype.addTab = function(title, content, xPosition) {
    
    
    var cssClassName = 'tab' + (xPosition);
    
    
    var tab = {
        title: title,
        content: content,
        cssClass : cssClassName, 
        xPosition : xPosition
    }
    
  this.tabCollection.push(tab);
 
};


