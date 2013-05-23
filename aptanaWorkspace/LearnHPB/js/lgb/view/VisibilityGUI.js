/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.VisibilityGUI');

goog.require('lgb.events.RequestVisibilityChange');

goog.require('lgb.model.VisibilityModel');
goog.require('lgb.view.BaseViewGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.TreeH');
goog.require('lgb.component.TreeDataSourceH');

/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.VisibilityGUI = function(dataModel) {


  lgb.view.BaseViewGUI.call(this, dataModel,'VisibilityGUI', 'leftpanel-tabStrip-3');

  
};
goog.inherits(lgb.view.VisibilityGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.VisibilityGUI.prototype.init = function() {
  
  this.treeComponent_ = null;
  this.treeDS_ = null;
  
  this.treeDSlist_ = [];
  this.injectHtml();
  

};

lgb.view.VisibilityGUI.prototype.init2_ = function(lgbNode) {
  
  this.treeDS_ = new lgb.component.TreeDataSourceH(lgbNode,'isVisible',this.htmlID,  'tree');
    
  this.listenTo(this.treeDS_,
    lgb.events.DataSourceChanged.TYPE,
    this.onChangeDataSource_);  
    
  this.treeComponent_ = new lgb.component.Tree(this.treeDS_);
    var element = this.treeComponent_.makeElement();
    this.append(element);   
    
}

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
    
   // var deferred = $.Deferred();
    
    
    
    
    var e = new lgb.events.RequestDataModelChange(event.payload);
    this.dispatchLocal(e);
    
    
    //deferred.notify(e);
  
  
  
    
    
  //  return;
    


    
};




/**
 * injects the html into the DOM
 */
lgb.view.VisibilityGUI.prototype.injectHtml = function() {
  
  this.mainDiv_ = this.makeMainElement_();
  


};
