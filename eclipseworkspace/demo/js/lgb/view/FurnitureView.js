/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.view.FurnitureView');
goog.require('lgb.view.ViewBase');
goog.require('lgb.model.GridModel');
goog.require('lgb.ThreeUtils');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.FurnitureModel} dataModel The model to display.
 */
lgb.view.FurnitureView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  this._NAME = 'lgb.view.FurnitureView';
  this._ASSETS_FOLDER = 'furniture';
  
};
goog.inherits(lgb.view.FurnitureView, lgb.view.ViewBase);




/**
 * Initiates the scene load process.
 * @private

lgb.view.FurnitureView.prototype.loadScene_ = function() {

  //this.loadSceneCollada_();
  this.loadSceneThreeJS_();
};
*/




/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @private
 */
lgb.view.FurnitureView.prototype.onSceneLoaded_ = function() {
  

  var quadOfficePrototype = this.moveGroupToObject3D_("QuadOffice");
 // var quadSizing = quadOfficeObject3D.cloneEx(true, false);
  
  //var quadOfficePrototype = lgb.ThreeUtils.convertGroupToOneMesh(quadOfficeObject3D.children, "QuadOffice");
  
  
  var dimensions = new THREE.Vector3(72, 4, 75);
  
  
  var gridModel = new lgb.model.GridModel (
          this.appData_.gridQuadOffice,
          dimensions
          );
    

  var gridParentObject = this.buildGridHelper_(gridModel, quadOfficePrototype);
  gridParentObject.name = this._NAME + "_QuadOffice_Grid";
  
  
  var conferenceRoom1 = this.moveGroupToObject3D_("ConferenceRoom");
  conferenceRoom1.position.x = -25;
  conferenceRoom1.position.z = 12;
  conferenceRoom1.rotation.y = 1.57;
  
  
  var conferenceRoom2 = conferenceRoom1.cloneEx(true, false);
  conferenceRoom2.position.z -= 10;
  
  var conferenceRoom3 = conferenceRoom1.cloneEx(true, false);
  conferenceRoom3.position.z -= 20;
  
  var conferenceRoom4= conferenceRoom1.cloneEx(true, false);
  conferenceRoom4.position.z -= 30;

  this.masterGroup_.addArray([gridParentObject, 
    conferenceRoom1, 
    conferenceRoom2,
    conferenceRoom3,
    conferenceRoom4
    ]);
  
  this.dispatchLocal(new lgb.events.ViewInitialized());
    
};



/**
 * @override
 * @param {Object } event The event.
 * @param {lgb.model.GridModel} gridModel.
 * @protected
 */
lgb.view.FurnitureView.prototype.buildGridHelper_ = function(gridModel, protoTypeMesh) {
  
  var gridParentObject = new THREE.Object3D();
  
  for (var c=0; c < gridModel.columnCount; c++) {
    for (var r=0; r < gridModel.rowCount; r++) {
      
      newMesh = protoTypeMesh.cloneEx(true, false);
      newMesh.position = gridModel.getCellPosition(r,c);
      gridParentObject.add(newMesh);
    }
  };
  
  gridParentObject.position = gridModel.centeredPosition;
  
  return gridParentObject;
  
  
}



/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.FurnitureView.prototype.updateVisible_ = function() {
  var m = this.masterGroup_.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup_.children[i].visible = this.dataModel.isVisible;
  }
};






/*
 * lgb.view.FurnitureView.prototype.loadSceneCollada_ = function() {

  //colada Loader
   var path = lgb.Config.ASSETS_BASE_PATH + 'eLADShadedDetail/furniture_layoutA_low_2.dae';
   this.loader2_ = new THREE.ColladaLoader();
   this.loader2_.load(path, this.d(this.onSceneLoadedCollada_));

};


/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private

lgb.view.FurnitureView.prototype.onSceneLoadedCollada_ = function(result) {
  
  lgb.logInfo('FurnitureView.onSceneLoadedCollada_');
 
  //return;
  
  var scene = result['scene'];
  this.masterGroup_ = new THREE.Object3D();
  this.masterGroup_.name = "Furniture Collada";
  
  var len = scene.children.length-1;
  
  for (var i = 0; i < len; i++) {
      var mesh = scene.children.pop();
      this.masterGroup_.add(mesh);
  }
  

  this.masterGroup_.position = new THREE.Vector3(0,-1.5, -6);
  this.masterGroup_.scale = new THREE.Vector3(0.4, 0.4,0.4);
  
  if (scene.up.y == 1) {
    this.masterGroup_.rotation = new THREE.Vector3(-1.570758, 0, 0);
  }
  
  this.requestAddToWorld(this.masterGroup_);

  delete this.loader2_;
  this.updateVisible_();
  
  this.dispatchLocal(new lgb.events.ViewInitialized());
    
};
*/