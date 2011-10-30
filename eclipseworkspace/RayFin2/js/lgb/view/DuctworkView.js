goog.provide('lgb.view.DuctworkView');

goog.require('lgb.Loader');
goog.require('lgb.events.ColladaSceneLoadedEvent');
goog.require('lgb.events.MeshLoaded');
goog.require('lgb.view.ViewBase');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.DuctworkView = function(model) {
	lgb.view.ViewBase.call(this);

	this.model_ = model;
	this.init_();

};
goog.inherits(lgb.view.DuctworkView, lgb.view.ViewBase);



/**
 * Initializes the View
 * loads the geometry
 * @private
 */
lgb.view.DuctworkView.prototype.init_ = function() {
	this.loader_ = new lgb.Loader();
	this.loader_.loadFile('ductwork102611.b.js', this.d(this.onGeometryLoaded));
};


lgb.view.DuctworkView.prototype.onGeometryLoaded = function(geometry) {
	
	var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
	mesh.doubleSided = true;
	mesh.name = 'Ductwork';

	mesh.rotation.y = 90 * Math.PI / 180;
	mesh.position.x += 1;
	mesh.updateMatrix();
	
	var event = new lgb.events.MeshLoaded(mesh);
	this.dispatchLocal(event);
	
};
