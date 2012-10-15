

THREE.Object3D.prototype.removeAllChildren = function() {

    var len = this.children.length;
    var cc = []

    for (var i = 0; i < len; i++) {
      var child = this.children[i];
      cc.push(child);
    };

    for (var j = 0; j < len; j++) {
      var child = cc.pop();
      //cc.push(child);
      this.remove(child);
    };
};

THREE.Object3D.prototype.addChildren = function(object3d) {
  
    if (undefined === object3d || null == object3d) {
      throw ("you passed an invalid object3d as an argument")
    }
    
    var len = object3d.children.length;
    
    if (1 > object3d.children.length) {
      throw ("object3d as an argument has no children")
    }
    
    for (var i = 0; i < len; i++) {
      var childObject = object3d.children.pop();
      this.add(childObject);
    }
    
};

  

