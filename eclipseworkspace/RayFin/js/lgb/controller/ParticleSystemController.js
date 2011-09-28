goog.provide('lgb.controller.ParticleSystemController2');

//goog.require ("lgb.controller.ControllerBase");
//goog.require ("lgb.model.EnvelopeModel");
//goog.require ("lgb.view.EnvelopeView");
goog.require('lgb.model.ParticleSystemModel');
goog.require('lgb.view.ParticleSystemView');

goog.require('lgb.event.WorldCreated');
goog.require('hemi.curve');

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

	this.hemiInit();
	
	this.dataModel = new lgb.model.ParticleSystemModel();
	this.view = new lgb.view.ParticleSystemView(this.dataModel);
	//this.view.start();
	
};


lgb.controller.ParticleSystemController2.prototype.hemiInit = function() {

  //canvas = document.getElement('canvas');

	var canvas = mainController.getCanvas();
	
  if (!canvas || !canvas.getContext) {
    //o3djs.webgl.webGlCanvasError(element, 'HTMLCanvas');
    
    throw("canvas is null or malformed");
    
  }
  


  
	//hemi.curve.init(canvas);
	
};

lgb.controller.ParticleSystemController2.prototype.onWorldCreated = function(event) {

	this.dataModel.load();
};