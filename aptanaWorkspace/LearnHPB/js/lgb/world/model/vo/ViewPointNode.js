/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.vo.ViewpointNode');

goog.require('lgb.world.model.vo.BaseVo');


/**
 * @constructor
 * @extends {lgb.world.model.vo.BaseVo}
 */
lgb.world.model.vo.ViewpointNode = function(title) {
  
  this.idx = lgb.world.model.vo.ViewpointNode.idx++;
  lgb.world.model.vo.ViewpointNode.allNodes[this.idx] = this;
  
  this.title = title;
  this.children = undefined;
  this.hasChildren = false;
  this.parent = undefined;
  this.camera_ = undefined;
  this.focusEvent = false;
  this.titleToChildMap_ = {};
  this.metersPerSecondPosition = 6;

};
goog.inherits(lgb.world.model.vo.ViewpointNode, lgb.world.model.vo.BaseVo);




lgb.world.model.vo.ViewpointNode.prototype.getCameraOffset = function() {

    var vpName = this.object3d.viewpoint;
    
    
    lgb.assert (vpName);
    
    if (vpName == "default" || vpName == "") {
      if (this.object3d.geometry && this.object3d.geometry.viewpoint) {
        vpName = this.object3d.geometry.viewpoint;
      }
    }
    
    var offsetAry = lgb.world.model.vo.ViewpointNode.offsetMap_[vpName];
    var offsetVector3 = new THREE.Vector3(offsetAry[0], offsetAry[1], offsetAry[2]);
    
    return offsetVector3;
};


lgb.world.model.vo.ViewpointNode.getNodeByIdx = function(idx) {
  
  var theNode = null;
  var allNodes = lgb.world.model.vo.ViewpointNode.allNodes;
  
  if(allNodes && allNodes.length > idx ) {
    theNode = allNodes[idx];
  }
  
  return theNode;
};




lgb.world.model.vo.ViewpointNode.prototype.getTargetPosition = function(cameraPositionWorld) {
  
   var worldPosition = new THREE.Vector3();

    
  if (this.camera_) {
    
    var cameraPositionLocal = this.camera_.position.clone();
    this.camera_.localToWorld(cameraPositionWorld);
    
    var cameraPositionDelta = cameraPositionWorld.clone();
    cameraPositionDelta.sub(cameraPositionLocal);
    
    var cameraTargetLocal = this.camera_.target.clone();
    var cameraTargetWorld = this.camera_.target.clone();

    cameraTargetWorld.add(cameraPositionDelta);

    return  cameraTargetWorld;
    
  } else if (this.object3d) {
    

    this.object3d.localToWorld(worldPosition);
    
    return worldPosition;
  }

  
};


