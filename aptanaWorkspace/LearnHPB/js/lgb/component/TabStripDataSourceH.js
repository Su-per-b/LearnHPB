/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.component.TabStripDataSourceH');
goog.require('lgb.component.BaseDataSource');

/**
 * @constructor
 * @extends lgb.component.BaseDataSource
 * @param {string} title The HTML title in the Link.
 * @param {string} parentHtmlID The CSS ID of the parent in the DOM.
 * @param {string} subID The second part of the CSS ID for this element.
 */
lgb.component.TabStripDataSourceH = function(title, htmlID, parentHtmlID) {

  lgb.component.BaseDataSource.call(this);
  this.offsets = [];
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
goog.inherits(lgb.component.TabStripDataSourceH, lgb.component.BaseDataSource);

lgb.component.TabStripDataSourceH.prototype.setIcon = function(imageUrl, iconHeight, iconWidth) {

  this.imageUrl = imageUrl;
  this.iconHeight = iconHeight;
  this.iconWidth = iconWidth;
  this.showIcon = true;

};



lgb.component.TabStripDataSourceH.prototype.setOffsets = function(offsets) {
  this.offsets = offsets;
};


lgb.component.TabStripDataSourceH.prototype.getTabCount = function() {
  return this.tabCollection.length;
};


lgb.component.TabStripDataSourceH.prototype.removeAllTabs = function() {
  
  this.tabCollection = [];
  
  if (this.kendoDS) {
    var data = this.kendoDS.data();
    
    var len = data.length;
    
    for (var i=0; i < len; i++) {
      var dataItem = data.pop();
      this.kendoDS.remove(dataItem);
    };
    
    
  }
  
};



lgb.component.TabStripDataSourceH.prototype.addTab = function(title, content, yPosition) {

  //if (undefined == title || '' == title) {
   // debugger;
 // }
 
 
  if (null == yPosition) { 
    yPosition = this.tabCollection.length + 1;
  };

  if (null == content) { 
    content = '<span></span>';
  };


  var cssClassName = 'tab' + (yPosition);

  var tab = {
    title : title,
    content : content,
    cssClass : cssClassName,
    yPosition : yPosition
  };

  this.tabCollection.push(tab);
  
  if (this.kendoDS) {
    this.kendoDS.add(tab);
  }
  
  this.dispatchChangedEx('addTab', tab);
};

