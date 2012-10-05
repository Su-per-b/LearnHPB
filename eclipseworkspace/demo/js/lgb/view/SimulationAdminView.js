/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.SimulationAdminView');

goog.require('lgb.component.RadioButtonDataSource');
goog.require('lgb.component.RadioButtonGroup');
goog.require('lgb.component.LinkDataSource');

goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.DataSourceChanged');
goog.require('lgb.events.RequestDataModelChange');

goog.require('lgb.events.RequestSimulationStateChange');
goog.require('lgb.model.SimulationModelState');

goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.EnvelopeModel} dataModel the model to display.
 * @param {string} parentHTMLid The CSS id of the DOM parent.
 */
lgb.view.SimulationAdminView = function(dataModel, parentHTMLid) {
  lgb.view.ViewBase.call(this, dataModel);

  this.parentHTMLid = parentHTMLid;
  this._NAME = 'lgb.view.SimulationAdminView';
  this.htmlID = 'simulationAdminView';
  
  var ds = new lgb.component.LinkDataSource('Play',this.htmlID, 'play')
  this.playLink_ = new lgb.component.Link(ds);
  
};
goog.inherits(lgb.view.SimulationAdminView, lgb.view.ViewBase);


/**
 * Initializes the View
 * @public
 */
lgb.view.SimulationAdminView.prototype.init = function() {
  
  
  /*
  this.button =
    new lgb.view.component.ToggleButtonA({
      htmlId: 'simulationButtonLink',
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


  this.playLink_.bind();

  this.listenTo(
    this.playLink_,
    lgb.events.MouseClick.TYPE,
    this.onMouseClick_
    );
    
    
};

/**
 * event handler
 * @private
 * @param {lgb.events.MouseClick} event The Event.
 */
lgb.view.SimulationAdminView.prototype.onMouseClick_ = function(event) {

    //var w = $('#simulationWindow').data('kendoWindow');
    
   // w.content("output " );
   // w.open();
    
    var stateObject = {state: lgb.model.SimulationModelState.PLAYING};
    
    var event = new lgb.events.RequestSimulationStateChange(stateObject);
    this.dispatchLocal(event);
      
};


/**
 * Event Handler that fires when the data model changes
 * @param {lgb.events.DataModelChanged} event The event.
 * @protected
 */
lgb.view.SimulationAdminView.prototype.onChange = function(event) {
  //needed to prevent exception.
};




/**
 * injects the html into the DOM
 */
lgb.view.SimulationAdminView.prototype.injectHtml = function() {


  var divHtml = '<div id="{0}" class="adminSubPanel">' +
          '<h3>{1}</h3>' + this.playLink_.getHTML() + 
        '</div>';

  divHtml = divHtml.format(
    this.htmlID,
    this.dataModel._TITLE
    );


  this.append(divHtml);

};