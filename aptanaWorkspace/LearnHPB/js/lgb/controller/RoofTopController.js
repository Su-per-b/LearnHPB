/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.RoofTopController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.model.RoofTopModel');
goog.require('lgb.view.RoofTopView');


/**
 * MVC controller for the RoofTopController
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.RoofTopController = function() {
  this._NAME = 'lgb.controller.RoofTopController';
  lgb.controller.ControllerBase.call(this);
  this.init_();
};
goog.inherits(lgb.controller.RoofTopController, lgb.controller.ControllerBase);

/**
 * @private
 */
lgb.controller.RoofTopController.prototype.init_ = function() {

  this.dataModel = new lgb.model.RoofTopModel();
  this.view = new lgb.view.RoofTopView(this.dataModel);

  this.listenTo(this.view,
    lgb.events.SelectableLoaded.TYPE,
    this.onSelectableLoaded);

  this.view.init();

  this.makeAddToWorldRequestGlobal();
};


/**
 * @param {lgb.events.SelectableLoaded} event the event telling
 * about a new seletable 3D Object.
 */
lgb.controller.RoofTopController.prototype.onSelectableLoaded =
  function(event) {

  this.dispatch(event);
};


/**
 * @param {lgb.model.BuildingModel.Group} group The group to make
 * visible.
 */
lgb.controller.RoofTopController.prototype.setVisiblityGroup =
  function(group) {

  this.dataModel.setVisiblityGroup(group);
};

