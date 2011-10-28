goog.provide('lgb.controller.ParticleSystemController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.events.WorldCreated');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.RequestDataModelChange');
goog.require('lgb.model.ParticleSystemModel');
goog.require('lgb.view.ParticleSystem');
goog.require('lgb.view.ParticleSystemAdminView');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.ParticleSystemController = function() {

	lgb.controller.ControllerBase.call(this);

	this.init();


};
goog.inherits(lgb.controller.ParticleSystemController, lgb.controller.ControllerBase);

lgb.controller.ParticleSystemController.prototype.init = function() {
	this.dataModel = new lgb.model.ParticleSystemModel();
	this.view = new lgb.view.ParticleSystem(this.dataModel);
	
	this.listen_();
};


/**
 * setup event listeners
 * @private
 */
lgb.controller.ParticleSystemController.prototype.listen_ = function() {
	
	this.listenTo(this.dataModel, 
		lgb.events.DataModelInitialized.TYPE, 
		this.onDataModelInitialized);
		
	this.listen(lgb.events.WorldCreated.TYPE, this.onWorldCreated);
	
		
};






lgb.controller.ParticleSystemController.prototype.onDataModelInitialized = function(event) {
	this.view.init();
	this.adminView = new lgb.view.ParticleSystemAdminView(this.dataModel, 'adminView');
	this.adminView.init();
	
	this.listenTo(this.adminView, 
		lgb.events.RequestDataModelChange.TYPE, 
		this.onRequestDataModelChange);
		
};


lgb.controller.ParticleSystemController.prototype.onWorldCreated = function(event) {
	this.dataModel.load();
};

lgb.controller.ParticleSystemController.prototype.onRequestDataModelChange = function(event) {
	
	var stateObject = event.payload;
	this.dataModel.change(stateObject);
	
};