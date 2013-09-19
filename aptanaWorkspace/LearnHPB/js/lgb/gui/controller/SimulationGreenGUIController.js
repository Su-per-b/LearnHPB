/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.SimulationGreenGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.world.view.SimulationGreenGUI');
goog.require('lgb.world.view.SimulationButtonGreenGUI');

goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.simulation.model.MainModel');

goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.ConfigChangeNotify');
goog.require('lgb.simulation.events.XMLparsedEvent');
goog.require('lgb.simulation.events.MessageEvent');


goog.require('lgb.simulation.model.WebSocketConnectionState');

/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.SimulationGreenGUIController = function(simMainController) {

  lgb.core.BaseController.call(this);
  this.bind_();
  
};
goog.inherits(lgb.gui.controller.SimulationGreenGUIController, lgb.core.BaseController);



lgb.gui.controller.SimulationGreenGUIController.prototype.onSimulationEngineLoaded_ = function(event) {
  
  this.simMainController_ = event.payload;
  this.init_();

};





lgb.gui.controller.SimulationGreenGUIController.prototype.init_ = function() {
  this.dataModel = this.simMainController_.getDataModel();
  
  this.view = new lgb.world.view.SimulationGreenGUI(this.dataModel);
  this.buttonView = new lgb.world.view.SimulationButtonGreenGUI();

  this.bind2_();
  
  this.buttonView.init();
  this.view.init();
  
  this.trigger(e.RequestAddToLayout, this.buttonView);
  this.trigger(e.RequestAddToLayout, this.view);
};


lgb.gui.controller.SimulationGreenGUIController.prototype.bind_ = function() {
  
    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
    
};


lgb.gui.controller.SimulationGreenGUIController.prototype.bind2_ = function() {
    
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
 * @param {lgb.core.Event} event The event.
 */
lgb.gui.controller.SimulationGreenGUIController.prototype.onRequestActivateView_ =
  function(event) {
    
  var showFlag = event.payload;
  this.buttonView.setSelected(showFlag);
  this.view.show(showFlag);
  this.simMainController_.connect(true);
};




/**
 * @private
 * @param {lgb.core.Event} event Fired.
 */
lgb.gui.controller.SimulationGreenGUIController.prototype.onSimStateNativeRequest_ = function(event) {

  this.dataModel.changePropertyEx('simStateNative', event.getPayload());
  this.simMainController_.serializeAndSend(event);

}; 


/**
 * @param {lgb.core.Event} event The event.
 */
lgb.gui.controller.SimulationGreenGUIController.prototype.onClosedPanel =
  function(event) {
    
  this.buttonView.setSelected(false);
  this.simMainController_.connect(false);
  
};



