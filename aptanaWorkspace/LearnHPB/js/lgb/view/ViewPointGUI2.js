/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ViewPointGUI2');

goog.require('lgb.model.ViewPointModel');
goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.ViewPointGUI2 = function(dataModel) {
  
  this._TITLE = "Viewpoints";
  this.layoutID = lgb.Config.LAYOUT_ID.ViewPoints;
  
  lgb.view.BaseViewGUI.call(this, dataModel, 'ViewPointGUI2');
};
goog.inherits(lgb.view.ViewPointGUI2, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.ViewPointGUI2.prototype.init = function() {
  
  this.treeComponent_ = null;
  this.treeDS_ = null;
  
  this.treeDSlist_ = [];
  

    
};




lgb.view.ViewPointGUI2.prototype.bind_ = function() {
  
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
  
  

      
}

lgb.view.ViewPointGUI2.prototype.onSetFocus_ = function(event) {

  var kNode = event.payload;
  var viewPointNode = this.dataModel.getViewPoint(kNode);
                
  if (null != viewPointNode) {
    
     this.fireShowViewPoint(viewPointNode, true);
    
  }
}


lgb.view.ViewPointGUI2.prototype.onRemoveFocus_ = function(event) {

  var kNode = event.payload;
  var viewPointNode = this.dataModel.getViewPoint(kNode);
                
  if (null != viewPointNode) {
     this.fireShowViewPoint(viewPointNode, false);
  }
}



lgb.view.ViewPointGUI2.prototype.onSelect_ = function(event) {

  var kNode = event.payload;
  var viewPointNode = this.dataModel.getViewPoint(kNode);
                
  if (null != viewPointNode) {
    this.triggerLocal(e.RequestGoToViewPointNode, viewPointNode);
  }

};

lgb.view.ViewPointGUI2.prototype.init2_ = function(lgbNode) {
  
  this.treeDS_ = new lgb.component.TreeDataSourceH(lgbNode, null, this.htmlID,  'tree', 'ViewPointGUI2');
  
    
  this.treeComponent_ = new lgb.component.TreeH(this.treeDS_);
  
  var treeElement = this.treeComponent_.getHtml();
  this.append(treeElement);
  
  this.bind_();
  
  this.triggerLocal(e.RequestAddToBasicInput, this);
   
  
};




lgb.view.ViewPointGUI2.prototype.onChange = function(event) {
  
  var lgbNode = event.payload;
  
  if (this.treeDS_ == null) {
    this.init2_(lgbNode);
  } else {
    this.treeDS_.update(lgbNode);
  }


};





lgb.view.ViewPointGUI2.prototype.onChangeDataSource_ = function(event) {

    this.triggerLocal(e.RequestDataModelChange, event.payload);
};



lgb.view.ViewPointGUI2.prototype.fireShowViewPoint = function(viewPointNode, isVisible) {

  
  if (null != viewPointNode && null != viewPointNode.parent) {
    
    if (viewPointNode.parent.title =="Zones") {
      
      viewPointNode.isVisible = isVisible;
      
      this.triggerLocal(e.RequestShowViewPoint, viewPointNode);
      
    }
  }

};
