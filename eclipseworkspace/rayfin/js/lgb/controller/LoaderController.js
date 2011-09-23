goog.provide('lgb.controller.LoaderController');
goog.provide('lgb.controller.LoaderController.GeometryLoadedEvent');
goog.provide('lgb.controller.LoaderController.SceneLoadedEvent');


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
   * Used to download 3D mesh files in binary format
   * @type {THREE.BinaryLoader}
   * @private
   */		
	this.binaryLoader_ = new THREE.BinaryLoader(  );
	
	/**
   * Used to download 3D mesh files in the JSON format
   * @type {THREE.JSONLoader}
   * @private
   */		
	this.jsonLoader_ = new THREE.JSONLoader(  );
	
	/**
   * Used to download 3D mesh files in the Collada format
   * @type {ColladaLoader}
   * @private
   */		
	this.colladaLoader_ = new ColladaLoader(  );
	
	

	
};



goog.inherits(lgb.controller.LoaderController, lgb.controller.ControllerBase);


lgb.controller.LoaderController.prototype.loadAll = function() {
	
		//this.loadMesh("damper-solo.obj.min.js", true);
		//this.loadMesh("box.dae");
		this.loadMesh("rooftopLowpoly7_29_11_raj2.dae");
		
		//this.loadMesh("rooftopLowpoly7_29_11_raj2.json.js");
		//this.loadMesh("monster.dae");
};



lgb.controller.LoaderController.prototype.loadMesh = function(fileName) {

		
		var fileType = this.getFileTye(fileName);
		
		var path = lgb.Config.ASSETS_BASE_PATH  + fileName;
		
		var callbackDelegate = this.d(this.onGeometryLoaded);
		
		var loadObj = { 
					model: path, 
					callback: callbackDelegate
			};
		
		
		
		switch (fileType) {
			case lgb.controller.LoaderController.MESH_TYPE.BIN : 
				this.binaryLoader_.load ( loadObj );
				break;
			case lgb.controller.LoaderController.MESH_TYPE.JSON :
				this.jsonLoader_.load ( loadObj );
				break;
			case lgb.controller.LoaderController.MESH_TYPE.COLLADA :
				this.colladaLoader_ .load ( path , this.d(this.onColladaLoaded));
				break;
				
		}
		

};

lgb.controller.LoaderController.prototype.getFileTye = function(fileName) {
	
	var ary = fileName.split(".");
	var len = ary.length;
	
	if (len <2) {
		return lgb.controller.LoaderController.MESH_TYPE.UNKNOWN;
	} else {
			
		var fileExt = ary[len-1].toLowerCase();
		
		if (fileExt == 'dae') {
			return lgb.controller.LoaderController.MESH_TYPE.COLLADA;
		} else if (fileExt == 'js') {
			var typeCode = ary[len-2].toLowerCase();
			if (typeCode == 'bin') {
				return lgb.controller.LoaderController.MESH_TYPE.BIN;
			} else if (typeCode == 'json'){
				return lgb.controller.LoaderController.MESH_TYPE.JSON;
			} else if (typeCode == 'utf8'){
				return lgb.controller.LoaderController.MESH_TYPE.UTF8;
			}
		} else {
			return lgb.controller.LoaderController.MESH_TYPE.UNKNOWN;
		}
		
	}
	

	
	
};

lgb.controller.LoaderController.prototype.onColladaLoaded = function(collada ) {
	
	var event = new lgb.controller.LoaderController.ColladaLoadedEvent(collada);
	this.dispatch(event);
	
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




lgb.controller.LoaderController.MESH_TYPE = {
  COLLADA: 'collada',
  UTF8: 'utf8',
  JSON: 'json',
  BIN: 'bin',
  UNKNOWN: 'unknown'
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
    
    
    
/**
 *  Event fired when a collada file is loaded
 * @param {collada} 
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.controller.LoaderController.ColladaLoadedEvent = function(collada) {
  goog.events.Event.call(this, lgb.controller.LoaderController.ColladaLoadedEvent.TYPE);

	this.payload = {};
	
  /**
   * The event payload
   * @type {Object}
   */
  this.payload.collada = collada;

};

goog.inherits(lgb.controller.LoaderController.ColladaLoadedEvent , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.controller.LoaderController.ColladaLoadedEvent.TYPE =
    goog.events.getUniqueId('ColladaLoadedEvent');







