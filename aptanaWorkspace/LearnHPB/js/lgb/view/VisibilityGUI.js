/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.VisibilityGUI');

goog.require('lgb.component.Link');
goog.require('lgb.component.LinkDataSource');

goog.require('lgb.events.MouseClick');
goog.require('lgb.events.MouseOut');
goog.require('lgb.events.MouseOver');

goog.require('lgb.events.RequestVisibilityChange');


goog.require('lgb.model.VisibilityModel');
goog.require('lgb.view.BaseViewGUI');


/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.VisibilityGUI = function(dataModel) {

  this._NAME = 'lgb.view.VisibilityGUI';
  lgb.view.BaseViewGUI.call(this, dataModel,'VisibilityGUI', 'leftpanel-tabStrip-3');
};
goog.inherits(lgb.view.VisibilityGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.VisibilityGUI.prototype.init = function() {
  this.injectHtml();
  

    var list = this.dataModel.getPsModelList();
    
    this.treeDS_ = new lgb.component.TreeDataSource(list,'isStarted',
      'Active Systems',  this.htmlID, 'active-systems');
      
      

  this.kendoTreeView_.setDataSource(this.dataModel.kendoDS);
  this.bind_();
};



lgb.view.VisibilityGUI.prototype.onDataBound_ = function(event) {
  this.bind_();
  
}




lgb.view.VisibilityGUI.prototype.onMouseEnter_ = function(event) {

  var liElement = event.currentTarget.parentElement.parentElement;
  var dataItem = this.kendoTreeView_.dataItem(liElement);
  var VisibilityNode = this.dataModel.getVisibility(dataItem.value);
  this.fireShowVisibility(VisibilityNode, true);

};

lgb.view.VisibilityGUI.prototype.onMouseLeave_ = function(event) {

  var liElement = event.currentTarget.parentElement.parentElement;
  var dataItem = this.kendoTreeView_.dataItem(liElement);
  var VisibilityNode = this.dataModel.getVisibility(dataItem.value);
  this.fireShowVisibility(VisibilityNode, false);

};

lgb.view.VisibilityGUI.prototype.fireShowVisibility = function(VisibilityNode, isVisible) {



  
  if (null != VisibilityNode) {
    
    if (VisibilityNode.parent.name =="Zones") {
      
      VisibilityNode.isVisible = isVisible;
      this.dispatchLocal(new lgb.events.RequestShowVisibility(VisibilityNode));
      
    }
  }

};


lgb.view.VisibilityGUI.prototype.onSelect_ = function(event) {

  var selectedNode = event.node;
  var dataItem = this.kendoTreeView_.dataItem(selectedNode);
  var VisibilityNode = this.dataModel.getVisibility(dataItem.value);
                
  if (null != VisibilityNode) {
    this.dispatchLocal(new lgb.events.RequestGoToVisibility(VisibilityNode));
  }


};



/**
 * injects the html into the DOM
 */
lgb.view.VisibilityGUI.prototype.injectHtml = function() {

  this.mainDiv_ = this.makeMainDiv();
  
  this.treeActive = new lgb.component.Tree(this.treeDS_);
  var element = this.treeActive.makeElement();
  this.append(element);

};
