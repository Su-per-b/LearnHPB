/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.RoofTopView');


goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.vo.ViewPointNode');


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
    

  //for (var i = this.scene_.children.length - 1; i >= 0; i--) {
    
     // var mesh = this.scene_.children.pop();
      //this.masterGroup_.add(mesh);
      
      //TODO:(Raj) make the selectable loaded event work with an array
     // var event = new lgb.events.SelectableLoaded(mesh);
     // this.dispatchLocal(event);
  //}
  this.masterGroup_.viewpoint = "RoofTopScene";
  
   this.sceneY_ = this.masterGroup_.position.y;
   this.setY_();
  
   this.dispatchViewPointNodes_();
   this.dispatchVisibilityNodes_();
};



lgb.view.RoofTopView.prototype.dispatchVisibilityNodes_ = function() {

  var node = new lgb.model.vo.VisibilityNode(this._TITLE, this.masterGroup_, 2 );
  this.triggerLocal(e.VisibilityNodesLoaded, node);
  
  return;
};


lgb.view.RoofTopView.prototype.dispatchViewPointNodes_ = function() {

  var node = new lgb.model.vo.ViewPointNode(this._TITLE, this.masterGroup_, 2 );
  this.triggerLocal(e.ViewPointNodesLoaded, node);
};


/**
 * @override
 * @param {lgb.events.Event} event The event
 * notifying us of a change.
 * @protected
 */
lgb.view.RoofTopView.prototype.onChange = function(event) {
  this.updateAllFromModel_();
};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.RoofTopView.prototype.updateAllFromModel_ = function() {
  this.updateVisible_();
};


lgb.view.RoofTopView.prototype.setBuildingHeight = function(buildingHeightModel) {

  this.topFloorMaxY_ = buildingHeightModel.topFloorMaxY;
  this.setY_();
};


/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.RoofTopView.prototype.updateVisible_ = function() {
    
  if (this.masterGroup_ && this.masterGroup_.children) {
      var m = this.masterGroup_.children.length;
    
      for (var i = 0; i < m; i++) {
        this.masterGroup_.children[i].visible = this.dataModel.isVisible;
      }  
  }

};


lgb.view.RoofTopView.prototype.setY_ = function() {

  if (null != this.topFloorMaxY_ && null != this.sceneY_) {
    this.masterGroup_.position.y = this.topFloorMaxY_ + this.sceneY_;
  }

};
