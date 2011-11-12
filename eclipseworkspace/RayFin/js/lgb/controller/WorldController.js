goog.provide('lgb.controller.WorldController');

goog.require('lgb.controller.BuildingController');
goog.require('lgb.controller.ControllerBase');
goog.require('lgb.controller.FloorController');
goog.require('lgb.controller.PsControllerMaster');
goog.require('lgb.controller.WorldSelectionController');
goog.require('lgb.events.Object3DLoaded');
goog.require('lgb.events.Render');
goog.require('lgb.events.WindowResize');
goog.require('lgb.view.CameraView');
goog.require('lgb.view.StatsView');
goog.require('lgb.view.TrackBallWrapper');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.ControllerBase
 * @param {Element} containerDiv The DIV to use
 * when we render 3D.
 */
lgb.controller.WorldController = function(containerDiv) {
  lgb.controller.ControllerBase.call(this);
  this.containerDiv_ = containerDiv;
};
goog.inherits(lgb.controller.WorldController, lgb.controller.ControllerBase);


/**
 * Initializes the WorldController Controller after the document is ready
 */
lgb.controller.WorldController.prototype.init = function() {

  /**
   * The top-level this.containerDiv_ object in the THREE.js world
   * contains lights, camera and objects
   * @type {THREE.Scene}
   * @private
   */
  this.scene_ = new THREE.Scene();


  this.initRenderer_();
  this.setSize_();

  /**
   * The one and only Camera that views the 3d scene
   * @type {lgb.view.CameraView}
   * @private
  **/
  this.cameraView_ = new lgb.view.CameraView(this.renderer_.domElement);

  this.initLights_();
  this.bind_();

  /**
   * The grid on the floor
   * type {lgb.controller.FloorController}
   * private
  */
  this.floorController = new lgb.controller.FloorController();

  if (lgb.Config.SHOW_STATS) {
    this.statsView_ = new lgb.view.StatsView(this.containerDiv_);
  } else {
    this.statsView_ = null;
  }

  /**
    * @type {lgb.controller.BuildingController}
    * @private
  */
  this.buildingController_ = new lgb.controller.BuildingController();

  /**@type {lgb.controller.PsControllerMaster} */
  this.PsControllerMaster_ = new lgb.controller.PsControllerMaster();

  /**@type {lgb.controller.WorldSelectionController} */
  this.selectionController_ =
    new lgb.controller.WorldSelectionController(
      this.containerDiv_,
      this.cameraView_.camera
  );

  /** @type {lgb.view.TrackBallWrapper} */
  this.trackBallWrapper_ = new lgb.view.TrackBallWrapper(
    this.cameraView_.camera,
    this.containerDiv_
  );

  this.containerDiv_.appendChild(this.renderer_.domElement);

};

/**
 * configures lights and adds them to the scene
 * @private
 */
lgb.controller.WorldController.prototype.initLights_ = function() {
  /**
   * light source 1
   * @type {THREE.AmbientLight}
   * @private
   */
  this.ambientLight_ = new THREE.AmbientLight(0x606060);
  this.scene_.add(this.ambientLight_);

  this.sun_ = new THREE.DirectionalLight(0xffffff);
  this.sun_.position = this.cameraView_.camera.position.clone();
  this.scene_.add(this.sun_);
};


/**
 * initialize the renderer in a browser specific way
 * @private
 */
lgb.controller.WorldController.prototype.initRenderer_ = function() {
  /**
   * @type {THREE.WebGLRenderer}
   * @private
   */
  this.renderer_ = new THREE.WebGLRenderer();

  this.renderEvent = new lgb.events.Render();

  if (window.webkitRequestAnimationFrame) {
    this.renderDelegate = this.d(this.onRenderWebkit_);
    window.webkitRequestAnimationFrame(this.renderDelegate);
  } else if (window.mozRequestAnimationFrame) {
    this.renderDelegate = this.d(this.onRenderMoz_);
    window.mozRequestAnimationFrame(this.renderDelegate);
  } else if (window.oRequestAnimationFrame) {
    this.renderDelegate = this.d(this.onRenderOReq_);
    window.oRequestAnimationFrame(this.renderDelegate);
  } else {
    this.renderDelegate = this.d(this.onRenderMisc_);
    window.requestAnimationFrame(this.renderDelegate);
  }
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.WorldController.prototype.bind_ = function() {
  //this.listen(lgb.events.MeshLoaded.TYPE, this.onMeshLoaded);
  this.listen(lgb.events.Object3DLoaded.TYPE, this.onObject3DLoaded_);
  this.listen(lgb.events.WindowResize.TYPE, this.onWindowResize_);
};



/*
lgb.controller.WorldController.prototype.onMeshLoaded = function(event) {
  var mesh = event.payload;
  this.scene_.add(mesh);

  var mc = THREE.CollisionUtils.MeshColliderWBox(mesh);
  THREE.Collisions.colliders.push(mc);
};
*/


/**
 * Handles an event fired by View classes
 * @private
 * @param {lgb.events.Object3DLoaded} event The event that tells us
 * the Object3D that the event target would like to load.
 */
lgb.controller.WorldController.prototype.onObject3DLoaded_ = function(event) {
  var obj = event.payload;

  if ('' == obj.name) {
    throw ('Please name the THREE.Object3D before ' +
    'you request to add it to the scene.');
  }


  this.scene_.add(obj);
};


/**
 * Handles an event fired by the browser when the user resizes the window
 * @private
 * @param {lgb.events.WindowResize} event the event.
 */
lgb.controller.WorldController.prototype.onWindowResize_ =
  function(event) {

  this.setSize_();
};


/**
 * sets the canvas size based on the window size
 * @private
 */
lgb.controller.WorldController.prototype.setSize_ = function() {
  this.renderer_.setSize(window.innerWidth, window.innerHeight);
};


/**
 * platform specific render function for unknown browser
 * @private
 * @param {number} event A timestamp.
 */
lgb.controller.WorldController.prototype.onRenderOReq_ = function(event) {
  window.oRequestAnimationFrame(mainController.worldController_.onRenderOReq_);
  mainController.worldController_.renderHelper();
};


/**
 * platform specific render function for mozilla browser
 * @private
 * @param {number} event A timestamp.
 */
lgb.controller.WorldController.prototype.onRenderMoz_ = function(event) {

  window.mozRequestAnimationFrame(mainController.worldController_.onRenderMoz_);
  mainController.worldController_.renderHelper();
};


/**
 * platform specific render function for chrome browser
 * @private
 * @param {number} event A timestamp.
 */
lgb.controller.WorldController.prototype.onRenderWebkit_ = function(event) {

  window.webkitRequestAnimationFrame(
      mainController.worldController_.onRenderWebkit_
    );

  mainController.worldController_.renderHelper();
};


/**
 * platform specific render function for misc browser
 * untested.
 * @private
 * @param {number} event A timestamp.
 */
lgb.controller.WorldController.prototype.onRenderMisc_ = function(event) {

  window.requestAnimationFrame(mainController.worldController_.onRenderMisc_);
  mainController.worldController_.renderHelper();
};


/**
 * platform independant render function
 * I made this 'public' in an effort to optimize the render loop.
 */
lgb.controller.WorldController.prototype.renderHelper = function() {
  //TODO (Raj): further optimze the render loop
  goog.events.dispatchEvent(lgb.globalEventBus, this.renderEvent);
  this.renderer_.render(this.scene_, this.cameraView_.camera);
};
