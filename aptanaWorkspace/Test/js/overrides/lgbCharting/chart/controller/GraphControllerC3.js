/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.chart.controller.GraphControllerC3');

goog.require('lgb.core.BaseController');

goog.require('lgb.chart.view.GraphViewC3');
goog.require('lgb.chart.model.GraphModelC3');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.GraphControllerC3 = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.chart.controller.GraphControllerC3, lgb.core.BaseController);



lgb.chart.controller.GraphControllerC3.prototype.init = function(dataModel) {

  this.dataModel = dataModel;
  
  this.guiView = new lgb.chart.view.GraphViewC3 (this.dataModel);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.bind_();
  
};


lgb.chart.controller.GraphControllerC3.prototype.bind_ = function() {
    

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



lgb.chart.controller.GraphControllerC3.prototype.onDisplayUnitSystemChangeNotify_ = function(event) {
    
    var displayUnitSystem = event.payload;
    this.dataModel.changeDisplayUnitSystem(displayUnitSystem);


};







lgb.chart.controller.GraphControllerC3.prototype.onLayoutChange_ = function(event) {
    
    this.guiView.calculateLayout(event.payload);
    
    
};



lgb.chart.controller.GraphControllerC3.prototype.refreshOnePathController_ = function(integratedMainModel) {
    
    this.guiView.calculateLayout(event.payload);
};




lgb.chart.controller.GraphControllerC3.prototype.onIntegratedDataModelValuesUpdated_ = function(event) {

    var integratedMainModel = event.payload;
    

    this.each(this.childGUIcontrollers_, this.refreshOnePathController_, integratedMainModel);
    
    this.dataModel.updateIntegratedMainModel(integratedMainModel);
    
    
   // this.dataModel.calcDomainX();
    //this.dataModel.calcDomainY();

};



lgb.chart.controller.GraphControllerC3.prototype.refreshOnePathController_ = function(pathController, integratedMainModel) {
  
    pathController.addIntegratedMainModel(integratedMainModel);

};

