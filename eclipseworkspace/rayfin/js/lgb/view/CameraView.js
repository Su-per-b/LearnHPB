goog.provide('lgb.view.CameraView');

goog.require ("lgb.view.ViewBase");
goog.require('lgb.event.WindowResizeEvent');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.CameraView = function(domElement) {
	lgb.view.ViewBase.call(this);
	
	this.init(domElement);

};



goog.inherits(lgb.view.CameraView, lgb.view.ViewBase);



/** 
 * Initializes the View
 */
lgb.view.CameraView.prototype.init = function(domElement) {

	this.domElement_ = domElement;
	this.camera = new THREE.PerspectiveCamera
		( 30, this.domElement_.width  / this.domElement_.height, 1, 250 );
	
	
	this.camera.position.z = 500;
	this.trackballControls  = new THREE.TrackballControls (this.camera);
	
	this.trackballControls.rotateSpeed = 1.0;
	this.trackballControls.zoomSpeed = 1.2;
	this.trackballControls.panSpeed = 0.8;

	this.trackballControls.noZoom = false;
	this.trackballControls.noPan = false;

	this.trackballControls.staticMoving = true;
	this.trackballControls.dynamicDampingFactor = 0.3;

	this.trackballControls.keys = [ 65, 83, 68 ];
				
/*
	this.camera  = new THREE.TrackballControls ({

		fov: 30,
		near: 1,
		far: 250,
		aspect	: this.domElement_.width  / this.domElement_.height,
		rotateSpeed: 0.4,
		zoomSpeed: 0.5,
		panSpeed: 0.2,

		noZoom: false,
		noPan: false,

		staticMoving: false,
		dynamicDampingFactor: .9,

		minDistance:1,
		maxDistance:100,

		keys: [ 65, 83, 68 ] // [ rotateKey, zoomKey, panKey ],
	}, domElement);
	*/
	
	

	
	this.orbitRadius = 30;
	this.camera.position.x = 0;
	this.camera.position.y = 2;
	this.camera.position.z = this.orbitRadius;
	
	

	
	this.listen(lgb.event.RenderEvent, this.onRender);
	this.listen(lgb.event.WindowResizeEvent, this.onWindowResize);
};




lgb.view.CameraView.prototype.onWindowResize = function(event) {
	
	this.camera.aspect	= this.domElement_.width  / this.domElement_.height;
	this.camera.updateProjectionMatrix();

};
	
	
lgb.view.CameraView.prototype.onRender = function(event) {

	this.trackballControls.update();
	//var timer = new Date().getTime() * 0.0004;
	

	//this.camera.position.x = Math.cos( timer ) * this.orbitRadius;
	//this.camera.position.z = Math.sin( timer ) * this.orbitRadius;
};









