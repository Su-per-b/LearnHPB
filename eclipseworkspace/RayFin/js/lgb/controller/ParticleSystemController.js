goog.provide('lgb.controller.ParticleSystemController');

goog.require ("lgb.controller.ControllerBase");

goog.require('lgb.model.ParticleSystemModel');
goog.require('lgb.view.ParticleSystem');

goog.require('lgb.event.WorldCreated');

/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.ParticleSystemController = function() {
	
	lgb.controller.ControllerBase.call(this);
	
	this.listen(lgb.event.WorldCreated, this.onWorldCreated);
	this.init();

};


goog.inherits(lgb.controller.ParticleSystemController, lgb.controller.ControllerBase);


lgb.controller.ParticleSystemController.prototype.init = function() {
	
	//this.dataModel = new lgb.model.FastParticleSystemModel();
	//this.view = new lgb.view.FastParticleSystemView(this.dataModel);
	//this.hemiInit();
	
	this.dataModel = new lgb.model.ParticleSystemModel();
	this.view = new lgb.view.ParticleSystem(this.dataModel);
	//this.view.start();
	
};



lgb.controller.ParticleSystemController.prototype.onWorldCreated = function(event) {
	this.dataModel.load();
};