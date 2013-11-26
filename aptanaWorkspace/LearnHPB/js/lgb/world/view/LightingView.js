/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.world.view.LightingView');

goog.require('lgb.world.view.BaseWorldView');
goog.require('lgb.world.model.GridModel');
goog.require('lgb.world.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.world.model.LightingModel} dataModel The model to display.
 */
lgb.world.view.LightingView = function(dataModel) {

  this._ASSETS_FOLDER = 'lighting';

  lgb.world.view.BaseWorldView.call(this, dataModel);

  this.pendantGeom = null;
  this.recessedGeom = null;
  this.listenForChange_('lightingType');
};
goog.inherits(lgb.world.view.LightingView, lgb.world.view.BaseWorldView);

lgb.world.view.LightingView.prototype.onChange_lightingType_ = function(lightingType) {
  this.buildGrid_();
};

/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.world.view.LightingView.prototype.onSceneLoaded_ = function() {
 


  for (var i = this.scene_.children.length - 1; i >= 0; i--) {
    var mesh = this.scene_.children.pop();

    if (mesh.name == 'recessed') {

      this.recessedGeom = mesh.geometry;
      this.recessedMesh_ = mesh;
      
      this.gridRecessed = new lgb.world.model.GridModel(this.appData_.gridRecessed, mesh.geometry.getDimensions());

    } else if (mesh.name == 'pendant') {

      this.pendantGeom = mesh.geometry;
      this.pendantMesh_ = mesh;
      this.gridPendant = new lgb.world.model.GridModel(this.appData_.gridPendant, mesh.geometry.getDimensions());
    }

    this.masterGroup_.add(mesh);
  }

  this.buildGrid_();
  this.requestAddToWorld(this.masterGroup_);

  this.dispatchVisibilityNodes_();


};

lgb.world.view.LightingView.prototype.dispatchVisibilityNodes_ = function() {
  var node = new lgb.world.model.vo.VisibilityNode('Lighting', this.masterGroup_, 0);
  this.triggerLocal(e.VisibilityNodesLoaded, node);
};


/**
 * Updates this view to reflect the changes in the type of the
 * lighting selected
 * @private
 */
lgb.world.view.LightingView.prototype.buildGrid_ = function() {


  this.masterGroup_.removeAllChildren();
  
  var mesh;
  var gridModel;

  if (this.dataModel.lightingType == lgb.world.model.LightingModel.Type.PENDANT) {

    mesh = this.pendantMesh_;
    
    gridModel = this.gridPendant;

  } else if (this.dataModel.lightingType == lgb.world.model.LightingModel.Type.RECESSED) {

    mesh = this.recessedMesh_;
    gridModel = this.gridRecessed;

  } else {

  }

  this.buildGridHelper_(gridModel, mesh);

};

/**
 * @override
 * @param {Object } event The event.
 * @param {lgb.world.model.GridModel} gridModel.
 * @protected
 */
lgb.world.view.LightingView.prototype.buildGridHelper_ = function(gridModel, mesh) {

  for (var c = 0; c < gridModel.columnCount; c++) {
    for (var r = 0; r < gridModel.rowCount; r++) {

      var light = mesh.clone();
      light.castShadow = true;
      light.receiveShadow = true;

      light.position = gridModel.getCellPosition(r, c);
      this.masterGroup_.add(light);

    }

  };

  this.masterGroup_.position.x = gridModel.centeredPosition.x;
  this.masterGroup_.position.z = gridModel.centeredPosition.z;
  this.masterGroup_.position.y = gridModel.centeredPosition.y;

};

