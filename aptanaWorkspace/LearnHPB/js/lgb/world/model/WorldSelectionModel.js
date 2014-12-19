/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.WorldSelectionModel');

goog.require('lgb.core.BaseModel');
goog.require('goog.array');
goog.require('lgb');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.WorldSelectionModel = function() {

  lgb.core.BaseModel.call(this);
  this.init_();

};
goog.inherits(lgb.world.model.WorldSelectionModel, lgb.core.BaseModel);

/**
 * sets default properties.
 * @private
 */
lgb.world.model.WorldSelectionModel.prototype.init_ = function() {
  
  this.meshToSystemNodeIDMap = {
    "Damper - Top": 'MX',
    "Damper - Center": 'MX',
    "Damper - Left": 'MX',
    "Fan - Left": 'FAN',
    "Fan - Right": 'FAN',
    "Cooling Coil": 'CC',
    "Heating Coil": 'HC',
    "Filter" : 'FLT',
    "Boiler" : 'BOI',
    "Chiller" : 'CHL',
    "Cooler" : 'CTW',
    "Diffuser01" : "DIF",
    "Diffuser02" : "DIF",
    "Diffuser03" : "DIF",
    "Diffuser04" : "DIF",
    "Diffuser05" : "DIF",
    "Diffuser06" : "DIF",
    "Diffuser07" : "DIF",
    "Diffuser08" : "DIF",
    "Diffuser09" : "DIF"
  };

  this.systemNodeToMeshRefMap = {};
  this.selectableMeshes = {};
  this.selectableMeshesAry = [];
  
  this.selectedMeshList = [];
  this.deselected = [];
  
  // this.systemNodeSelected = null;
};


/**
 * If there is anything selected return the name of it.
 * @return {string} the name of the slected mesh.
 */
lgb.world.model.WorldSelectionModel.prototype.getOneSelected = function() {
  if (this.selectedMeshList.length < 1) {
    return '';
  } else {
    return this.selectedMeshList[0].name;
  }
};


/**
 * @param {Array.<string>} meshList Contains mesh names.
 */
lgb.world.model.WorldSelectionModel.prototype.selectMeshList = function(meshList) {

  this.deselected = goog.array.clone(this.selectedMeshList);
  this.selectedMeshList = meshList;
  
  this.dispatchChangedEx('selectedMeshList', this.selectedMeshList);
};




/**
 * @param {THREE.MeshCollider} intersect Used for collision detection.
 */
lgb.world.model.WorldSelectionModel.prototype.selectIntersect = function(intersect) {

  //select none

  this.selectedMeshListIntersect=intersect;


  if (intersect != null) {

    if (intersect.object == null) {
      lgb.logSevere ('intersect.object == null');
      
    }
    
    if (intersect.object.name == null || intersect.object.name == '') {
      lgb.logSevere ('intersect.mesh.name  == null or ""');
    }
    
    
    var systemNodeSelected = this.meshToSystemNodeIDMap[intersect.object.name];
    if (!systemNodeSelected) {
      
     systemNodeSelected = "NONE";
    }
        

  }

  return systemNodeSelected;
};


lgb.world.model.WorldSelectionModel.prototype.addMesh_ = function(mesh) {
  
  this.selectableMeshes[mesh.name] = mesh;
  this.selectableMeshesAry.push(mesh);
  
  var systemNodeID = this.meshToSystemNodeIDMap[mesh.name];
  
  if(systemNodeID) {
   
    if (!this.systemNodeToMeshRefMap.hasOwnProperty(systemNodeID)) {
      this.systemNodeToMeshRefMap[systemNodeID] = [];
    }
    
    this.systemNodeToMeshRefMap[systemNodeID].push(mesh);
    
  } else {
    debugger;
  }
  
};


lgb.world.model.WorldSelectionModel.prototype.addMeshAry = function(meshAry) {
  this.each(meshAry, this.addMesh_);
};


lgb.world.model.WorldSelectionModel.prototype.selectSystemNode = function(systemNodeID) {
  
    var meshList = this.systemNodeToMeshRefMap[systemNodeID];
    
    if (null == meshList) {
      meshList = [];
    }
    
    this.selectMeshList(meshList);

};





