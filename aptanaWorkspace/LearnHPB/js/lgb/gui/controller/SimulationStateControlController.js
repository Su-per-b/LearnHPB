goog.provide('lgb.gui.controller.SimulationStateControlController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationStateControlGUIh');


goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.gui.view.SimulationConsoleGUI');
goog.require('se.Event');



lgb.gui.controller.SimulationStateControlController = function() {

  lgb.core.BaseController.call(this);

  
};
goog.inherits(lgb.gui.controller.SimulationStateControlController, lgb.core.BaseController);




lgb.gui.controller.SimulationStateControlController.prototype.init = function(simulationMainController) {
  
  this.simulationMainController_ = simulationMainController;
  this.dataModel = this.simulationMainController_.getDataModel();
    
  this.guiView = new lgb.gui.view.SimulationStateControlGUIh(this.dataModel);
  
  this.bind_();
  this.triggerGUI();
  

};




lgb.gui.controller.SimulationStateControlController.prototype.bind_ = function() {

    this.relay (
        this.guiView,
        [se.WebSocketChangeRequest, se.SimStateNativeRequest]
    );

};


