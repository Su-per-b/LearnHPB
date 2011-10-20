/**
 * @constructor
 * @return {THREE.CollisionSystem}
 */
THREE.CollisionSystem = function() {};

/**
 * @return {THREE.CollisionSystem};
 * @param {*=} ray
 */
THREE.CollisionSystem.prototype.rayCastNearest = function(ray) {};

/** @type {THREE.Mesh} **/
THREE.CollisionSystem.prototype.mesh;

/** @type {THREE.Vector3} **/
THREE.CollisionSystem.prototype.collisionNormal;
/** @type {Array} **/
THREE.CollisionSystem.prototype.colliders;
/** @type {Array} **/
THREE.CollisionSystem.prototype.hits;



/** @type {THREE.CollisionSystem} **/
THREE.Collisions;

/** @type {Object} **/
THREE.CollisionUtils;

/**
 * @param {THREE.Mesh} m
 * @return {THREE.BoxCollider}
 */
THREE.CollisionUtils.MeshOBB = function( m ) {};



/**
 * @constructor
 * @param {number} min
 * @param {number} max
 */
THREE.BoxCollider = function( min, max ) {};

/**
 * @constructor
 * @param {THREE.Mesh} mesh
 * @param {Object} box
 */
THREE.MeshCollider = function( mesh, box ) {};




/**
 * @param {THREE.Mesh} m
 * @return {THREE.MeshCollider}
 */
THREE.CollisionUtils.MeshColliderWBox = function( m ) {};


