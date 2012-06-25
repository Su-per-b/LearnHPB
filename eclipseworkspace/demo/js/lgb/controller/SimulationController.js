/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.SimulationController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.model.SimulationModel');
goog.require('lgb.view.SimulationAdminView');
goog.require('lgb.view.SimulationView');

goog.require('lgb.events.RequestSimulationStateChange');



/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.SimulationController = function() {
  lgb.controller.ControllerBase.call(this);

  this.dataModel = new lgb.model.SimulationModel();
  
  this.view = new lgb.view.SimulationView(this.dataModel);
  this.adminView = new lgb.view.SimulationAdminView(this.dataModel, 'adminView');
  
  this.bind_();

  this.view.init();
  this.adminView.init();
  this.isInitialized_ = false;
  
};

goog.inherits(lgb.controller.SimulationController, lgb.controller.ControllerBase);



/**
 * Handler used for websocket init
 * @private
 */
lgb.controller.SimulationController.prototype.init = function(event) {
  
  
 // console.log("SimulationController.onOpen_()");
 
  if (window.MozWebSocket) {
    this.ws_ = new MozWebSocket(this.dataModel.socketServerURL);
  } else if (window.WebSocket) {
    this.ws_ = new WebSocket(this.dataModel.socketServerURL);     
  } else {
   // this.ws_ = new MozWebSocket(this.dataModel.socketServerURL);
    alert ("This web Browser does not support Web Sockets");
  }
    
  this.ws_.onopen = this.d(this.onOpen_);
  this.ws_.onmessage = this.d(this.onMessage_);
  this.ws_.onclose = this.d(this.onClose_);
  this.ws_.onerror = this.d(this.onError_);
 
  this.isInitialized_ = true;
  

  
  
};



/**
 * Handler used for websocket communication
 * @private
 */
lgb.controller.SimulationController.prototype.onOpen_ = function(event) {
  
  console.log("SimulationController.onOpen_()");
  
  
  this.ws_.send('start');
  
  
  
};


/**
 * Handler used for websocket communication
 * @private
 */
lgb.controller.SimulationController.prototype.onMessage_ = function(event) {
    
  if (event.data) {
  
    var text = event.data;
    console.log("SimulationController.onMessage_() - " + text);
    
    this.dataModel.addResult(text);
    
    
  }
    
    
  
  
};

/**
 * Handler used for websocket communication
 * @private
 */
lgb.controller.SimulationController.prototype.onClose_ = function(event) {
  
  console.log("SimulationController.onClose_()");
  
};

/**
 * Handler used for websocket communication
 * @private
 */
lgb.controller.SimulationController.prototype.onError_ = function(event) {
  
  console.log("SimulationController.onError_()");
  
};






/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.SimulationController.prototype.bind_ = function() {

  this.listenTo(
    this.adminView,
    lgb.events.RequestSimulationStateChange.TYPE,
    this.onRequestSimulationChange_);
    
    
  this.listenTo(
    this.dataModel,
    lgb.events.DataModelChanged.TYPE,
    this.onDataModelChanged
  );
    
  this.listenTo(
    this.view,
    lgb.events.RequestSimulationStateChange.TYPE,
    this.onRequestSimulationChange_
  );
  
  
    
    
};




/**
 * @private
 * @param {lgb.events.onViewClosed} event Fired.
 */
lgb.controller.SimulationController.prototype.onViewClosed =
  function(event) {
  

    var stateObject = {state: lgb.model.SimulationModelState.STOPPED};
    
  //  var event = new lgb.events.RequestSimulationStateChange(stateObject);
   // this.dispatchLocal(event);
    
    
    this.dataModel.change(stateObject);


};



/**
 * @private
 * @param {lgb.events.DataModelChanged} event Fired.
 */
lgb.controller.SimulationController.prototype.onDataModelChanged =
  function(event) {
  
  var whatIsDirty = event.payload;
 
  if (whatIsDirty.state) {
    if (this.dataModel.state == lgb.model.SimulationModelState.PLAYING) {
      this.startSimulation();
    } else {
      this.ws_.close();
      this.ws_ = null;
    }
  }
  
 // if (whatIsDirty.results) {
   // var len =  this.dataModel.results.length;
 //   this.messageBox.append(this.dataModel.results[len-1]);
 // }
  
  
  

};




/**
 * @private
 * @param {lgb.events.onRequestSimulationChange_} event Fired.
 */
lgb.controller.SimulationController.prototype.startSimulation =
  function(event) {
  
  
   // if (!this.isInitialized_) {
      this.init();
   // } else {
      
       //
       
   // }

    
    console.log('startSimulation() establishing connection to: ' + 
      this.dataModel.socketServerURL);
      
    
    
  
};


/**
 * @private
 * @param {lgb.events.onRequestSimulationChange_} event Fired.
 */
lgb.controller.SimulationController.prototype.onRequestSimulationChange_ =
  function(event) {
  
  var stateObject = event.payload;
  this.dataModel.change(stateObject);
  
};



