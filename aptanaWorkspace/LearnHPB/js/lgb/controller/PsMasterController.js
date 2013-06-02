/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.PsMasterController');

goog.require('lgb.view.PsMasterGUI');
goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.PsController');

goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.BuildingHeightChanged');
goog.require('lgb.events.RequestDataModelChange');


goog.require('lgb.model.PsModel');
goog.require('lgb.model.PsModelMaster');

goog.require('lgb.view.PsView');
goog.require('lgb.view.PsMasterView');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.PsMasterController = function() {

  lgb.controller.BaseController.call(this);

};
goog.inherits(lgb.controller.PsMasterController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.PsMasterController.prototype.init = function() {
  
  this.dataModel = new lgb.model.PsModelMaster();
  
  this.guiView = new lgb.view.PsMasterGUI(this.dataModel);
  this.view = new lgb.view.PsMasterView(this.dataModel);
  
  this.bind_();
  this.dataModel.load();

};


lgb.controller.PsMasterController.prototype.bind_ = function() {
  
  this.listenToOnce(
    this.dataModel,
    e.DataModelInitialized,
    this.onDataModelInitialized_
   );
   
  this.listenTo (
    this.guiView,
    lgb.events.RequestDataModelChange.TYPE,
    this.onRequestDataModelChange_
   );
   
  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
   );


  this.relay(
    this.guiView,
    e.RequestAddToGUI
    );
    
    
  this.relay(this.view, e.AddToWorldRequest);
};

lgb.controller.PsMasterController.prototype.onDataModelInitialized_ =
  function(event) {

  this.init2_();
 
};



lgb.controller.PsMasterController.prototype.init2_ = function() {
  
  this.childControllers_ = [];

  var list = this.dataModel.getPsModelList();
  list.forEach(this.d(this.makeChildController_));
  
  this.view.init();
  this.guiView.init();

  
};




lgb.controller.PsMasterController.prototype.makeChildController_ = function(psModel) {
  
  var psController = new lgb.controller.PsController(psModel);
  
  this.listenToOnce(
    psController,
    e.AddToWorldRequest,
    this.onChildSystemLoaded_
   );
   
   psController.init();
   this.childControllers_.push(psController);

};




lgb.controller.PsMasterController.prototype.onChildSystemLoaded_ =
  function(event) {

  this.view.addChild(event.payload);
  
};


lgb.controller.PsMasterController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
};




lgb.controller.PsMasterController.prototype.onRequestDataModelChange_ =
  function(event) {

  this.dataModel.changeAry(event.payload);
  
};




