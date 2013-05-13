/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ViewPointView');

;
goog.require('lgb.events.ViewPointCollectionLoaded');

goog.require('BaseView3dScene');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.ViewPointCollection');


/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.model.EnvelopeModel} dataModel The model to display.
 */
lgb.view.ViewPointView = function(dataModel) {
    
  /**@const */
  this._NAME = 'lgb.view.ViewPointView';
  this._ASSETS_FOLDER = 'viewpoints';
  
  BaseView3dScene.call(this, dataModel);

  this.topFloorMinY_ = null;
  this.sceneY_ = null;
  
};
goog.inherits(lgb.view.ViewPointView, BaseView3dScene);



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
    
  if (null != this.topFloorMinY_ && null != this.sceneY_ ) {
      this.masterGroup_.position.y = this.topFloorMinY_ + this.sceneY_;
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
  
  var camList = [];
  
  for (var camName in cameras) {
    
    if (undefined !== camName) {
      
        var theCamera = cameras[camName];
        
        theCamera.position.addSelf(scene.position);
        theCamera.target.addSelf(scene.position);
        
        theCamera.name = camName;

        camList.push(theCamera);
    }
  }
  
  
  
    var viewPointNodeCollection = new lgb.model.ViewPointCollection("Custom", camList);
        
    var event = new lgb.events.ViewPointCollectionLoaded(viewPointNodeCollection);
    this.dispatchLocal(event);
    
    
  
   return;
  
  

  
};












