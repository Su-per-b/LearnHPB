/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewPointNode');

goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.ViewPointNode = function(object3D, parent, idx) {
  /**@const */
  this._NAME = 'lgb.model.ViewPointNode';
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
  this.init_(object3D);
  
};
goog.inherits(lgb.model.ViewPointNode, lgb.model.BaseModel);


/**
 * @private
 */
lgb.model.ViewPointNode.prototype.init_ = function(threeObject) {
    
    var boundingBox;
    
    if (threeObject._NAME == 'THREE.Object3D') {
        boundingBox = threeObject.getDescendantsBoundingBox();

    } else if (threeObject._NAME == 'THREE.Mesh') {
        boundingBox = threeObject.getBoundingBox();
    }
    
    this.targetBoundingBox = boundingBox.clone();
        
    this.targetPosition = threeObject.position.clone();
    this.name = threeObject.name;
    
    this.threeObject = threeObject;
};





lgb.model.ViewPointNode.prototype.getTargetPosition = function() {

    var worldPosition = new THREE.Vector3();
    this.threeObject.localToWorld(worldPosition);
    
    return worldPosition;
  
};



