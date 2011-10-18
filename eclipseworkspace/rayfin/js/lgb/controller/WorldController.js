goog.provide('lgb.controller.WorldController');

goog.require ("lgb.controller.ControllerBase");
goog.require ("lgb.controller.RoofTopController");
goog.require ("lgb.controller.EnvelopeController");
goog.require ("lgb.controller.ParticleSystemController");

goog.require ("lgb.event.RenderEvent");
goog.require ("lgb.view.CameraView");
goog.require('lgb.view.FloorView');
goog.require('lgb.view.StatsView');
goog.require('lgb.event.WindowResizeEvent');
goog.require('lgb.event.Object3DLoadedEvent');

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.WorldController = function(containerDiv) {
	
	lgb.controller.ControllerBase.call(this);
	
	this.containerDiv_ = containerDiv;
	

	
};

goog.inherits(lgb.controller.WorldController, lgb.controller.ControllerBase);


/** 
 * Initializes the WorldController Controller after the document is ready
 */
lgb.controller.WorldController.prototype.init = function() {
	
	
	this.mouse = { x: 0, y: 0 };
	
	//var w = $(window).width(),
	//	h = window.outerHeight;
	/**
   * @type {THREE.WebGLRenderer}
   * @private
   */	
	this.renderer_ = new THREE.WebGLRenderer();
	

	
	this.setSize();
	
//	this.renderer_.setSize( w, y );
		//	this.renderer_.setSize( window.document.width, window.document.height  );
	
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
	this.scene_.addLight( this.ambientLight_ );
	

	
	
	this.listen(lgb.event.MeshLoadedEvent, this.onMeshLoaded);
	this.listen(lgb.event.Object3DLoadedEvent, this.onObject3DLoadedEvent);
	this.listen(lgb.event.WindowResizeEvent, this.onWindowResize);
	
	this.roofTopController_ = new lgb.controller.RoofTopController();
	//this.envelopeController_ = new lgb.controller.EnvelopeController();
	
	
	/**
   * The one and only Camera that views the 3d scene
   * @type {gb.view.CameraView}
   * @private
	*/
	this.cameraView_ = new lgb.view.CameraView(this.renderer_.domElement);
	
	this.sun_ = new THREE.DirectionalLight( 0xffffff );
	this.sun_.position = this.cameraView_.camera.position.clone();
	this.scene_.addLight( this.sun_ );
	
	
	/**
   * The grid on the floor
   * @type {gb.view.FloorView}
   * @private
	*/
	this.floorView_ = new lgb.view.FloorView();
	
	/**
   * @type {gb.view.ParticleView}
   * @private
	//*/
	//this.particleView_ = new lgb.view.ParticleView2();
	

	/**
	* for displaying stats like the fram-rate
	*
	* @type {Stats
	* @private
	*/

	if (lgb.Config.SHOW_STATS) {
		this.statsView_ = new lgb.view.StatsView(this.containerDiv_);
	} else {
		this.statsView_ = null;
	}
	
	this.containerDiv_.appendChild( this.renderer_.domElement );
	
	this.particleSystemController = new lgb.controller.ParticleSystemController();

	this.renderEvent = new lgb.event.RenderEvent()
	
	

	if (window.webkitRequestAnimationFrame ) {
		this.renderDelegate	= this.d(this.onRenderWebkit);
		webkitRequestAnimationFrame ( this.renderDelegate);
	} else if (window.mozRequestAnimationFrame){
		this.renderDelegate	= this.d(this.onRenderMoz);
		mozRequestAnimationFrame ( this.renderDelegate	 );
	} else if (window.oRequestAnimationFrame){
		this.renderDelegate	= this.d(this.onRenderOReq);
		oRequestAnimationFrame ( this.renderDelegate );
	} else {
		this.renderDelegate	= this.d(this.onRenderMisc);
		requestAnimationFrame ( this.renderDelegate );
	}
	
	
	this.mouseMoveDirty = false;
	this.containerDiv_.onmousemove = this.d(this.onMouseMove);
		
};

lgb.controller.WorldController.prototype.onMouseMove = function(event) {
	event.preventDefault();	
	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	this.mouseMoveDirty = true;
};

lgb.controller.WorldController.prototype.requestAnimationFrame = function(event) {
	
	var mesh = event.payload;
	this.scene_.addObject(  mesh );
};


lgb.controller.WorldController.prototype.onMeshLoaded = function(event) {
	
	var mesh = event.payload;
	this.scene_.addObject(  mesh );
	
	//mesh.materials[ 0 ].color.setHex( 0x003300 );
	
	var mc = THREE.CollisionUtils.MeshColliderWBox(mesh);
	THREE.Collisions.colliders.push( mc );
};

lgb.controller.WorldController.prototype.onObject3DLoadedEvent = function(event) {
	
	var mesh = event.payload;
	this.scene_.addObject(  mesh );
	

};




lgb.controller.WorldController.prototype.onWindowResize = function(event) {
//	this.renderer_.setSize( window.document.width, window.document.height  );

	
	this.renderer_.setSize( window.innerWidth, window.innerHeight );
};


lgb.controller.WorldController.prototype.setSize = function() {

	var w = $(window).width(),
		h = $(window).height();
		
	this.renderer_.setSize( w, h);
};




lgb.controller.WorldController.prototype.onColladaSceneLoaded = function(event) {
	
	var colladaScene = event.payload;
	this.scene_.addObject(  colladaScene );


};


lgb.controller.WorldController.prototype.onRenderMoz = function(event) {

	mozRequestAnimationFrame ( mainController.worldController_.onRenderMoz  );
	mainController.worldController_.renderHelper();
};

lgb.controller.WorldController.prototype.onRenderWebkit = function(event) {

	webkitRequestAnimationFrame ( mainController.worldController_.onRenderWebkit  );
	mainController.worldController_.renderHelper();
};

lgb.controller.WorldController.prototype.onRenderOReq = function(event) {


	oRequestAnimationFrame ( mainController.worldController_.onRenderOReq  );
	mainController.worldController_.renderHelper();
	

};
lgb.controller.WorldController.prototype.onRenderMisc = function(event) {

	requestAnimationFrame ( mainController.worldController_.onRenderMisc );
	mainController.worldController_.renderHelper();
};


lgb.controller.WorldController.prototype.renderHelper = function() {

	if(this.mouseMoveDirty ) {
		var vector = new THREE.Vector3( this.mouse.x,  this.mouse.y, 0.5 );
		this.projector_.unprojectVector( vector, this.cameraView_.camera );
		
		var ray = new THREE.Ray( 
			this.cameraView_.camera.position, 
			vector.subSelf( this.cameraView_.camera.position ).normalize() );
	
		var c = THREE.Collisions.rayCastNearest( ray );
		
		if( c ) {
		
			//info.innerHTML += "Found @ distance " + c.distance;
			//c.mesh.materials[ 0 ].color.setHex( 0xbb0000 );
				console.log('mouse over ' + c.mesh.name)
		} else {
		
			//info.innerHTML += "No intersection";
	
		}
		
		this.mouseMoveDirty = false;
	}

	
	//todo: further optimze the render loop
	goog.events.dispatchEvent(lgb.globalEventBus, this.renderEvent);
	
	this.renderer_.render( this.scene_, this.cameraView_.camera );

};




