/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.input.VisibilityGUI');

goog.require('lgb.world.model.VisibilityModel');
goog.require('lgb.gui.view.BaseGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TreeH');
goog.require('lgb.component.TreeDataSourceH');
goog.require('lgb.core.Config');

/**
 * @constructor
 * @param {lgb.world.model.VisibilityModel} dataModel The data model to display.
 * @extends {lgb.gui.view.BaseGUI}
 */
lgb.world.view.input.VisibilityGUI = function(dataModel) {

  this._TITLE = "Visibility";
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
  this.listenForChange_('addNode');
  this.listenForChange_('init');
  this.listenForChange_('changedItems');
  
  
};
goog.inherits(lgb.world.view.input.VisibilityGUI, lgb.gui.view.BaseGUI);



lgb.world.view.input.VisibilityGUI.prototype.onChange_addNode_ = function(visibilityNode) {
    this.treeDS_.update(visibilityNode);
};

lgb.world.view.input.VisibilityGUI.prototype.onChange_init_ = function(visibilityNode) {
  this.init_(visibilityNode);
};

lgb.world.view.input.VisibilityGUI.prototype.onChange_changedItems_ = function(changedItems) {
  this.requestDataModelChange("changedItems", changedItems);
};


/**
 * Initializes the View
 */

lgb.world.view.input.VisibilityGUI.prototype.init_ = function(visibilityNode) {
  
  this.treeDS_ = new lgb.component.TreeDataSourceH(visibilityNode,'isVisible',this.htmlID,  'tree', 'Visibility');

  this.treeDS_.setOptions (
    {
      events : {mouseOver:false}
    }
  );
  
  this.listenTo(
    this.treeDS_,
    e.DataModelChangedEx,
    this.onTreeDS_DataModelChangedEx_);
    
    
  this.treeComponent_ = new lgb.component.TreeH(this.treeDS_);
  
  var treeElement = this.treeComponent_.getHtml();
  this.append(treeElement);
  

   
};



lgb.world.view.input.VisibilityGUI.prototype.onTreeDS_DataModelChangedEx_ = function(event) {
 
   this.requestDataModelChange("changeVisibility", event.payload.changedItems);
};


lgb.world.view.input.VisibilityGUI.prototype.onChangeDataSource_ = function(event) {
    this.triggerLocal(e.RequestDataModelChange, event.payload);
};



