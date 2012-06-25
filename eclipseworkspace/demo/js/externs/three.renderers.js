/**
 * @constructor
 */
THREE.Projector = function() {};

/**
 * @param {THREE.Vector3} vector
 * @param {THREE.Camera} camera
 * @return {THREE.Vector3}
 */
THREE.Projector.prototype.unprojectVector = function ( vector, camera ) {};
	

/**
 * @constructor
 * @param {Object=} parameters
 */
THREE.WebGLRenderer = function ( parameters ) {};


/**
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {Object=} renderTarget
 * @param {boolean=} forceClear
 */
THREE.WebGLRenderer.prototype.render = function( scene, camera, renderTarget, forceClear ) {};

/**
 * @param {number} width
 * @param {number} height
 */
THREE.WebGLRenderer.prototype.setSize = function ( width, height ) {};

/** @type {Node} */
THREE.WebGLRenderer.prototype.domElement;


