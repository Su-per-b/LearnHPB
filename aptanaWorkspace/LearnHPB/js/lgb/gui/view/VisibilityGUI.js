/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.VisibilityGUI');

goog.require('lgb.model.VisibilityModel');
goog.require('lgb.gui.view.BaseViewGUI');

goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.component.TreeH');
goog.require('lgb.component.TreeDataSourceH');
goog.require('lgb.Config');

/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @extends {lgb.gui.view.BaseViewGUI}
 */
lgb.view.input.VisibilityGUI = function(dataModel) {

  this._TITLE = "Visibility";
  lgb.gui.view.BaseViewGUI.call(this, dataModel);
  
  this.listenForChange_('addNode');
  this.listenForChange_('init');
  this.listenForChange_('changedItems');
  
  
};
goog.inherits(lgb.view.input.VisibilityGUI, lgb.gui.view.BaseViewGUI);



lgb.view.input.VisibilityGUI.prototype.onChange_addNode_ = function(visibilityNode) {
    this.treeDS_.update(visibilityNode);
};

lgb.view.input.VisibilityGUI.prototype.onChange_init_ = function(visibilityNode) {
  this.init_(visibilityNode);
};

lgb.view.input.VisibilityGUI.prototype.onChange_changedItems_ = function(changedItems) {
  this.requestDataModelChange("changedItems", changedItems);
};


/**
 * Initializes the View
 */

lgb.view.input.VisibilityGUI.prototype.init_ = function(visibilityNode) {
  
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
  
  this.triggerLocal(e.RequestAddToTestingInput, this);
   
};



lgb.view.input.VisibilityGUI.prototype.onTreeDS_DataModelChangedEx_ = function(event) {
 
   this.requestDataModelChange("changeVisibility", event.payload.changedItems);
};


lgb.view.input.VisibilityGUI.prototype.onChangeDataSource_ = function(event) {
    this.triggerLocal(e.RequestDataModelChange, event.payload);
};



