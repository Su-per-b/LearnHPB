goog.provide('lgb.controller.PsControllerMaster');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.controller.PsController');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.DataModelInitialized');
goog.require('lgb.events.RequestDataModelChange');
goog.require('lgb.events.WorldCreated');
goog.require('lgb.model.PsModel');
goog.require('lgb.model.PsModelMaster');
goog.require('lgb.view.ParticleSystemAdminView');
goog.require('lgb.view.PsView');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.PsControllerMaster = function() {
  lgb.controller.ControllerBase.call(this);
  this.init();
};
goog.inherits(lgb.controller.PsControllerMaster, lgb.controller.ControllerBase);

/**
 * Initialized the controller.
 */
lgb.controller.PsControllerMaster.prototype.init = function() {
  this.psDataModelMaster = new lgb.model.PsModelMaster();
  this.psControllers = [];
  this.bind_();
  this.psDataModelMaster.load();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.PsControllerMaster.prototype.bind_ = function() {

  this.listenTo(this.psDataModelMaster,
    lgb.events.DataModelInitialized.TYPE,
    this.onPsDataModelInitialized_);

};


/**
 * @private
 * @param {lgb.events.Object3DLoaded} event The Event.
 */
lgb.controller.PsControllerMaster.prototype.onObject3DLoaded_ =
  function(event) {

  this.dispatch(event);
};


/**
 * For each PS data model spawn an MVC triad.
 * @private
 * @param {lgb.events.DataModelInitialized} event Fired by the dataModel
 * when it is ready.
 */
lgb.controller.PsControllerMaster.prototype.onPsDataModelInitialized_ =
  function(event) {

  var len = this.psDataModelMaster.psModelList.length;
  for (var i = 0; i < len; i++) {

    var dataModel = this.psDataModelMaster.psModelList[i];
    var controller = new lgb.controller.PsController(dataModel);
    this.psControllers.push(controller);
  }

};
