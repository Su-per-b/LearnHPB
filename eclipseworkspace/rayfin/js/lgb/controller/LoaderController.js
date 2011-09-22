goog.provide('lgb.controller.LoaderController');
goog.provide('lgb.controller.LoaderController.GeometryLoadedEvent');


goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.events.EventTarget');
goog.require('lgb.Config');


/**
 * @class MVC controller for loading 3d-assets
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.LoaderController = function() {
	
	lgb.controller.ControllerBase.call(this);
	
	/**
   * Used to download 3D mesh files
   * @type {THREE.BinaryLoader}
   * @private
   */		
	this.binaryLoader_ = new THREE.BinaryLoader(  );
	
};



goog.inherits(lgb.controller.LoaderController, lgb.controller.ControllerBase);


lgb.controller.LoaderController.prototype.loadAll = function() {
	
		this.loadMesh("damper-solo.obj.min.js");
};



lgb.controller.LoaderController.prototype.loadMesh = function(fileName) {


		var path = lgb.Config.ASSETS_BASE_PATH  + fileName;
		
		this.binaryLoader_.load ( 
			{ 
				model: path, 
				callback: this.d(this.onGeometryLoaded)
			} 
		);
};

lgb.controller.LoaderController.prototype.onGeometryLoaded = function(geometry) {
	
	var event = new lgb.controller.LoaderController.GeometryLoadedEvent(geometry);
	this.dispatch(event);

};


lgb.controller.LoaderController.prototype.load = function() {
	var container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	this.jasonLoader = new THREE.JSONLoader(  );
	
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	
	container.appendChild( this.renderer.domElement );
	this.loadMesh();
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



/**
 * Test Event
 * @param {geometry} 
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.controller.LoaderController.GeometryLoadedEvent = function(geometry) {
  goog.events.Event.call(this, lgb.controller.LoaderController.GeometryLoadedEvent.TYPE);

	this.payload = {};
	
  /**
   * The event payload
   * @type {Object}
   */
  this.payload.geometry = geometry;

};

goog.inherits(lgb.controller.LoaderController.GeometryLoadedEvent , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.controller.LoaderController.GeometryLoadedEvent.TYPE =
    goog.events.getUniqueId('GeometryLoadedEvent');







