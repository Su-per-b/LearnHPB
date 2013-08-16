/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.vo.ViewPointNode');

goog.require('lgb.model.vo.BaseVo');



lgb.model.vo.ViewPointNode = function(title) {
  
  this.idx = lgb.model.vo.ViewPointNode.idx++;
  lgb.model.vo.ViewPointNode.allNodes[this.idx] = this;
  
  this.title = title;
  this.children = undefined;
  this.hasChildren = false;
  this.parent = undefined;
  this.camera_ = undefined;
  this.focusEvent = false;


};
goog.inherits(lgb.model.vo.ViewPointNode, lgb.model.vo.BaseVo);




lgb.model.vo.ViewPointNode.prototype.getCameraOffset = function() {

    var vpName = this.object3d.viewPoint;
    
    if (vpName == "default" || vpName == "") {
      
      if (this.object3d.geometry && this.object3d.geometry.viewPoint) {
        vpName = this.object3d.geometry.viewPoint;
      }
      
    }
    

    var offsetAry = lgb.model.vo.ViewPointNode.offsetMap_[vpName];
    var offsetVector3 = new THREE.Vector3(offsetAry[0], offsetAry[1], offsetAry[2]);
    
    return offsetVector3;
};






/*

lgb.model.vo.ViewPointNode.prototype.init_ = function(object, recurseDepth) {

    
    this.object3d = object;

    if (this.object3d.children.length > 0 && recurseDepth > 0) {
      this.hasChildren = true;
      this.children = [];

      this.each(this.object3d.children, this.initOneChild, recurseDepth);
    }
    
    return;
};


*/



lgb.model.vo.ViewPointNode.getNodeByIdx = function(idx) {
  
  var theNode = null;
  var allNodes = lgb.model.vo.ViewPointNode.allNodes;
  
  if(allNodes && allNodes.length > idx ) {
    theNode = allNodes[idx];
  }
  
  return theNode;
};




lgb.model.vo.ViewPointNode.prototype.getTargetPosition = function(cameraPositionWorld) {
  
   var worldPosition = new THREE.Vector3();

    
  if (this.camera_) {
    

    //var cameraPositionWorld = new THREE.Vector3();
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
    
    var cameraPositionLocal = this.camera_.position.clone(); 
    var anchorObj = this.getAnchorObj();
    
    if (anchorObj) {
      
      var cameraPositionWorld = anchorObj.localToWorld(cameraPositionLocal);
      
      return cameraPositionWorld;
      
    } else {
      
      return cameraPositionLocal;
      
    }

  } else if (this.object3d) {
    
    return this.generateCameraPosition();
  }
  
};



lgb.model.vo.ViewPointNode.prototype.updateWorldPositions = function() {
  
  var  cameraTemplate = new THREE.PerspectiveCamera(40, 16/9, 1, 10000);
  
  var position = this.getCameraPosition();
  var targetPosition = this.getTargetPosition(position);
  
  this.viewPointCamera_ = new THREE.PerspectiveCamera(
    cameraTemplate.fov, 
    cameraTemplate.aspect, 
    cameraTemplate.near, 
    cameraTemplate.far
  );

  this.viewPointCamera_.position = position;
  this.viewPointCamera_.lookAt(targetPosition);
  
};



lgb.model.vo.ViewPointNode.prototype.getAnchorObj = function() {
    
    if (this.anchorObj_) return this.anchorObj_;
      
    if (this.anchor) {
      this.anchorObj_ = lgb.model.vo.ViewPointNode.anchors[this.anchor];
      
      if (null == this.anchorObj_) {
        debugger;
      } else {
        return this.anchorObj_;
      }

    } else {
      return null;
    }
  
};



lgb.model.vo.ViewPointNode.prototype.generateCameraPosition = function() {

    
    var cameraPosition = new THREE.Vector3();
    this.object3d.localToWorld(cameraPosition);
    
    var offset = this.getCameraOffset();
    cameraPosition.addSelf(offset);
    
    
    
    return cameraPosition;
  
};


lgb.model.vo.ViewPointNode.prototype.initObject3D = function(object, recurseDepth) {

    
    this.object3d = object;

    if (this.object3d.children.length > 0 && recurseDepth > 0) {
      this.hasChildren = true;
      this.children = [];

      this.each(this.object3d.children, this.initOneChild, recurseDepth);
    }
    
};


lgb.model.vo.ViewPointNode.prototype.initOneChild = function(object, recurseDepth) {
  
    var childNode = new lgb.model.vo.ViewPointNode.make(object, recurseDepth-1);
    
    childNode.parent = this;
    this.children.push(childNode);
};



lgb.model.vo.ViewPointNode.prototype.initFromArray = function(ary, recurseDepth) {

    this.hasChildren = true;
    this.children = [];
    
    this.each(ary, this.initOneChild, recurseDepth);

};

lgb.model.vo.ViewPointNode.prototype.generateCamera = function(cameraTemplate) {

  return this.viewPointCamera_;
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
lgb.model.vo.ViewPointNode.offsetMap_["crosssection"] = [-0.5, 1.2, 0.5];


lgb.model.vo.ViewPointNode.make= function(object, recurseDepth) {

  if (object && object instanceof THREE.Camera) {
    return new lgb.model.vo.ViewPointNode.makeFromCamera(object, recurseDepth);
  } else if  (object && object instanceof THREE.Object3D) {
    return new lgb.model.vo.ViewPointNode.makeFromObject3D(object, recurseDepth);
  } else if (object && object instanceof Array) {
    return new lgb.model.vo.ViewPointNode.makeFromArray(object, recurseDepth);
  } else if  (object && object instanceof lgb.model.vo.ViewPointNode){
    return object;
  }
  
};



lgb.model.vo.ViewPointNode.makeFromCamera= function(camera, recurseDepth) {

  var node = new lgb.model.vo.ViewPointNode(camera.name);
  
  node.camera_ = camera;
  node.hasChildren = false;
  node.anchor = camera.getAnchor();
  
  return node;
  
};




lgb.model.vo.ViewPointNode.makeFromObject3D= function(object3D, recurseDepth) {

  var node = new lgb.model.vo.ViewPointNode(object3D.name);
  node.initObject3D(object3D, recurseDepth);
  return node;
};






lgb.model.vo.ViewPointNode.makeFromArray= function(title, ary, recurseDepth) {

    var node = new lgb.model.vo.ViewPointNode(title);
    node.initFromArray(ary,  recurseDepth);
    
    return node;
};


