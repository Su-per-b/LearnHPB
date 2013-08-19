/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.WorldSelectionController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.WorldSelectionModel');
goog.require('lgb.view.WorldSelectionView');
goog.require('goog.array');


/**
 * @constructor
 * @extends lgb.controller.BaseController
 * @param {Element} containerDiv The DIV to use.
 * @param {THREE.Camera} camera We need a reference to this to pass to the view.
 */
lgb.controller.WorldSelectionController = function( camera, scene) {

  lgb.controller.BaseController.call(this);
  this.camera_ = camera;
  this.scene_ = scene;
  this.init_();

};
goog.inherits(lgb.controller.WorldSelectionController,
  lgb.controller.BaseController);


/**
 * @private
 */
lgb.controller.WorldSelectionController.prototype.init_ = function() {

  this.dataModel = new lgb.model.WorldSelectionModel();

  this.view = new lgb.view.WorldSelectionView(this.dataModel,
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
lgb.controller.WorldSelectionController.prototype.bind_ = function() {
  
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



lgb.controller.WorldSelectionController.prototype.onRequestSelectSystemNode_ =
  function(event) {

  this.dataModel.selectSystemNode(event.payload);

};





lgb.controller.WorldSelectionController.prototype.onObject3DSelected_ =
  function(event) {

  var intersect = event.payload;
  
  var systemNodeID = this.dataModel.selectIntersect(intersect);
  this.trigger(e.RequestSelectSystemNode, systemNodeID);
  
};



lgb.controller.WorldSelectionController.prototype.onSelectableLoaded_ =
  function(event) {

  this.dataModel.addMeshAry(event.payload);
  return;
};
