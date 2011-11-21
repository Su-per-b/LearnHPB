/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {number=} fov
 * @param {number=} aspect
 * @param {number=} near
 * @param {number=} far
 * @param {THREE.Vector3=} target
 */
THREE.Camera   = function( fov, aspect, near, far, target) {};

THREE.Camera.prototype.updateProjectionMatrix = function () {};

/**
 * @param {THREE.Vector3} target
 */
THREE.Camera.prototype.lookAt = function (target) {};
	
/**
 * @type {THREE.Vector3}
 */
THREE.Camera.prototype.target

	
	
/**
 * @constructor
 * @extends {THREE.Camera}
 * @param {number=} fov
 * @param {number=} aspect
 * @param {number=} near
 * @param {number=} far
 * @param {THREE.Vector3=} target
 */
THREE.OrthoCamera = function( fov, aspect, near, far, target) {};


/**
 * @constructor
 * @extends {THREE.Camera}
 * @param {number=} fov
 * @param {number=} aspect
 * @param {number=} near
 * @param {number=} far
 */
THREE.PerspectiveCamera = function ( fov, aspect, near, far ) {};