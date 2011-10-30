goog.provide('lgb.view.TrackBallWrapper');

goog.require('lgb.view.ViewBase');
goog.require('lgb.events.RenderEvent');




/**
 * @constructor
 * @extends lgb.view.ViewBase
 * @param {Object} object The object to use usually the camera.
 * @param {Element} domElement The div to use as a touch pad.
 */
lgb.view.TrackBallWrapper = function( object, domElement) {
	lgb.view.ViewBase.call(this);
	this.trackballControls = new THREE.TrackballControls(object, domElement);
	this.init();

};
goog.inherits(lgb.view.TrackBallWrapper, lgb.view.ViewBase);



/**
 * Initializes the TrackballControls
 * @private
 */
lgb.view.TrackBallWrapper.prototype.init = function() {

	this.trackballControls.rotateSpeed = 1.0;
	this.trackballControls.zoomSpeed = 1.2;
	this.trackballControls.panSpeed = 0.8;

	this.trackballControls.noZoom = false;
	this.trackballControls.noPan = false;

	this.trackballControls.staticMoving = true;
	this.trackballControls.dynamicDampingFactor = 0.3;

	this.trackballControls.keys = [65, 83, 68];

	this.orbitRadius = 30;
	this.listen(lgb.events.RenderEvent.TYPE, this.d(this.onRender));
};



lgb.view.TrackBallWrapper.prototype.onRender = function(event) {

	this.trackballControls.update();
	
	//var timer = new Date().getTime() * 0.0004;
	//this.camera.position.x = Math.cos( timer ) * this.orbitRadius;
	//this.camera.position.z = Math.sin( timer ) * this.orbitRadius;
};












