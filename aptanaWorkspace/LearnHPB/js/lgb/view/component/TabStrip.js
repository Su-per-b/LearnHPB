/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');


/**
 * Html radio button group that will be inserted into the DOM
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.component.TabStripDataSource} ds the datasource
 * for this component.
 */
lgb.component.TabStrip = function(ds) {
    
  this._NAME = 'lgb.component.TabStrip';
  lgb.view.ViewBase.call(this, null, ds.htmlID, ds.parentHtmlID);
  this.ds = ds;

  this.makeElement_();
};
goog.inherits(lgb.component.TabStrip, lgb.view.ViewBase);



lgb.component.TabStrip.prototype.makeElement_ = function() {
    
     this.element_ = $('<div>')
        .attr('id', this.htmlID);
     
     this.element_.kendoTabStrip (
         {
            dataTextField: "title",
            dataSpriteCssClass: "cssClass",
            dataContentField: "content",
            dataSource: this.ds.tabCollection
         }
        )
    .data("kendoTabStrip").select(0);

};


lgb.component.TabStrip.prototype.getElement_ = function() {
    
  return this.element_;
  
};



lgb.component.TabStrip.prototype.setOptions = function(options) {
    
    this.options = options;
    
    if (this.options.width) {
        this.element_.css( 'width', this.options.width )
    }

};



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
        
        for (var i=0; i < len; i++) {
            var cssStr = '.tab' + (i + 1) + ' ';
            
            cssInner += this.makeBackgroundPosition (' ' + cssStr, i, 1 );
            cssInner += this.makeBackgroundPosition (' .k-state-active ' + cssStr, i, 0);
            cssInner += this.makeBackgroundPosition (' .k-state-hover ' + cssStr, i, 2);
        };
        
        var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
        $(cssStr).appendTo('head');
    }
    
}



/**
 * @param {string} appendToSelector The second part of the
 * jQuery selector string.
 * @param {number} yPosition Used to calculate the pixel shift.
 * @return {string} the Css.
 */
lgb.component.TabStrip.prototype.makeBackgroundPosition =
        function(appendToSelector, xPosition ,yPosition  ) {

  var pixelShiftY = this.ds.iconHeight * yPosition * -1;
  var pixelShiftX = this.ds.iconWidth * xPosition * -1;


  var cssStr =
  '#{0}{1}{background-position: {2}px {3}px;}'
  .format(
    this.htmlID,
    appendToSelector,
    pixelShiftX.toString(),
    pixelShiftY.toString());

  //cssStr += '/n';
    
    
  return cssStr;
};




/**
 * @return {string} The Html to be injected into the DOM.
 */
lgb.component.TabStrip.prototype.getHtml = function() {
    
  return this.element_[0].outerHTML;
  
};



/**
 * @public
 */
lgb.component.TabStrip.prototype.injectHtml = function() {

  this.append(this.element_);
  
};





