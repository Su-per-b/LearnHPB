/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.HvacView');

goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.vo.VisibilityNode');
goog.require('lgb.model.vo.ViewpointNode');

/**
 * @constructor
 * @extends {lgb.view.BaseView3dScene}
 * @param {lgb.model.HvacModel} dataModel The model to display.
 */
lgb.view.HvacView = function(dataModel) {

  this._TITLE = 'HVAC';
  this._ASSETS_FOLDER = 'hvac';

  lgb.view.BaseView3dScene.call(this, dataModel);

};
goog.inherits(lgb.view.HvacView, lgb.view.BaseView3dScene);

/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.HvacView.prototype.onSceneLoaded_ = function(result) {

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

lgb.view.HvacView.prototype.dispatchSelectableLoaded_ = function(selectableList) {
  
  if (selectableList.length > 0) {
     this.triggerLocal(e.SelectableLoaded, selectableList);
  }
  
}


lgb.view.HvacView.prototype.dispatchViewpointNodes_ = function() {
  var node = new lgb.model.vo.ViewpointNode.makeFromObject3D(this.masterGroup_, 1);
  this.triggerLocal(e.ViewpointNodesLoaded, node);
}

lgb.view.HvacView.prototype.dispatchVisibilityNodes_ = function() {
  var node = new lgb.model.vo.VisibilityNode('HVAC', this.masterGroup_, 1);
  this.triggerLocal(e.VisibilityNodesLoaded, node);
}

