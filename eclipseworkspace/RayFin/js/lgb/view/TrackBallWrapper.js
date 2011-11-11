goog.provide('lgb.view.TrackBallWrapper');

goog.require('goog.events.MouseWheelEvent');
goog.require('goog.events.MouseWheelHandler');
goog.require('lgb.events.Render');
goog.require('lgb.view.ViewBase');




/**
 * @constructor
 * @extends lgb.view.ViewBase
 * @param {Object} camera The object to use usually the camera.
 * @param {Element} domElement The div to use as a touch pad.
 */
lgb.view.TrackBallWrapper = function(camera, domElement) {
	/**@constant **/
	this._NAME = 'lgb.view.TrackBallWrapper';
	/**@constant **/
	this._SENSITIVITY = -0.4;

	lgb.view.ViewBase.call(this);
	this.domElement_ = domElement;
	this.camera_ = camera;

	/**@type {THREE.TrackballControlsEx} */
	this.trackballControls;

	this.trackballControls = new THREE.TrackballControlsEx(camera, domElement);
	this.init_();



};
goog.inherits(lgb.view.TrackBallWrapper, lgb.view.ViewBase);



/**
 * Initializes the TrackballControls
 * @private
 */
lgb.view.TrackBallWrapper.prototype.init_ = function() {

	this.trackballControls.rotateSpeed = 1.0;
	this.trackballControls.zoomSpeed = 1.2;
	this.trackballControls.panSpeed = 0.8;

	this.trackballControls.noZoom = false;
	this.trackballControls.noPan = false;

	this.trackballControls.staticMoving = true;
	this.trackballControls.dynamicDampingFactor = 0.3;

	this.trackballControls.keys = [65, 83, 68];

	this.orbitRadius = 30;

	this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.TrackBallWrapper.prototype.bind_ = function() {

	this.listen(lgb.events.Render.TYPE, this.d(this.onRender));

	this.mouseWheelHander = new goog.events.MouseWheelHandler(this.domElement_);

	this.listenKey_ = this.listenTo(this.mouseWheelHander,
		goog.events.MouseWheelHandler.EventType.MOUSEWHEEL,
		this.d(this.onMouseWheel_)
	);
};

/**
 * //TODO (Raj) Get this dispose to work and test memory footprint.
 * experimental
 */
lgb.view.TrackBallWrapper.prototype.disposeInternal = function() {
  this.unlisten(this.listenKey_);
  delete this.listenKey_;
};


/**
 * @private
 * @param {goog.events.MouseWheelEvent} event The event telling how
 * far the wheel has moved.
 */
lgb.view.TrackBallWrapper.prototype.onMouseWheel_ = function(event) {

	var delta = event.deltaY * this._SENSITIVITY;

	if (delta) {
		this.trackballControls.zoomNow(delta);
	}
};

/**
 * Event handler for when the scene is rendered.
 * @param {lgb.events.Render} event The event fired by the
 * worldController.
 */
lgb.view.TrackBallWrapper.prototype.onRender = function(event) {
	this.trackballControls.update();
};












