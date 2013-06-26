/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewPointCollectionNode');

goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.ViewPointCollectionNode = function(object3D, parent, idx) {

  /**@const */
  this._TITLE = 'ViewPointNode';
  lgb.model.BaseModel.call(this);
  
  this.targetBoundingBox = null;
  this.name = null;
  this.targetPosition = null;
  
  this.threeObject = null;
  this.url =null;
  this.parent = parent;
  this.idx = 0 || idx;
  
  this.value =  this.parent.name + '-' + idx;
  this.isVisible = false;
  
  if (object3D instanceof THREE.PerspectiveCamera) {
    this.initFromCamera_(object3D);
  } else {
    this.init_(object3D);
  }
    
};
goog.inherits(lgb.model.ViewPointCollectionNode, lgb.model.BaseModel);



lgb.model.ViewPointCollectionNode.prototype.initFromCamera_ = function(threeObject) {
 
    
/*
    this.targetBoundingBox = boundingBox.clone();
        
    this.targetPosition = threeObject.position.clone();
    this.name = threeObject.name;
    
    this.threeObject = threeObject;*/

}

/**
 * @private
 */
lgb.model.ViewPointCollectionNode.prototype.init_ = function(threeObject) {
    
    var boundingBox;
    
    if (threeObject instanceof THREE.Mesh) {
        boundingBox = threeObject.getBoundingBox();
    } else if (threeObject instanceof THREE.Object3D) {
        boundingBox = threeObject.getDescendantsBoundingBox();
    } 

    
    this.targetBoundingBox = boundingBox.clone();
        
    this.targetPosition = threeObject.position.clone();
    this.name = threeObject.name;
    
    this.threeObject = threeObject;
};





lgb.model.ViewPointCollectionNode.prototype.getTargetPosition = function() {

    var worldPosition = new THREE.Vector3();
    this.threeObject.localToWorld(worldPosition);
    
    return worldPosition;
  
};



