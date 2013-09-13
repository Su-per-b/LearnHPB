/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.WorldSelectionView');

goog.require('lgb.world.model.WorldSelectionModel');
goog.require('lgb.world.view.BaseV');


/**
 * @constructor
 * @extends {lgb.world.view.BaseV}
 * @param {lgb.world.model.WorldSelectionModel} dataModel The MVC data Model.
 * @param {Element} containerDiv The DOM element.
 * @param {THREE.Camera} camera The camera needed to identify collisions.
 */
lgb.world.view.WorldSelectionView = function(dataModel, containerDiv, camera, scene) {
    
  lgb.world.view.BaseV.call(this, dataModel, "SelectionView", lgb.core.Config.HUD_CONTAINER_STR);
  
  this.containerDiv_ = containerDiv;
  this.camera_ = camera;
  this.scene_ = scene;

};
goog.inherits(lgb.world.view.WorldSelectionView, lgb.world.view.BaseV);



/**
 * Initializes the View
 */
lgb.world.view.WorldSelectionView.prototype.init = function() {

  this.projector_ = new THREE.Projector();
  this.mouse = { x: 0, y: 0 };
  
  this.containerDiv_.bind('mouseup', this.d(this.onClick_));
   
  this.selectedMaterial = new THREE.MeshLambertMaterial({ color: 0xbb0000 });
  this.savedMaterials = {};

  this.listenForChange_('selectedMeshList');

};



lgb.world.view.WorldSelectionView.prototype.onChange_selectedMeshList_ = function(selectedMeshList) {
  
  this.each(this.dataModel.deselected, this.changeMaterial_, false);
  this.each(selectedMeshList, this.changeMaterial_, true);
};


lgb.world.view.WorldSelectionView.prototype.changeMaterial_ = function(mesh, makeRed) {
  
  if(makeRed) {
      mesh.material = this.selectedMaterial;
  } else {
      mesh.material = new THREE.MeshFaceMaterial();
  }
}


/**
 * @private
 * @param {jQuery.event} event The event fired when a user clicks.
 */
lgb.world.view.WorldSelectionView.prototype.onClick_ = function(event) {
  
  //check for left mouse button
  if (0 == event.button) {
    
    var viewportWidth = this.containerDiv_.width();
    var viewportHeight = this.containerDiv_.height();
    
    var offset = this.containerDiv_.offset();
    var offsetParent = this.containerDiv_.offsetParent();
    
    var clientX = event.clientX - offset.left;
    var clientY = event.clientY - offset.top;
    
    var percentX = clientX / viewportWidth;
    var percentY = clientY / viewportHeight;
    
    this.mouse.x = percentX * 2 - 1;
    this.mouse.y = -percentY * 2 + 1;

    this.renderListenerKey = this.listenOnce(e.RenderNotify, this.onRenderNotify_checkCollision_);
  }
  
};



/**
 * event handler.
 * @param {e.RenderNotify} event Fired by the World Controller.
 */
lgb.world.view.WorldSelectionView.prototype.onRenderNotify_checkCollision_ = function(event) {

  var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
  this.projector_.unprojectVector(vector, this.camera_);

  var ray = new THREE.Ray(this.camera_.position, vector.subSelf(this.camera_.position).normalize());
  var intersectList = ray.intersectObjects(this.dataModel.selectableMeshesAry, true);

  if (intersectList.length > 0) {

    var intersect = intersectList[0];
    this.triggerLocal(e.Object3DSelected, intersect);

  }
  
};


