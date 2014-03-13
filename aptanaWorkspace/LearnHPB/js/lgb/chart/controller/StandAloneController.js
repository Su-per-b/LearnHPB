/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.chart.controller.StandAloneController');

goog.require('lgb.core.BaseController');
goog.require('lgb.core.Config');
goog.require('lgb.chart.controller.LayoutController');
goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.scenario.controller.ScenarioController');
          

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.StandAloneController = function() {
  
  lgb.core.BaseController.call(this);
  

};
goog.inherits(lgb.chart.controller.StandAloneController, lgb.core.BaseController);




lgb.chart.controller.StandAloneController.prototype.init = function() {
  
  lgb.globalEventBus = new lgb.core.EventBus();
  
  var theTitle = lgb.core.Config.getTitle();
   $('title').html(theTitle);
  
  
  this.layoutController = new lgb.chart.controller.LayoutController();
  this.layoutController.init();
  
  this.simMainController_ = new lgb.simulation.controller.MainController();
  this.simMainController_.init();
  
  this.scenarioController_ = new lgb.scenario.controller.ScenarioController();


};






