//@author Raj Dye raj@pcdigi.com



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



THREE.Mesh.prototype.bakeScaleIntoGeometry = function() {


  if (this.scale.x != 1.0 ||
    this.scale.y != 1.0 ||
    this.scale.z != 1.0) {
      

    var originalPosition = this.position;
    var originalRotation = this.rotation;
    var originalScale = this.scale;
    var originalQuaternion = this.quaternion;
        
    this.position = new THREE.Vector3();
    this.rotation = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion();
    
    this.updateMatrix();
    
    this.geometry.applyMatrix(this.matrix);
    this.geometry.computeBoundingSphere();
  
    this.geometry.center();
  
    this.position = originalPosition;
    this.rotation = originalRotation;
    this.quaternion = originalQuaternion;
    this.scale = new THREE.Vector3(1, 1, 1);
  
    this.updateMatrix();
    
  }
    

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



THREE.Mesh.prototype.analyzeGeometry = function() {
  
  return this.geometry.analyze();
  
};


THREE.Mesh.prototype.centerGeometry = function() {
  
  
  
};



 