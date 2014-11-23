/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgbCharting.chart.controller.GraphController');

goog.require('lgb.core.BaseController');

goog.require('lgb.chart.view.GraphView');
goog.require('lgb.chart.model.GraphModel');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgbCharting.chart.controller.GraphController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgbCharting.chart.controller.GraphController, lgb.core.BaseController);



lgbCharting.chart.controller.GraphController.prototype.init = function(dataModel) {

  this.dataModel = dataModel;
  
  this.guiView = new lgb.chart.view.GraphView (this.dataModel);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.bind_();
  
};


lgbCharting.chart.controller.GraphController.prototype.bind_ = function() {
    

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



lgbCharting.chart.controller.GraphController.prototype.onDisplayUnitSystemChangeNotify_ = function(event) {
    
    var displayUnitSystem = event.payload;
    this.dataModel.changeDisplayUnitSystem(displayUnitSystem);


};







lgbCharting.chart.controller.GraphController.prototype.onLayoutChange_ = function(event) {
    
    this.guiView.calculateLayout(event.payload);
    
    
};



lgbCharting.chart.controller.GraphController.prototype.refreshOnePathController_ = function(integratedMainModel) {
    
    this.guiView.calculateLayout(event.payload);
};




lgbCharting.chart.controller.GraphController.prototype.onIntegratedDataModelValuesUpdated_ = function(event) {

    var integratedMainModel = event.payload;
    

    this.each(this.childGUIcontrollers_, this.refreshOnePathController_, integratedMainModel);
    
    this.dataModel.updateIntegratedMainModel(integratedMainModel);
    
    
   // this.dataModel.calcDomainX();
    //this.dataModel.calcDomainY();

};



lgbCharting.chart.controller.GraphController.prototype.refreshOnePathController_ = function(pathController, integratedMainModel) {
  
    pathController.addIntegratedMainModel(integratedMainModel);

};

