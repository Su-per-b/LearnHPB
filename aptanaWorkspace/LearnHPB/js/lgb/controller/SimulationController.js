/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.SimulationController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.SimulationAdminView');
goog.require('lgb.view.SimulationView');
goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.simulation.model.MainModel');

goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.ConfigChangeNotify');
goog.require('lgb.simulation.events.XMLparsedEvent');
goog.require('lgb.simulation.events.MessageEvent');

goog.require('lgb.events.DataModelChanged');
goog.require('lgb.simulation.model.WebSocketConnectionState');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.SimulationController = function() {

  lgb.controller.BaseController.call(this);
    
    
  this.simulationMainController_ = new lgb.simulation.controller.MainController();
  this.dataModel = this.simulationMainController_.getDataModel();
  
  this.view = new lgb.view.SimulationView(this.dataModel);
  this.adminView = new lgb.view.SimulationAdminView(this.dataModel, 'adminView');

  this.view.init();
  this.adminView.init();
  
  this.bind_();

  this.simulationMainController_.connect();
  
};
goog.inherits(lgb.controller.SimulationController, lgb.controller.BaseController);


lgb.controller.SimulationController.prototype.bind_ = function() {
    
    this.listenTo (
        this.view,
        lgb.simulation.events.SimStateNativeRequest.TYPE,
        this.onSimStateNativeRequest_
    );
    
    /*
    this.listenTo (
        this.dataModel,
        lgb.events.DataModelChanged.TYPE,
        this.onDataModelChanged_
    );
    */
   
    
    this.listenTo (
        this.simulationMainController_,
        lgb.simulation.events.MessageEvent.TYPE,
        this.onMessageEvent_
    );
    
    
    this.listenTo (
        this.simulationMainController_,
        lgb.simulation.events.SimStateNativeNotify.TYPE,
        this.onSimStateNativeNotify_
    );
    
    
    
    this.listenTo (
        this.simulationMainController_,
        lgb.simulation.events.ConfigChangeNotify.TYPE,
        this.onConfigChangeNotify_
    );
    
    
    this.listenTo (
        this.simulationMainController_,
        lgb.simulation.events.XMLparsedEvent.TYPE,
        this.onXMLparsedEvent_
    );
    
    
    
    this.listenTo (
        this.simulationMainController_,
        lgb.simulation.events.ResultEvent.TYPE,
        this.onResultEvent_
    );
    
    
    
    
    
}


lgb.controller.SimulationController.prototype.onResultEvent_ = function(event) {
      this.dataModel.setScalarValueResults(event.getPayload());
};

lgb.controller.SimulationController.prototype.onXMLparsedEvent_ = function(event) {
      this.dataModel.setXMLparsedInfo(event.getPayload());
};

lgb.controller.SimulationController.prototype.onConfigChangeNotify_ = function(event) {
      //this.dataModel.setMessage(event.getPayload());
};

lgb.controller.SimulationController.prototype.onMessageEvent_ = function(event) {
      this.dataModel.setMessage(event.getPayload());
};


lgb.controller.SimulationController.prototype.onSimStateNativeNotify_ = function(event) {
      this.dataModel.setSimStateNative(event.getPayload());
};


/*
lgb.controller.SimulationController.prototype.onDataModelChanged_ = function(event) {
  
  var whatIsDirty = event.payload;
  
  
  if (whatIsDirty.simStateNative) {
      
        var state = this.dataModel.getSimStateNative();
        var event = new lgb.simulation.events.SimStateNativeRequest(state);

  }

    
};
*/


/**
 * @private
 * @param {lgb.events.RequestGoToViewPoint} event Fired.
 */
lgb.controller.SimulationController.prototype.onSimStateNativeRequest_ = function(event) {
  
    this.dataModel.setSimStateNative(event.getPayload());
    this.simulationMainController_.serializeAndSend(event);
    
};







