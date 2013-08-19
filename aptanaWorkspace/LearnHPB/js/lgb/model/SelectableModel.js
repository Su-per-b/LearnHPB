/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.SelectableModel');

goog.require('lgb.model.BaseModel');
goog.require('goog.array');
goog.require('lgb');
/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.SelectableModel = function() {

  lgb.model.BaseModel.call(this);
  this.init_();

};
goog.inherits(lgb.model.SelectableModel, lgb.model.BaseModel);

/**
 * sets default properties.
 * @private
 */
lgb.model.SelectableModel.prototype.init_ = function() {
  this.selectable = {
    Filter: true,
    "Heating Coil": true,
    "Cooling Coil": true,
    Fan: true,
    "Left Damper": true,
    "Center Damper": true,
    "Top Damper": true,
    Diffuser01: true,
    Diffuser02: true,
    Diffuser03: true,
    Diffuser04: true,
    Diffuser05: true,
    Diffuser06: true,
    Diffuser07: true,
    Diffuser08: true,
    Diffuser09: true
  };
  
  this.selectableMeshes = {};
  this.selectableMeshesAry = [];
  
  this.selected = [];
  this.deselected = [];
};


/**
 * If there is anything selected return the name of it.
 * @return {string} the name of the slected mesh.
 */
lgb.model.SelectableModel.prototype.getOneSelected = function() {
  if (this.selected.length < 1) {
    return '';
  } else {
    return this.selected[0].name;
  }
};


/**
 * @param {Array.<string>} meshList Contains mesh names.
 */
lgb.model.SelectableModel.prototype.selectMeshList = function(meshList) {
  //select none

  this.deselected = [];
  var len = this.selected.length;
  
  for (var i = 0; i > len; i++){
    this.deselected.push(this.selected[i]);
  };
  

  var i = meshList.length;
  while (i--) {
    this.selectMesh_(meshList[i]);
  }

  this.dispatchChange();
};


/**
 * @private
 * @param {string} meshName The name in the scene graph.
 */
lgb.model.SelectableModel.prototype.selectMesh_ = function(meshName) {

  var theMesh = this.selectableMeshes[meshName];
  var pos = theMesh.matrixWorld.getPosition();

  //lgb.logInfo(theMesh.name, 'theMesh.name');
  lgb.logInfo(pos, 'position of selected: ' + theMesh.name);


  this.selected.push(theMesh);
};

/**
 * @param {THREE.MeshCollider} intersect Used for collision detection.
 */
lgb.model.SelectableModel.prototype.select = function(intersect) {

  //select none
  this.deselected = goog.array.clone(this.selected);
  
  this.selected = [];


  if (intersect != null) {

    if (intersect.object == null) {
      throw ('intersect.object == null');
    }
    
    if (intersect.object.name == null || intersect.object.name == '') {
      throw ('intersect.mesh.name  == null or ""');
    }
    
    this.selected.push(intersect.object);

    
  }

  this.dispatchChangedEx('selected', this.selected);
};


/**
 * @param {THREE.Mesh} mesh The mesh to add.
 * TODO:Raj fix this CollisionUtils reference
 */
lgb.model.SelectableModel.prototype.addMesh = function(mesh) {

  if (true == this.selectable[mesh.name]) {
    
  //  var mc = THREE.CollisionUtils.MeshColliderWBox(mesh);
   // THREE.Collisions.colliders.push(mc);

    this.selectableMeshes[mesh.name] = mesh;
    this.selectableMeshesAry.push(mesh);
    
    //this.selectableMeshes.push(mesh);
  }
};


lgb.model.SelectableModel.prototype.addMeshAry = function(meshAry) {
  
  this.selectableMeshesAry = this.selectableMeshesAry.concat(meshAry);

};







