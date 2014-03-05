/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.controller.LayoutController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.controller.SimulationStateControlController');
goog.require('lgb.chart.view.LayoutView');

goog.require('lgb.world.model.BaseModel');
goog.require('lgb.chart.controller.GraphController');



/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.LayoutController = function() {
  lgb.core.BaseController.call(this);
  
  this.init_();
};
goog.inherits(lgb.chart.controller.LayoutController, lgb.core.BaseController);


/**
 * @private
 */
lgb.chart.controller.LayoutController.prototype.init_ = function() {

    this.dataModel = new lgb.world.model.BaseModel();
    this.view = new lgb.chart.view.LayoutView(this.dataModel);
    
    
    this.graphController_ = 
        this.makeChildGUIcontroller_(lgb.chart.controller.GraphController);
        
        

    this.simulationStateControlController_ = 
        this.makeChildGUIcontroller_(lgb.gui.controller.SimulationStateControlController);
        

    this.bind_();
    this.view.init();

};



lgb.chart.controller.LayoutController.prototype.bind_ = function() {


  this.listen(e.WindowResize, this.onWindowResize_);
  this.listenTo(this.view, e.LayoutChange, this.onLayoutChange_);
    
};


lgb.chart.controller.LayoutController.prototype.onRequestAddToParentGUI_ = function(event) {
    this.view.add(event.payload);
};


lgb.chart.controller.LayoutController.prototype.onWindowResize_ = function(event) {
    this.view.calculateLayout(event.payload);
};


lgb.chart.controller.LayoutController.prototype.onLayoutChange_ = function(event) {
    
    this.view.calculateLayout();
    this.dispatch(event);
    
};
