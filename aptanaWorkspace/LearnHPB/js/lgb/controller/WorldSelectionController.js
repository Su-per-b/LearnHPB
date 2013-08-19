/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.WorldSelectionController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.events.WorldSelectionChanged');
goog.require('lgb.model.SelectableModel');
goog.require('lgb.view.SelectionView');
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

  this.meshToSystemNodeMap = {
    TopDamper: 'MX',
    CenterDamper: 'MX',
    LeftDamper: 'MX',
    Fan: 'FAN',
    CoolingCoil: 'CC',
    HeatingCoil: 'HC',
    Filter: 'FLT'
  };

  this.systemNodeToMeshMap = {
    MX: ['TopDamper', 'CenterDamper', 'LeftDamper'],
    FAN: ['Fan'],
    CC: ['CoolingCoil'],
    HC: ['HeatingCoil'],
    FLT: ['Filter']
  };

  this.dataModel = new lgb.model.SelectableModel();

  this.view = new lgb.view.SelectionView(this.dataModel,
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
    
};


/**
 * @private
 * @param {lgb.events.RequestWorldSelectionChange} event Requesting
 * that the selction in the 3D world be changed.
 * Comes from the Properties Controller.
 */
lgb.controller.WorldSelectionController.prototype.
  onRequestWorldSelectionChange_ = function(event) {

  /**@type {string} */
  var id = event.payload;

  /**@type {Array.<string>} */
  var meshNames = this.systemNodeToMeshMap[id];
  if (null != meshNames) {
    this.dataModel.selectMeshList(meshNames);
  }

};




lgb.controller.WorldSelectionController.prototype.onObject3DSelected_ =
  function(event) {

  /**@type {THREE.CollisionSystem} **/
  var mc = event.payload;
  this.dataModel.select(mc);

  var meshName = this.dataModel.getOneSelected();


  var id = this.meshToSystemNodeMap[meshName];

  if (id == null) {
    id = 'NONE';
  }

  //var e = new lgb.events.WorldSelectionChanged(id);
  //this.dispatch(e);
};



lgb.controller.WorldSelectionController.prototype.onSelectableLoaded_ =
  function(event) {

  this.dataModel.addMeshAry(event.payload);
  
};
