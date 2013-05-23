goog.provide('sim.view.TabStripView');

goog.require('sim.view.ViewBase');



sim.view.TabStripView = function(dataModel, htmlID, parentHtmlID) {
  sim.view.ViewBase.call(this, dataModel);

  this.htmlID = htmlID;
  
  if (undefined !== parentHtmlID) {
    this.parentHtmlID = parentHtmlID;
  }

options = {};

  this.options = $.extend({ // Default values
    htmlId: 'IDnotSet',
    xPosition: 0,
    buttonHeight: 25, // millisecond, transition time
    title: 'link title not set',
    cssClass: false
  }, options);
  

  
};
goog.inherits(sim.view.TabStripView, sim.view.ViewBase);


/**
 * @public
 */
sim.view.TabStripView.prototype.init = function() {
 

    //this.injectHtml_();
}


sim.view.TabStripView.prototype.getElement = function() {
    
     var element = $('<div>').attr('id', this.htmlID);
     
     element.kendoTabStrip (
         {
            dataTextField: "title",
            dataSpriteCssClass: "cssClass",
            dataContentField: "content",
            dataSource: this.dataModel.dataSource
         }
        )
    .data("kendoTabStrip").select(0);

    
  return element;
  
};

/**
 * @return {string} The Css to be injected into the DOM.
 */
sim.view.TabStripView.prototype.getCss = function() {

  var cssInner = this.makeBackgroundPosition('', 0);
  cssInner += this.makeBackgroundPosition(':hover', 1);
  cssInner += this.makeBackgroundPosition('.selected', 2);
  cssInner += this.makeBackgroundPosition('.selected:hover ', 3);
  cssInner += this.makeBackgroundPosition(':active', 4);
  cssInner += this.makeBackgroundPosition('.selected:active', 4);

  return '';//cssInner;
};



/**
 * @param {string} appendToSelector The second part of the
 * jQuery selector string.
 * @param {number} yPosition Used to calculate the pixel shift.
 * @return {string} the Css.
 */
sim.view.TabStripView.prototype.makeBackgroundPosition =
  function(appendToSelector, yPosition) {

  var pixelShift = this.options.buttonHeight * yPosition * -1;

  var cssStr =
  '#{0}{1}{background-position: {2}px {3}px;}'
  .format(this.htmlID,
    appendToSelector,
    this.options.xPosition.toString(),
    pixelShift.toString());

  return cssStr;
};


/**
 * @return {string} The Html to be injected into the DOM.
 */
sim.view.TabStripView.prototype.getHtml = function() {
    
  var el = this.getElement();
  return el[0].outerHTML;
  
};



/**
 * @public
 */
sim.view.TabStripView.prototype.injectHtml = function() {

  var el = this.getElement();
  this.append(el);
  
};



