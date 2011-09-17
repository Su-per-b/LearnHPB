goog.provide('lgb.controller.LoaderController');

goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.events.EventTarget');


/**
 * @class MVC controller for loading 3d-assets
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.LoaderController = function() {
	
	goog.events.EventTarget.call(this);
	
	this.totalFaces = 0;
};

goog.inherits(lgb.controller.LoaderController, goog.events.EventTarget);



lgb.controller.LoaderController.prototype.load = function() {
	var container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	this.jasonLoader = new THREE.JSONLoader(  );
	
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	
	container.appendChild( this.renderer.domElement );
	this.loadMesh();
};

lgb.controller.LoaderController.prototype.loadMesh = function(p) {
	var delegate = $.proxy(this.onGeometryLoaded, this);
	//this.loader.load( { model: "3d-assets/roofTop2.js", callback: delegate } );
	
	this.jasonLoader.load( { model: "3d-assets/damper-solo.obj_ascii.js", callback: delegate } );
	
	//this.loader.load( { model: "3d-assets/damper-solo.obj.js.js", callback: delegate } );
	//this.loader.load( { model: "3d-assets/damper/horizontal_bar.js", callback: delegate } );
	//this.loader.load( { model: "3d-assets/damper2/horizontal_bar.js", callback: delegate } );
};

lgb.controller.LoaderController.prototype.onGeometryLoaded = function(geometry) {
	//this.addOneMesh( new THREE.Vector3(	0,	0,	0), geometry );
	
	this.dispatchEvent( goog.events.EventType.CHANGE);
};

lgb.controller.LoaderController.prototype.addOneMesh = function(p, g) {
	this.totalFaces += g.faces.length;
	this.totalColliders++;

	var mesh = new THREE.Mesh( g, new THREE.MeshPhongMaterial( { color: 0x003300 } ) );
	
	mesh.position = p;
	
	this.scene.addObject( mesh );
	
	var mc = THREE.CollisionUtils.MeshColliderWBox(mesh);
	THREE.Collisions.colliders.push( mc );
	this.meshes.push( mesh );
};













