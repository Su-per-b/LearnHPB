/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.PsMasterGUI');

goog.require('lgb.view.BaseView');
goog.require('lgb.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {lgb.view.BaseView}
 * @param {lgb.model.LightingModel} dataModel The model to display.
 */
lgb.view.PsMasterGUI = function(dataModel) {

  this._NAME = 'lgb.view.ViewPointGUI';
  
  lgb.view.BaseView.call(this, dataModel, 'ViewPointGUI');
};
goog.inherits(lgb.view.PsMasterGUI, lgb.view.BaseView);



/**
 * Initializes the View
 */
lgb.view.PsMasterGUI.prototype.init = function() {
  this.injectHtml();
  this.bind_();
};



/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.PsMasterGUI.prototype.bind_ = function() {
    
    this.kendoTreeView_.bind("select", this.d(this.onSelect_))
};



lgb.view.PsMasterGUI.prototype.onSelect_ = function(event) {

  var selectedNode = event.node;
  var dataItem = this.kendoTreeView_.dataItem(selectedNode);
  
  
/*
  var viewPointNode = this.dataModel.getViewPoint(dataItem.value);
  
  if (null != viewPointNode) {
    this.dispatchLocal(new lgb.events.RequestGoToViewPoint(viewPointNode));
  }*/


};



/**
 * injects the html into the DOM
 */
lgb.view.PsMasterGUI.prototype.injectHtml = function() {


    var mainDiv = this.makeMainDiv();
    this.append(mainDiv);
    
    this.kendoTreeView_ =        
        mainDiv.kendoTreeView({
            dataSource: this.dataModel.kendoDS,
            
            select: this.d(this.onSelect_),
        }).data("kendoTreeView");

};