lgb.world.model.vo.ViewpointNode.prototype.getCameraPosition = function() {

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



lgb.world.model.vo.ViewpointNode.prototype.updateWorldPositions = function() {
  
  var fov = 40;
  
  
  if (this.camera_) {
    fov = this.camera_.fov;
  }
  
 
  var cameraTemplate = new THREE.PerspectiveCamera(fov, 16/9, 1, 10000);
  
  var position = this.getCameraPosition();
  lgb.assert(position);
  
  var targetPosition = this.getTargetPosition(position);
  lgb.assert(targetPosition);
  
  
  this.viewpointCamera_ = new THREE.PerspectiveCamera(
    cameraTemplate.fov, 
    cameraTemplate.aspect, 
    cameraTemplate.near, 
    cameraTemplate.far
  );

  this.viewpointCamera_.position = position;
  this.viewpointCamera_.lookAt(targetPosition);
  
};



lgb.world.model.vo.ViewpointNode.prototype.getAnchorObj = function() {
    
    if (this.anchorObj_) return this.anchorObj_;
      
    if (this.anchor) {
      this.anchorObj_ = lgb.world.model.vo.ViewpointNode.anchors[this.anchor];
      
      if (null == this.anchorObj_) {
        debugger;
      } else {
        return this.anchorObj_;
      }

    } else {
      return null;
    }
  
};



lgb.world.model.vo.ViewpointNode.prototype.generateCameraPosition = function() {

    var cameraPosition = new THREE.Vector3();
    this.object3d.localToWorld(cameraPosition);
    
    var offset = this.getCameraOffset();
    cameraPosition.add(offset);

    return cameraPosition;
  
};


lgb.world.model.vo.ViewpointNode.prototype.initObject3D = function(object, recurseDepth) {

    
    this.object3d = object;

    if (this.object3d.children.length > 0 && recurseDepth > 0) {
      this.hasChildren = true;
      this.children = [];

      this.each(this.object3d.children, this.initOneChild, recurseDepth);
    }
    
};


lgb.world.model.vo.ViewpointNode.prototype.initOneChild = function(object, recurseDepth) {
  
    var childNode = new lgb.world.model.vo.ViewpointNode.make(object, recurseDepth-1);
    
    childNode.parent = this;
    this.children.push(childNode);
    this.titleToChildMap_[childNode.title] = childNode;
};



lgb.world.model.vo.ViewpointNode.prototype.initFromArray = function(ary, recurseDepth) {

    this.hasChildren = true;
    this.children = [];
    
    this.each(ary, this.initOneChild, recurseDepth);

};

lgb.world.model.vo.ViewpointNode.prototype.generateCamera = function(cameraTemplate) {

  return this.viewpointCamera_;
};


lgb.world.model.vo.ViewpointNode.prototype.getViewpoint = function(name) {

  //var vp = this.children[0];
  
  
  return this.titleToChildMap_[name];
  
};






lgb.world.model.vo.ViewpointNode.idx = 0;
lgb.world.model.vo.ViewpointNode.allNodes = [];

lgb.world.model.vo.ViewpointNode.offsetMap_ = [];
lgb.world.model.vo.ViewpointNode.offsetMap_["default"] = [0, 2, 5];

lgb.world.model.vo.ViewpointNode.offsetMap_["vp1"] = [0, 2, 7];
lgb.world.model.vo.ViewpointNode.offsetMap_["vp2"] = [0, 2, 9];
lgb.world.model.vo.ViewpointNode.offsetMap_["vp3"] = [0, 2, 30];
lgb.world.model.vo.ViewpointNode.offsetMap_["vpRootop"] = [0, 30, 15];
lgb.world.model.vo.ViewpointNode.offsetMap_["defaultScene"] = [0, 10, 30];
lgb.world.model.vo.ViewpointNode.offsetMap_["defaultZone"] = [0, 2, 5];
lgb.world.model.vo.ViewpointNode.offsetMap_["ZonesScene"] = [0, 50, 3];
lgb.world.model.vo.ViewpointNode.offsetMap_["RoofTopScene"] = [0, 25, 20];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeGroup"] = [0, 3, 6];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeChair1"] = [1.1, 1.2, -1.8];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeChair2"] = [0, 1.2, 1.5];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeChair3"] = [1.1, 1.2, -1.8];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeChair4"] = [0, 1.2, 1.5];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeTaskLight1"] = [1.1, 1.2, -1.8];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeTaskLight2"] = [1.1, 1.2, -1.8];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeTaskLight3"] = [0, 1.2, 1.5];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeTaskLight4"] = [0, 1.2, 1.5];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeComputer1"] = [1.2, 0.5, -1.0];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeComputer2"] = [-1.2, 0.5, -1.0];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeComputer3"] = [1.2, 0.5, -1.0];
lgb.world.model.vo.ViewpointNode.offsetMap_["officeComputer4"] = [-1.2, 0.5, -1.0];
lgb.world.model.vo.ViewpointNode.offsetMap_["crosssection"] = [-0.5, 1.2, 0.5];

lgb.world.model.vo.ViewpointNode.offsetMap_["crosssectionTop"] = [-2.7, 2.4, 2.0];
lgb.world.model.vo.ViewpointNode.offsetMap_["crosssectionAir"] =  [0.0, 1.0, 2.0];
lgb.world.model.vo.ViewpointNode.offsetMap_["crosssectionMain"] = [-2.5, 1.0, 1.6];
lgb.world.model.vo.ViewpointNode.offsetMap_["crosssectionVeneer"] = [-2.7, 1.2, -3.0];
lgb.world.model.vo.ViewpointNode.offsetMap_["crosssectionSide"] = [-2.7, 0.3, -0.2];


lgb.world.model.vo.ViewpointNode.make= function(object, recurseDepth) {

  if (object && object instanceof THREE.Camera) {
    return lgb.world.model.vo.ViewpointNode.makeFromCamera(object, recurseDepth);
  } else if  (object && object instanceof THREE.Object3D) {
    return lgb.world.model.vo.ViewpointNode.makeFromObject3D(object, recurseDepth);
  } else if (object && object instanceof Array) {
    return lgb.world.model.vo.ViewpointNode.makeFromArray(object, recurseDepth);
  } else if  (object && object instanceof lgb.world.model.vo.ViewpointNode){
    return object;
  }
  
};



lgb.world.model.vo.ViewpointNode.makeFromCamera= function(camera, recurseDepth) {

  var node = new lgb.world.model.vo.ViewpointNode(camera.name);
  
  node.camera_ = camera;
  node.hasChildren = false;
  node.anchor = camera.getAnchor();
  
  return node;
  
};




lgb.world.model.vo.ViewpointNode.makeFromObject3D = function(object3D, recurseDepth) {

  var node = new lgb.world.model.vo.ViewpointNode(object3D.name);
  node.initObject3D(object3D, recurseDepth);
  return node;
};




lgb.world.model.vo.ViewpointNode.makeFromArray= function(title, ary, recurseDepth) {

    var node = new lgb.world.model.vo.ViewpointNode(title);
    node.initFromArray(ary,  recurseDepth);
    
    return node;
};


