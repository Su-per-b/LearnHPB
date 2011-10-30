goog.provide('lgb.view.EnvelopeView');

goog.require('lgb.Loader');
goog.require('lgb.events.ColladaSceneLoadedEvent');
goog.require('lgb.events.MeshLoaded');
goog.require('lgb.view.ViewBase');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
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
	this.loader_.loadFile('9footEnvelopeStrip-joined.b.js', this.d(this.onGeometryLoaded));
	//this.loader_.loadFile("roofTop.b.js", this.d(this.onGeometryLoaded));
	//this.loader_.loadFile("ductwork.b.js", this.d(this.onGeometryLoaded));

};

/**
 * 
 */
lgb.view.EnvelopeView.prototype.setVisible = function(makeVisible) {
	//this.floor1.materials[0].opacity = 0.1;
	
	this.floor1.visible = !this.floor1.visible;
};


lgb.view.EnvelopeView.prototype.onGeometryLoaded = function(geometry) {
	
	this.floorGeometry = geometry;
	this.floorGeometry.computeBoundingBox();
	
	var bb = this.floorGeometry.boundingBox;
	
	this.xExt = bb.x[1] - bb.x[0];
	this.yExt = bb.y[1] - bb.y[0];
	this.zExt = bb.z[1] - bb.z[0];
	
	this.floor1 = this.makeFloor_();
	this.floor2 = this.makeFloor_();
	this.floor3 = this.makeFloor_();
	
	this.floor2.position.y -= 1 * this.yExt;
	this.floor3.position.y -= 2 * this.yExt;
	
	this.masterGroup = new THREE.Object3D();
	this.masterGroup.add(this.floor1);
	this.masterGroup.add(this.floor2);
	this.masterGroup.add(this.floor3);
	//this.floor2
		
	var event = new lgb.events.Object3DLoaded(this.masterGroup);
	this.dispatchLocal(event);
};


/**
 * @private
 * @return {THREE.Mesh}
 */
lgb.view.EnvelopeView.prototype.makeFloor_ = function() {
	
	var floor  = new THREE.Mesh(this.floorGeometry, new THREE.MeshFaceMaterial());
	
	floor.position.x = -1 * this.xExt / 2;
	floor.position.y = -1 * this.yExt;
	floor.position.z = this.zExt / 2;
	floor.doubleSided = true;
	floor.scale.x = floor.scale.y = floor.scale.z = 1;
	
	return floor;
	
}









