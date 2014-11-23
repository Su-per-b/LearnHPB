/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.chart.controller.PathController');

goog.require('lgb.core.BaseController');
goog.require('lgb.chart.model.PathModel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.PathController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.chart.controller.PathController, lgb.core.BaseController);



lgb.chart.controller.PathController.prototype.init = function(pathModel) {

    this.dataModel = pathModel;
    this.guiView = new lgb.chart.view.PathView(this.dataModel);
    
    this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
};



lgb.chart.controller.PathController.prototype.addIntegratedMainModel = function(integratedMainModel) {
    
    var varname = this.dataModel.getVarName();
    
    var integratedVariable = integratedMainModel.integratedVariableNameMap_[varname];
    var dateObj = integratedMainModel.getDateObject();
    
    this.dataModel.addValuePair(dateObj, integratedVariable);
    
};





lgb.chart.controller.PathController.prototype.bind_ = function() {
    

    this.listen(
        e.DisplayUnitSystemChangeNotify, 
        this.onDisplayUnitSystemChangeNotify_
        ); 
        
        
};



lgb.chart.controller.PathController.prototype.onDisplayUnitSystemChangeNotify_ = function(event) {
    
    var displayUnitSystem = event.payload;
    this.dataModel.changeDisplayUnitSystem(displayUnitSystem);


};

