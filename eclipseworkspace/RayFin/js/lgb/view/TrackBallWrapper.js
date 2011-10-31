goog.provide('lgb.view.TrackBallWrapper');

goog.require('lgb.view.ViewBase');
goog.require('lgb.events.RenderEvent');




/**
 * @constructor
 * @extends lgb.view.ViewBase
 * @param {Object} camera The object to use usually the camera.
 * @param {Element} domElement The div to use as a touch pad.
 */
lgb.view.TrackBallWrapper = function( camera, domElement) {
	lgb.view.ViewBase.call(this);
	this.trackballControls = new THREE.TrackballControlsEx(camera, domElement);
	this.init();
	
	this.camera = camera;
	this._NAME ='lgb.view.TrackBallWrapper';

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
	
	var delegate = this.d(this.onMouseWheel);
	
	//this.trackballControls.setZoom = function(zoomStart, zoomEnd) {
	//	_zoomEnd = zoomEnd;
//		_zoomStart = zoomStart;
//	};
	
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', delegate, false);
	}

	window.onmousewheel = document.onmousewheel = delegate;
};


/**
 * @param {MouseScrollEvent} event
 */
lgb.view.TrackBallWrapper.prototype.onMouseWheel = function(event) {
	var delta = 0;

	if (event.wheelDelta) {
		delta = event.wheelDelta/120; 
	} else if (event.detail) {
		delta = -event.detail/3;
	}
	
	if (delta)
		this.mouseWheelChange(delta);
        if (event.preventDefault) {
               event.preventDefault();
        }

    event.returnValue = false;
};


/**
 * @param {number} delta
 */
lgb.view.TrackBallWrapper.prototype.mouseWheelChange = function(delta) {
	 this.trackballControls.zoomNow(delta);
}

lgb.view.TrackBallWrapper.prototype.onRender = function(event) {
	this.trackballControls.update();
};












