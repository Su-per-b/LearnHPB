/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.PsMasterController');

goog.require('lgb.gui.view.ParticleSystemMasterGUI');
goog.require('lgb.core.BaseController');
goog.require('lgb.world.controller.PsController');
goog.require('lgb.world.model.ParticleSystemModel');
goog.require('lgb.world.model.ParticleSystemMasterModel');
goog.require('lgb.world.view.ParticleSystemView');
goog.require('lgb.world.view.ParticleSystemMasterView');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.PsMasterController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.world.controller.PsMasterController, lgb.core.BaseController);


/**
 * Initialized the controller.
 */
lgb.world.controller.PsMasterController.prototype.init = function() {
  
  this.dataModel = new lgb.world.model.ParticleSystemMasterModel();
  
  this.guiView = new lgb.gui.view.ParticleSystemMasterGUI(this.dataModel);
  this.view = new lgb.world.view.ParticleSystemMasterView(this.dataModel);
  
  this.bind_();
  this.dataModel.load();

};


lgb.world.controller.PsMasterController.prototype.bind_ = function() {
  
  this.listenToOnce(
    this.dataModel,
    e.DataModelInitialized,
    this.onDataModelInitialized_
   );
   
  this.listenTo (
    this.guiView,
    e.RequestDataModelChange,
    this.onRequestDataModelChange_
   );
   

  this.relay(
    this.guiView,
    e.RequestAddToTestingInput
    );
    
    
  this.relayLocal(this.view, e.AddToWorldRequest);
};

lgb.world.controller.PsMasterController.prototype.onDataModelInitialized_ =
  function(event) {

  this.init2_();
 
};



lgb.world.controller.PsMasterController.prototype.init2_ = function() {
  
  var list = this.dataModel.getPsModelList();
  this.each( list, this.makeChildController_ );
  this.view.init();
  this.guiView.init();

};




lgb.world.controller.PsMasterController.prototype.makeChildController_ = function(psModel) {
  
  var psController = new lgb.world.controller.PsController(psModel);
  
  this.listenToOnce(
    psController,
    e.AddToWorldRequest,
    this.onChildSystemLoaded_
   );
   
   psController.init();
   this.childControllers_.push(psController);

};




lgb.world.controller.PsMasterController.prototype.onChildSystemLoaded_ =
  function(event) {

  this.view.addChild(event.payload);
  
};





lgb.world.controller.PsMasterController.prototype.onRequestDataModelChange_ =
  function(event) {
  
  this.dataModel.changePropertyEx(event.payload.property, event.payload.newValue);
  
};




