/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.SimulationButtonGreenGUI');
goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.ToggleButtonA');

/**
 * @constructor
 * @extends {lgb.gui.view.BaseGUI}
 */
lgb.world.view.SimulationButtonGreenGUI = function() {
    
  this._TITLE = "SimulationButton";
  lgb.gui.view.BaseGUI.call(this, null, 'simulationButton', lgb.core.Config.HUD_CONTAINER_STR);

};
goog.inherits(lgb.world.view.SimulationButtonGreenGUI, lgb.gui.view.BaseGUI);

/**
 * Initializes the view.
 */
lgb.world.view.SimulationButtonGreenGUI.prototype.init = function() {

  this.button =
    new lgb.component.ToggleButtonA({
      htmlID: 'simulationButtonLink',
      buttonHeight: 33,
      xPosition: 33,
      title: 'Show / Hide Simulation panel'
    });
  
  var html = '<div id="simulationButton">' + this.button.getHtml() +
        '</div>';

  this.append(html);

};


lgb.world.view.SimulationButtonGreenGUI.prototype.inject = function(parentElement) {
  
  this.injectCss_();
  
  goog.base(this, 'inject', parentElement);
  
  this.simulationButtonLink_ = $('#simulationButtonLink');
    
  var toolTipConfig = {
    skin: 'light',
    hook: {
      target: 'leftmiddle',
      tooltip: 'rightmiddle'
    },
    background: { color: '#fff', opacity: .85 },
    closeButton: false
  };

  Tipped.create('#simulationButtonLink', toolTipConfig);
  
  this.bind_();
    
};


/**
 * Injects the CSS into the DOM.
 */
lgb.world.view.SimulationButtonGreenGUI.prototype.injectCss_ = function() {
  
    var cssInner = this.button.getCss();
    var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
    $(cssStr).appendTo('head');
    
};


/**
 * Adds or removes the 'selected' CSS class.
 * @param {boolean} isSelected If true adds the class.
 */
lgb.world.view.SimulationButtonGreenGUI.prototype.setSelected = function(isSelected) {
  this.isSelected = isSelected;

  if (this.isSelected) {
    this.simulationButtonLink_.addClass('selected');
  } else {
    this.simulationButtonLink_.removeClass('selected');
  }

};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.view.SimulationButtonGreenGUI.prototype.bind_ = function() {

  this.simulationButtonLink_.click(this.d(this.onClick_));

};

/**
 * Event handler
 * @private
 * @param {jQuery.event} event The click event.
 */
lgb.world.view.SimulationButtonGreenGUI.prototype.onClick_ = function(event) {
  
  this.triggerLocal(e.RequestActivateView, !this.isSelected);

};
