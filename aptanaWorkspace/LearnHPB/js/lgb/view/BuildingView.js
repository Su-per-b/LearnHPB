/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.BuildingView');

goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.vo.ViewpointNode');


/**
 * @constructor
 * @extends {lgb.view.BaseClass}
 * @param {lgb.model.HvacModel} dataModel The model to display.
 */
lgb.view.BuildingView = function(dataModel) {
    
  this._TITLE = 'BuildingView';
  
  lgb.view.BaseView3dScene.call(this, dataModel);
  this.masterGroup_ = new THREE.Object3D();
  this.masterGroup_.name = this._TITLE;
  
  this.floorGroup_ = new THREE.Object3D();
  this.floorGroup_.name = this._TITLE + "_floor";
  
  this.ceilingGroup_ = new THREE.Object3D();
  this.ceilingGroup_.name = this._TITLE + "_ceiling";
  
  this.roofGroup_ = new THREE.Object3D();
  this.roofGroup_.name = this._TITLE + "_roof";
  
  this.groundGroup_ = new THREE.Object3D();
  this.groundGroup_.name = this._TITLE + "_ground";
  
  this.masterGroup_.add(this.floorGroup_);
  this.masterGroup_.add(this.ceilingGroup_);
  this.masterGroup_.add(this.roofGroup_);
  this.masterGroup_.add(this.groundGroup_);
  
  this.anchors = {
    "floor": this.floorGroup_,
    "ceiling": this.ceilingGroup_,
    "roof": this.roofGroup_,
    "ground": this.groundGroup_
  }
  
  lgb.model.vo.ViewpointNode.anchors = {
    "floor": this.floorGroup_,
    "ceiling": this.ceilingGroup_,
    "roof": this.roofGroup_,
    "ground": this.groundGroup_
  }
  
};
goog.inherits(lgb.view.BuildingView, lgb.view.BaseView3dScene);


lgb.view.BuildingView.prototype.init = function() {

  this.triggerLocal(e.AddToWorldRequest, this.masterGroup_);
};



lgb.view.BuildingView.prototype.addToFloor = function(object3D) {

  this.floorGroup_.add(object3D);
};

lgb.view.BuildingView.prototype.addToCeiling= function(object3D) {

  this.ceilingGroup_.add(object3D);
};

lgb.view.BuildingView.prototype.addToRoof= function(object3D) {

  this.roofGroup_.add(object3D);
};


lgb.view.BuildingView.prototype.addToGround_= function(object3D) {

  this.groundGroup_.add(object3D);
};


lgb.view.BuildingView.prototype.setBuildingHeight = function(buildingHeightModel) {

  this.floorGroup_.position.y = buildingHeightModel.activeFloorMinY;
  this.ceilingGroup_.position.y = buildingHeightModel.activeFloorMaxY;
  this.roofGroup_.position.y = buildingHeightModel.topFloorMaxY;

};
