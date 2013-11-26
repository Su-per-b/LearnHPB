

THREE.Camera.prototype.setAnchor = function ( anchor ) {

  this.anchor_ = anchor;

};

THREE.Camera.prototype.getAnchor = function (  ) {

  return this.anchor_;

};


THREE.Camera.prototype.lookAt = function () {

  // This routine does not support cameras with rotated and/or translated parent(s)

  var m1 = new THREE.Matrix4();

  return function ( vector ) {
    
    this.lookAtPosition = vector;
    m1.lookAt( this.position, vector, this.up );

    this.quaternion.setFromRotationMatrix( m1 );

  };

}();



// THREE.Camera.prototype.lookAt = function ( vector ) {
// 
  // // TODO: Add hierarchy support.
// 
  // this.matrix.lookAt( this.position, vector, this.up );
// 
  // //if ( this.rotationAutoUpdate === true ) {
    // //this.rotation.setEulerFromRotationMatrix( this.matrix, this.eulerOrder );
 // //}
//   
  // this.lookAtPosition = vector;
// 
// };


THREE.Camera.prototype.getInfo = function ( vector ) {

    var p = this.position; 
    
    var px = p.x.toPrecision(4).toString();
    var py = p.y.toPrecision(4).toString();
    var pz = p.z.toPrecision(4).toString();
       
    var msg = "Camera Pos: [x,y,z] [{0},{1},{2}]".format(px, py, pz);
    
    var t = this.lookAtPosition;  

    if (t) {
      
      var tx = t.x.toPrecision(4).toString();
      var ty = t.y.toPrecision(4).toString();
      var tz = t.z.toPrecision(4).toString();
      
      msg += " | Camera target: [x,y,z] [{0},{1},{2}]";
      msg = msg.format(tx, ty, tz);
    
    }

    return msg;

};

