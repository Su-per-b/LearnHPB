/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.RoofTopView');


goog.require('lgb.world.view.BaseWorldView');
goog.require('lgb.world.model.vo.ViewpointNode');


/**
 * MVC View for the RoofTop Unit
 * @constructor
 * @extends lgb.world.view.BaseWorldView
 * @param {lgb.world.model.RoofTopModel} dataModel The data model to display.
 */
lgb.world.view.RoofTopView = function(dataModel) {
    
  this._ASSETS_FOLDER = 'rooftop';
  this._TITLE = 'RoofTop';
 lgb.world.view.BaseWorldView.call(this, dataModel);

};
goog.inherits(lgb.world.view.RoofTopView,lgb.world.view.BaseWorldView);



/**
 * Event handler called by the base class when the scene is loaded
 * @private
 */
lgb.world.view.RoofTopView.prototype.onSceneLoaded_ = function(result) {

   this.masterGroup_.viewpoint = "RoofTopScene";
   var dim = this.masterGroup_.getDimensions();
    
   this.dispatchSelectableLoaded_();
   this.dispatchViewpointNodes_();
   this.dispatchVisibilityNodes_();
};




lgb.world.view.RoofTopView.prototype.dispatchSelectableLoaded_ = function() {
  
  this.selectableMap_ = {
    "Damper - Center" : true,
    "Damper - Left": true,
    "Damper - Top": true,
    "Fan - Right": true,
    "Fan - Left": true,
    "Ducting": false,
    "Cooling Coil": true,
    "Heating Coil": true,
    "Filter": true,
    "Boiler": true,
    "Chiller": true,
    "Cooler": true,
    "Pipeing Connectors": false
  };
  
  var airHandlerCenterList = this.masterGroup_.children[1].children;
  var otherList = this.masterGroup_.children[4].children;
  
  this.selectableList_ = [];
  
  this.each(airHandlerCenterList, this.addSelectable);
  this.each(otherList, this.addSelectable);
  
  if (this.selectableList_.length > 0) {
     this.triggerLocal(e.SelectableLoaded, this.selectableList_);
  }
  
};


lgb.world.view.RoofTopView.prototype.addSelectable = function(mesh) {
    if (true == this.selectableMap_[mesh.name]) {
      this.selectableList_.push(mesh);
    }
};


lgb.world.view.RoofTopView.prototype.dispatchVisibilityNodes_ = function() {
  var node = new lgb.world.model.vo.VisibilityNode(this._TITLE, this.masterGroup_, 2 );
  this.triggerLocal(e.VisibilityNodesLoaded, node);
};


lgb.world.view.RoofTopView.prototype.dispatchViewpointNodes_ = function() {
  var node = new lgb.world.model.vo.ViewpointNode.makeFromObject3D( this.masterGroup_, 2 );
  this.triggerLocal(e.ViewpointNodesLoaded, node);
};


