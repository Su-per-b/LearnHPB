/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.RoofTopView');


goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.vo.ViewpointNode');


/**
 * MVC View for the RoofTop Unit
 * @constructor
 * @extendslgb.view.BaseView3dScene
 * @param {lgb.model.RoofTopModel} dataModel The data model to display.
 */
lgb.view.RoofTopView = function(dataModel) {
    
  this._ASSETS_FOLDER = 'rooftop';
  this._TITLE = 'RoofTop';
 lgb.view.BaseView3dScene.call(this, dataModel);

};
goog.inherits(lgb.view.RoofTopView,lgb.view.BaseView3dScene);



/**
 * Event handler called by the base class when the scene is loaded
 * @private
 */
lgb.view.RoofTopView.prototype.onSceneLoaded_ = function(result) {

   this.masterGroup_.viewpoint = "RoofTopScene";
  
   this.dispatchSelectableLoaded_();
   this.dispatchViewpointNodes_();
   this.dispatchVisibilityNodes_();
};




lgb.view.RoofTopView.prototype.dispatchSelectableLoaded_ = function() {
  
  var selectableMap = {
    "Damper - Center" : true,
    "Damper - Left": true,
    "Damper - Top": true,
    "Fan - Right": true,
    "Fan - Left": true,
    "Ducting": false,
    "Cooling Coil": true,
    "Heating Coil": true,
    "Filter": true
  };
  
  var airHandlerCenterList = this.masterGroup_.children[1].children
  
  var selectableList = [];
  
  var len = airHandlerCenterList.length;
  
  for (var i = 0; i < len; i++) {
    var mesh = airHandlerCenterList[i];
    if (true == selectableMap[mesh.name]) {
      selectableList.push(mesh);
    }
  }
  
  if (selectableList.length > 0) {
     this.triggerLocal(e.SelectableLoaded, selectableList);
  }
  

};

lgb.view.RoofTopView.prototype.dispatchVisibilityNodes_ = function() {
  var node = new lgb.model.vo.VisibilityNode(this._TITLE, this.masterGroup_, 2 );
  this.triggerLocal(e.VisibilityNodesLoaded, node);
};


lgb.view.RoofTopView.prototype.dispatchViewpointNodes_ = function() {
  var node = new lgb.model.vo.ViewpointNode.makeFromObject3D( this.masterGroup_, 2 );
  this.triggerLocal(e.ViewpointNodesLoaded, node);
};


