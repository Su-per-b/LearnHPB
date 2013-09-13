/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');
goog.require('lgb.view.BaseV');


/**
 * Html radio button group that will be inserted into the DOM
 * @constructor
 * @extends {lgb.view.BaseV}
 * @param {lgb.component.TabStripDataSource} ds the datasource
 * for this component.
 */
lgb.component.TabStrip = function(ds) {

  lgb.view.BaseV.call(this, ds, ds.htmlID, ds.parentHtmlID);
  this.ds = ds;
  
  this.listenForChange_('addTab');
};
goog.inherits(lgb.component.TabStrip, lgb.view.BaseV);


lgb.component.TabStrip.prototype.onChange_addTab_ = function(tab) {
  

    if (this.ds.showIcon) {
      
      var idx = tab.xPosition-1;

      var cssInner = this.makeBackgroundPosition(' .' + tab.cssClass, idx, 1);
      cssInner += this.makeBackgroundPosition(' .k-state-active .' + tab.cssClass, idx, 0);
      cssInner += this.makeBackgroundPosition(' .k-state-hover .' + tab.cssClass, idx, 2);

      var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
      $(cssStr).appendTo('head');
    }
    
};


/**
 * @param {string} appendToSelector The second part of the
 * jQuery selector string.
 * @param {number} yPosition Used to calculate the pixel shift.
 * @return {string} the Css.
 */
lgb.component.TabStrip.prototype.makeBackgroundPosition = function(appendToSelector, xPosition, yPosition) {

  var pixelShiftY = this.ds.iconHeight * yPosition * -1;
  var pixelShiftX = this.ds.iconWidth * xPosition * -1;

  var cssStr = '#{0}{1}{background-position: {2}px {3}px;}'.format(this.htmlID, appendToSelector, pixelShiftX.toString(), pixelShiftY.toString());

  return cssStr;
};


lgb.component.TabStrip.prototype.addTab = function(title) {

  this.ds.addTab(title);
  this.kendoTabStrip_.select(0);

  return this.getContentElement();
};


lgb.component.TabStrip.prototype.getContentElement = function() {
  
  var len = this.kendoTabStrip_.contentElements.length;
  var contentElement = this.kendoTabStrip_.contentElements[len - 1];
  
  return $(contentElement);
};


/*
lgb.component.TabStrip.prototype.setOptions = function(options) {

  this.options = options;

  if (this.options.width) {
    this.getMainElement().css('width', this.options.width);
  }

};
*/


lgb.component.TabStrip.prototype.injectCss = function() {

  if (this.ds.showIcon) {
    //inject background image for tab
    var cssInner = '#{0} .k-sprite '.format(this.ds.htmlID);
    cssInner += '{background-image: url("{0}");'.format(this.ds.imageUrl);
    cssInner += 'margin: 0px;';
    cssInner += 'width: {0}px;}'.format(this.ds.iconWidth);

    //eliminate margin and padding
    cssInner += '#{0} .k-tabstrip-items .k-link {margin:0px;padding:0px }'.format(this.ds.htmlID);
    var len = this.ds.tabCollection.length;

    for (var i = 0; i < len; i++) {
      var cssStr = '.tab' + (i + 1) + ' ';

      cssInner += this.makeBackgroundPosition(' ' + cssStr, i, 1);
      cssInner += this.makeBackgroundPosition(' .k-state-active ' + cssStr, i, 0);
      cssInner += this.makeBackgroundPosition(' .k-state-hover ' + cssStr, i, 2);
    };

    var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
    $(cssStr).appendTo('head');
  }

};



/**
 * @public
 */
lgb.component.TabStrip.prototype.injectTo = function(parentElement) {

  var el = this.getMainElement();

  this.kendoTabStrip_ = el.kendoTabStrip({
    dataTextField : "title",
    dataSpriteCssClass : "cssClass",
    dataContentField : "content",
    dataSource : this.ds.tabCollection
  }).data("kendoTabStrip");

  this.kendoTabStrip_.select(0);
  this.ds.kendoDS = this.kendoTabStrip_.dataSource;

  goog.base(this,'injectTo', parentElement);

};

