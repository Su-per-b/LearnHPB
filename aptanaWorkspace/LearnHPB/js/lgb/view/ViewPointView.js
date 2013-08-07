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







/**
 * Event handler called by the base class when the scene is loaded
 * @private
 */
lgb.view.ViewPointView.prototype.onSceneLoaded_ = function(result) {

  var camList = [];
  var nodeList = [];
  
  for (var camName in this.cameras_) {
    
    if (undefined !== camName) {
      
        var theCamera = this.cameras_[camName];
        
        theCamera.position.addSelf(this.scene_.position);
        theCamera.target.addSelf(this.scene_.position);
        
        theCamera.name = camName;
        
        camList.push(theCamera);
        this.masterGroup_.add(theCamera);
        nodeList.push(node);
    }
  }
  
    this.requestAddToWorld(this.masterGroup_);
  
    var node = new lgb.model.vo.ViewPointNode(this._TITLE, this.masterGroup_, 1 );
    this.triggerLocal(e.ViewPointNodesLoaded, node);
  

};












