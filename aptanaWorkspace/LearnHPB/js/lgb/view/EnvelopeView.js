/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.EnvelopeView');

goog.require('goog.userAgent');
goog.require('lgb.ThreeUtils');
goog.require('lgb.events.ViewInitialized');
goog.require('lgb.view.BaseView3dScene');

goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.events.BuildingHeightChanged');


/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.model.EnvelopeModel} dataModel The model to display.
 */
lgb.view.EnvelopeView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'envelope';
  
 lgb.view.BaseView3dScene.call(this, dataModel);

  this.floorMeshHash_ = [];
  this.floorOffset_= [];  
  
  this.floorDimensions_ = null;
  
  this.topFloorContainer_ = new THREE.Object3D();
  this.topFloorContainer_.name = this._ASSETS_FOLDER + "-topFloorContainer";
  
  this.lowerFloorContainer_ = new THREE.Object3D();
  this.lowerFloorContainer_.name = this._ASSETS_FOLDER + "-lowerFloorContainer";
  
  this.topFloorMesh_ = null;
  

};
goog.inherits(lgb.view.EnvelopeView,lgb.view.BaseView3dScene);



lgb.view.EnvelopeView.prototype.getTopFloorContainer = function() {

  return this.topFloorContainer_;

};



/**
 * Event handler called when the the scene is loaded.
 * @private
 * @param {Object} result From the THREE.js lib.
 */
lgb.view.EnvelopeView.prototype.onSceneLoaded_ = function() {

  
  this.floorMeshHash_ = lgb.ThreeUtils.convertGroupHashToMeshHash(this.groups_);

  var hashKeyArray = [];
  var optionsAry = this.dataModel.floorHeightOptions;
  var len = optionsAry.length;
  
  for (var i = 0; i < len; i++) {
    var hashKey = optionsAry[i] + 'ft';
    hashKeyArray.push(hashKey);
    
   var mesh = this.floorMeshHash_[hashKey];
   var dim = mesh.geometry.getDimensions();
   this.floorMeshHash_[hashKey].position.setY(dim.y/2);
  }

  this.masterGroup_.add(this.topFloorContainer_);
  this.masterGroup_.add(this.lowerFloorContainer_);
  this.requestAddToWorld(this.masterGroup_);
    
  this.makeFloors_();
  
  this.dispatchVisibilityNodes_();
};


lgb.view.EnvelopeView.prototype.dispatchVisibilityNodes_ = function() {


  var node = new lgb.model.vo.VisibilityNode('Envelope', this.masterGroup_, 1 );
  
  var event = new lgb.events.VisibilityNodesLoaded(node);
  this.dispatchLocal(event);
 
  return;
}


/**
 * @override
 * @param {lgb.events.DataModelChanged} event The event.
 * @protected
 */
lgb.view.EnvelopeView.prototype.onChange = function(event) {
    
    var whatIsDirty = event.payload;
    
    if (whatIsDirty.isVisible) {
        this.updateVisible_()
    }
     
    if (whatIsDirty.floorHeight ||
        whatIsDirty.floorCount) {
            
        this.makeFloors_()
    }
    
};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.EnvelopeView.prototype.updateAllFromModel_ = function() {

  this.makeFloors_();
  this.updateVisible_();
};


/**
 * @private
 */
lgb.view.EnvelopeView.prototype.makeFloors_ = function() {
  
  
  var hashKey = this.dataModel.floorHeight + 'ft';
  
  var mesh = this.floorMeshHash_[hashKey];
  var geometry = mesh.geometry;
  
  this.floorDimensions_ = geometry.getDimensions();
 
  this.lowerFloorContainer_.removeAllChildren();
  var floorCount = this.dataModel.floorCount;

  for (var j = 0; j < floorCount-1; j++) {
    var newFloor = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
    newFloor.name = this._ASSETS_FOLDER + "-floor-" + (j + 1);
    newFloor.position.y += j * this.floorDimensions_.y + mesh.position.y;
    this.lowerFloorContainer_.add(newFloor);
  }
  
  //make top floor
  var topFloorY = j * this.floorDimensions_.y + mesh.position.y;
  
  if (this.topFloorMesh_) {
      this.topFloorContainer_.remove(this.topFloorMesh_);
  }
  
  this.topFloorMesh_ = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
  this.topFloorMesh_.name = this._ASSETS_FOLDER + "-floor-" + (j + 1);
  this.topFloorContainer_.position.y = topFloorY;
  this.topFloorContainer_.add(this.topFloorMesh_);
  
  
  
  this.topFloorMesh_.geometry.computeBoundingBox();
  
  var bb = this.topFloorMesh_.geometry.boundingBox;
  
  var topFloorMaxY = topFloorY + bb.max.y;
  var topFloorMinY = topFloorY + bb.min.y;
  
  var payload = new lgb.model.BuildingHeightModel(topFloorMaxY,topFloorMinY);
  var event = new lgb.events.BuildingHeightChanged(payload);
  this.dispatchLocal(event);
  
};





/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */

lgb.view.EnvelopeView.prototype.updateVisible_ = function() {
    
    
  var m = this.lowerFloorContainer_.children.length;

  for (var i = 0; i < m; i++) {
    this.lowerFloorContainer_.children[i].visible = this.dataModel.isVisible;
  }
  

  this.topFloorMesh_.visible = this.dataModel.isVisible;


};












