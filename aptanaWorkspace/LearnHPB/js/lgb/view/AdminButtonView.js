/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.AdminButtonView');
goog.require('lgb.events.RequestActivateView');
goog.require('lgb.view.ViewBase');
goog.require('lgb.view.component.ToggleButtonA');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.AdminButtonView = function() {
  lgb.view.ViewBase.call(this);
  this.htmlID = 'adminButton';
  this._NAME = 'lgb.view.AdminButtonView';
};
goog.inherits(lgb.view.AdminButtonView, lgb.view.ViewBase);

/**
 * Initializes the view.
 */
lgb.view.AdminButtonView.prototype.init = function() {

  this.button =
    new lgb.view.component.ToggleButtonA({
      htmlID: 'adminButtonLink',
      buttonHeight: 33,
      xPosition: 66,
      title: 'Show / Hide Admin panel',
      cssClass: 'leftNavButton'
    });

    this.injectCss();
    this.injectHtml();
    this.bind_();
    this.listen(lgb.events.WindowResize.TYPE, this.onResize);
};

/**
 * show the panel.
 */
lgb.view.AdminButtonView.prototype.show = function() {
  this.position();
};

/**
 * Compute the location of the window.
 */
lgb.view.AdminButtonView.prototype.position = function() {

  var x = this.getXpos();

  var props = {left: x + 'px'};
    this.jq().css(props);
};


/**
 * Event handler
 * @param {lgb.events.WindowResize} event Notiftys us the the browser
 * window has been resized.
 */
lgb.view.AdminButtonView.prototype.onResize = function(event) {

    var x = this.getXpos();

    var options = {
      duration: 500,
      easing: 'easeInOutSine'
  };
  var props = {left: x + 'px'};

  this.jq().animate(
      props,
      options
  );

};

/**
 * used to calculation the position of the button.
 * @return {number} the position x.
 */
lgb.view.AdminButtonView.prototype.getXpos = function() {
  return window.innerWidth - 33 - 4;
};

/**
 * Injects the HTML into the DOM.
 */
lgb.view.AdminButtonView.prototype.injectHtml = function() {
  var html = '<div id="adminButton">' + this.button.getHtml() +
        '</div>';


   $('body').append(html);
};


/**
 * Injects the CSS into the DOM.
 */
lgb.view.AdminButtonView.prototype.injectCss = function() {

    var cssInner = this.button.getCss();
    var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);

    $(cssStr).appendTo('head');
};


/**
 * @param {boolean} isSelected Set to true to add the 'selected' class.
 */
lgb.view.AdminButtonView.prototype.setSelected = function(isSelected) {
  this.isSelected = isSelected;

  if (this.isSelected) {
    $('#adminButtonLink').addClass('selected');
  } else {
    $('#adminButtonLink').removeClass('selected');
  }

};

/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.AdminButtonView.prototype.bind_ = function() {

  $('#adminButtonLink').click(this.d(this.onClick_));

  var toolTipConfig = {
    skin: 'light',
    hook: {
      target: 'leftmiddle',
      tooltip: 'rightmiddle'
    },
    background: { color: '#fff', opacity: .85 },
    closeButton: false
  };

  Tipped.create('#adminButtonLink', toolTipConfig);
};


/**
 * @private
 * When the user clicks the buttont then dispatch the event.
 */
lgb.view.AdminButtonView.prototype.onClick_ = function() {
  var event = new lgb.events.RequestActivateView(!this.isSelected);
  this.dispatchLocal(event);
};

















