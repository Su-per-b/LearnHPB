/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.world.view.HvacView');

goog.require('lgb.world.view.BaseView3dScene');
goog.require('lgb.world.model.BuildingHeightModel');
goog.require('lgb.world.model.vo.VisibilityNode');
goog.require('lgb.world.model.vo.ViewpointNode');

/**
 * @constructor
 * @extends {lgb.world.view.BaseView3dScene}
 * @param {lgb.world.model.HvacModel} dataModel The model to display.
 */
lgb.world.view.HvacView = function(dataModel) {

  this._TITLE = 'HVAC';
  this._ASSETS_FOLDER = 'hvac';

  lgb.world.view.BaseView3dScene.call(this, dataModel);

};
goog.inherits(lgb.world.view.HvacView, lgb.world.view.BaseView3dScene);

/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.world.view.HvacView.prototype.onSceneLoaded_ = function(result) {

  var selectableList = [];
  var len = this.scene_.children.length;
  
  for (var i = 0; i < len; i++) {

    var mesh = this.scene_.children.pop();
    if (mesh != null) {

      //TODO:RAJ target selectable meshes with "groups"
      if (mesh.name != 'DuctWork') {
        
        selectableList.push(mesh);
      }

      this.masterGroup_.add(mesh);
    } else {

      //console.log ("test");
      throw ('Mesh is null');
    }
  }


  this.dispatchSelectableLoaded_(selectableList);
  this.dispatchVisibilityNodes_();
  this.dispatchViewpointNodes_();

};

lgb.world.view.HvacView.prototype.dispatchSelectableLoaded_ = function(selectableList) {
  
  if (selectableList.length > 0) {
     this.triggerLocal(e.SelectableLoaded, selectableList);
  }
  
}


lgb.world.view.HvacView.prototype.dispatchViewpointNodes_ = function() {
  var node = new lgb.world.model.vo.ViewpointNode.makeFromObject3D(this.masterGroup_, 1);
  this.triggerLocal(e.ViewpointNodesLoaded, node);
}

lgb.world.view.HvacView.prototype.dispatchVisibilityNodes_ = function() {
  var node = new lgb.world.model.vo.VisibilityNode('HVAC', this.masterGroup_, 1);
  this.triggerLocal(e.VisibilityNodesLoaded, node);
}

