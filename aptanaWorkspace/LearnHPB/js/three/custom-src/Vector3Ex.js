

THREE.Vector3.prototype.toString = function () {

  var str = this.toStringHelper_('x', this.x);
  str += this.toStringHelper_('y', this.y);
  str += this.toStringHelper_('z', this.z);

  return str;
  
};

THREE.Vector3.prototype.toStringHelper_ = function (label, theFloat) {

  var str = label + ":" + String(theFloat.toFixed(4));
  str += ' ';
  
  return str;
  
};