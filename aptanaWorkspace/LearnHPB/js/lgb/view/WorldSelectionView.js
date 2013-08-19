/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.WorldSelectionView');

goog.require('lgb.model.WorldSelectionModel');
goog.require('lgb.view.BaseV');


/**
 * @constructor
 * @extends {lgb.view.BaseV}
 * @param {lgb.model.WorldSelectionModel} dataModel The MVC data Model.
 * @param {Element} containerDiv The DOM element.
 * @param {THREE.Camera} camera The camera needed to identify collisions.
 */
lgb.view.WorldSelectionView = function(dataModel, containerDiv, camera, scene) {
    
  lgb.view.BaseV.call(this, dataModel, "SelectionView", lgb.Config.HUD_CONTAINER_STR);
  
  this.containerDiv_ = containerDiv;
  this.camera_ = camera;
  this.scene_ = scene;

};
goog.inherits(lgb.view.WorldSelectionView, lgb.view.BaseV);



/**
 * Initializes the View
 */
lgb.view.WorldSelectionView.prototype.init = function() {

  this.projector_ = new THREE.Projector();
  this.mouse = { x: 0, y: 0 };
  this.mouseMoveDirty = false;
  
  var p = this.jqParent();
  p.bind('mouseup', this.d(this.onClick_));
  this.selectedMaterial = new THREE.MeshLambertMaterial({ color: 0xbb0000 });
  this.savedMaterials = {};

  this.listenForChange_('selectedMeshList');

};



lgb.view.WorldSelectionView.prototype.onChange_selectedMeshList_ = function(selectedMeshList) {
  
  this.each(this.dataModel.deselected, this.changeMaterial_, false);
  this.each(selectedMeshList, this.changeMaterial_, true);
};


lgb.view.WorldSelectionView.prototype.changeMaterial_ = function(mesh, makeRed) {
  
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
lgb.view.WorldSelectionView.prototype.onClick_ = function(event) {
  
  //check for left mouse button
  if (0 == event.button) {
    
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.mouseMoveDirty = true;
  
    this.renderListenerKey = this.listen(e.RenderNotify, this.onRender);
  }
  
};



/**
 * Check for a collision between the Ray and any Object3D
 * that is marked for collision detection.
 */

lgb.view.WorldSelectionView.prototype.checkCollision = function() {


  var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
  this.projector_.unprojectVector(vector, this.camera_);

  var ray = new THREE.Ray(this.camera_.position, vector.subSelf(this.camera_.position).normalize());

  //var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
  //var intersect = THREE.Collisions.rayCastNearest(ray);

  var intersectList = ray.intersectObjects(this.dataModel.selectableMeshesAry, true);

  //var intersects = ray.intersectScene(scene);  //ERROR

  //if (this.dataModel.selected.length == 0 && intersects == []) {
    //do nothing
// } else {
  
    if (intersectList.length > 0) {
      
      var intersect = intersectList[0];
      this.triggerLocal(e.Object3DSelected, intersect);
      
    }
    
};


/**
 * event handler.
 * @param {e.RenderNotify} event Fired by the World Controller.
 */
lgb.view.WorldSelectionView.prototype.onRender = function(event) {
  this.unlisten(this.renderListenerKey); 
  this.checkCollision();
};


