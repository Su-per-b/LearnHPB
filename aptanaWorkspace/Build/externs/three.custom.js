/**
 * @constructor
 * @param {Object=} object
 * @param {Object=} domElement
 */
THREE.TrackballControlsEx = function ( object, domElement ) {};
	
/** @type number */
THREE.TrackballControlsEx.prototype.rotateSpeed;
/** @type number */
THREE.TrackballControlsEx.prototype.zoomSpeed;
/** @type number */
THREE.TrackballControlsEx.prototype.panSpeed;

THREE.TrackballControlsEx.prototype.update = function (  ) {};
/**@param {number} delta */
THREE.TrackballControlsEx.prototype.zoomNow = function (delta) {};



/**
 * @constructor
 * @param {Object=} object
 * @param {Object=} domElement
 */
THREE.SceneLoaderEx = function ( object, domElement ) {};

/**
 * @param {string} url
 * @param {Function=} callbackFinished
 */
THREE.SceneLoaderEx.prototype.load = function ( url, callbackFinished ) {};