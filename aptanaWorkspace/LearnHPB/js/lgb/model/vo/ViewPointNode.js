/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.vo.ViewPointNode');

goog.require('lgb.model.vo.BaseVo');



lgb.model.vo.ViewPointNode = function(title, object, recurseDepth) {
  
  this.idx = lgb.model.vo.ViewPointNode.idx++;
  lgb.model.vo.ViewPointNode.allNodes[this.idx] = this;
  
  this.title = title;
  recurseDepth = recurseDepth || 0;
  this.children = undefined;
  this.hasChildren = false;
  this.parent = undefined;
  this.camera_ = undefined;

  if (object && object instanceof THREE.Camera) {
    this.initCamera_(object)
  } else if  (object && object instanceof THREE.Object3D) {
    this.init_(object,recurseDepth)
  } else if (object && object instanceof Array) {
    this.initArray_(object, recurseDepth);
  }


};
goog.inherits(lgb.model.vo.ViewPointNode, lgb.model.vo.BaseVo);




lgb.model.vo.ViewPointNode.prototype.getCameraOffset = function() {

    var vpName = this.object3d.viewpoint;
    
    if (vpName == "default" || vpName == "") {
      
      if (this.object3d.geometry && this.object3d.geometry.viewpoint) {
        vpName = this.object3d.geometry.viewpoint;
      }
      
    }
    

    var offsetAry = lgb.model.vo.ViewPointNode.offsetMap_[vpName];
    var offsetVector3 = new THREE.Vector3(offsetAry[0], offsetAry[1], offsetAry[2]);
    
    return offsetVector3;
};


lgb.model.vo.ViewPointNode.prototype.initArray_ = function(ary, recurseDepth) {
  
    this.hasChildren = true;
    this.children = [];
    
    this.each(ary, this.initOneChild_, recurseDepth);
    
    
};

lgb.model.vo.ViewPointNode.prototype.initCamera_ = function(camera) {

    this.camera_ = camera;
    this.hasChildren = false;
    
};

lgb.model.vo.ViewPointNode.prototype.init_ = function(object, recurseDepth) {

    
    this.object3d = object;

    if (this.object3d.children.length > 0 && recurseDepth > 0) {
      this.hasChildren = true;
      this.children = [];

      this.each(this.object3d.children, this.initOneChild_, recurseDepth);
    }
    
    return;
};


lgb.model.vo.ViewPointNode.prototype.initOneChild_ = function(object, recurseDepth) {
  
    var childNode = new lgb.model.vo.ViewPointNode(object.name, object, recurseDepth-1);
    
    childNode.parent = this;
    this.children.push(childNode);
};



lgb.model.vo.ViewPointNode.getNodeByIdx = function(idx) {
  
  var theNode = null;
  var allNodes = lgb.model.vo.ViewPointNode.allNodes;
  
  if(allNodes && allNodes.length > idx ) {
    theNode = allNodes[idx];
  }
  
  return theNode;
};




lgb.model.vo.ViewPointNode.prototype.getLookAtPosition = function() {
  
   var worldPosition = new THREE.Vector3();

    
  if (this.camera_) {
    
    var cameraPositionWorld = new THREE.Vector3();
    var cameraPositionLocal = this.camera_.position.clone();
    this.camera_.localToWorld(cameraPositionWorld);
    
    var cameraPositionDelta = cameraPositionWorld.clone();
    cameraPositionDelta.subSelf(cameraPositionLocal);
    
    
    
    var cameraTargetLocal = this.camera_.target.clone();
    var cameraTargetWorld = this.camera_.target.clone();

    cameraTargetWorld.addSelf(cameraPositionDelta);

    return  cameraTargetWorld;
    
  } else if (this.object3d) {
    

    this.object3d.localToWorld(worldPosition);
    
    return worldPosition;
  }

  
};


lgb.model.vo.ViewPointNode.prototype.getCameraPosition = function() {

  if (this.camera_) {
    
    var cameraPosition = new THREE.Vector3();
    this.camera_.localToWorld(cameraPosition);
    return cameraPosition;
    
  } else if (this.object3d) {
    
    return this.generateCameraPosition();
  }
  
};




lgb.model.vo.ViewPointNode.prototype.generateCameraPosition = function() {

    
    var cameraPosition = new THREE.Vector3();
    this.object3d.localToWorld(cameraPosition);
    
    var offset = this.getCameraOffset();
    cameraPosition.addSelf(offset);
    
    return cameraPosition;
  
};



  

lgb.model.vo.ViewPointNode.idx = 0;
lgb.model.vo.ViewPointNode.allNodes = [];

lgb.model.vo.ViewPointNode.offsetMap_ = [];
lgb.model.vo.ViewPointNode.offsetMap_["default"] = [0, 2, 5];
lgb.model.vo.ViewPointNode.offsetMap_["vp1"] = [0, 2, 7];
lgb.model.vo.ViewPointNode.offsetMap_["vp2"] = [0, 2, 9];
lgb.model.vo.ViewPointNode.offsetMap_["vp3"] = [0, 2, 30];
lgb.model.vo.ViewPointNode.offsetMap_["vpRootop"] = [0, 30, 15];
lgb.model.vo.ViewPointNode.offsetMap_["defaultScene"] = [0, 10, 30];
lgb.model.vo.ViewPointNode.offsetMap_["defaultZone"] = [0, 2, 5];
lgb.model.vo.ViewPointNode.offsetMap_["ZonesScene"] = [0, 50, 3];
lgb.model.vo.ViewPointNode.offsetMap_["RoofTopScene"] = [0, 25, 20];
lgb.model.vo.ViewPointNode.offsetMap_["officeGroup"] = [0, 3, 6];
lgb.model.vo.ViewPointNode.offsetMap_["officeChair1"] = [1.1, 1.2, -1.8];
lgb.model.vo.ViewPointNode.offsetMap_["officeChair2"] = [0, 1.2, 1.5];
lgb.model.vo.ViewPointNode.offsetMap_["officeChair3"] = [1.1, 1.2, -1.8];
lgb.model.vo.ViewPointNode.offsetMap_["officeChair4"] = [0, 1.2, 1.5];
lgb.model.vo.ViewPointNode.offsetMap_["officeTaskLight1"] = [1.1, 1.2, -1.8];
lgb.model.vo.ViewPointNode.offsetMap_["officeTaskLight2"] = [1.1, 1.2, -1.8];
lgb.model.vo.ViewPointNode.offsetMap_["officeTaskLight3"] = [0, 1.2, 1.5];
lgb.model.vo.ViewPointNode.offsetMap_["officeTaskLight4"] = [0, 1.2, 1.5];
lgb.model.vo.ViewPointNode.offsetMap_["officeComputer1"] = [1.2, 0.5, -1.0];
lgb.model.vo.ViewPointNode.offsetMap_["officeComputer2"] = [-1.2, 0.5, -1.0];
lgb.model.vo.ViewPointNode.offsetMap_["officeComputer3"] = [1.2, 0.5, -1.0];
lgb.model.vo.ViewPointNode.offsetMap_["officeComputer4"] = [-1.2, 0.5, -1.0];



