/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.PsMasterController');

goog.require('lgb.view.PsMasterGUI');
goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.PsController');

goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.DataModelInitialized');
goog.require('lgb.events.BuildingHeightChanged');
goog.require('lgb.events.RequestDataModelChange');
goog.require('lgb.events.Object3DLoaded');

goog.require('lgb.model.PsModel');
goog.require('lgb.model.PsModelMaster');

goog.require('lgb.view.PsView');
goog.require('lgb.view.PsMasterView');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.PsMasterController = function() {
  this._NAME = 'lgb.controller.PsMasterController';
  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.PsMasterController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.PsMasterController.prototype.init_ = function() {
  
  this.psMasterDataModel = new lgb.model.PsModelMaster();
  this.psMasterGUI = new lgb.view.PsMasterGUI(this.psMasterDataModel);
  this.psMasterView = new lgb.view.PsMasterView(this.psMasterDataModel);
  
  this.bind1_();
  this.psMasterDataModel.load();
  
};


lgb.controller.PsMasterController.prototype.bind1_ = function() {
  
  this.listenToOnce(
    this.psMasterDataModel,
    lgb.events.DataModelInitialized.TYPE,
    this.onDataModelInitialized_
   );
   
  this.listenTo (
    this.psMasterGUI,
    lgb.events.RequestDataModelChange.TYPE,
    this.onRequestDataModelChange_
   );
   
  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
   );

  this.makeAddToWorldRequestGlobal (this.psMasterView);
  
};

lgb.controller.PsMasterController.prototype.onDataModelInitialized_ =
  function(event) {

  this.init2_();
 
};



lgb.controller.PsMasterController.prototype.init2_ = function() {
  
  this.childControllers_ = [];

  var list = this.psMasterDataModel.getPsModelList();
  list.forEach(this.d(this.makeChildController_));
  
  this.psMasterView.init();
  this.psMasterGUI.init();

  
};




lgb.controller.PsMasterController.prototype.makeChildController_ = function(psModel) {
  
  var psController = new lgb.controller.PsController(psModel);
  
  this.listenToOnce(
    psController,
    lgb.events.Object3DLoaded.TYPE,
    this.onChildSystemLoaded_
   );
   
   psController.init();
   this.childControllers_.push(psController);

};




lgb.controller.PsMasterController.prototype.onChildSystemLoaded_ =
  function(event) {

  this.psMasterView.addChild(event.payload);
  
};


lgb.controller.PsMasterController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.psMasterView.setBuildingHeight(event.payload);
};




lgb.controller.PsMasterController.prototype.onRequestDataModelChange_ =
  function(event) {

  this.psMasterDataModel.changeAry(event.payload);
  
};




