/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.vo.VisibilityNode');

goog.require('lgb.model.vo.BaseVo');

lgb.model.vo.VisibilityNode = function(title, object3d, recurseDepth) {
  

  this.idx = lgb.model.vo.VisibilityNode.idx++;
  lgb.model.vo.VisibilityNode.allNodes[this.idx] = this;
  
  this.title = title;
  recurseDepth = recurseDepth || 0;
  this.children = undefined;
  this.hasChildren = false;
  this.parent = undefined;

  if (object3d && object3d instanceof THREE.Object3D) {
    this.init_(object3d,recurseDepth)
  } else if (object3d && object3d instanceof Array) {
    this.initArray_(object3d);
  }
  

};
goog.inherits(lgb.model.vo.VisibilityNode, lgb.model.vo.BaseVo);


lgb.model.vo.VisibilityNode.prototype.initArray_ = function(ary) {
  
    //this.each(object3d.children, this.initOneChild_, recurseDepth);
    return;
    
};


lgb.model.vo.VisibilityNode.prototype.init_ = function(object3d, recurseDepth) {
  
    this.object3d = object3d;
    this.isVisible = object3d.visible;

    if (object3d.children.length > 0 && recurseDepth > 0) {
      this.hasChildren = true;
      this.children = [];
      
      this.each(object3d.children, this.initOneChild_, recurseDepth);
    }
    
    return;
    
};

lgb.model.vo.VisibilityNode.prototype.isRoot = function() {
  
  
  return (undefined == this.parent);
};





/*
lgb.model.vo.VisibilityNode.prototype.generateIdx = function() {
  
  this.nextIdx_ = 1;
  this.allNodes = [this];
  
  this.each(this.children, this.generateOneIdx_);
};*/



lgb.model.vo.VisibilityNode.prototype.generateOneIdx_ = function(node) {
  
  node.idx = this.nextIdx_;
  this.allNodes[node.idx] = node;
  this.nextIdx_++;
  
  if (node.hasChildren) {
    this.each(node.children, this.generateOneIdx_);
  }
}



lgb.model.vo.VisibilityNode.prototype.initOneChild_ = function(object3dChild, recurseDepth) {
  
    var childNode = new lgb.model.vo.VisibilityNode(object3dChild.name, object3dChild, recurseDepth-1);
    
    childNode.parent = this;
    this.children.push(childNode);
};



lgb.model.vo.VisibilityNode.prototype.setVisible = function(isVisible) {
  
  if (this.isVisible != isVisible) {
    
    this.isVisible = isVisible;
    
    if(this.object3d) {
      var includeDecendants = !this.hasChildren;
      this.object3d.setProperty( 'visible', isVisible, includeDecendants);
    }

  }

};


lgb.model.vo.VisibilityNode.prototype.add = function(childNode) {
  
    if (! this.hasChildren ) {
      this.hasChildren = true;
      this.children = [];
    }
    
    childNode.parent = this;
    this.children.push(childNode);
};


/*

lgb.model.vo.VisibilityNode.idx = 0;
lgb.model.vo.VisibilityNode.blockIdx = false;
lgb.model.vo.VisibilityNode.THREAD_BLOCKING_TIMEOUT = 500;
lgb.model.vo.VisibilityNode.THREAD_BLOCKING_SLEEP = 1;
lgb.model.vo.VisibilityNode.nodeList =[];


lgb.model.vo.VisibilityNode.getIdx = function() {
  
  if(lgb.model.vo.VisibilityNode.blockIdx) {
    var count = 0;
    while(lgb.model.ViewPointNode.blockIdx) {
        sleep(lgb.model.vo.VisibilityNode.THREAD_BLOCKING_SLEEP);
        count += lgb.model.vo.VisibilityNode.THREAD_BLOCKING_SLEEP;
        if (count > lgb.model.vo.VisibilityNode.THREAD_BLOCKING_TIMEOUT) {
          throw ("Threadblocking timeout expired");
        }
    }
  }
  
  lgb.model.vo.VisibilityNode.blockIdx = true;
  
  var idx = lgb.model.vo.VisibilityNode.idx;
  lgb.model.vo.VisibilityNode.idx++;
  lgb.model.vo.VisibilityNode.blockIdx = false;
  
  return idx;
  
};

*/
lgb.model.vo.VisibilityNode.getNodeByIdx = function(idx) {
  
  var theNode = null;
  
  var allNodes = lgb.model.vo.VisibilityNode.allNodes;
  
  
  if(allNodes && allNodes.length > idx ) {
    theNode = allNodes[idx];
  }
  
  return theNode;
};



lgb.model.vo.VisibilityNode.idx = 0;
lgb.model.vo.VisibilityNode.allNodes = [];
