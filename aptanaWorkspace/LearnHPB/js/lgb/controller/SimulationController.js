/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.SimulationController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.view.SimulationAdminView');
goog.require('lgb.view.SimulationView');
goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.simulation.model.MainModel');
goog.require('lgb.simulation.events.SimStateNativeRequest');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.SimulationController = function() {
  lgb.controller.ControllerBase.call(this);
    
    
  this.simulationMainController_ = new lgb.simulation.controller.MainController();
  this.dataModel = this.simulationMainController_.getDataModel();
  
  this.view = new lgb.view.SimulationView(this.dataModel);
  this.adminView = new lgb.view.SimulationAdminView(this.dataModel, 'adminView');

  this.view.init();
  this.adminView.init();
  

  
};

goog.inherits(lgb.controller.SimulationController, lgb.controller.ControllerBase);




