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

  merge: function (bb)  {
      
      this.min.x = Math.min(this.min.x, bb.min.x);
      this.min.y = Math.min(this.min.y, bb.min.y);
      this.min.z = Math.min(this.min.z, bb.min.z);
      
      this.max.x = Math.max(this.max.x, bb.max.x);
      this.max.y = Math.max(this.max.y, bb.max.y);
      this.max.z = Math.max(this.max.z, bb.max.z);
  },
  

  add: function (v3)  {
      
      this.min.add(v3);
      this.max.add(v3);

  },
  
  toString: function ()  {
      
      var str = 'min - ' + this.min.toString();
      str += 'max - ' + this.max.toString();
      
      return str;
  },
  
  
  toJSON: function ()  {
      
      var str = "[{0}, {1}, {2}, {3}, {4}, {5}]".format(
        this.min.x,
        this.min.y,
        this.min.z,
        this.max.x,
        this.max.y,
        this.max.z
        );
      
      
      str = '"boundingBox":' + str;

      return str;
  },
  
  
  

  clone: function () {

    return new THREE.BoundingBox(
      this.min.clone(),
      this.max.clone()
    );
    
  }

};

