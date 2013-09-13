goog.provide('lgb.gui.controller.SimulationInputController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationInputGUI');
goog.require('lgb.gui.model.BaseInputModel');

goog.require('lgb.simulation.controller.MainController');



lgb.gui.controller.SimulationInputController = function() {

  lgb.core.BaseController.call(this);
  this.bind_();
  
};
goog.inherits(lgb.gui.controller.SimulationInputController, lgb.core.BaseController);





lgb.gui.controller.SimulationInputController.prototype.bind_ = function(event) {
  
    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
    
};



lgb.gui.controller.SimulationInputController.prototype.onSimulationEngineLoaded_ = function(event) {

  this.simMainController_ = event.payload;
  this.init_();

};


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.SimulationInputController.prototype.init_ = function() {

  this.dataModel = this.simMainController_.getDataModel();
  this.guiView = new lgb.gui.view.SimulationInputGUI(this.dataModel);
  
  this.bind2_();
  this.guiView.init();
  
};


lgb.gui.controller.SimulationInputController.prototype.bind2_ = function() {

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




lgb.gui.controller.SimulationInputController.prototype.onSimStateNativeRequest_ = function(event) {
  
  var payload = event.getPayload();
  this.simMainController_.requestSimStateChange(payload);
};





lgb.gui.controller.SimulationInputController.prototype.onWebSocketChangeRequest_ = function(event) {
  
  this.simMainController_.requestWebSocketStateChange(event.payload);
};



lgb.gui.controller.SimulationInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};




/**
 * @private
 */
lgb.gui.controller.SimulationInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

