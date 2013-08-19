/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.WorldController');

goog.require('lgb.controller.BuildingController');
goog.require('lgb.controller.CameraController');
goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.TrackBallController');
goog.require('lgb.controller.UtilityController');
goog.require('lgb.controller.WorldSelectionController');

goog.require('lgb.model.WorldModel');
goog.require('lgb.view.WorldView');

goog.require('lgb.view.StatsView');
goog.require('lgb');

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.BaseController
 * @param {Element} containerDiv The DIV to use
 * when we render 3D.
 */
lgb.controller.WorldController = function() {
  lgb.controller.BaseController.call(this);
  this.parentHtmlID = lgb.Config.HUD_CONTAINER_STR;
};
goog.inherits(lgb.controller.WorldController, lgb.controller.BaseController);


/**
 * Initializes the WorldController Controller after the document is ready
 */
lgb.controller.WorldController.prototype.init = function() {
  this.timestamp = 0;
  
  this.dataModel = new lgb.model.WorldModel();
  this.view = new lgb.view.WorldView(this.dataModel);
  
  
  this.containerDiv_ = $('#' + this.parentHtmlID);
  
  //this.containerDiv_ = this.makeDiv();
  
  //this.trigger(e.RequestAddToLayout);
  
  
  this.containerDiv_.attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');
  $('body').attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');
  
  /**
   * The top-level this.containerDiv_ object in the THREE.js world
   * contains lights, camera and objects
   * @type {THREE.Scene}
   * @private
   */
  this.scene_ = new THREE.Scene();
  this.scene_.name = "mainScene";
  this.initRenderer_();
  
  this.calculateSize_();
  this.bind_();

  /**
   * The one and only Camera that views the 3d scene
   * @type {lgb.controller.CameraController}
   * @private
  **/
   this.cameraController_ = new lgb.controller.CameraController(
    this.renderer_.domElement
  );

  this.camera_ = this.cameraController_.getCamera();
  this.scene_.add(this.camera_);

  this.initLights_();


  if (lgb.Config.SHOW_STATS) {
   // this.statsView_ = new lgb.view.StatsView(this.containerDiv_);
  } else {
    this.statsView_ = null;
  }

  
  /**
    * @type {lgb.controller.BuildingController}
    * @private
  */
  this.buildingController_ = new lgb.controller.BuildingController();
 
 
  /**
   * The grid on the floor and the axis arrows
   * type {lgb.controller.UtilityController}
   * private
  */
  this.utilityController_ = new lgb.controller.UtilityController();


  /**@type {lgb.controller.WorldSelectionController} */
  this.selectionController_ =
    new lgb.controller.WorldSelectionController(
      this.camera_,
      this.scene_
  );


  /** @type {lgb.controller.TrackBallController} */
  this.trackController_ = new lgb.controller.TrackBallController(
    this.camera_
  );

  
  this.containerDiv_.append(this.renderer_.domElement);
  

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
  this.lightGroup_ = new THREE.Object3D();
  this.lightGroup_.name = "LightGroup";
  
  this.ambientLight_ = new THREE.AmbientLight(0x111111);
  this.ambientLight_ .name = "AmbientLight";
  this.lightGroup_.add(this.ambientLight_);

  this.light1_ = new THREE.DirectionalLight( 0xffffff, 1.0 , 40);
  this.light1_ .name = "Light1";
  this.light1_.position.set( 0, 70, -45 );
  this.light1_.target.name = "Light1_target";
  this.lightGroup_.add( this.light1_ );
  this.lightGroup_.add( this.light1_.target );
  
  this.light2_ = new THREE.DirectionalLight( 0xffffff, 0.8 , 40);
  this.light2_ .name = "Light2";
  this.light2_.position.set( -45, -70, 0 );
  this.light2_.target.name = "Light2_target";
  this.lightGroup_.add( this.light2_ );
  this.lightGroup_.add( this.light2_.target );
  
  this.light3_ = new THREE.DirectionalLight( 0xffffff, 1.3 , 40);
  this.light3_ .name = "Light3";
  this.light3_.position.set( 45, 0, 45 );
  this.light3_.target.name = "Light3_target";
  this.lightGroup_.add( this.light3_ );
  this.lightGroup_.add( this.light3_.target );
  
  this.scene_.add( this.lightGroup_ );
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
  this.renderer_ = new THREE.WebGLRenderer({ antialias: false });
  this.renderer_.domElement.id='wbGLrenderer';
  $(this.renderer_.domElement).attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');

/*
  this.renderer_.shadowCameraNear = 3;
  this.renderer_.shadowCameraFar = 300;
  this.renderer_.shadowCameraFov = 30;
  this.renderer_.shadowMapBias = 0.0039;
  this.renderer_.shadowMapDarkness = 1;
  this.renderer_.shadowMapWidth = 1024;
  this.renderer_.shadowMapHeight = 1024;
  this.renderer_.shadowMapEnabled = true;
  this.renderer_.shadowMapSoft = false;
*/

  this.renderEvent_ = new lgb.events.Event (e.RenderNotify);

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
  

  this.listen(e.AddToWorldRequest, this.onAddToWorldRequest_);
  
    
  this.listen(
      e.LayoutChange, 
      this.onLayoutChange_);
};

