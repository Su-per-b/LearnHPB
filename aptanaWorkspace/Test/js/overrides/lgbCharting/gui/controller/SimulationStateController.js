goog.provide('lgbCharting.gui.controller.SimulationStateController');

goog.require('lgb.core.BaseController');
goog.require('lgbCharting.gui.view.SimulationStateControlGUI');

goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.gui.view.SimulationConsoleGUI');
goog.require('se.Event');



/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */

lgbCharting.gui.controller.SimulationStateController = function() {

  lgb.core.BaseController.call(this);

  
};
goog.inherits(lgbCharting.gui.controller.SimulationStateController, lgb.core.BaseController);




lgbCharting.gui.controller.SimulationStateController.prototype.init = function(simulationMainController) {
  
  this.simulationMainController_ = simulationMainController;
  this.dataModel = {};
    
  this.guiView = new lgbCharting.gui.view.SimulationStateControlGUI(this.dataModel);
  this.bind_();
  
  this.guiView.init();
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
};


lgbCharting.gui.controller.SimulationStateController.prototype.bind_ = function() {

    this.listenTo (
        this.guiView,
        e.DisplayUnitSystemChangeRequest,
        this.onDisplayUnitSystemChangeRequest_
    );

};



lgbCharting.gui.controller.SimulationStateController.prototype.onDisplayUnitSystemChangeRequest_ = function(event) {

      this.dataModel.displayUnitSystem.toggle();
      this.trigger(e.DisplayUnitSystemChangeNotify, this.dataModel.displayUnitSystem);
      
};


