/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ViewPointView');

;


goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.vo.ViewPointNode');



lgb.view.ViewPointView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'viewpoints';
  this._TITLE = 'Custom Viewpoints';
  
  lgb.view.BaseView3dScene.call(this, dataModel);

  
};
goog.inherits(lgb.view.ViewPointView,lgb.view.BaseView3dScene);





lgb.view.ViewPointView.prototype.onSceneLoadedBase_ = function(result) {

  this.scene_ = result['scene'];
  this.groups_ = result['groups'];
  this.cameras_ = result['cameras'];
  this.appData_ = result['appData'];
  this.containers_ = result['containers'];
  
  this.masterGroup_.position = this.scene_.position;
  this.masterGroup_.rotation = this.scene_.rotation;
  this.masterGroup_.scale = this.scene_.scale;
  this.masterGroup_.viewPoint = "defaultScene";

  var c = this.containers_; 
  if (this.containers_ != null) {
    this.placeContainers_();
  }
  

  this.onSceneLoaded_();
  delete this.loader_;
  
  this.triggerLocal(e.ViewInitialized);

};



/**
 * Event handler called by the base class when the scene is loaded
 * @private
 */
lgb.view.ViewPointView.prototype.onSceneLoaded_ = function(result) {

  var camList = [];
  var nodeList = [];
  var nodeListCeiling = [];
  
  for (var camName in this.cameras_) {
    
    if (undefined !== camName) {
      
        var theCamera = this.cameras_[camName];
        
        theCamera.position.addSelf(this.scene_.position);
        theCamera.target.addSelf(this.scene_.position);
        
        theCamera.name = camName;
        camList.push(theCamera);
        
        var node = new lgb.model.vo.ViewPointNode.makeFromCamera(theCamera);
        nodeList.push(node);

    }
  }
  
    var viewPointNode = new lgb.model.vo.ViewPointNode.makeFromArray (this._TITLE, nodeList, 1 );
    this.triggerLocal(e.ViewPointNodesLoaded, viewPointNode);
  
    var defaultNode = nodeList[0];
    defaultNode.updateWorldPositions();
    this.triggerLocal(e.RequestGoToViewPointNode, defaultNode);
};












