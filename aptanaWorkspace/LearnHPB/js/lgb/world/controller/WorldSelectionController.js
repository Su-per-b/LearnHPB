/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.WorldSelectionController');

goog.require('lgb.core.BaseController');
goog.require('lgb.world.model.WorldSelectionModel');
goog.require('lgb.world.view.WorldSelectionView');


/**
 * @constructor
 * @extends lgb.core.BaseController
 * @param {Element} containerDiv The DIV to use.
 * @param {THREE.Camera} camera We need a reference to this to pass to the view.
 */
lgb.world.controller.WorldSelectionController = function( camera, scene, containerDiv) {

  lgb.core.BaseController.call(this);
  this.camera_ = camera;
  this.scene_ = scene;
  this.containerDiv_ = containerDiv;
  this.init_();

};
goog.inherits(lgb.world.controller.WorldSelectionController,
  lgb.core.BaseController);


/**
 * @private
 */
lgb.world.controller.WorldSelectionController.prototype.init_ = function() {

  this.dataModel = new lgb.world.model.WorldSelectionModel();

  this.view = new lgb.world.view.WorldSelectionView(this.dataModel,
    this.containerDiv_,
    this.camera_,
    this.scene_);

  this.bind_();
  this.view.init();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.WorldSelectionController.prototype.bind_ = function() {
  
  this.relay(this.view, e.AddToWorldRequest);

  this.listenTo(this.view,
    e.Object3DSelected,
    this.onObject3DSelected_
    );

  this.listen(
    e.SelectableLoaded,
    this.onSelectableLoaded_);
    
  this.listen(
    e.RequestSelectSystemNode,
    this.onRequestSelectSystemNode_);
    
};



lgb.world.controller.WorldSelectionController.prototype.onRequestSelectSystemNode_ =
  function(event) {

  this.dataModel.selectSystemNode(event.payload);

};


lgb.world.controller.WorldSelectionController.prototype.onObject3DSelected_ =
  function(event) {

  var intersect = event.payload;
  var systemNodeID = this.dataModel.selectIntersect(intersect);
  
  this.trigger(e.RequestSelectSystemNode, systemNodeID);
  
};



lgb.world.controller.WorldSelectionController.prototype.onSelectableLoaded_ =
  function(event) {

  this.dataModel.addMeshAry(event.payload);
};