lgb.controller.WorldController.prototype.onLayoutChange_ = function(event) {
  this.calculateSize_();
};

/**
 * Handles an event fired by View classes
 * @private
 * @param {lgb.events.Event} event The event that tells us
 * the Object3D that the event target would like to load.
 */
lgb.controller.WorldController.prototype.onAddToWorldRequest_ = function(event) {
  var obj = event.payload;

  if ('' == obj.name) {
    throw ('Please name the THREE.Object3D before ' +
    'you request to add it to the scene.');
  } else {
    lgb.logInfo('adding to scene: ' + obj.name);
  }

  this.scene_.add(obj);
};


/**
 * sets the canvas size based on the window size
 * @private
 */
lgb.controller.WorldController.prototype.calculateSize_ = function() {
    
   // var container = $(lgb.Config.HUD_CONTAINER);
    
    var w = this.containerDiv_.width();
    var h = this.containerDiv_.height();
    
    this.renderer_.setSize(w,h);

};


/**
 * platform specific render function for unknown browser
 * @private
 * @param {number} timestamp A timestamp.
 */
lgb.controller.WorldController.prototype.onRenderOReq_ = function(timestamp) {
  window.oRequestAnimationFrame(mainController.worldController_.onRenderOReq_);
  mainController.worldController_.renderHelper(timestamp);
};


/**
 * platform specific render function for mozilla browser
 * @private
 * @param {number} timestamp A timestamp.
 */
lgb.controller.WorldController.prototype.onRenderMoz_ = function(timestamp) {

  window.mozRequestAnimationFrame(mainController.worldController_.onRenderMoz_);
  mainController.worldController_.renderHelper(timestamp);
};


/**
 * platform specific render function for chrome browser
 * @private
 * @param {number} timestamp A timestamp.
 */
lgb.controller.WorldController.prototype.onRenderWebkit_ = function(timestamp) {

  window.webkitRequestAnimationFrame(
      mainController.worldController_.onRenderWebkit_
    );

  mainController.worldController_.renderHelper(timestamp);
};


/**
 * platform specific render function for misc browser
 * untested.
 * @private
 * @param {number} timestamp A timestamp.
 */
lgb.controller.WorldController.prototype.onRenderMisc_ = function(timestamp) {

  window.requestAnimationFrame(mainController.worldController_.onRenderMisc_);
  mainController.worldController_.renderHelper(timestamp);
};


/**
 * platform independant render function
 * I made this 'public' in an effort to optimize the render loop.
 * @param {number} timestamp A timestamp.
 */
lgb.controller.WorldController.prototype.renderHelper = function(timestamp) {
  //TODO (Raj): further optimze the render loop removing the Tween stuff.

  var currentTimeStamp = timestamp;
  var delta = 0;

  if (this.timestamp != 0) {
    delta = currentTimeStamp - this.timestamp;
  }

  this.timestamp = currentTimeStamp;
  createjs.Tween.tick(delta, false);
  

  //THREE.AnimationHandler.update( 1/60 );
  this.renderEvent_.payload = timestamp;

  goog.events.dispatchEvent(lgb.globalEventBus, this.renderEvent_);
  this.renderer_.render(this.scene_, this.camera_);

};
