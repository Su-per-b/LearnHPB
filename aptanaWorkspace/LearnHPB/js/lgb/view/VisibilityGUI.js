/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.VisibilityGUI');



goog.require('lgb.model.VisibilityModel');
goog.require('lgb.view.BaseViewGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.TreeH');
goog.require('lgb.component.TreeDataSourceH');
goog.require('lgb.Config');

/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.VisibilityGUI = function(dataModel) {

  this._TITLE = "Visibility";
  this.layoutID = lgb.Config.LAYOUT_ID.Visibility;
  lgb.view.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.VisibilityGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.VisibilityGUI.prototype.init = function() {
  
  this.treeComponent_ = null;
  this.treeDS_ = null;
  
  this.treeDSlist_ = [];

};

lgb.view.VisibilityGUI.prototype.init2_ = function(lgbNode) {
  
  this.treeDS_ = new lgb.component.TreeDataSourceH(lgbNode,'isVisible',this.htmlID,  'tree', 'Visibility');
  
  this.listenTo(this.treeDS_,
    e.DataSourceChanged,
    this.onChangeDataSource_);  
    
  this.treeComponent_ = new lgb.component.TreeH(this.treeDS_);
  var treeElement = this.treeComponent_.getHtml();
  this.append(treeElement);
  this.triggerLocal(e.RequestAddToBasicInput, this);
   
   return;
};


lgb.view.VisibilityGUI.prototype.onChange = function(event) {
  
  var lgbNode = event.payload;
  
  if (this.treeDS_ == null) {
    this.init2_(lgbNode);
  } else {
    
    this.treeDS_.update(lgbNode);
  }


  return;
    
};



lgb.view.VisibilityGUI.prototype.onChangeDataSource_ = function(event) {

    this.triggerLocal(e.RequestDataModelChange, event.payload);
};


