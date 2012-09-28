/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.SelectionView');

goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.Object3DSelected');
goog.require('lgb.events.Render');
goog.require('lgb.model.SelectableModel');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.SelectableModel} dataModel The MVC data Model.
 * @param {Element} containerDiv The DOM element.
 * @param {THREE.Camera} camera The camera needed to identify collisions.
 */
lgb.view.SelectionView = function(dataModel, containerDiv, camera) {
  lgb.view.ViewBase.call(this, dataModel);
  this.containerDiv_ = containerDiv;
  this.camera_ = camera;

  this._NAME = 'lgb.view.SelectionView';
};
goog.inherits(lgb.view.SelectionView, lgb.view.ViewBase);



/**
 * Initializes the View
 */
lgb.view.SelectionView.prototype.init = function() {

  /**
   * @type {THREE.Projector}
   */
  this.projector_ = new THREE.Projector();
  this.mouse = { x: 0, y: 0 };
  this.mouseMoveDirty = false;
  this.containerDiv_.addEventListener('mouseup', this.d(this.onClick_), false);


  this.selectedMaterial = new THREE.MeshLambertMaterial({ color: 0xbb0000 });
  this.savedMaterials = {};

  this.masterGroup = new THREE.Object3D();
  this.masterGroup.name = this._NAME;

  var event = new lgb.events.Object3DLoaded(this.masterGroup);
  this.dispatchLocal(event);
};


/**
 * @private
 * @param {jQuery.event} event The event fired when a user clicks.
 */
lgb.view.SelectionView.prototype.onClick_ = function(event) {
  this.mouse.x = (event['clientX'] / window.innerWidth) * 2 - 1;
  this.mouse.y = - (event['clientY'] / window.innerHeight) * 2 + 1;
  this.mouseMoveDirty = true;

  this.renderListenerKey = this.listen(lgb.events.Render.TYPE, this.onRender);
};


/**
 * @protected
 * @param {lgb.events.DataModelChanged} event Fired when the DM changes.
 */
lgb.view.SelectionView.prototype.onChange = function(event) {
  this.updateSelected_();
};


/**
 * The selection has changed.
 * @private
 */
lgb.view.SelectionView.prototype.updateSelected_ = function() {

  //deselect
  var l = this.dataModel.deselected.length;
  for (var i = 0; i < l; i++) {
    var mesh = this.dataModel.deselected[i];
    mesh.materials = [new THREE.MeshFaceMaterial()];
  }

  //select
  var m = this.dataModel.selected.length;
  for (var j = 0; j < m; j++) {
    this.dataModel.selected[j].materials = [this.selectedMaterial];
  }

};


/**
 * Check for a collision between the Ray and any Object3D
 * that is marked for collision detection.
 */
lgb.view.SelectionView.prototype.checkCollision = function() {
  return;
  
  
  var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
  this.projector_.unprojectVector(vector, this.camera_);

  var ray = new THREE.Ray(
    this.camera_.position,
    vector.subSelf(this.camera_.position).normalize());

  /**@type {THREE.CollisionSystem} */
  //var intersect = THREE.Collisions.rayCastNearest(ray);
  
    //var intersects = ray.intersectScene(scene);  //ERROR
    
     //if (intersects.length > 0) {
     // alert('here');
    // }


var intersects = false;

  if (this.dataModel.selected.length == 0 &&
    intersect == null) {
      //do nothing
    } else {
      var e = new lgb.events.Object3DSelected(intersect);
      this.dispatchLocal(e);
    }
};


/**
 * event handler.
 * @param {lgb.events.Render} event Fired by the World Controller.
 */
lgb.view.SelectionView.prototype.onRender = function(event) {
  this.checkCollision();
  this.unlisten(this.renderListenerKey);
};


