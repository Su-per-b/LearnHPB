goog.provide('lgb.controller.WorldController');

goog.require ("lgb.controller.ControllerBase");
goog.require ("lgb.controller.RoofTopController");




/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.WorldController = function() {
	
	lgb.controller.ControllerBase.call(this);
	
};

goog.inherits(lgb.controller.WorldController, lgb.controller.ControllerBase);


/** 
 * Initializes the WorldController Controller after the document is ready
 */
lgb.controller.WorldController.prototype.init = function(containerDiv) {
	
	this.containerDiv_ = containerDiv;
	
	
	/**
	* for displaying stats like the fram-rate
	*
	* @type {Stats
	* @private
	*/
	this.stats_ = new Stats();
	this.stats_.domElement.style.position = 'absolute';
	this.stats_.domElement.style.top = '0px';
	this.containerDiv_.appendChild( this.stats_.domElement );
	
	
	this.mouse = { x: 0, y: 0 };
	
	/**
   * @type {Array|THREE.Mesh}
   * @private
   */	
	this.meshes_ = [];
	this.theta = 0;
	
			
	
	/**
   * @type {THREE.WebGLRenderer}
   * @private
   */	
	this.renderer_ = new THREE.WebGLRenderer();
	this.renderer_.setSize( window.innerWidth, window.innerHeight );
	
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
	

	/**
   * The one and only Camera that views the 3d scene
   * @type {THREE.Camera}
   * @private
   */	
	//this.camera_ = new THREE.Camera( 2, window.innerWidth / window.innerHeight, 1, 10000 );


	this.camera_  = new THREE.TrackballCamera({

		fov: 30,
		aspect: window.innerWidth  / window.innerHeight,
		near: 1,
		far: 250,

		rotateSpeed: 0.25,
		zoomSpeed: 0.25,
		panSpeed: 0.1,

		noZoom: false,
		noPan: false,

		staticMoving: false,
		dynamicDampingFactor: 0.3,

		minDistance:1,
		maxDistance:100,

		keys: [ 65, 83, 68 ], // [ rotateKey, zoomKey, panKey ],

		domElement: this.renderer_.domElement,

	});
		
	this.camera_.position.x = 0;
	this.camera_.position.y = 2;
	this.camera_.position.z = 0;
	
	this.sun_.position = this.camera_.position.clone();
	this.scene_.addLight( this.sun_ );
	this.scene_.addLight( this.ambientLight_ );
	
	//this.addLine();
	this.addFloor();
	
	this.containerDiv_.appendChild( this.renderer_.domElement );
	
	this.animate();
	
	this.listen(lgb.event.MeshLoadedEvent, this.onMeshLoaded);
		
	//this.loaderController_ = new lgb.controller.Loader();
	this.roofTopController_ = new lgb.controller.RoofTopController();
	
};

lgb.controller.WorldController.prototype.onMeshLoaded = function(event) {
	
	this.scene_.addObject(  event.payload );
	
};

lgb.controller.WorldController.prototype.addFloor = function(event) {
	
	var line_material = new THREE.LineBasicMaterial( { color: 0xcccccc, opacity: 0.2 } ),
		geometry = new THREE.Geometry(),
		floor = -0.04, step = 1, size = 14;

	for ( var i = 0; i <= size / step * 2; i ++ ) {

		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( - size, floor, i * step - size ) ) );
		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3(   size, floor, i * step - size ) ) );

		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( i * step - size, floor, -size ) ) );
		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( i * step - size, floor,  size ) ) );

	}

	var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
	this.scene_.addObject( line );
};

lgb.controller.WorldController.prototype.animate = function() {

		
	var delegate = this.d(this.animate);
	requestAnimationFrame( delegate  );

	//if (this.meshes_.length === 0) {
		//return;
	//}
	
//	this.checkForMouseOver();

	//increment camera orbit
	//this.camera_.position.x = this.camdist * Math.cos( this.theta );
	//this.camera_.position.z = this.camdist * Math.sin( this.theta );
	//this.camera_.position.y = this.camdist/2 * Math.sin( this.theta * 2) ;
	//var mesh = this.meshes_[0];
	
//camera.position.y = mesh.position.y ;
//camera.position.x = mesh.position.x + Math.cos(mesh.rotation.y/360(2*Math.PI))*50 ;
//camera.position.z = mesh.position.z + Math.sin(mesh.rotation.y/360(2*Math.PI))*10; 


	//move light
	this.sun_.position.copy( this.camera_.position );
	this.sun_.position.normalize();

	this.theta += 0.01;		


	this.render()
	this.stats_.update();
};

lgb.controller.WorldController.prototype.render = function() {

	var timer = new Date().getTime() * 0.0005;

	this.camera_ .position.x = Math.cos( timer ) * 10;
	//this.camera_ .position.y = 2;
	this.camera_ .position.z = Math.sin( timer ) * 10;




	//renderer.render( scene, camera );
	this.renderer_.render( this.scene_, this.camera_ );
};


