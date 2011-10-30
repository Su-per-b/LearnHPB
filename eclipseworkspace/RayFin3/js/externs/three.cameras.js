/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {*=} fov
 * @param {*=} aspect
 * @param {*=} near
 * @param {*=} far
 * @param {*=} target
 */
THREE.Camera   = function( fov, aspect, near, far, target) {};

THREE.Camera.prototype.updateProjectionMatrix = function () {};
	
	
/**
 * @constructor
 * @extends {THREE.Camera}
 * @param {*=} fov
 * @param {*=} aspect
 * @param {*=} near
 * @param {*=} far
 * @param {*=} target
 */
THREE.OrthoCamera = function( fov, aspect, near, far, target) {};


/**
 * @constructor
 * @extends {THREE.Camera}
 * @param {*=} fov
 * @param {*=} aspect
 * @param {*=} near
 * @param {*=} far
 */
THREE.PerspectiveCamera = function ( fov, aspect, near, far ) {};