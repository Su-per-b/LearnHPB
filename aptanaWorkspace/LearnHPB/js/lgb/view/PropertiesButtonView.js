/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.PropertiesButtonView');
goog.require('lgb.events.RequestActivateView');
goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.ToggleButtonA');

/**
 * @constructor
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.PropertiesButtonView = function() {
    

  lgb.view.BaseViewGUI.call(this, null, 'propertiesButton', lgb.Config.HUD_CONTAINER_STR);
  this.layoutID = lgb.Config.LAYOUT_ID.PropertiesButton;

};
goog.inherits(lgb.view.PropertiesButtonView, lgb.view.BaseViewGUI);

/**
 * Initializes the view.
 */
lgb.view.PropertiesButtonView.prototype.init = function() {

  this.button =
    new lgb.component.ToggleButtonA({
      htmlID: 'propertiesButtonLink',
      buttonHeight: 33,
      xPosition: 33,
      title: 'Show / Hide Properties panel'
    });

  this.injectCss_();
  
  
  var html = '<div id="propertiesButton">' + this.button.getHtml() +
        '</div>';

  this.append(html);
  this.bind_();
};


/**
 * Injects the CSS into the DOM.
 */
lgb.view.PropertiesButtonView.prototype.injectCss_ = function() {
  
    var cssInner = this.button.getCss();
    var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
    $(cssStr).appendTo('head');
    
    
};


/**
 * Adds or removes the 'selected' CSS class.
 * @param {boolean} isSelected If true adds the class.
 */
lgb.view.PropertiesButtonView.prototype.setSelected = function(isSelected) {
  this.isSelected = isSelected;

  if (this.isSelected) {
    $('#propertiesButtonLink').addClass('selected');
  } else {
    $('#propertiesButtonLink').removeClass('selected');
  }

};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.PropertiesButtonView.prototype.bind_ = function() {

  $('#propertiesButtonLink').click(this.d(this.onClick_));

  var toolTipConfig = {
    skin: 'light',
    hook: {
      target: 'leftmiddle',
      tooltip: 'rightmiddle'
    },
    background: { color: '#fff', opacity: .85 },
    closeButton: false
  };

  Tipped.create('#propertiesButtonLink', toolTipConfig);
};

/**
 * Event handler
 * @private
 * @param {jQuery.event} event The click event.
 */
lgb.view.PropertiesButtonView.prototype.onClick_ = function(event) {
  this.dispatchLocal(new lgb.events.RequestActivateView(!this.isSelected));
};

