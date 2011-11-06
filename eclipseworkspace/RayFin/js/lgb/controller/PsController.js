goog.provide('lgb.controller.PsController');

goog.require('lgb.controller.ControllerBase');

goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.RequestDataModelChange');
goog.require('lgb.model.PsModel');
goog.require('lgb.view.PsView');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.PsController = function(dataModel) {
	lgb.controller.ControllerBase.call(this);
	this.dataModel = dataModel;
	this.init_();
};
goog.inherits(lgb.controller.PsController, lgb.controller.ControllerBase);

/**
 * @private
 */
lgb.controller.PsController.prototype.init_ = function() {
	
	this.view = new lgb.view.PsView(this.dataModel);
	this.adminView = new lgb.view.ParticleSystemAdminView(this.dataModel, 'adminView');
	
	this.bind_();
	
	this.view.init();
	this.adminView.init();
};


/**
 * setup event listeners
 * @private
 */
lgb.controller.PsController.prototype.bind_ = function() {
	

	this.listenTo (
		this.view, 
		lgb.events.Object3DLoaded.TYPE,
		this.onObject3DLoaded_);
		
	this.listenTo(this.adminView, 
		lgb.events.RequestDataModelChange.TYPE, 
		this.onRequestDataModelChange_);
		
		
		/*
	this.listenTo(this.dataModel, 
		lgb.events.DataModelInitialized.TYPE, 
		this.onDataModelInitialized);
		
	this.listenTo (
		this.dataModel, 
		lgb.events.Object3DLoaded.TYPE,
		this.onObject3DLoaded_);
		

		*/
		
};


/**
 * @private
 */
lgb.controller.PsController.prototype.onObject3DLoaded_ = function(event) {
	this.dispatch(event);
};



lgb.controller.PsController.prototype.onDataModelInitialized = function(event) {
	//this.view.init();

	//var delegate = jQuery.proxy(this.view.init, this.view);
	
	//var t=setTimeout(delegate,2000);


};


lgb.controller.PsController.prototype.onRequestDataModelChange_ = function(event) {
	var stateObject = event.payload;
	this.dataModel.change(stateObject);
};
