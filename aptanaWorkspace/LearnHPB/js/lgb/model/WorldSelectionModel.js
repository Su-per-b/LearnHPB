/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.WorldSelectionModel');

goog.require('lgb.model.BaseModel');
goog.require('goog.array');
goog.require('lgb');
/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.WorldSelectionModel = function() {

  lgb.model.BaseModel.call(this);
  this.init_();

};
goog.inherits(lgb.model.WorldSelectionModel, lgb.model.BaseModel);

/**
 * sets default properties.
 * @private
 */
lgb.model.WorldSelectionModel.prototype.init_ = function() {
  
  this.meshToSystemNodeIDMap = {
    "Damper - Top": 'MX',
    "Damper - Center": 'MX',
    "Damper - Left": 'MX',
    "Fan - Left": 'FAN',
    "Fan - Right": 'FAN',
    "Cooling Coil": 'CC',
    "Heating Coil": 'HC',
    "Filter" : 'FLT'
  };


/*
  this.systemNodeToMeshNameMap = {
    MX: ["Damper - Top", "Damper - Center",  "Damper - Left"],
    FAN: ['Fan'],
    CC: ["Cooling Coil"],
    HC: ["Heating Coil"],
    FLT: ['Filter']
  };
  */

  this.systemNodeToMeshRefMap = {};
  
  
/*
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
  */

  this.selectableMeshes = {};
  this.selectableMeshesAry = [];
  
  this.selectedMeshList = [];
  this.deselected = [];
  
  this.systemNodeSelected = null;
};


/**
 * If there is anything selected return the name of it.
 * @return {string} the name of the slected mesh.
 */
lgb.model.WorldSelectionModel.prototype.getOneSelected = function() {
  if (this.selectedMeshList.length < 1) {
    return '';
  } else {
    return this.selectedMeshList[0].name;
  }
};


/**
 * @param {Array.<string>} meshList Contains mesh names.
 */
lgb.model.WorldSelectionModel.prototype.selectMeshList = function(meshList) {

  this.deselected = goog.array.clone(this.selectedMeshList);
  this.selectedMeshList = meshList;
  
  this.dispatchChangedEx('selectedMeshList', this.selectedMeshList);
};




/**
 * @param {THREE.MeshCollider} intersect Used for collision detection.
 */
lgb.model.WorldSelectionModel.prototype.selectIntersect = function(intersect) {

  //select none

  this.selectedMeshListIntersect=intersect;


  if (intersect != null) {

    if (intersect.object == null) {
      throw ('intersect.object == null');
    }
    
    if (intersect.object.name == null || intersect.object.name == '') {
      throw ('intersect.mesh.name  == null or ""');
    }
    
    
    var systemNodeSelected = this.meshToSystemNodeIDMap[intersect.object.name];
    if (!systemNodeSelected) {
      
     // var meshList = this.systemNodeToMeshNameMap[this.systemNodeSelected];
      //this.selectMeshList(meshList);
      
    //} else {
     // debugger;
     systemNodeSelected = "NONE";
    }
        
    /*
        if (this.systemNodeSelected) {
          
          var meshList = this.systemNodeToMeshNameMap[this.systemNodeSelected];
          this.selectMeshList(meshList);
          
        } else {
          debugger;
        }
        
    */

    //this.selectedMeshList.push(intersect.object);
  }

  //this.dispatchChangedEx('systemNodeSelected', this.systemNodeSelected);
  return systemNodeSelected;
};


lgb.model.WorldSelectionModel.prototype.addMesh_ = function(mesh) {
  
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


lgb.model.WorldSelectionModel.prototype.addMeshAry = function(meshAry) {
  this.each(meshAry, this.addMesh_)
};


lgb.model.WorldSelectionModel.prototype.selectSystemNode = function(systemNodeID) {
  
    var meshList = this.systemNodeToMeshRefMap[systemNodeID];
    
    if (null == meshList) {
      meshList = [];
    }
    
    this.selectMeshList(meshList);

};





