/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.SimulationController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.SimulationView');
goog.require('lgb.view.SimulationButtonView');

goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.simulation.model.MainModel');

goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.ConfigChangeNotify');
goog.require('lgb.simulation.events.XMLparsedEvent');
goog.require('lgb.simulation.events.MessageEvent');


goog.require('lgb.simulation.model.WebSocketConnectionState');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.SimulationController = function(simMainController) {

  lgb.controller.BaseController.call(this);
  this.bind_();
  
};
goog.inherits(lgb.controller.SimulationController, lgb.controller.BaseController);



lgb.controller.SimulationController.prototype.onSimulationEngineLoaded_ = function(event) {
  
  this.simMainController_ = event.payload;
  this.init_();

};





lgb.controller.SimulationController.prototype.init_ = function() {
  this.dataModel = this.simMainController_.getDataModel();
  
  this.view = new lgb.view.SimulationView(this.dataModel);
  this.buttonView = new lgb.view.SimulationButtonView();

  this.bind2_();
  
  this.buttonView.init();
  this.view.init();
  
  this.trigger(e.RequestAddToLayout, this.buttonView);
  this.trigger(e.RequestAddToLayout, this.view);
};


lgb.controller.SimulationController.prototype.bind_ = function() {
  
    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
    
};


lgb.controller.SimulationController.prototype.bind2_ = function() {
    
  this.listenTo (
      this.view,
      lgb.simulation.events.SimStateNativeRequest.TYPE,
      this.onSimStateNativeRequest_);

    
  this.listenTo(this.buttonView,
    e.RequestActivateView,
    this.onRequestActivateView_);
    
  this.listenTo(this.view,
    e.ViewClosed,
    this.onClosedPanel);
    

    
    
};




/**
 * @param {lgb.events.Event} event The event.
 */
lgb.controller.SimulationController.prototype.onRequestActivateView_ =
  function(event) {
    
  var showFlag = event.payload;

  this.buttonView.setSelected(showFlag);
  this.view.show(showFlag);
 
  this.simMainController_.connect(true);
};




/**
 * @private
 * @param {lgb.events.Event} event Fired.
 */
lgb.controller.SimulationController.prototype.onSimStateNativeRequest_ = function(event) {

  this.dataModel.changePropertyEx('simStateNative', event.getPayload());
  this.simMainController_.serializeAndSend(event);

}; 


/**
 * @param {lgb.events.Event} event The event.
 */
lgb.controller.SimulationController.prototype.onClosedPanel =
  function(event) {
    
  this.buttonView.setSelected(false);
  
  this.simMainController_.connect(false);
  
};




