goog.provide('lgb.view.EnvelopeView');

goog.require ("lgb.view.ViewBase");
goog.require('lgb.event.MeshLoadedEvent');
goog.require('lgb.Loader');



/**
 * MVC View for the RoofTop Unit
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.EnvelopeView = function(model) {
	lgb.view.ViewBase.call(this);
	
	this.model_ = model;
	this.init();

};



goog.inherits(lgb.view.EnvelopeView, lgb.view.ViewBase);



/** 
 * Initializes the View
 */
lgb.view.EnvelopeView.prototype.init = function() {

	this.loader_ = new lgb.Loader();
	this.loader_.loadMesh("box.dae", this.d(this.onMeshLoaded));
	
};


		
lgb.view.EnvelopeView.prototype.onMeshLoaded = function(collada) {

	this.dae = collada.scene;

	this.dae.scale.x = this.dae.scale.y = this.dae.scale.z = .4;
	this.dae.rotation.x = -Math.PI/2;
	this.dae.updateMatrix();
	
	var event = new lgb.event.MeshLoadedEvent(this.dae);
	this.dispatch(event);
};




