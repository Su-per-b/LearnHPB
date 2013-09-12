goog.provide('lgb.controller.input.SimulationInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.input.SimulationInputGUI');
goog.require('lgb.model.input.BaseInputModel');

goog.require('lgb.simulation.controller.MainController');



lgb.controller.input.SimulationInputController = function() {

  lgb.controller.BaseController.call(this);
  this.bind_();
  
};
goog.inherits(lgb.controller.input.SimulationInputController, lgb.controller.BaseController);





lgb.controller.input.SimulationInputController.prototype.bind_ = function(event) {
  
    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
    
};



lgb.controller.input.SimulationInputController.prototype.onSimulationEngineLoaded_ = function(event) {

  this.simMainController_ = event.payload;
  this.init_();

};


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.input.SimulationInputController.prototype.init_ = function() {

  this.dataModel = this.simMainController_.getDataModel();
  this.guiView = new lgb.view.input.SimulationInputGUI(this.dataModel);
  
  this.bind2_();
  this.guiView.init();
  
};


lgb.controller.input.SimulationInputController.prototype.bind2_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
    
    this.listenTo (
        this.guiView,
        se.WebSocketChangeRequest,
        this.onWebSocketChangeRequest_
    );



    this.listenTo (
        this.guiView,
        lgb.simulation.events.SimStateNativeRequest.TYPE,
        this.onSimStateNativeRequest_
    );
    
    


};




lgb.controller.input.SimulationInputController.prototype.onSimStateNativeRequest_ = function(event) {
  
  var payload = event.getPayload();
  
/*
  this.dataModel.changePropertyEx('simStateNative', payload);
  this.simMainController_.serializeAndSend(event);*/

  
  this.simMainController_.requestSimStateChange(payload);
    
    
  return;
};





lgb.controller.input.SimulationInputController.prototype.onWebSocketChangeRequest_ = function(event) {

  this.simMainController_.requestWebSocketStateChange(event.payload);

};



lgb.controller.input.SimulationInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};




/**
 * @private
 */
lgb.controller.input.SimulationInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

