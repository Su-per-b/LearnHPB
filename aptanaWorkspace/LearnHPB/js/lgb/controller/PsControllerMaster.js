/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.PsControllerMaster');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.controller.PsController');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.DataModelInitialized');
goog.require('lgb.events.BuildingHeightChanged');
goog.require('lgb.events.WorldCreated');
goog.require('lgb.model.PsModel');
goog.require('lgb.model.PsModelMaster');
goog.require('lgb.view.ParticleSystemAdminView');
goog.require('lgb.view.PsView');
goog.require('lgb.view.PsViewMaster');



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
  this.psViewMaster = new lgb.view.PsViewMaster(this.psDataModelMaster);
  
  this.bind_();
  
 // this.psViewMaster.init();
   this.psDataModelMaster.load();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.PsControllerMaster.prototype.bind_ = function() {
  
  this.makeAddToWorldRequestGlobal(this.psViewMaster);



  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
   );
    
};



lgb.controller.PsControllerMaster.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.psViewMaster.setBuildingHeight(event.payload);
};




