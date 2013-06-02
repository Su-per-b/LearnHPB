/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.PsMasterGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.PsModelMaster');




goog.require('lgb.component.Tree');
goog.require('lgb.component.TreeDataSource');
goog.require('lgb.Config');


/**
 * @constructor
 * @extends {lgb.view.BaseViewGUI}
 * @param {lgb.model.LightingModel} dataModel The model to display.
 */
lgb.view.PsMasterGUI = function(dataModel) {

  this._TITLE = 'Airflow';
  this.layoutID = lgb.Config.LAYOUT_ID.Airflow;
  
  lgb.view.BaseViewGUI.call(this, dataModel, 'PsMasterGUI');
};
goog.inherits(lgb.view.PsMasterGUI, lgb.view.BaseViewGUI);

/**
 * Initializes the View
 */
lgb.view.PsMasterGUI.prototype.init = function() {
  
  
    var list = this.dataModel.getPsModelList();
    
    this.treeActiveDS = new lgb.component.TreeDataSource(list,'isStarted',
      'Active Systems',  this.htmlID, 'active-systems');
      
      
    this.treeBoxesDS = new lgb.component.TreeDataSource(list,'showBoxes',
      'Show Boxes',  this.htmlID, 'show-boxes');
      
      
    this.treeCurvesDS = new lgb.component.TreeDataSource(list,'showCurves',
      'Show Curves',  this.htmlID, 'show-curves');
      
      
    this.bind_();
    
    this.injectHtml();
    
    this.triggerLocal(e.RequestAddToGUI, this);
  
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.PsMasterGUI.prototype.bind_ = function() {


  this.listenTo(this.treeActiveDS,
    e.DataSourceChanged,
    this.onChangeDataSource_);  
    
  this.listenTo(this.treeBoxesDS,
    e.DataSourceChanged,
    this.onChangeDataSource_);
    
  this.listenTo(this.treeCurvesDS,
    e.DataSourceChanged,
    this.onChangeDataSource_);
    
};


lgb.view.PsMasterGUI.prototype.onChangeDataSource_ = function(event) {

    this.triggerLocal(e.RequestDataModelChange, event.payload);
};



/**
 * injects the html into the DOM
 */
lgb.view.PsMasterGUI.prototype.injectHtml = function() {


  this.treeActive = new lgb.component.Tree(this.treeActiveDS);
  var element = this.treeActive.makeElement();
  this.append(element);

  this.treeBoxes = new lgb.component.Tree(this.treeBoxesDS);
  var element = this.treeBoxes.makeElement();
  this.append(element);

  this.treeCurves = new lgb.component.Tree(this.treeCurvesDS);
  var element = this.treeCurves.makeElement();
  this.append(element);

};

