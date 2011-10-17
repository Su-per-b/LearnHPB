goog.provide('lgb.view.RoofTopView');

goog.require ("lgb.view.ViewBase");
goog.require('lgb.event.MeshLoadedEvent');
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
	this.loader_.loadFile("rooftop-joined.b.js", this.d(this.onGeometryLoaded));
	
};


lgb.view.RoofTopView.prototype.onGeometryLoaded = function(geometry) {


	var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
	mesh.doubleSided = true;
	//mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
	//mesh.rotation.y = Math.PI/2;
	
	var event = new lgb.event.MeshLoadedEvent(mesh);
	this.dispatch(event);
};


