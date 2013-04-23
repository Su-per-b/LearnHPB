/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ScenarioController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.events.DataModelInitialized');
goog.require('lgb.events.ScenarioParsed');
goog.require('lgb.model.scenario.Base');


/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.ScenarioController = function() {
  this._NAME = 'lgb.controller.ScenarioController';
  lgb.controller.BaseController.call(this);

  this.dataModel = new lgb.model.scenario.Base();

  this.listenTo(this.dataModel,
     lgb.events.DataModelInitialized.TYPE,
      this.onDataModelInitialized_);

  this.dataModel.load();
};
goog.inherits(lgb.controller.ScenarioController, lgb.controller.BaseController);


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


