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
goog.require('lgb.events.RequestDataModelChange');

goog.require('lgb.model.PsModel');
goog.require('lgb.model.PsModelMaster');

goog.require('lgb.view.ParticleSystemAdminView');
goog.require('lgb.view.PsView');
goog.require('lgb.view.PsMasterView');
goog.require('lgb.view.PsMasterGUI');


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
    
  this.psMasterDataModel = new lgb.model.PsModelMaster();
  this.psMasterView = new lgb.view.PsMasterView(this.psMasterDataModel);
  
  this.psMasterGUI = new lgb.view.PsMasterGUI(this.psMasterDataModel);

  this.bind_();
  
  this.psMasterGUI.init();
  this.psMasterDataModel.load();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.PsMasterController.prototype.bind_ = function() {
  
  this.makeAddToWorldRequestGlobal(this.psMasterView);

  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
   );
   
   
   
   
  this.listenTo(
    this.psMasterGUI,
    lgb.events.RequestDataModelChange.TYPE,
    this.onRequestDataModelChange_
   );

   
   
   
    
};



lgb.controller.PsMasterController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.psMasterView.setBuildingHeight(event.payload);
};



lgb.controller.PsMasterController.prototype.onRequestDataModelChange_ =
  function(event) {

  this.psMasterDataModel.requestChange(event.payload);
  
};




