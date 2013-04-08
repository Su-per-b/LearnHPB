/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ViewPointView');

goog.require('goog.userAgent');
goog.require('lgb.ThreeUtils');
goog.require('lgb.events.CamerasLoaded');
goog.require('lgb.events.ViewInitialized');
goog.require('lgb.view.ViewBase');
goog.require('lgb.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.EnvelopeModel} dataModel The model to display.
 */
lgb.view.ViewPointView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  /**@const */
  this._NAME = 'lgb.view.ViewPointView';
  this._ASSETS_FOLDER = 'viewpoints';
  this.topFloorMinY_ = null;
  this.sceneY_ = null;
  
};
goog.inherits(lgb.view.ViewPointView, lgb.view.ViewBase);



/**
 * Initiates the loading of the scene
 * @param {string} the folder name form which to load the 'scene.json' file
 * @protected
 */
lgb.view.ViewPointView.prototype.loadSceneFromFolder_ = function(folderName) {

  var path = lgb.Config.ASSETS_BASE_PATH + folderName + '/' + this.filename;
  this.loader_ = new THREE.SceneLoaderEx();
  this.loader_.load(path, this.d(this.onSceneLoaded_));
};


lgb.view.ViewPointView.prototype.setBuildingHeight = function(buildingHeightModel) {
   
  this.topFloorMinY_ = buildingHeightModel.topFloorMinY;
  this.setY_();
};


lgb.view.ViewPointView.prototype.setY_ = function() {
    
  if (this.topFloorMinY_ && this.sceneY_ != null) {
      this.masterGroup_.position.y = this.topFloorMinY_ + this.sceneY_;
  }
  
};


lgb.view.LightingView.prototype.onChange = function(event) {
  
  var whatIsDirty = event.payload;
  
  if (whatIsDirty) {
    
    if (whatIsDirty.lightingType) {
      this.buildGrid_();
      this.updateVisible_();
    }
    if (whatIsDirty.isVisible) {
      this.updateVisible_();
    }
    
  } else {
    
    this.updateVisible_();
  }

};


/**
 * Event handler called by the base class when the scene is loaded
 * @private
 */
lgb.view.ViewPointView.prototype.onSceneLoaded_ = function(result) {
  
  
  return;
  
  
  var scene = result['scene'];
  var cameras = result['cameras'];
  var camMap = {};
  
  for (var camName in cameras) {
    
    if (undefined !== camName) {
      
        var theCamera = cameras[camName];
        
        theCamera.position.addSelf(scene.position);
        theCamera.target.addSelf(scene.position);
        
        theCamera.name = camName;
        camMap[camName] = theCamera;
    }

  }
  

  if (cameras !== undefined) {
    var e = new lgb.events.CamerasLoaded( cameras);
    this.dispatchLocal(e);
  }
  
  delete this.loader_;
  this.dispatchLocal(new lgb.events.ViewInitialized());
  
};












