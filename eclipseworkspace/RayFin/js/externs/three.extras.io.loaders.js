
/**
 * @constructor
 * @extends {THREE.Loader}
 * @param {boolean=} showStatus
 */
THREE.BinaryLoader = function ( showStatus ) {};

/**
 * @param {Object=} parameters
 */
THREE.BinaryLoader.prototype.load = function ( parameters ) {};

/**
 * @constructor
 * @extends {THREE.Loader}
 * @param {boolean=} showStatus
 */
THREE.JSONLoader = function ( showStatus ) {};

/**
 * @param {Object=} parameters
 */
THREE.JSONLoader.prototype.load = function ( parameters ) {};
	
	
/**
 * @constructor
 * @param {boolean=} showStatus
 */
THREE.Loader = function ( showStatus ) {};

/**
 * @constructor
 */
THREE.SceneLoader = function () {};

/**
 * @param {string} url
 * @param {Function} callbackFinished
 */
THREE.SceneLoader.prototype.load = function ( url, callbackFinished ) {};

