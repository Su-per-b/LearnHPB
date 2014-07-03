/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.gui.view.ParticleSystemMasterGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.world.model.BuildingHeightModel');
goog.require('lgb.world.model.ParticleSystemMasterModel');

goog.require('lgb.component.Tree');
goog.require('lgb.component.TreeDataSource');

goog.require('lgb.component.TreeH');
goog.require('lgb.component.TreeDataSourceH');

goog.require('lgb.core.Config');


/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 * @param {lgb.world.model.LightingModel} dataModel The model to display.
 */
lgb.gui.view.ParticleSystemMasterGUI = function(dataModel) {

  this._TITLE = 'Airflow';
  lgb.gui.view.BaseGUI.call(this, dataModel, 'PsMasterGUI');
};
goog.inherits(lgb.gui.view.ParticleSystemMasterGUI, lgb.gui.view.BaseGUI);

/**
 * Initializes the View
 */
lgb.gui.view.ParticleSystemMasterGUI.prototype.init = function() {
  
  
    var list = this.dataModel.getPsModelList();
    
  //  this.treeActiveDS = new lgb.component.TreeDataSourceH(list,'isStarted',
     // 'Active Systems',  this.htmlID, 'active-systems');
      
    this.treeActiveDS = new lgb.component.TreeDataSource(list,'isStarted',
      'Active Systems',  this.htmlID, 'active-systems');
      
    this.treeBoxesDS = new lgb.component.TreeDataSource(list,'showBoxes',
      'Show Boxes',  this.htmlID, 'show-boxes');
      
      
    this.treeCurvesDS = new lgb.component.TreeDataSource(list,'showCurves',
      'Show Curves',  this.htmlID, 'show-curves');
      
      
    this.bind_();
    this.injectHtml();
    
    this.triggerLocal(e.RequestAddToTestingInput, this);
  
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.gui.view.ParticleSystemMasterGUI.prototype.bind_ = function() {


    
  this.listenTo(this.treeActiveDS,
    e.DataModelChangedEx,
    this.onDataModelChangedEx_);  
    
  this.listenTo(this.treeBoxesDS,
    e.DataModelChangedEx,
    this.onDataModelChangedEx_);
    
  this.listenTo(this.treeCurvesDS,
    e.DataModelChangedEx,
    this.onDataModelChangedEx_);
    
};


lgb.gui.view.ParticleSystemMasterGUI.prototype.onDataModelChangedEx_ = function(event) {
  
    var propertyName = event.payload.changedItems.propertyName;
    var changedItem = event.payload.changedItems[0];
    
    var property = {
      idx: changedItem.idx,
      name: propertyName
    };
    
    var newValue = changedItem.isChecked;
    
    this.requestDataModelChange(property, newValue);
};



/**
 * injects the html into the DOM
 */
lgb.gui.view.ParticleSystemMasterGUI.prototype.injectHtml = function() {


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

