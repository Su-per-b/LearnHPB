goog.provide('lgb.controller.MainController');

goog.require ("lgb.controller.ControllerBase");
goog.require ("lgb.controller.WorldController");



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.MainController = function() {
	
	lgb.controller.ControllerBase.call(this);
	lgb.globalEventBus = new lgb.event.EventBus();

	var delegate = $.proxy(this.init, this);
	jQuery(document).ready(delegate);
	
};


goog.inherits(lgb.controller.MainController, lgb.controller.ControllerBase);



/** 
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.MainController.prototype.init = function() {

	this.worldController_ = new lgb.controller.WorldController();
	
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
	this.worldController_.init(this.containerDiv_);
	
	document.body.appendChild( this.containerDiv_ );
};


lgb.controller.MainController.prototype.addOneMesh = function(p, g) {
	this.totalFaces += g.faces.length;
	this.totalColliders++;

	var mesh = new THREE.Mesh( g, new THREE.MeshPhongMaterial( { color: 0x003300 } ) );
	
	mesh.position = p;
	this.scene_.addObject( mesh );
	
	var mc = THREE.CollisionUtils.MeshColliderWBox(mesh);
	THREE.Collisions.colliders.push( mc );
	this.meshes_.push( mesh );
	
	//re-target camera
	this.camera_.target = mesh;
	
};



lgb.controller.MainController.prototype.animate = function() {

		
	var delegate = this.d(this.animate);
	requestAnimationFrame( delegate  );

	var mesh = this.meshes_[0];
	
	//move light
	this.sun_.position.copy( this.camera_.position );
	this.sun_.position.normalize();

	this.theta += 0.01;		

	this.render()
	this.stats_.update();
};

lgb.controller.MainController.prototype.render = function() {

	var timer = new Date().getTime() * 0.0005;

	this.camera_ .position.x = Math.cos( timer ) * 10;
	//this.camera_ .position.y = 2;
	this.camera_ .position.z = Math.sin( timer ) * 10;

	this.renderer_.render( this.scene_, this.camera_ );
};

			

	

		




