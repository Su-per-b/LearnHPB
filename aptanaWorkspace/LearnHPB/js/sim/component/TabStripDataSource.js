/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('sim.component.TabStripDataSource');
goog.require('sim.component.DataSourceBase');


/**
 * @constructor
 * @extends sim.component.DataSourceBase
 * @param {string} title The HTML title in the Link.
 * @param {string} parentHtmlID The CSS ID of the parent in the DOM.
 * @param {string} subID The second part of the CSS ID for this element.
 */
sim.component.TabStripDataSource = function(title, parentHtmlID, htmlID) {
  sim.component.DataSourceBase.call(this);

  this.title = title;
  this.parentHtmlID = parentHtmlID;
  this.htmlID = htmlID;
  this.isEnabled = true;
  
  this.showIcon = false;
  this.tabCollection = [];
  
};
goog.inherits(sim.component.TabStripDataSource, sim.component.DataSourceBase);




sim.component.TabStripDataSource.prototype.setIcon = function(imageUrl, iconHeight, iconWidth) {
    
  this.imageUrl = imageUrl;
  this.iconHeight = iconHeight;
  this.iconWidth = iconWidth;
  this.showIcon = true;
  
};




sim.component.TabStripDataSource.prototype.addTab = function(title, content, xPosition) {
    
    
    var cssClassName = 'tab' + (xPosition);
    
    
    var tab = {
        title: title,
        content: content,
        cssClass : cssClassName, 
        xPosition : xPosition
    }
    
  this.tabCollection.push(tab);
 
};


