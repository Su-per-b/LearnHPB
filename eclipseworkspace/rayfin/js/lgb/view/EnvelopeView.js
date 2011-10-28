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

lgb.view.EnvelopeView.prototype.onGeometryLoaded = function(geometry) {
	
	this.floorGeometry = geometry;

	//this.addMesh( geometry, 0.1, 0, 0, 0,  0,0,0,
	//geometry.scale.x = geometry.scale.y = geometry.scale.z = 0.1;

	//var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0x030303, specular: 0x990000, shininess: 30 } );
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
	this.dispatch(event);
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

lgb.view.EnvelopeView.prototype.addMesh = function(geometry, scale, x, y, z, rx, ry, rz, material) {

	var mesh = new THREE.Mesh(geometry, material);
	mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
	mesh.position.x = x;
	mesh.position.y = y;
	mesh.position.z = z;
	mesh.rotation.x = rx;
	mesh.rotation.y = ry;
	mesh.rotation.z = rz;
	mesh.overdraw = true;
	mesh.updateMatrix();


	var event = new lgb.events.MeshLoaded(mesh);
	this.dispatch(event);
};






lgb.view.EnvelopeView.prototype.onColladaLoaded = function(collada) {

	//var colladaScene = collada.scene;

//	colladaScene.scale.x = colladaScene.scale.y = colladaScene.scale.z = .1;
//	colladaScene.rotation.x = -Math.PI/2;

	//colladaScene.up.x = 1;
//colladaScene.up.y = 0;
//	colladaScene.up.z = 0;

	//colladaScene.updateMatrix();
	//colladaScene.computeBoundingBox();

	//var event = new lgb.events.ColladaSceneLoadedEvent(colladaScene);
	//this.dispatch(event);
};




