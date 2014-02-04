/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.view.SceneView');

goog.require('goog.userAgent');
goog.require('lgb.core.ThreeUtils');
goog.require('lgb.world.view.BaseWorldView');



/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {test.world.model.EnvelopeModel} dataModel The model to display.
 */
test.world.view.SceneView = function(dataModel, assetFolder, fileName) {
    

  this._ASSETS_FOLDER = assetFolder;
  this._TITLE = 'SceneView';
  
  this.filename = fileName;
  
  lgb.world.view.BaseWorldView.call(this, dataModel);
};

goog.inherits(test.world.view.SceneView, lgb.world.view.BaseWorldView);



test.world.view.SceneView.prototype.onSceneLoaded_ = function() {
  
    this.addAlltoMasterGroup_();

    var camList = [];
    var nodeList = [];
    var nodeListCeiling = [];
    
    for (var camName in this.cameras_) {
      
      if (undefined !== camName) {
        
          var theCamera = this.cameras_[camName];
          
          theCamera.position.add(this.scene_.position);
          theCamera.target.add(this.scene_.position);
          
          theCamera.name = camName;
          camList.push(theCamera);
          
          var node = new lgb.world.model.vo.ViewpointNode.makeFromCamera(theCamera);
          nodeList.push(node);
      }
    }
    
    
    
  if ( nodeList.length > 0 ) {
    
    var viewpointNode = new lgb.world.model.vo.ViewpointNode.makeFromArray (this._TITLE, nodeList, 1 );
    this.triggerLocal(e.ViewpointNodesLoaded, viewpointNode);
  
    var defaultNode = nodeList[0];
    defaultNode.metersPerSecondPosition = 64;
    
    
    defaultNode.updateWorldPositions();
    
    this.triggerLocal(e.RequestGoToViewpointNode, defaultNode);
    
  }
  
  
  
  return;
};











