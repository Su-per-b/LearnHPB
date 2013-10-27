

var originalPrototype = THREE.Geometry.prototype;


THREE.Geometry = function () {
  
  this.id = THREE.GeometryCount ++;

  this.name = '';

  this.vertices = [];
  this.colors = []; // one-to-one vertex colors, used in ParticleSystem, Line and Ribbon

  this.materials = [];

  this.faces = [];

  this.faceUvs = [[]];
  this.faceVertexUvs = [[]];

  this.morphTargets = [];
  this.morphColors = [];
  this.morphNormals = [];

  this.skinWeights = [];
  this.skinIndices = [];

  this.boundingBox = null;
  this.boundingSphere = null;

  this.hasTangents = false;

  this.dynamic = true; // the intermediate typearrays will be deleted when set to false
  
  this.analysis_ = {
    isCentered : null,
    v3Offset : null,
    duplicateVerticesCount : null
  };
  
};



THREE.Geometry.prototype = originalPrototype;



THREE.Geometry.prototype.getDimensions = function() {

    this.computeBoundingBox();
    var bb = this.boundingBox;
  
    var xExt = bb.max.x - bb.min.x;
    var yExt = bb.max.y - bb.min.y;
    var zExt = bb.max.z - bb.min.z;
    
    var dimensions = new THREE.Vector3(xExt, yExt, zExt);
    return dimensions;
};


THREE.Geometry.prototype.getBoundingBoxPoints = function() {
 
    this.computeBoundingBox();
    return [this.boundingBox.min,this.boundingBox.max];
};

THREE.Geometry.prototype.getBoundingBox = function() {
 
    this.computeBoundingBox();
    return this.boundingBox;
};


THREE.Geometry.prototype.getBoundingBoxObject = function() {
 
    if (null == this.boundingBoxCached) {
      this.computeBoundingBox();
      this.boundingBoxCached = new THREE.BoundingBox(this.boundingBox.min, this.boundingBox.max);
    }
    
    return this.boundingBoxCached;
};


THREE.Geometry.prototype.center = function() {
  
  if (null == this.analysis_.isCentered) {
    this.analyzeAlignment();
  }
  
  if (false == this.analysis_.isCentered) {
    
    var mesh = new THREE.Mesh(this);
    
    var v3Shift = new THREE.Vector3 (
      this.analysis_.v3Offset.x * -1,
      this.analysis_.v3Offset.y * -1,
      this.analysis_.v3Offset.z * -1);
    
    mesh.position = v3Shift;
    mesh.matrix.setPosition( mesh.position );
    
    this.applyMatrix(mesh.matrix);
    this.computeBoundingSphere();
    
    this.analyzeAlignment();
    
    if (false == this.analysis_.isCentered) {
     debugger; 
    }
    
  }
  
  return;
};

THREE.Geometry.prototype.analyzeAlignment = function() {

  var bb = this.getBoundingBox();
  
  var xOffset = bb.max.x + bb.min.x;
  var yOffset = bb.max.y + bb.min.y;
  var zOffset = bb.max.z + bb.min.z;
  
  var v3Offset = new THREE.Vector3 (
    xOffset / 2,
    yOffset / 2,
    zOffset / 2);
      
      
  var isCentered = true;
  var threshHold = THREE.Geometry.centerThreshHold;
  
  if (Math.abs(v3Offset.x) > threshHold ||
      Math.abs(v3Offset.y) > threshHold ||
      Math.abs(v3Offset.z) > threshHold ) {
        
      isCentered = false;
  }
  
  this.analysis_.isCentered = isCentered;
  this.analysis_.v3Offset = v3Offset;
  
};



THREE.Geometry.prototype.analyze = function() {
  
  this.analyzeAlignment();
  this.analysis_.duplicateVerticesCount = this.countDuplicateVertices();
  
  return this.analysis_;
  
};


THREE.Geometry.prototype.countDuplicateVertices = function() {
  

    var verticesMap = {}; // Hashmap for looking up vertice by position coordinates (and making sure they are unique)
    var unique = [], changes = [];

    var v, key;
    var precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
    var precision = Math.pow( 10, precisionPoints );
    var i,il, face;
    var abcd = 'abcd', o, k, j, jl, u;

    for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

      v = this.vertices[ i ];
      key = [ Math.round( v.x * precision ), Math.round( v.y * precision ), Math.round( v.z * precision ) ].join( '_' );

      if ( verticesMap[ key ] === undefined ) {

        verticesMap[ key ] = i;
        unique.push( this.vertices[ i ] );
        changes[ i ] = unique.length - 1;

      } else {

        //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
        changes[ i ] = changes[ verticesMap[ key ] ];

      }

    };

    // Use unique set of vertices
    var diff = this.vertices.length - unique.length;
    return diff;
  
};


THREE.Geometry.centerThreshHold = 0.000001;
