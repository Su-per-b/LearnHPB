goog.provide('lgb.view.RoofTopView');

goog.require ("lgb.view.ViewBase");
goog.require('lgb.event.MeshLoadedEvent');
goog.require('lgb.event.MeshRequestEvent');
goog.require('lgb.Loader');



/**
 * MVC View for the RoofTop Unit
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.RoofTopView = function(model) {
	lgb.view.ViewBase.call(this);
	
	this.model_ = model;
	this.init();

};



goog.inherits(lgb.view.RoofTopView, lgb.view.ViewBase);



/** 
 * Initializes the View
 */
lgb.view.RoofTopView.prototype.init = function() {

	this.loader_ = new lgb.Loader();
	this.loader_.loadMesh("rooftopLowpoly7_29_11_raj2.dae", this.d(this.onMeshLoaded));
	
};


		
lgb.view.RoofTopView.prototype.onMeshLoaded = function(collada) {

	this.dae = collada.scene;

	this.dae.scale.x = this.dae.scale.y = this.dae.scale.z = .4;
	this.dae.rotation.x = -Math.PI/2;
	this.dae.updateMatrix();
	
	var event = new lgb.event.MeshLoadedEvent(this.dae);
	this.dispatch(event);
};




