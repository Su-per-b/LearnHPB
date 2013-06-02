/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.SimulationAdminView');

goog.require('lgb.component.RadioButtonDataSource');
goog.require('lgb.component.RadioButtonGroup');
goog.require('lgb.component.LinkDataSource');




goog.require('lgb.events.RequestSimulationStateChange');
goog.require('lgb.model.SimulationModelState');

goog.require('lgb.view.BaseViewGUI');


/**
 * @constructor
 * @extends {lgb.view.BaseViewGUI}
 * @param {lgb.model.EnvelopeModel} dataModel the model to display.
 * @param {string} parentHtmlID The CSS id of the DOM parent.
 */
lgb.view.SimulationAdminView = function(dataModel, parentHtmlID) {
    
  lgb.view.BaseViewGUI.call(this, dataModel, 'simulationAdminView',parentHtmlID);

  var ds = new lgb.component.LinkDataSource('Open',this.htmlID, 'open')
  this.openLink_ = new lgb.component.Link(ds);
  
};
goog.inherits(lgb.view.SimulationAdminView, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 * @public
 */
lgb.view.SimulationAdminView.prototype.init = function() {
  
  
  /*
  this.button =
    new lgb.component.ToggleButtonA({
      htmlID: 'simulationButtonLink',
      buttonHeight: 33,
      xPosition: 66,
      title: 'Play / Pause',
      cssClass: 'leftNavButton'
    });
  */
 
  this.injectHtml();
  this.bind_();
  
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.SimulationAdminView.prototype.bind_ = function() {


  this.openLink_.bind();

  this.listenTo(
    this.openLink_,
    e.MouseClick,
    this.onMouseClick_
    );


    //for debugging
    var stateObject = {state: lgb.model.SimulationModelState.PLAYING};
    
    var event = new lgb.events.RequestSimulationStateChange(stateObject);
    this.dispatchLocal(event);
    
};

/**
 * event handler
 * @private
 * @param {e.MouseClick} event The Event.
 */
lgb.view.SimulationAdminView.prototype.onMouseClick_ = function(event) {


    var stateObject = {state: lgb.model.SimulationModelState.PLAYING};
    
    var event = new lgb.events.RequestSimulationStateChange(stateObject);
    this.dispatchLocal(event);
      
};





/**
 * injects the html into the DOM
 */
lgb.view.SimulationAdminView.prototype.injectHtml = function() {


  var divHtml = '<div id="{0}" class="adminSubPanel">' +
          '<h3>{1}</h3>' + this.openLink_.getHTML() + 
        '</div>';

  divHtml = divHtml.format(
    this.htmlID,
    this.dataModel._TITLE
    );


  this.append(divHtml);

};
