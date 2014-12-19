goog.provide('lgb.gui.controller.SimulationStateController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationStateControlGUI');


goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.gui.view.SimulationConsoleGUI');
goog.require('se.Event');



/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */

lgb.gui.controller.SimulationStateController = function() {

  lgb.core.BaseController.call(this);

  
};
goog.inherits(lgb.gui.controller.SimulationStateController, lgb.core.BaseController);




lgb.gui.controller.SimulationStateController.prototype.init = function(simulationMainController) {
    
  this.displayUnitSystem_ = lgb.integrated.model.DisplayUnitSystem.getInstance();
  this.simulationMainController_ = simulationMainController;
  this.dataModel = this.simulationMainController_.getDataModel();
    
  this.guiView = new lgb.gui.view.SimulationStateControlGUI(this.dataModel);
  this.bind_();
  
  this.guiView.init();
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  

};




lgb.gui.controller.SimulationStateController.prototype.bind_ = function() {

    this.relay (
        this.guiView,
        [se.WebSocketChangeRequest, se.SimStateNativeRequest]
    );
    
    
    this.listenTo (
        this.guiView,
        e.DisplayUnitSystemChangeRequest,
        this.onDisplayUnitSystemChangeRequest_
    );
    

};




lgb.gui.controller.SimulationStateController.prototype.onDisplayUnitSystemChangeRequest_ = function(event) {

      this.displayUnitSystem_.toggle();
      this.trigger(e.DisplayUnitSystemChangeNotify, this.displayUnitSystem_);
      
};


