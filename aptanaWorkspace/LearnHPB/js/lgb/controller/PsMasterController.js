/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.PsMasterController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.PsController');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.DataModelInitialized');
goog.require('lgb.events.BuildingHeightChanged');
goog.require('lgb.events.WorldCreated');
goog.require('lgb.model.PsModel');
goog.require('lgb.model.PsModelMaster');
goog.require('lgb.view.ParticleSystemAdminView');
goog.require('lgb.view.PsView');
goog.require('lgb.view.PsMasterView');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.PsMasterController = function() {
  this._NAME = 'lgb.controller.PsMasterController';
  lgb.controller.BaseController.call(this);
  this.init();
};
goog.inherits(lgb.controller.PsMasterController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.PsMasterController.prototype.init = function() {
    
  this.psDataModelMaster = new lgb.model.PsModelMaster();
  this.psViewMaster = new lgb.view.PsMasterView(this.psDataModelMaster);
  
  this.bind_();
  
  this.psDataModelMaster.load();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.PsMasterController.prototype.bind_ = function() {
  
  this.makeAddToWorldRequestGlobal(this.psViewMaster);

  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
   );
    
};



lgb.controller.PsMasterController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.psViewMaster.setBuildingHeight(event.payload);
};




