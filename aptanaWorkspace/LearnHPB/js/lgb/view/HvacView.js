/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.HvacView');

goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.view.BaseView');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.vo.VisibilityNode');
goog.require('lgb.model.vo.ViewPointNode');


/**
 * @constructor
 * @extends {lgb.view.BaseView}
 * @param {lgb.model.HvacModel} dataModel The model to display.
 */
lgb.view.HvacView = function(dataModel) {
    
  this._TITLE = 'HVAC';
  this._ASSETS_FOLDER = 'hvac';
  
 lgb.view.BaseView3dScene.call(this, dataModel);

};
goog.inherits(lgb.view.HvacView,lgb.view.BaseView3dScene);




/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.HvacView.prototype.onSceneLoaded_ = function(result) {

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
  

    this.dispatchVisibilityNodes_();
    this.dispatchViewPointNodes_();
    
};


lgb.view.HvacView.prototype.dispatchViewPointNodes_ = function() {

  // var node = new lgb.model.vo.ViewPointNode(this._TITLE, this.masterGroup_, 1 );
  var node = new lgb.model.vo.ViewPointNode.makeFromObject3D( this.masterGroup_, 1 );
  this.triggerLocal(e.ViewPointNodesLoaded, node);
}


lgb.view.HvacView.prototype.dispatchVisibilityNodes_ = function() {
  
  var node = new lgb.model.vo.VisibilityNode('HVAC', this.masterGroup_, 1 );
  this.triggerLocal(e.VisibilityNodesLoaded, node);
}



lgb.view.HvacView.prototype.onChange = function(event) {
  this.updateAllFromModel_();
};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.HvacView.prototype.updateAllFromModel_ = function() {
  this.updateVisible_();
};


/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.HvacView.prototype.updateVisible_ = function() {
  var m = this.masterGroup_.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup_.children[i].visible = this.dataModel.isVisible;
  }
};
