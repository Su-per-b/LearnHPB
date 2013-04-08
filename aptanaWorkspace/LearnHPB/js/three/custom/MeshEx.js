//@author Raj Dye raj@pcdigi.com


THREE.Mesh.prototype._NAME = 'THREE.Mesh';

THREE.Mesh.prototype.bakeTransformsIntoGeometry = function() {

  this.updateMatrix();

  var newGeom = THREE.GeometryUtils.clone(this.geometry);
  newGeom.applyMatrix(this.matrix);

  this.geometry = newGeom;
  this.geometry.computeBoundingSphere();

  this.position = new THREE.Vector3();
  this.rotation = new THREE.Vector3();
  this.scale = new THREE.Vector3(1, 1, 1);
  this.quaternion = new THREE.Quaternion();
};



THREE.Mesh.prototype.cloneEx = function(deepCloneChildren, cloneGeometry) {
  
  var geo;
  
  if (cloneGeometry) {
    geo = THREE.GeometryUtils.clone(this.geometry);
  } else {
    geo = this.geometry;
  }

   var theClone = new THREE.Mesh(geo, this.material);
   this.cloneBuilder_(theClone);
   
   if (deepCloneChildren) {
     var len = this.children.length;
     for (var i=0; i <  len ; i++) {
       var childClone = this.children[i].cloneEx(deepCloneChildren, cloneGeometry);
       theClone.add(childClone);
     };
   }
   
   return theClone;
};



/**
 *  "Master Obi-Wan, not victory. The shroud of the dark side has fallen.
 * Begun, the Clone War has!"
 *  ―Yoda (http://starwars.wikia.com/wiki/Star_Wars_Episode_II:_Attack_of_the_Clones)
 * 
 * by default a shallow clone
 * @author Raj Dye raj@pcdigi.com
 * @public
 */
THREE.Mesh.prototype.clone = function() {
  return this.cloneEx(false,false);
};


THREE.Mesh.prototype.getBoundingBox = function() {
    
    var boundingBox;
       
    if (undefined != this.geometry) {
        boundingBox = this.geometry.getBoundingBoxObject();
    }

    return boundingBox;
};




//@author Raj Dye raj@pcdigi.com
THREE.Mesh.prototype.extractPositionFromGeometry = function() {

  //this.updateMatrix();

  var newGeom = THREE.GeometryUtils.clone(this.geometry);
  var dim = newGeom.getDimensions();

  //var len1 = newGeom.vertices.length;
  newGeom.mergeVertices();
  // var len2 = newGeom.vertices.length;

  var correctX = -1 * dim.x / 2;
  var correctY = -1 * dim.y / 2;
  var correctZ = -1 * dim.z / 2;

  var xDelta = correctX - newGeom.boundingBox.x[0];
  var yDelta = correctY - newGeom.boundingBox.y[0];
  var zDelta = correctZ - newGeom.boundingBox.z[0];

  var len = newGeom.vertices.length;

  for (var i = 0; i < len; i++) {
    newGeom.vertices[i].position.x += xDelta;
    newGeom.vertices[i].position.y += yDelta;
    newGeom.vertices[i].position.z += zDelta;
  }

  newGeom.computeBoundingBox();
  newGeom.computeBoundingSphere();
  // newGeom.__dirtyVertices = true;

  this.geometry = newGeom;

  // this.updateMatrix();
  //this.update();
  this.position.x -= xDelta;
  this.position.y -= yDelta;
  this.position.z -= zDelta;

  //newGeom.applyMatrix(this.matrix);
  var x;

}; 