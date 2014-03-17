/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.component.TabStripH');
goog.require('lgb.component.TabStripDataSourceH');
goog.require('lgb.world.view.BaseV');


/**
 * Html radio button group that will be inserted into the DOM
 * @constructor
 * @extends {lgb.world.view.BaseV}
 * @param {lgb.component.TabStripHDataSource} ds the datasource
 * for this component.
 */
lgb.component.TabStripH = function(ds) {

  lgb.world.view.BaseV.call(this, ds, ds.htmlID, ds.parentHtmlID);
  this.ds = ds;
  
  this.listenForChange_('addTab');
};
goog.inherits(lgb.component.TabStripH, lgb.world.view.BaseV);


lgb.component.TabStripH.prototype.onChange_addTab_ = function(tab) {
  

    if (this.ds.showIcon) {
      
      var idx = tab.yPosition-1;

      var cssInner = this.makeBackgroundPosition(' .' + tab.cssClass, 0, idx);
      cssInner += this.makeBackgroundPosition(' .k-state-hover .' + tab.cssClass, 1, idx);
      cssInner += this.makeBackgroundPosition(' .k-state-active .' + tab.cssClass, 2, idx);

      var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
      $(cssStr).appendTo('head');
      
      var children = this.kendoTabStrip_.tabGroup.children();
      if (idx < children.length) {
        
        var newChildTab = $(children[idx]);
        
        if (idx < this.ds.offsets.length) {
          var offset = this.ds.offsets[idx];
          
          newChildTab.css("margin-left", offset.x);
          newChildTab.css("margin-top", offset.y);

        }
        
      }
      
      
    }
    
};


/**
 * @param {string} appendToSelector The second part of the
 * jQuery selector string.
 * @param {number} yPosition Used to calculate the pixel shift.
 * @return {string} the Css.
 */
lgb.component.TabStripH.prototype.makeBackgroundPosition = function(appendToSelector, xPosition, yPosition) {

  var pixelShiftY = this.ds.iconHeight * yPosition * -1;
  var pixelShiftX = this.ds.iconWidth * xPosition * -1;

  var cssStr = '#{0}{1}{background-position: {2}px {3}px;}'.format(this.htmlID, appendToSelector, pixelShiftX.toString(), pixelShiftY.toString());

  return cssStr;
};


lgb.component.TabStripH.prototype.setContentHeight = function(height) {
  
  var len = this.kendoTabStrip_.contentElements.length;
  
   for (var i = 0; i < len; i++) {
     var contentElement = $(this.kendoTabStrip_.contentElements[i]);
     contentElement.height(height);
   }
  
  return;
};


lgb.component.TabStripH.prototype.setContentCss = function(cssClass, cssValue) {
  
  var len = this.kendoTabStrip_.contentElements.length;
   for (var i = 0; i < len; i++) {
     
     var contentElement = $(this.kendoTabStrip_.contentElements[i]);
     contentElement.css(cssClass, cssValue);
     
   }

};


lgb.component.TabStripH.prototype.getContentElement = function() {
  
  var len = this.kendoTabStrip_.contentElements.length;
  var contentElement = this.kendoTabStrip_.contentElements[len - 1];
  
  return $(contentElement);
};


/*
lgb.component.TabStripH.prototype.setOptions = function(options) {

  this.options = options;

  if (this.options.width) {
    this.getMainElement().css('width', this.options.width);
  }

};
*/

lgb.component.TabStripH.prototype.bind_ = function() {

  this.kendoTabStrip_.bind('select', this.d(this.onSelect_));
  this.kendoTabStrip_.bind('activate', this.d(this.onActivate_));
  
};

lgb.component.TabStripH.prototype.onActivate_ = function(event) {
  
  var payload = event.item;
  
  //var item = $(payload.childNodes[0]);
  //item.css("border", "2px solid #231F20");
  
  this.triggerLocal(e.Activate, payload);
  
};

lgb.component.TabStripH.prototype.onSelect_ = function(event) {
  
  var payload = event.item;
  
  //var item = $(payload.childNodes[0]);
  //item.css("border", "2px solid #0294DD");
  
  //this.triggerLocal(e.MouseClick, payload);
  
};


lgb.component.TabStripH.prototype.injectCss = function() {

  if (this.ds.showIcon) {
    //inject background image for tab
    var cssInner = '#{0} .k-sprite '.format(this.ds.htmlID);
    cssInner += '{background-image: url("{0}");'.format(this.ds.imageUrl);
    cssInner += 'margin: 0px;';
    cssInner += 'width: {0}px;}'.format(this.ds.iconWidth);

    // //eliminate margin and padding
    // cssInner += '#{0} .k-TabStripH-items .k-link {margin:0px;padding:0px }'.format(this.ds.htmlID);
    // var len = this.ds.tabCollection.length;
// 
    // for (var i = 0; i < len; i++) {
      // var cssStr = '.tab' + (i + 1) + ' ';
// 
      // cssInner += this.makeBackgroundPosition(' ' + cssStr, i, 1);
      // cssInner += this.makeBackgroundPosition(' .k-state-active ' + cssStr, i, 0);
      // cssInner += this.makeBackgroundPosition(' .k-state-hover ' + cssStr, i, 2);
//       
      // cssInner += this.makeBackgroundPosition(' .k-state-selected .' + tab.cssClass, i, 4);
// 
// 
//       
    // };

    var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
    $(cssStr).appendTo('head');
  }

};



/**
 * @public
 */
lgb.component.TabStripH.prototype.injectTo = function(parentElement) {

  var el = this.getMainElement();

  this.kendoTabStrip_ = el.kendoTabStrip({
    dataTextField : "title",
    dataSpriteCssClass : "cssClass",
    dataContentField : "content",
    dataSource : this.ds.tabCollection
  }).data("kendoTabStrip");

  this.bind_();
  
  this.kendoTabStrip_.select(0);
  this.ds.kendoDS = this.kendoTabStrip_.dataSource;
  
  
  goog.base(this,'injectTo', parentElement);

};

