/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.chart.controller.GraphController');

goog.require('lgb.core.BaseController');

goog.require('lgb.chart.view.GraphView');
goog.require('lgb.chart.model.GraphModel');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.GraphController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.chart.controller.GraphController, lgb.core.BaseController);



lgb.chart.controller.GraphController.prototype.init = function(dataModel, integratedDataModel) {

  this.dataModel = dataModel;
  this.dataModel.setIntegratedDataModel(integratedDataModel);
  
  //this.dataModel.makeRandomData(20);
  
  this.guiView = new lgb.chart.view.GraphView (this.dataModel);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.bind_();
};


lgb.chart.controller.GraphController.prototype.bind_ = function() {
    

    this.listen(
        e.LayoutChange, 
        this.onLayoutChange_
        );
    
    this.listen(
        e.IntegratedDataModelValuesUpdated, 
        this.onIntegratedDataModelValuesUpdated_
        );
        
        
    this.listen(
        e.DisplayUnitSystemChangeNotify, 
        this.onDisplayUnitSystemChangeNotify_
        ); 
        
};



lgb.chart.controller.GraphController.prototype.onDisplayUnitSystemChangeNotify_ = function(event) {
    
    var displayUnitSystem = event.payload;
    this.dataModel.changeDisplayUnitSystem(displayUnitSystem);

};



lgb.chart.controller.GraphController.prototype.onLayoutChange_ = function(event) {
    this.guiView.calculateLayout(event.payload);
};



lgb.chart.controller.GraphController.prototype.refreshOnePathController_ = function(integratedMainModel) {
    this.guiView.calculateLayout(event.payload);
};



lgb.chart.controller.GraphController.prototype.onIntegratedDataModelValuesUpdated_ = function(event) {

    var integratedMainModel = event.payload;
    this.dataModel.updateIntegratedMainModel(integratedMainModel);

};


