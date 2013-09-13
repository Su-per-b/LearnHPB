/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.PropertiesButtonView');
goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.component.ToggleButtonA');

/**
 * @constructor
 * @extends {lgb.gui.view.BaseViewGUI}
 */
lgb.gui.view.PropertiesButtonView = function() {
    
  this._TITLE = "PropertiesButton";
  lgb.gui.view.BaseViewGUI.call(this, null, 'propertiesButton', lgb.Config.HUD_CONTAINER_STR);

};
goog.inherits(lgb.gui.view.PropertiesButtonView, lgb.gui.view.BaseViewGUI);

/**
 * Initializes the view.
 */
lgb.gui.view.PropertiesButtonView.prototype.init = function() {

  this.button =
    new lgb.component.ToggleButtonA({
      htmlID: 'propertiesButtonLink',
      buttonHeight: 33,
      xPosition: 0,
      title: 'Show / Hide Properties panel'
    });
  
  var html = '<div id="propertiesButton">' + this.button.getHtml() +
        '</div>';

  this.append(html);

};


lgb.gui.view.PropertiesButtonView.prototype.inject = function(parentElement) {
  
  this.injectCss_();
  
  goog.base(this, 'inject', parentElement);
  
  this.propertiesButtonLink_ = $('#propertiesButtonLink');
    
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
  
  this.bind_();
    
};


/**
 * Injects the CSS into the DOM.
 */
lgb.gui.view.PropertiesButtonView.prototype.injectCss_ = function() {
  
    var cssInner = this.button.getCss();
    var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
    $(cssStr).appendTo('head');
    
};


/**
 * Adds or removes the 'selected' CSS class.
 * @param {boolean} isSelected If true adds the class.
 */
lgb.gui.view.PropertiesButtonView.prototype.setSelected = function(isSelected) {
  this.isSelected = isSelected;

  if (this.isSelected) {
    this.propertiesButtonLink_.addClass('selected');
  } else {
    this.propertiesButtonLink_.removeClass('selected');
  }

};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.gui.view.PropertiesButtonView.prototype.bind_ = function() {

  this.propertiesButtonLink_.click(this.d(this.onClick_));

};

/**
 * Event handler
 * @private
 * @param {jQuery.event} event The click event.
 */
lgb.gui.view.PropertiesButtonView.prototype.onClick_ = function(event) {
  
  this.triggerLocal(e.RequestActivateView, !this.isSelected);

};

