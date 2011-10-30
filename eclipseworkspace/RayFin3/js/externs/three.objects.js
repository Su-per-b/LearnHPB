
/**
 * @constructor
 * @param {*=} belongsToSkin
 */
THREE.Bone = function(belongsToSkin) {};

/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {*=} geometry
 * @param {*=} materials
 * @param {*=} type
 */
THREE.Line = function( geometry, materials, type) {};

/** @type {number} */
THREE.LineStrip;
/** @type {number} */
THREE.LinePieces;

/**
 * @constructor
 */
THREE.LOD = function() {};

/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {*=} geometry
 * @param {*=} materials
 */
THREE.Mesh = function(geometry, materials) {};
/** @type {THREE.Vector3} */
THREE.Mesh.prototype.position;

/**
 * @constructor
 * @param {*=} materials
 */
THREE.Particle = function(materials) {};
/** @type {THREE.Vector3} */
THREE.Particle.prototype.position;

/**
 * @constructor
 * @param {*=} geometry
 * @param {*=} materials
 */
THREE.ParticleSystem = function(geometry, materials) {};

/** @type {THREE.Geometry} */
THREE.ParticleSystem.prototype.geometry;



/**
 * @constructor
 * @param {*=} geometry
 * @param {*=} materials
 * @return {THREE.Particle}
 */
THREE.Ribbon = function(geometry,materials) {};

/**
 * @constructor
 * @param {*=} geometry
 * @param {*=} materials
 */
THREE.SkinnedMesh = function(geometry,materials) {};

/**
 * @constructor
 * @param {Object=} parameters
 */
THREE.Sprite = function(parameters) {};





