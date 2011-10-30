goog.provide('lgb.view.CameraView');

goog.require('lgb.events.WindowResizeEvent');
goog.require('lgb.view.ViewBase');
goog.require('lgb.events.TrackBallControlPause');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.CameraView = function(domElement) {
	lgb.view.ViewBase.call(this);

	this.init(domElement);
	this._NAME ='lgb.view.CameraView';
};
goog.inherits(lgb.view.CameraView, lgb.view.ViewBase);



/**
 * Initializes the View
 * @param {Element} domElement The element to use as the trackball 'touchpad'.
 */
lgb.view.CameraView.prototype.init = function(domElement) {
	this.domElement_ = domElement;
	this.camera = new THREE.PerspectiveCamera
		(30, this.domElement_.width / this.domElement_.height, 1, 250);

	this.camera.position.z = 500;
	this.orbitRadius = 30;
	this.camera.position.x = 0;
	this.camera.position.y = 2;
	this.camera.position.z = this.orbitRadius;
	
	this.listen(lgb.events.WindowResizeEvent.TYPE, this.onWindowResize);
};


/**
 * Event handler for the browser window resize
 * @param {goog.events.Event} event The event.
 */
lgb.view.CameraView.prototype.onWindowResize = function(event) {
	this.camera.aspect	= window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
};
