goog.provide('lgb.controller.MainController');

goog.require ("lgb.controller.ControllerBase");
goog.require('goog.events');
goog.require('goog.events.BrowserEvent');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.MainController = function() {
	
	lgb.controller.ControllerBase.call(this);
	lgb.EventBusObj = new lgb.event.Ebus();
	
	var delegate = $.proxy(this.init, this);
	jQuery(document).ready(delegate);
	
};



goog.inherits(lgb.controller.MainController, lgb.controller.ControllerBase);

lgb.controller.MainController.prototype.d = function(theFunction) {
	var delegate = $.proxy(theFunction, this);
	return delegate;
};


/** 
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.MainController.prototype.init = function() {

	this.mouse = { x: 0, y: 0 };
	

	this.meshes = [];
	this.theta = 0;
	this.camdist = 500;
	
	this.totalFaces = 0;
	this.totalColliders = 0;
			

	/**
   * @type {Element}
   * @private
   */	
	this.infoDiv_ = document.getElementById("info");

	/**
   * @type {Element}
   * @private
   */
	this.containerDiv_ = document.createElement( 'div' );

	
	/**
   * @type {THREE.WebGLRenderer}
   * @private
   */	
	this.renderer_ = new THREE.WebGLRenderer();
	
	/**
   * @type {THREE.Projector}
   * @private
   */		
	this.projector_ = new THREE.Projector();
			
	/**
   * The top-level this.containerDiv_ object in the THREE.js world
   * contains lights, camera and objects
   * @type {THREE.Scene}
   * @private
   */				
	this.scene_ = new THREE.Scene();
		

	
	/**
   * The one and only Camera that views the 3d scene
   * @type {THREE.Camera}
   * @private
   */	
	this.camera_ = new THREE.Camera( 2, window.innerWidth / window.innerHeight, 1, 10000 );

	/**
   * light source 1
   * @type {THREE.AmbientLight}
   * @private
   */
	this.ambientLight_ = new THREE.AmbientLight( 0x606060 );
	
	/**
   * light source 2
   * @type {THREE.DirectionalLight}
   * @private
   */
	this.sun_ = new THREE.DirectionalLight( 0xffffff );
	

	this.stats_ = new Stats();
	this.stats_.domElement.style.position = 'absolute';
	this.stats_.domElement.style.top = '0px';
	this.containerDiv_.appendChild( this.stats_.domElement );
		
		
	this.renderer_.setSize( window.innerWidth, window.innerHeight );
	this.camera_.position.z = this.camdist;
	

	this.sun_.position = this.camera_.position.clone();
	this.scene_.addLight( this.sun_ );
	this.scene_.addLight( this.ambientLight_ );
	
	this.addLine();
	
	this.containerDiv_.appendChild( this.renderer_.domElement );
	document.body.appendChild( this.containerDiv_ );
		

	this.listen(
		lgb.controller.LoaderController.GeometryLoadedEvent.TYPE, 
		this.onGeometryLoaded);
		
	this.containerDiv_.onmousemove = this.d(this.onDocumentMouseMove);
	this.animate();
		
	/**
   * downloads files containing the 3D geometries
   * @type {lgb.controller.LoaderController}
   * @private
   */	
	this.loaderController_ = new lgb.controller.LoaderController();	
	this.loaderController_.loadAll();
	
};


lgb.controller.MainController.prototype.addLine = function() {
	
	var lineMat = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1, linewidth: 3 } );
	
	var geom = new THREE.Geometry();
	geom.vertices.push( new THREE.Vertex( new THREE.Vector3(-100, 0, 0) ) );
	geom.vertices.push( new THREE.Vertex( new THREE.Vector3( 100, 0, 0) ) );
	
	line = new THREE.Line(geom, lineMat);
	this.scene_.addObject( line );
};

lgb.controller.MainController.prototype.onGeometryLoaded = function(event) {
	
	var geometry = event.payload.geometry;
	
	this.addOneMesh( new THREE.Vector3(	0,	0,	0), geometry );
	
	//console.log("!handler fired");
};


lgb.controller.MainController.prototype.addOneMesh = function(p, g) {
	this.totalFaces += g.faces.length;
	this.totalColliders++;

	var mesh = new THREE.Mesh( g, new THREE.MeshPhongMaterial( { color: 0x003300 } ) );
	
	mesh.position = p;
	this.scene_.addObject( mesh );
	
	var mc = THREE.CollisionUtils.MeshColliderWBox(mesh);
	THREE.Collisions.colliders.push( mc );
	this.meshes.push( mesh );
};




lgb.controller.MainController.prototype.animate = function() {

		
		requestAnimationFrame( this.d(this.animate) );
	
		var vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0.5 );
		this.projector_.unprojectVector( vector, this.camera_ );
	
		var ray = new THREE.Ray( this.camera_.position, vector.subSelf( this.camera_.position ).normalize() );
		
		if (this.meshes.length === 0) {
			return;
		}
		
		var i, l = this.meshes.length;
		
		for ( i = 0; i < l; i++ ) {
			this.meshes[ i ].materials[ 0 ].color.setHex( 0x003300 );
		}
		
		this.infoDiv_.innerHTML = "";
	
	
		var c = THREE.Collisions.rayCastNearest( ray );
		
		if( c ) {
		
			this.infoDiv_.innerHTML += "<br />Found @ normal " + this.vts(c.normal);
			
			var poi = ray.origin.clone().addSelf( ray.direction.clone().multiplyScalar(c.distance) );
			line.geometry.vertices[0].position = poi;
			line.geometry.vertices[1].position = poi.clone().addSelf(c.normal.multiplyScalar(100));
			line.geometry.__dirtyVertices = true; 
			line.geometry.__dirtyElements = true;
			
			c.mesh.materials[ 0 ].color.setHex( 0xbb0000 );
	
		} else {
		
			this.infoDiv_.innerHTML += "<br />No intersection";
	
		}
	
		this.camera_.position.x = this.camdist * Math.cos( this.theta );
		this.camera_.position.z = this.camdist * Math.sin( this.theta );
		this.camera_.position.y = this.camdist/2 * Math.sin( this.theta * 2) ;
	
		this.sun_.position.copy( this.camera_.position );
		this.sun_.position.normalize();
	
		this.theta += 0.005;		
	
		this.renderer_.render( this.scene_, this.camera_ );
		
		this.stats_.update();
};


lgb.controller.MainController.prototype.onDocumentMouseMove = function(event) {
			event.preventDefault();	
			this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
};


lgb.controller.MainController.prototype.vts = function(v) {
		if (!v) {
			return "undefined<br>";
		}
		else {
			return v.x.toFixed(2) + " , " + v.y.toFixed(2) + " , " + v.z.toFixed(2) + "<br>";
		}
};
	
	

		




