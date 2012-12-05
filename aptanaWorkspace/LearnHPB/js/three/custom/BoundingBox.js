/**
 * @author raj dye http://rajdye.com/
 */

THREE.BoundingBox = function ( min, max ) {

  this.min = min || new THREE.Vector3();
  this.max = max || new THREE.Vector3();

};


THREE.BoundingBox.prototype = {

  constructor: THREE.BoundingBox,

    set: function (min, max) {

    this.min = min;
    this.max = max;

    return this;
  },
  
  

  setMin: function ( min ) {

    this.min = min;

    return this;

  },

  setMax: function ( max ) {

    this.max = max;

    return this;

  },


  copy: function ( v ) {

    this.min = v.min.clone();
    this.max = v.max.clone();
    
    return this;

  },


  clone: function () {

    return new THREE.BoundingBox(
      this.min.clone(),
      this.max.clone()
    );
    
  }

};

