/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.CrossSectionModel');


goog.require('lgb.core.BaseModel');
goog.require('lgb.component.DropDownDataSource');
goog.require('lgb.world.model.vo.LayerNode');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.CrossSectionModel = function() {

  /**@const */
  this._TITLE = 'CrossSection';
  lgb.core.BaseModel.call(this);

  this.viewPointNode = null;
  this.viewPointNodeMap_ = {};
  
  this.isVisible = true;
  
  this.externalInsulationOptions = new lgb.component.DropDownDataSource("Rigid Exterior Insulation Width");
  
  this.externalInsulationOptions.add("1 inch", 1, true);
  this.externalInsulationOptions.add("2 inch", 2);
  this.externalInsulationOptions.add("3 inch", 3);
  this.externalInsulationOptions.add("4 inch", 4);
  
  this.exInsulationSelected = null;
  
  this.airBarrierOptions = new lgb.component.DropDownDataSource("Air Barrier?");
  this.airBarrierOptions.add("No", false );
  this.airBarrierOptions.add("Yes", true, true);

  this.airBarrierOptionsSelected = null;
  
  
  this.gapOptions = new lgb.component.DropDownDataSource("Gap?");
  this.gapOptions.add("No", false );
  this.gapOptions.add("Yes", true, true);

  this.showGap = true;
  
  
  
  this.veneerOptions = new lgb.component.DropDownDataSource("Veneer Options");
  
  this.veneerOptions.add("Brick", "BrickVeneer" );
  this.veneerOptions.add("Stone", "StoneVeneer" );

  
  this.veneerSelected = null;
  
  this.layerNodes = [];
  this.title2Layer = {};

  this.makeLayer_("InnerLayer", "GypsumBoard" );
  this.makeLayer_("Studs", "SteelStudsLayer1" );
  this.makeLayer_('InteriorInsulation', 'InteriorInsulation');
  this.makeLayer_('AirBarrier', 'Vapor-AirBarrier');
  this.makeLayer_('ExternalInsulation', 'RigidExInsulation1inch');
  this.makeLayer_('Gap', 'Cube');
  this.makeLayer_('Veneer', 'StoneVeneer');

};
goog.inherits(lgb.world.model.CrossSectionModel, lgb.core.BaseModel);



lgb.world.model.CrossSectionModel.prototype.makeLayer_ = function(name, meshName) {

  var layerNode = new lgb.world.model.vo.LayerNode(name, meshName);
  
  this.layerNodes.push(layerNode);
  this.title2Layer[name] = layerNode;

  
};



lgb.world.model.CrossSectionModel.prototype.setMeshes = function(meshes) {
  
  this.meshWrappers_ = {};
  this.eachPropertyName(meshes, this.setOneMesh_);
  
};

lgb.world.model.CrossSectionModel.prototype.setOneMesh_ = function(mesh, name) {
  
  this.meshWrappers_[name] = {
    mesh:mesh,
    originalPosition:mesh.position.clone()
  };
  

};


lgb.world.model.CrossSectionModel.prototype.getLayersToShow = function() {
  
  this.visibleLayers = [];
  this.each(this.layerNodes, this.initOneLayer_);
  
  return this.visibleLayers;

};


lgb.world.model.CrossSectionModel.prototype.initOneLayer_ = function(layerNode) {
  
  var meshWrapper = this.meshWrappers_[layerNode.meshName];
  layerNode.init(meshWrapper);
  
  if (layerNode.show) {
    this.visibleLayers.push(layerNode);
  }
  return;
}; 






lgb.world.model.CrossSectionModel.prototype.setViewpointNode = function(node) {
  
    this.viewpointNode_ = node;
    
    // this.viewPointNodeMap_.main = node.getViewpoint("StoneVeneer");
    // this.viewPointNodeMap_.top1 = node.getViewpoint("RigidExInsulation1inch");
    // this.viewPointNodeMap_.air1 = node.getViewpoint("Vapor-AirBarrier");
    // this.viewPointNodeMap_.veneer = node.getViewpoint("BrickVeneer");

};


lgb.world.model.CrossSectionModel.prototype.getViewPoint = function(name) {
  
  var node = this.viewpointNode_.getViewpoint(name);
  
  return node;

};


