/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.DuctworkView');

goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.view.BaseView');
goog.require('lgb.model.BuildingHeightModel');

goog.require('lgb.model.vo.VisibilityNode');
goog.require('lgb.model.ViewPointCollection');

goog.require('lgb.events.VisibilityNodesLoaded');
goog.require('lgb.events.ViewPointCollectionLoaded');



/**
 * @constructor
 * @extends {lgb.view.BaseView}
 * @param {lgb.model.DuctworkModel} dataModel The model to display.
 */
lgb.view.DuctworkView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'hvac';
  
 lgb.view.BaseView3dScene.call(this, dataModel);

  this.buildingHeightModel_ = null;
  this.sceneY_ = null;
  
};
goog.inherits(lgb.view.DuctworkView,lgb.view.BaseView3dScene);



lgb.view.DuctworkView.prototype.setBuildingHeight = function(buildingHeightModel) {
   
  this.buildingHeightModel_ = buildingHeightModel;
  this.setY_();
};


lgb.view.DuctworkView.prototype.setY_ = function() {
    
  if (null != this.buildingHeightModel_ && null != this.sceneY_) {
      this.masterGroup_.position.y = this.buildingHeightModel_.topFloorMaxY + this.sceneY_;
  }
  
};



/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.DuctworkView.prototype.onSceneLoaded_ = function(result) {

  var len = this.scene_.children.length;
  for (var i = 0; i < len; i++) {
    
      var mesh = this.scene_.children.pop();
    
      if (mesh != null) {
        
        //TODO:RAJ target selectable meshes with "groups"
        if (mesh.name != 'ductingObject') {
          var event = new lgb.events.SelectableLoaded(mesh);
          this.dispatchLocal(event);
        }
        
        this.masterGroup_.add(mesh);
      } else {
        
        //console.log ("test");
        throw ('Mesh is null');
      }
  }
  
    this.sceneY_ = this.masterGroup_.position.y;
    this.setY_();
    

    
    this.dispatchVisibilityNodes_();
};

lgb.view.DuctworkView.prototype.dispatchViewPointNodes_ = function() {

    var viewPointNodeCollection = new lgb.model.ViewPointCollection(
        "DuctworkView", this.masterGroup_.children);
        
    var event = new lgb.events.ViewPointCollectionLoaded(viewPointNodeCollection);
    this.dispatchLocal(event);
 
  return;
}

lgb.view.DuctworkView.prototype.dispatchVisibilityNodes_ = function() {


  var node = new lgb.model.vo.VisibilityNode('HVAC', this.masterGroup_, 1 );
  
  var event = new lgb.events.VisibilityNodesLoaded(node);
  this.dispatchLocal(event);
 
  return;
}

/*
lgb.view.DuctworkView.prototype.dispatchVisibilityNodes_ = function() {

  var node = new lgb.model.vo.VisibilityNode(this.masterGroup_, 2, null, 'Ductwork');
  
  var event = new lgb.events.VisibilityNodesLoaded(node);
  this.dispatchLocal(event);
 
  return;
}
*/

/**
 * @override
 * @param {lgb.events.DataModelChanged } event The event.
 * @protected
 */
lgb.view.DuctworkView.prototype.onChange = function(event) {
  this.updateAllFromModel_();
};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.DuctworkView.prototype.updateAllFromModel_ = function() {
  this.updateVisible_();
};


/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.DuctworkView.prototype.updateVisible_ = function() {
  var m = this.masterGroup_.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup_.children[i].visible = this.dataModel.isVisible;
  }
};
