/**
 * @constructor
 * @extends THREE.Light
 * @param {*} hex
 */
THREE.AmbientLight  = function(hex) {};

/**
 * @constructor
 * @extends THREE.Light
 * @param {number=} hex
 * @param {*=} intensity
 * @param {*=} distance
 * @param {*=} castShadow
 */
THREE.DirectionalLight   = function(hex, intensity, distance, castShadow) {};


/**
 * @constructor
 * @extends THREE.Object3D
 * @param {*=} texture
 * @param {*=} size
 * @param {*=} distance
 * @param {*=} blending
 */
THREE.LensFlare = function ( texture, size, distance, blending ) {};
	
/**
 * @constructor
 * @extends THREE.Object3D
 * @param {number=} hex
 */
THREE.Light   = function( hex ) {};

/**
 * @constructor
 * @extends THREE.Light
 * @param {number=} hex
 * @param {*=} intensity
 * @param {*=} distance
 */
THREE.PointLight   = function(hex, intensity, distance) {};

/**
 * @constructor
 * @extends THREE.Light
 * @param {number=} hex
 * @param {*=} intensity
 * @param {*=} distance
 * @param {*=} castShadow
 */
THREE.SpotLight   = function(hex, intensity, distance, castShadow) {};