/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.ToggleButtonA');
goog.require('lgb.world.view.BaseV');


/**
 * Html button type object made with a <div> that will be instered into the DOM
 * @param {Object} options Use this to set things like the title and id.
 * @constructor
 * @extends {lgb.world.view.BaseV}
 */
lgb.component.ToggleButtonA = function(options) {
    

  lgb.world.view.BaseV.call(this, null, options.htmlID);

  this.options = $.extend({ // Default values
    htmlID: 'IDnotSet',
    xPosition: 0,
    buttonHeight: 42, 
    title: 'link title not set',
    cssClass: false
  }, options);


  this.isSelected = false;


};
goog.inherits(lgb.component.ToggleButtonA, lgb.world.view.BaseV);


/**
 * @return {string} The Css to be injected into the DOM.
 */
lgb.component.ToggleButtonA.prototype.getCss = function() {

  var cssInner = this.makeBackgroundPosition('', 0);
  cssInner += this.makeBackgroundPosition(':hover', 1);
  cssInner += this.makeBackgroundPosition('.selected', 2);
  cssInner += this.makeBackgroundPosition('.selected:hover ', 3);
  cssInner += this.makeBackgroundPosition(':active', 4);
  cssInner += this.makeBackgroundPosition('.selected:active', 4);

  return cssInner;
};


/**
 * @param {boolean} makeSelected Should the 'selected' class be
 * injected into the tag.
 */
lgb.component.ToggleButtonA.prototype.setSelected =
  function(makeSelected) {

  if (this.isSelected != makeSelected) {
    this.isSelected = makeSelected;
    if (this.isSelected) {
      this.jq().addClass('selected');
    } else {
      this.jq().removeClass('selected');
    }
  }

};


/**
 * @return {string} the HTML.
 */
lgb.component.ToggleButtonA.prototype.getHtml = function() {

    var cssClass = '';
    if (this.options.cssClass) {
      cssClass = ' class="{0}"'.format(this.options.cssClass);
    }

    var html =
    '<a id="{0}" title="{1}"{2} href="#"></a>'
    .format(this.options.htmlID, this.options.title, cssClass);

     return html;
};


/**
 * @param {string} appendToSelector The second part of the
 * jQuery selector string.
 * @param {number} yPosition Used to calculate the pixel shift.
 * @return {string} the Css.
 */
lgb.component.ToggleButtonA.prototype.makeBackgroundPosition =
  function(appendToSelector, yPosition) {

  var pixelShift = this.options.buttonHeight * yPosition * -1;

  var cssStr =
  '#{0}{1}{background-position: {2}px {3}px;}'
  .format(this.options.htmlID,
    appendToSelector,
    this.options.xPosition.toString(),
    pixelShift.toString());

  return cssStr;
};











