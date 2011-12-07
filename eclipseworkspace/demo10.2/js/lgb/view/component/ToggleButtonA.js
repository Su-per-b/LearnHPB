goog.provide('lgb.view.component.ToggleButtonA');
goog.require('lgb.view.ViewBase');


/**
 * Html button type object made with a <div> that will be instered into the DOM
 * @param {Object} options Use this to set things like the title and id.
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.component.ToggleButtonA = function(options) {
  lgb.view.ViewBase.call(this);

  this.options = $.extend({ // Default values
    htmlId: 'IDnotSet',
    xPosition: 0,
    buttonHeight: 42, // millisecond, transition time
    title: 'link title not set',
    cssClass: false
  }, options);

  this.htmlID = options.htmlId;
  this.isSelected = false;

  this._NAME = 'lgb.view.component.ToggleButtonA';
};
goog.inherits(lgb.view.component.ToggleButtonA, lgb.view.ViewBase);


/**
 * @return {string} The Css to be injected into the DOM.
 */
lgb.view.component.ToggleButtonA.prototype.getCss = function() {

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
lgb.view.component.ToggleButtonA.prototype.setSelected =
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
lgb.view.component.ToggleButtonA.prototype.getHtml = function() {

    var cssClass = '';
    if (this.options.cssClass) {
      cssClass = ' class="{0}"'.format(this.options.cssClass);
    }

    var html =
    '<a id="{0}" title="{1}"{2} href="#"></a>'
    .format(this.options.htmlId, this.options.title, cssClass);

     return html;
};


/**
 * @param {string} appendToSelector The second part of the
 * jQuery selector string.
 * @param {number} yPosition Used to calculate the pixel shift.
 * @return {string} the Css.
 */
lgb.view.component.ToggleButtonA.prototype.makeBackgroundPosition =
  function(appendToSelector, yPosition) {

  var pixelShift = this.options.buttonHeight * yPosition * -1;

  var cssStr =
  '#{0}{1}{background-position: {2}px {3}px;}'
  .format(this.options.htmlId,
    appendToSelector,
    this.options.xPosition.toString(),
    pixelShift.toString());

  return cssStr;
};











