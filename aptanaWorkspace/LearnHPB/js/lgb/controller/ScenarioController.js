/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ScenarioController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.events.DataModelInitialized');
goog.require('lgb.events.ScenarioParsed');
goog.require('lgb.model.scenario.Base');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.ScenarioController = function() {
  lgb.controller.ControllerBase.call(this);

  this.dataModel = new lgb.model.scenario.Base();

  this.listenTo(this.dataModel,
     lgb.events.DataModelInitialized.TYPE,
      this.onDataModelInitialized_);

  this.dataModel.load();
};
goog.inherits(lgb.controller.ScenarioController, lgb.controller.ControllerBase);


/**
 * @private
 * @param {lgb.events.DataModelInitialized} event Fired by the
 * data model when it is ready.
 */
lgb.controller.ScenarioController.prototype.onDataModelInitialized_ =
  function(event) {

  var e = new lgb.events.ScenarioParsed(this.dataModel);
  this.dispatch(e);
};


