goog.provide('lgb.controller.ParticleSystemController2');

goog.require ("lgb.controller.ControllerBase");

goog.require('lgb.model.ParticleSystemModel2');
goog.require('lgb.view.ParticleSystemView2');

goog.require('lgb.event.WorldCreated');

/**
 * MVC controller for the RoofTopController
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.ParticleSystemController2 = function() {
	
	lgb.controller.ControllerBase.call(this);
	
	this.listen(lgb.event.WorldCreated, this.onWorldCreated);
	this.init();

};


goog.inherits(lgb.controller.ParticleSystemController2, lgb.controller.ControllerBase);


lgb.controller.ParticleSystemController2.prototype.init = function() {
	
	//this.dataModel = new lgb.model.FastParticleSystemModel();
	//this.view = new lgb.view.FastParticleSystemView(this.dataModel);

	//this.hemiInit();
	
	this.dataModel = new lgb.model.ParticleSystemModel2();
	this.view = new lgb.view.ParticleSystemView2(this.dataModel);
	//this.view.start();
	
};



lgb.controller.ParticleSystemController2.prototype.onWorldCreated = function(event) {
	this.dataModel.load();
};