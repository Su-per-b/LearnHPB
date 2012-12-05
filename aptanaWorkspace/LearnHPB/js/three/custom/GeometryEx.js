

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
    return [this.boundingBox.min,this.boundingBox.max]
};



