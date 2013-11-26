/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.EnvelopeView');

goog.require('goog.userAgent');
goog.require('lgb.core.ThreeUtils');
goog.require('lgb.world.view.BaseWorldView');

goog.require('lgb.world.model.BuildingHeightModel');


/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.world.model.EnvelopeModel} dataModel The model to display.
 */
lgb.world.view.EnvelopeView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'envelope';
  this._TITLE = 'Envelope';
  
  lgb.world.view.BaseWorldView.call(this, dataModel);
  this.floorMeshHash_ = {};
  
  this.floorDimensions_ = null;
  
  this.allFloorsContainer_ = new THREE.Object3D();
  this.allFloorsContainer_.name = this._ASSETS_FOLDER + "-allFloorsContainer";
  

};
goog.inherits(lgb.world.view.EnvelopeView,lgb.world.view.BaseWorldView);


lgb.world.view.EnvelopeView.prototype.bind_ = function() {
  this.listenForChange_('floorHeight');
  this.listenForChange_('floorCount');
};


lgb.world.view.EnvelopeView.prototype.onChange_floorHeight_ = function(floorHeight) {
  this.makeFloors_();
};
lgb.world.view.EnvelopeView.prototype.onChange_floorCount_ = function(floorCount) {
  this.makeFloors_();
};


lgb.world.view.EnvelopeView.prototype.getTopFloorContainer = function() {
  return this.topFloorContainer_;
};



/**
 * Event handler called when the the scene is loaded.
 * @private
 * @param {Object} result From the THREE.js lib.
 */
lgb.world.view.EnvelopeView.prototype.onSceneLoaded_ = function() {


  this.floorMeshHash_ = lgb.core.ThreeUtils.convertGroupHashToMeshHash(this.groups_);
  
  var hashKeyArray = [];
  var optionsAry = this.dataModel.floorHeightOptions;
  var len = optionsAry.length;

  for (var i = 0; i < len; i++) {
    var hashKey = optionsAry[i] + 'ft';
    hashKeyArray.push(hashKey);

    var mesh = this.floorMeshHash_[hashKey];
    
    if (goog.userAgent.WEBKIT) {
      this.chromeBlinkingFix_(mesh);
    }

    var dim = mesh.geometry.getDimensions();
    var y = dim.y / 2;
    
    mesh.position.setY(y);
  }

  this.masterGroup_.add(this.allFloorsContainer_);
  this.requestAddToWorld(this.masterGroup_);
  this.makeFloors_();
  this.dispatchVisibilityNodes_();
  this.bind_(); 

};


lgb.world.view.EnvelopeView.prototype.dispatchVisibilityNodes_ = function() {

  var visibilityNode = new lgb.world.model.vo.VisibilityNode('Envelope', this.masterGroup_, 1 );
  this.triggerLocal(e.VisibilityNodesLoaded, visibilityNode);

};



/**
 * @private
 */
lgb.world.view.EnvelopeView.prototype.makeFloors_ = function() {
  
  var hashKey = this.dataModel.floorHeight + 'ft';
  
  var mesh = this.floorMeshHash_[hashKey];
  this.floorDimensions_ = mesh.geometry.getDimensions();
 
  this.allFloorsContainer_.removeAllChildren();
  var floorCount = this.dataModel.floorCount;

  for (var j = 0; j < floorCount; j++) {
    var newFloor = mesh.clone();
    
    newFloor.name = this._ASSETS_FOLDER + "-floor-" + (j + 1);
    newFloor.position.y += j * this.floorDimensions_.y;
    this.allFloorsContainer_.add(newFloor);
  }

  var topFloorMaxY = this.floorDimensions_.y * floorCount;
  var topFloorMinY = topFloorMaxY - this.floorDimensions_.y;
  
  var payload = new lgb.world.model.BuildingHeightModel(topFloorMaxY, topFloorMinY);
  
  this.triggerLocal(e.BuildingHeightChanged, payload);
  
  
};






