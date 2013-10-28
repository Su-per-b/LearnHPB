/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.world.view.CrossSectionView');
goog.require('lgb.world.view.BaseWorldView');
goog.require('lgb.world.model.GridModel');
goog.require('lgb.core.ThreeUtils');

goog.require('lgb.world.model.BuildingHeightModel');
goog.require('lgb.world.model.vo.VisibilityNode');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.world.model.CrossSectionModel} dataModel The model to display.
 */
lgb.world.view.CrossSectionView = function(dataModel) {

  this._ASSETS_FOLDER = 'cross-section';
  this._TITLE = 'CrossSection';

  this.name2mesh_ = {};
  this.meshList_ = [];
    
  lgb.world.view.BaseWorldView.call(this, dataModel);

};
goog.inherits(lgb.world.view.CrossSectionView, lgb.world.view.BaseWorldView);



lgb.world.view.CrossSectionView.prototype.onSceneLoaded_ = function() {
  

  this.bind_();
  
  this.dispatchViewpointNodes_();
  this.dataModel.setMeshes(this.meshes_);
  
  this.makeLayers_();
  

 // mesh.visible = false;
 
  this.masterGroup_.add(this.meshes_["MainViewPoint"]);
  this.masterGroup_.add(this.meshes_["AirViewPoint"]);
  this.masterGroup_.add(this.meshes_["VeneerViewPoint"]);
  this.masterGroup_.add(this.meshes_["TopViewPoint"]);
  this.masterGroup_.add(this.meshes_["SideViewPoint"]);
  
  
  var mesh2 = this.meshes_["Cube"];
  mesh2.visible = false;
 
};


lgb.world.view.CrossSectionView.prototype.logBoundingBox_ = function(geometry) {
 
  var boundingBox = geometry.getBoundingBoxObject();
  
  var msgBB = "geometry:{0} - {1}".format(geometry.name, boundingBox.toJSON());
  lgb.logInfo(msgBB, this._TITLE);
  
};


  
  

lgb.world.view.CrossSectionView.prototype.makeLayers_ = function() {
  
  var layers = this.dataModel.getLayersToShow();
  
  this.nextLayerZ_ = 0;
  this.masterGroup_.removeAllChildren();
  
  this.each(layers, this.addOneLayer_);
  

};


lgb.world.view.CrossSectionView.prototype.addOneLayer_ = function(layer) {
 
   var thickness = layer.getScaledThickness();
    
   this.nextLayerZ_ -= (thickness / 2);
   this.nextLayerZ_ += layer.originalPosition.z;
   
   layer.mesh.position.z = this.nextLayerZ_;
   
   this.masterGroup_.add(layer.mesh);
   this.nextLayerZ_ -= (thickness / 2);
 
};


lgb.world.view.CrossSectionView.prototype.bind_ = function() {
  
  this.listenForChange_('externalInsulationThickness');
  this.listenForChange_('showAirBarrier');
  this.listenForChange_('veneerMeshName');
  this.listenForChange_('showGap');
  
};


lgb.world.view.CrossSectionView.prototype.onChange_externalInsulationThickness_ = function(externalInsulationThickness) {
  
  var layerNode = this.dataModel.title2Layer['ExternalInsulation'];
  
  layerNode.mesh.scale.z = externalInsulationThickness;
  
  layerNode.computeThickness();
  
  this.makeLayers_();
  
};


lgb.world.view.CrossSectionView.prototype.onChange_showAirBarrier_ = function(showAirBarrier) {
  var layerNode = this.dataModel.title2Layer['AirBarrier'];
  layerNode.show = showAirBarrier;
  this.makeLayers_();
};


lgb.world.view.CrossSectionView.prototype.onChange_veneerMeshName_ = function(veneerMeshName) {
  
  var layerNode = this.dataModel.title2Layer['Veneer'];
  layerNode.meshName = veneerMeshName;

  this.makeLayers_( );
};


lgb.world.view.CrossSectionView.prototype.onChange_showGap_ = function(showGap) {
  var layerNode = this.dataModel.title2Layer['Gap'];
  layerNode.show = showGap;
  this.makeLayers_( );
};



lgb.world.view.CrossSectionView.prototype.dispatchVisibilityNodes_ = function() {
  
  var node = new lgb.world.model.vo.VisibilityNode('CrossSection', this.masterGroup_, 1);
  this.triggerLocal(e.VisibilityNodesLoaded, node);
  
};


lgb.world.view.CrossSectionView.prototype.dispatchViewpointNodes_ = function() {
  
 // var node = new lgb.world.model.vo.ViewpointNode.makeFromObject3D(this.masterGroup_, 2);
 
  var ary = lgb.convertMapToArray(this.objects_);
  var node = new lgb.world.model.vo.ViewpointNode.makeFromArray(this._TITLE, ary, 1);
  this.dataModel.setViewpointNode(node);
  this.triggerLocal(e.ViewpointNodesLoaded, node);
  
};

