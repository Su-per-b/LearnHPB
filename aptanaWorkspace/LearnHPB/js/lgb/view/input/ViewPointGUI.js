/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.ViewPointGUI');

goog.require('lgb.model.ViewPointModel');
goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.input.ViewPointGUI = function(dataModel) {
  
  this._TITLE = "Viewpoints";
  this.layoutID = lgb.Config.LAYOUT_ID.ViewPoints;
  
  lgb.view.input.BaseViewGUI.call(this, dataModel, 'ViewPointGUI');
  

};
goog.inherits(lgb.view.input.ViewPointGUI, lgb.view.input.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.ViewPointGUI.prototype.init = function() {
  
  this.treeComponent_ = null;
  this.treeDS_ = null;
  
  this.treeDSlist_ = [];
  this.listenForChange_('viewPointNode');
};



lgb.view.input.ViewPointGUI.prototype.bind_ = function() {
  
  this.listenTo(
    this.treeComponent_,
    e.Select,
    this.onSelect_
  );
  
  this.listenTo(
    this.treeComponent_,
    e.SetFocus,
    this.onSetFocus_
  );  
  
  this.listenTo(
    this.treeComponent_,
    e.RemoveFocus,
    this.onRemoveFocus_
  );  
  

};




lgb.view.input.ViewPointGUI.prototype.onChange_viewPointNode_ = function(viewPointNode) {
  
  if (this.treeDS_ == null) {
    this.init2_(viewPointNode);
  } else {
    this.treeDS_.update(viewPointNode);
  }

};



lgb.view.input.ViewPointGUI.prototype.onSetFocus_ = function(event) {

  var kNode = event.payload;
  var viewPointNode = this.dataModel.getViewPoint(kNode);
                
  if (null != viewPointNode) {
    
     this.fireShowViewPoint(viewPointNode, true);
    
  }
};


lgb.view.input.ViewPointGUI.prototype.onRemoveFocus_ = function(event) {

  var kNode = event.payload;
  var viewPointNode = this.dataModel.getViewPoint(kNode);
                
  if (null != viewPointNode) {
     this.fireShowViewPoint(viewPointNode, false);
  }
};



lgb.view.input.ViewPointGUI.prototype.onSelect_ = function(event) {

  var kNode = event.payload;
  var viewPointNode = this.dataModel.getViewPoint(kNode);
  
  if (null == viewPointNode) {
    
    debugger;
    
  } else {
    
    viewPointNode.updateWorldPositions();
                  
    if (null != viewPointNode) {
      this.triggerLocal(e.RequestGoToViewPointNode, viewPointNode);
    }
  }
  


};

lgb.view.input.ViewPointGUI.prototype.init2_ = function(viewPointNode) {
  
  this.treeDS_ = new lgb.component.TreeDataSourceH(viewPointNode, null, this.htmlID,  'tree', 'ViewPointTreeDataSourceH');
  
  var options =  (
    {
      events : {mouseOver:true}
    }
  );
  
  this.treeDS_.setOptions(options);
  this.treeComponent_ = new lgb.component.TreeH(this.treeDS_);
  
  var treeElement = this.treeComponent_.getHtml();
  this.append(treeElement);
  
  this.bind_();
  this.triggerLocal(e.RequestAddToTestingInput, this);
   
  
};




lgb.view.input.ViewPointGUI.prototype.fireShowViewPoint = function(viewPointNode, isVisible) {

  
  if (null != viewPointNode && null != viewPointNode.parent) {
    
    if (viewPointNode.parent.title =="Zones") {
      
      viewPointNode.isVisible = isVisible;
      
      this.triggerLocal(e.RequestShowViewPoint, viewPointNode);
      
    }
  }

};
