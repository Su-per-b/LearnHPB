/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.RenderController');

goog.require('lgb.world.controller.BuildingController');
goog.require('lgb.world.controller.CameraController');
goog.require('lgb.core.BaseController');
goog.require('lgb.world.controller.TrackBallController');
goog.require('lgb.world.controller.UtilityController');
goog.require('lgb.world.controller.WorldSelectionController');

goog.require('lgb.world.model.RenderModel');
goog.require('lgb.gui.view.RenderGUI');
goog.require('lgb.gui.view.StatsView');
goog.require('lgb');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 * @param {Element} containerDiv The DIV to use
 * when we render 3D.
 */
lgb.world.controller.RenderController = function() {
  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.world.controller.RenderController, lgb.core.BaseController);


/**
 * Initializes the RenderController Controller after the document is ready
 */
lgb.world.controller.RenderController.prototype.init = function() {
  
  this.timestamp = 0;
  
  this.dataModel = new lgb.world.model.RenderModel();
  this.view = new lgb.gui.view.RenderGUI(this.dataModel, lgb.core.Config.WEBGL_CONTAINER_DIV_ID);

  this.scene_ = new THREE.Scene();
  this.scene_.name = "mainScene";
  
  this.initRenderer_();
  
  this.view.init(this.renderer_ );
  
  this.bind_();

  this.cameraController_ = new lgb.world.controller.CameraController(
    this.renderer_.domElement
  );

  this.camera_ = this.cameraController_.getCamera();
  this.scene_.add(this.camera_);

  this.initLights_();
  
  this.view.calculateSize();
  this.view.containerDiv_.append(this.renderer_.domElement);
  
};





lgb.world.controller.RenderController.prototype.getCamera = function() {
  
  return  this.camera_;
  
};



/**
 * configures lights and adds them to the scene
 * @private
 */
lgb.world.controller.RenderController.prototype.initLights_ = function() {
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

  this.light1_ = new THREE.DirectionalLight( 0xffffff, 0.5 , 60);
  this.light1_ .name = "Light1";
  this.light1_.position.set( 0, 70, -45 );
  this.light1_.target.name = "Light1_target";
  this.lightGroup_.add( this.light1_ );
  this.lightGroup_.add( this.light1_.target );
  
  this.light2_ = new THREE.DirectionalLight( 0xffffff, 0.6 , 60);
  this.light2_ .name = "Light2";
  this.light2_.position.set( -45, -70, 0 );
  this.light2_.target.name = "Light2_target";
  this.lightGroup_.add( this.light2_ );
  this.lightGroup_.add( this.light2_.target );
  
  this.light3_ = new THREE.DirectionalLight( 0xffffff, 0.8 , 60);
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
lgb.world.controller.RenderController.prototype.initRenderer_ = function() {
  /**
   * @type {THREE.WebGLRenderer}
   * @private
   */
  this.renderer_ = new THREE.WebGLRenderer(
    { antialias: false, 
      alpha:1
      }
    );
  
  
  this.renderer_.domElement.id='wbGLrenderer';
  $(this.renderer_.domElement).attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');

  this.renderEvent_ = new lgb.core.Event (e.RenderNotify);
  
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
lgb.world.controller.RenderController.prototype.bind_ = function() {
  
  this.listen(e.AddToWorldRequest, this.onAddToWorldRequest_);
  this.listen(e.LayoutChange, this.onLayoutChange_);
  
};


lgb.world.controller.RenderController.prototype.onLayoutChange_ = function(event) {
  this.view.calculateSize();
};


/**
 * Handles an event fired by View classes
 * @private
 * @param {lgb.core.Event} event The event that tells us
 * the Object3D that the event target would like to load.
 */
lgb.world.controller.RenderController.prototype.onAddToWorldRequest_ = function(event) {
  var obj = event.payload;

  if ('' == obj.name) {
    lgb.logSevere('Please name the THREE.Object3D before ' +
    'you request to add it to the scene.');
  } else {
    lgb.logInfo('adding to scene: ' + obj.name);
  }

  this.scene_.add(obj);
};



/**
 * platform specific render function for unknown browser
 * @private
 * @param {number} timestamp A timestamp.
 */
lgb.world.controller.RenderController.prototype.onRenderOReq_ = function(timestamp) {
  
  window.oRequestAnimationFrame(window.mainController.renderController_.onRenderOReq_);
  window.mainController.renderController_.renderHelper(timestamp);
  
};


/**
 * platform specific render function for mozilla browser
 * @private
 * @param {number} timestamp A timestamp.
 */
lgb.world.controller.RenderController.prototype.onRenderMoz_ = function(timestamp) {

  window.mozRequestAnimationFrame(window.mainController.renderController_.onRenderMoz_);
  window.mainController.renderController_.renderHelper(timestamp);
};


/**
 * platform specific render function for chrome browser
 * @private
 * @param {number} timestamp A timestamp.
 */
lgb.world.controller.RenderController.prototype.onRenderWebkit_ = function(timestamp) {

  window.webkitRequestAnimationFrame(
      window.mainController.renderController_.onRenderWebkit_
    );

  window.mainController.renderController_.renderHelper(timestamp);
};


/**
 * platform specific render function for misc browser
 * untested.
 * @private
 * @param {number} timestamp A timestamp.
 */
lgb.world.controller.RenderController.prototype.onRenderMisc_ = function(timestamp) {

  window.requestAnimationFrame(window.mainController.renderController_.onRenderMisc_);
  window.mainController.renderController_.renderHelper(timestamp);
};


/**
 * platform independant render function
 * I made this 'public' in an effort to optimize the render loop.
 * @param {number} timestamp A timestamp.
 */
lgb.world.controller.RenderController.prototype.renderHelper = function(timestamp) {
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
