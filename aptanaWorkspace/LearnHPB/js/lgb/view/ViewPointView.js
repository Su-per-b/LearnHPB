/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ViewPointView');

;


goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.vo.ViewPointNode');


/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.model.EnvelopeModel} dataModel The model to display.
 */
lgb.view.ViewPointView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'viewpoints';
  this._TITLE = 'Custom Viewpoints';
  
  lgb.view.BaseView3dScene.call(this, dataModel);

  this.topFloorMinY_ = null;
  this.sceneY_ = null;
  
};
goog.inherits(lgb.view.ViewPointView,lgb.view.BaseView3dScene);






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

  var camList = [];
  var nodeList = [];
  
  for (var camName in this.cameras_) {
    
    if (undefined !== camName) {
      
        var theCamera = this.cameras_[camName];
        
        theCamera.position.addSelf(this.scene_.position);
        theCamera.target.addSelf(this.scene_.position);
        
        theCamera.name = camName;

        var node = new lgb.model.vo.ViewPointNode(camName, theCamera, 0 );
        
        camList.push(theCamera);
        nodeList.push(node);
    }
  }
  
  
};












