/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ViewPointGUI');

goog.require('lgb.model.ViewPointModel');
goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.ViewPointGUI = function(dataModel) {
  
  this._TITLE = "Viewpoints";
  this.layoutID = lgb.Config.LAYOUT_ID.ViewPoints;
  
  lgb.view.BaseViewGUI.call(this, dataModel, 'ViewPointGUI');
};
goog.inherits(lgb.view.ViewPointGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.ViewPointGUI.prototype.init = function() {
  
  var el = this.getMainElement();
  
  this.kendoTreeView_ =        
      el.kendoTreeView().data("kendoTreeView");
        
  
  this.kendoTreeView_.setDataSource(this.dataModel.kendoDS);
  this.bind_();
  
  this.triggerLocal(e.RequestAddToBasicInput, this);
};



/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.ViewPointGUI.prototype.bind_ = function() {
    
    
  this.kendoTreeView_.bind("select", this.d(this.onSelect_));
  
  this.kendoTreeView_.wrapper.on
      ( "mouseenter.kendoTreeView", ".k-in", this.d(this.onMouseEnter_));
  
  
  this.kendoTreeView_.wrapper.on
      ( "mouseleave.kendoTreeView", ".k-in", this.d(this.onMouseLeave_));


};




lgb.view.ViewPointGUI.prototype.onMouseEnter_ = function(event) {

  var liElement = event.currentTarget.parentElement.parentElement;
  var dataItem = this.kendoTreeView_.dataItem(liElement);
  var viewPointNode = this.dataModel.getViewPoint(dataItem.value);
  this.fireShowViewPoint(viewPointNode, true);

};

lgb.view.ViewPointGUI.prototype.onMouseLeave_ = function(event) {

  var liElement = event.currentTarget.parentElement.parentElement;
  var dataItem = this.kendoTreeView_.dataItem(liElement);
  var viewPointNode = this.dataModel.getViewPoint(dataItem.value);
  this.fireShowViewPoint(viewPointNode, false);

};

lgb.view.ViewPointGUI.prototype.fireShowViewPoint = function(viewPointNode, isVisible) {

  
  if (null != viewPointNode) {
    
    if (viewPointNode.parent.name =="Zones") {
      
      viewPointNode.isVisible = isVisible;
      
      this.triggerLocal(e.RequestShowViewPoint, viewPointNode);
      
    }
  }

};


lgb.view.ViewPointGUI.prototype.onSelect_ = function(event) {

  var selectedNode = event.node;
  var dataItem = this.kendoTreeView_.dataItem(selectedNode);
  var viewPointNode = this.dataModel.getViewPoint(dataItem.value);
                
  if (null != viewPointNode) {
    this.triggerLocal(e.RequestGoToViewPoint, viewPointNode);
  }


};


