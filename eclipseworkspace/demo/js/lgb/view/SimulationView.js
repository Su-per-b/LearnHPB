/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.SimulationView');

goog.require('lgb.model.SimulationModelState');


/**
 * @constructor
 * @extends {lgb.view.DialogView}
 */
lgb.view.SimulationView = function(dataModel) {
  lgb.view.DialogView.call(this, dataModel);

  this.dataModel = dataModel;
  
  this.htmlID = 'simulationView';
  this.title = 'Simulation View';

  this.useSlideEffect = false;
  this._NAME = 'lgb.view.SimulationView';
};
goog.inherits(lgb.view.SimulationView, lgb.view.DialogView);



/**
 * @protected
 * @param {lgb.events.DataModelChanged} event Fired when the DM changes.
 */
lgb.view.SimulationView.prototype.onChange = function(event) {
 /// this.updateSelected_();
  
  var whatIsDirty = event.payload;
 
  if (whatIsDirty.state) {
    if (this.dataModel.state == lgb.model.SimulationModelState.PLAYING) {
      this.show();
     // this.startSimulation();
    } else {
     // this.ws_.close();
      //this.ws_ = null;
      this.messageBox.empty();
      this.hide();
    }
  }
  
  if (whatIsDirty.results) {
    var len =  this.dataModel.results.length;
    this.messageBox.append(this.dataModel.results[len-1] + '<br />');
  }
  
  
};


/**
 * @public
 */
lgb.view.SimulationView.prototype.init = function() {
  this.injectHtml_();
 // this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.SimulationView.prototype.bind_ = function() {
  
  
  this.listenTo(
    this.dataModel,
    lgb.events.DataModelChanged.TYPE,
    this.onChange
    );
    
    
};


/**
 * Event handler triggered when the user clicks the
 * close button (x) on the dialog.
 * @param {goog.events.Event} event The event received.
 */
lgb.view.SimulationView.prototype.onCloseButtonClicked = function(event) {
 // this.dispatchLocal(new lgb.events.ViewClosed());
 
    var stateObject = {state: lgb.model.SimulationModelState.STOPPED};
    
    var event = new lgb.events.RequestSimulationStateChange(stateObject);
    this.dispatchLocal(event);
};


/**
 * injects HTML into the DOM
 * @private
 */
lgb.view.SimulationView.prototype.injectHtml_ = function() {
  this.makeDialog_();
  
   this.messageBox = $('<div>').attr('id', "simulationMessageBox");
   
  // this.messageBox.append('wla wla');
   this.messageBox.appendTo(this.jq());
  
};



/**
 * injects the dialog panel into the DOM
 * @private
 */
lgb.view.SimulationView.prototype.makeDialog_ = function() {
    var jq = $('<div>')
    .attr('id', this.htmlID);
    jq.direction = 'left';
    jq.bind('dialogclose', this.d(this.onCloseButtonClicked));

    jq.appendTo('body');

    this.dialog = jq.dialog({
      title: this.title,
      dialogClass: this.htmlID + '-dialog',
      hide: 'fade',
      width: 325,
      height: 500,
      position: ['center', 'center'],
      autoOpen: false
    });
};


