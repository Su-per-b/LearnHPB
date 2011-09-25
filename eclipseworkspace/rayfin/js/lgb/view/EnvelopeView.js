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
	this.loader_.loadFile("9footEnvelopeStrip-joined.b.js", this.d(this.onGeometryLoaded));
	//this.loader_.loadFile("roofTop.b.js", this.d(this.onGeometryLoaded));
	//this.loader_.loadFile("ductwork.b.js", this.d(this.onGeometryLoaded));
	
};

lgb.view.EnvelopeView.prototype.onGeometryLoaded = function(geometry) {


	//this.addMesh( geometry, 0.1, 0, 0, 0,  0,0,0, 
	//geometry.scale.x = geometry.scale.y = geometry.scale.z = 0.1;
	
	//var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0x030303, specular: 0x990000, shininess: 30 } );
	
	var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
	mesh.doubleSided = true;
	//var mesh = new THREE.Mesh( geometry, material);
	mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
	var event = new lgb.event.MeshLoadedEvent(mesh);
	this.dispatch(event);
};

lgb.view.EnvelopeView.prototype.addMesh = function(geometry, scale, x, y, z, rx, ry, rz, material) {

	var mesh = new THREE.Mesh( geometry, material );
	mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
	mesh.position.x = x;
	mesh.position.y = y;
	mesh.position.z = z;
	mesh.rotation.x = rx;
	mesh.rotation.y = ry;
	mesh.rotation.z = rz;
	mesh.overdraw = true;
	mesh.updateMatrix();

	
	var event = new lgb.event.MeshLoadedEvent(mesh);
	this.dispatch(event);
};





		
lgb.view.EnvelopeView.prototype.onColladaLoaded = function(collada) {

	var colladaScene = collada.scene;

	colladaScene.scale.x = colladaScene.scale.y = colladaScene.scale.z = .1;
	colladaScene.rotation.x = -Math.PI/2;
	
	//colladaScene.up.x = 1;
//colladaScene.up.y = 0;
//	colladaScene.up.z = 0;
	
	colladaScene.updateMatrix();
	colladaScene.computeBoundingBox();
	
	var event = new lgb.event.ColladaSceneLoadedEvent(colladaScene);
	this.dispatch(event);
};




