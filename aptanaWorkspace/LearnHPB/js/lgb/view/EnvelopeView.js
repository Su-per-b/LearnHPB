/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.EnvelopeView');

goog.require('goog.userAgent');
goog.require('lgb.ThreeUtils');
goog.require('lgb.events.CamerasLoaded');
goog.require('lgb.events.ViewInitialized');
goog.require('lgb.view.ViewBase');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.EnvelopeModel} dataModel The model to display.
 */
lgb.view.EnvelopeView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  /**@const */
  this._NAME = 'lgb.view.EnvelopeView';
  this._ASSETS_FOLDER = 'envelope';


  this.floorGeometryHash_ = [];
  this.floorDimensions_ = null;
    
  this.init();
};
goog.inherits(lgb.view.EnvelopeView, lgb.view.ViewBase);



/**
 * Event handler called when the the scene is loaded.
 * @private
 * @param {Object} result From the THREE.js lib.
 */
lgb.view.EnvelopeView.prototype.onSceneLoaded_ = function() {

  this.floorGeometryHash_ = lgb.ThreeUtils.convertGroupHashToMeshHash(this.groups_);
  this.updateAllFromModel_();

};


/**
 * @override
 * @param {lgb.events.DataModelChanged} event The event.
 * @protected
 */
lgb.view.EnvelopeView.prototype.onChange = function(event) {
  this.updateAllFromModel_();
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
  var mesh = this.floorGeometryHash_[hashKey];
  var geometry = mesh.geometry;
  
  this.floorDimensions_ = geometry.getDimensions();
  var m = this.masterGroup_.children.length;

  for (var i = this.masterGroup_.children.length - 1; i >= 0; i--) {
    this.masterGroup_.remove(this.masterGroup_.children[i]);
  }

  var l = this.dataModel.floorCount;

  for (var j = 0; j < l; j++) {
    var floor = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
    
    floor.position.y -= j * this.floorDimensions_.y;
    this.masterGroup_.add(floor);
  }

};





/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.EnvelopeView.prototype.updateVisible_ = function() {
  var m = this.masterGroup_.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup_.children[i].visible = this.dataModel.isVisible;
  }
};












