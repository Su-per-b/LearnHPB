



THREE.Object3D.prototype.removeAllChildren = function() {

    var len = this.children.length;
    var cc = [];

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

THREE.Object3D.prototype.setVisible = function( isVisible) {
  
  if (this.isVisibleHelper_ != isVisible) {
    
    this.isVisibleHelper_ = isVisible
    
    if (isVisible) {
      this.position.z = this.zz;
    } else {
      
      this.zz = this.position.z;
      this.position.z = -10000;
    }

  }

};

THREE.Object3D.prototype.setProperty = function(propertyName, propertyValue, includeDecendants) {
  
  if (this[propertyName] != propertyValue) {
    this[propertyName] = propertyValue;
  }

  if (includeDecendants && (this instanceof THREE.Mesh) == false) {
    this.setDescendantsProperty(propertyName, propertyValue);
  }
};

THREE.Object3D.prototype.setDescendantsProperty = function(propertyName, propertyValue) {
    
   var decendants = this.children;
   var len = decendants.length;

   for (var i=0; i < len; i++) {
     
     var child = decendants[i];
     
     if ( child instanceof THREE.Mesh  ) {
       child.setProperty(propertyName, propertyValue, false);
     } else {
       child.setProperty(propertyName, propertyValue, true);
     }
     
   };
   
   return decendants;
                              
};


THREE.Object3D.prototype.getDescendantsBoundingBox = function() {
    
    
   var decendants = this.getDescendants();
   var len = decendants.length;
 
   var decendantsBoundingBox = new THREE.BoundingBox();
   
   
   for (var i=0; i < len; i++) {
     
     var child = decendants[i];
     
     if ( child instanceof THREE.Mesh ) {
       var boundingBoxObject = child.getBoundingBox();
       
       boundingBoxObject.addSelf(child.position);
       
       decendantsBoundingBox.mergeSelf(boundingBoxObject);
     }
     
   };
   
   return decendantsBoundingBox
                              

};



/**
 *  "Master Obi-Wan, not victory. The shroud of the dark side has fallen.
 * Begun, the Clone War has!"
 *  ―Yoda (http://starwars.wikia.com/wiki/Star_Wars_Episode_II:_Attack_of_the_Clones)
 * Not not clone:
 *        Object3D.id
 * @author Raj Dye raj@pcdigi.com
 * @param the new clone, the original al is 'this'
 * @public
 
 */
THREE.Object3D.prototype.cloneBuilder_ = function(theClone) {

  
  theClone.name = this.name;
  theClone.properties = this.properties;
  
  theClone.parent = this.parent;
  
  theClone.up = this.up.clone();
  theClone.position = this.position.clone();
  theClone.rotation = this.rotation.clone();
  theClone.eulerOrder = this.eulerOrder;
  
  theClone.scale = this.scale.clone();
  theClone.renderDepth = this.renderDepth;
  
  theClone.rotationAutoUpdate = this.rotationAutoUpdate;
  theClone.renderDepth = this.renderDepth;
  
  theClone.matrix = this.matrix.clone();
  theClone.matrixWorld = this.matrixWorld.clone();
  theClone.matrixRotationWorld = this.matrixRotationWorld.clone();
  
  
  theClone.matrixAutoUpdate = this.matrixAutoUpdate;
  theClone.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
  
  theClone.quaternion = this.quaternion.clone();
  
  theClone.useQuaternion = this.useQuaternion;
  theClone.boundRadius = this.boundRadius;
  theClone.boundRadiusScale = this.boundRadiusScale;
  theClone.visible = this.visible;
  theClone.castShadow = this.castShadow;
  theClone.receiveShadow = this.receiveShadow;
  theClone.frustumCulled = this.frustumCulled;
  
  theClone._vector = this._vector.clone();
  
  theClone.viewpoint = this.viewpoint;
  
  
  /*
  theClone.dynamic = this.dynamic;
  theClone.doubleSided = this.doubleSided;
  theClone.flipSided = this.flipSided;
  theClone.renderDepth = this.renderDepth;
  theClone.rotationAutoUpdate = this.rotationAutoUpdate;
  theClone.matrixAutoUpdate = this.matrixAutoUpdate;
  theClone.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
  theClone.useQuaternion = this.useQuaternion;
  theClone.boundRadius = this.boundRadius;
  theClone.boundRadiusScale = this.boundRadiusScale;
*/


};



THREE.Object3D.prototype.cloneEx = function(deepCloneChildren, cloneGeometry) {
  
   var theClone = new THREE.Object3D();
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




THREE.Object3D.prototype.addChildren = function(object3d) {
  
    if (undefined === object3d || null == object3d) {
      throw ("you passed an invalid object3d as an argument");
    }
    
    this.addArray(object3d.children);
    
};



THREE.Object3D.prototype.cloneArray = function(ary) {
  
    var len = ary.length;
      
    if (1 > len) {
      throw ("Array is empty");
    }

    for (var i = 0; i < len; i++) {
      var arrayElement = ary[i];
      
      var clonedObj = arrayElement.cloneEx();
      this.add(clonedObj);
    }
    
    
};


THREE.Object3D.prototype.addArray = function(ary) {
  
    var len = ary.length;
      
    if (1 > len) {
      throw ("Array is empty");
    }

    for (var i = 0; i < len; i++) {
      var arrayElement = ary.pop();
      this.add(arrayElement);
    }
    
    
};

