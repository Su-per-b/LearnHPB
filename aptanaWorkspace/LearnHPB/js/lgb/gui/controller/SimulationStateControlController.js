goog.provide('lgb.gui.controller.SimulationStateControlController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationStateControlGUI');
goog.require('lgb.gui.model.BaseInputModel');

goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.gui.view.SimulationConsoleGUI');



lgb.gui.controller.SimulationStateControlController = function() {

  lgb.core.BaseController.call(this);
  this.bind_();
  
};
goog.inherits(lgb.gui.controller.SimulationStateControlController, lgb.core.BaseController);





lgb.gui.controller.SimulationStateControlController.prototype.bind_ = function(event) {
  
    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );

};



lgb.gui.controller.SimulationStateControlController.prototype.onSimulationEngineLoaded_ = function(event) {

  this.simMainController_ = event.payload;
  this.init_();

};


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.SimulationStateControlController.prototype.init_ = function() {

  this.dataModel = this.simMainController_.getDataModel();
  this.simulationStateControlGUI_ = new lgb.gui.view.SimulationStateControlGUI(this.dataModel);
  
  this.bind2_();
  this.simulationStateControlGUI_.init();
  
};


lgb.gui.controller.SimulationStateControlController.prototype.bind2_ = function() {

  this.relayLocal(
    this.simulationStateControlGUI_,
    e.RequestAddToParentGUI);
    
    
    this.listenTo (
        this.simulationStateControlGUI_,
        se.WebSocketChangeRequest,
        this.onWebSocketChangeRequest_
    );

    this.listenTo (
        this.simulationStateControlGUI_,
        lgb.simulation.events.SimStateNativeRequest.TYPE,
        this.onSimStateNativeRequest_
    );

    
};




lgb.gui.controller.SimulationStateControlController.prototype.onSimStateNativeRequest_ = function(event) {
  
  var payload = event.getPayload();
  this.simMainController_.requestSimStateChange(payload);
};





lgb.gui.controller.SimulationStateControlController.prototype.onWebSocketChangeRequest_ = function(event) {
  
  this.simMainController_.requestWebSocketStateChange(event.payload);
};



lgb.gui.controller.SimulationStateControlController.prototype.onRequestAddToGUI_ = function(event) {

  this.simulationStateControlGUI_.add(event.payload);

};




/**
 * @private
 */
lgb.gui.controller.SimulationStateControlController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.simulationStateControlGUI_.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

