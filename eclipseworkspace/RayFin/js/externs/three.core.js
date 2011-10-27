/** @typedef {*}*/
var THREE;

/**
 * @constructor
 * @param {number=} hex
 */
THREE.Color = function(hex) {};

/**
 * @constructor
 * @param {number} v1
 * @param {number} v2
 * @param {number} vi1
 * @param {number} vi2
 */
THREE.Edge = function(v1, v2, vi1, vi2) {};

/**
 * @constructor
 * @param {*=} a
 * @param {*=} b
 * @param {*=} c
 * @param {*=} normal
 * @param {*=} color
 * @param {*=} materials
 */
THREE.Face3 = function(a, b, c, normal, color, materials) {};

/**
 * @constructor
 * @param {*=} a
 * @param {*=} b
 * @param {*=} c
 * @param {*=} d
 * @param {*=} normal
 * @param {*=} color
 * @param {*=} materials
 */
THREE.Face4 = function(a, b, c, d, normal, color, materials) {};

/**
 * @constructor
 */
THREE.Matrix3 = function() {};

/**
 * @constructor
 */
THREE.Rectangle = function() {};

/**
 * @constructor
 * @param {*=} points
 */
THREE.Spline = function(points) {};


/**
 * @constructor
 * @param {THREE.Vector3} position
 */
THREE.Vertex = function(position) {};

/** @type {THREE.Vector3} */
THREE.Vertex.prototype.position;



/**
 * @constructor
 */
THREE.Geometry = function() {};

/**
 * @constructor
 * @param {number} n11
 * @param {number} n12
 * @param {number} n13
 * @param {number} n14
 * @param {number} n21
 * @param {number} n22
 * @param {number} n23
 * @param {number} n24
 * @param {number} n31
 * @param {number} n32
 * @param {number} n33
 * @param {number} n34
 * @param {number} n41
 * @param {number} n42
 * @param {number} n43
 * @param {number} n44
 */
THREE.Matrix4 = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {};


/**
 * @constructor
 */
THREE.Object3D = function() {};
/**
 * @param {THREE.Object3D|THREE.Mesh|THREE.Line} object
 */
THREE.Object3D.prototype.add= function (object) {};

THREE.Object3D.prototype.updateMatrix= function () {};

/** @type {THREE.Vector3}*/
THREE.Object3D.prototype.up;

/** @type {THREE.Vector3}*/
THREE.Object3D.prototype.position;

/** @type {THREE.Vector3}*/
THREE.Object3D.prototype.rotation;

/** @type {THREE.Vector3}*/
THREE.Object3D.prototype.scale;







/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 */
THREE.Quaternion = function(x, y, z, w) {};

/**
 * @constructor
 * @param {*=} origin
 * @param {*=} direction
 */
THREE.Ray = function(origin, direction) {};

/**
 * @constructor
 * @param {number} u
 * @param {number} v
 */
THREE.UV = function(u, v) {};


/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @return {THREE.Vector2}
 */
THREE.Vector2 = function(x, y) {};

/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
THREE.Vector3 = function( x, y, z) {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z 
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.set = function ( x, y, z ) {};

/**
 * @param {THREE.Vector3} v
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.subSelf = function ( v ) {};

/**
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.normalize  = function () {};
 
/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 */
THREE.Vector4 = function (x, y, z, w) {};





