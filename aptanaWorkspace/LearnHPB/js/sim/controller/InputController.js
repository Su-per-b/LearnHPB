goog.provide('sim.controller.InputController');

goog.require('sim.controller.ControllerBase');
goog.require('goog.debug.Logger');
goog.require('sim.view.TabStripView');
goog.require('sim.model.TabStripModel');
goog.require('sim.Config');



sim.controller.InputController = function() {
  sim.controller.ControllerBase.call(this);
};
goog.inherits(sim.controller.InputController, sim.controller.ControllerBase);


/**
 * Initializes the Main Controller after the document is ready
 */
sim.controller.InputController.prototype.init = function() {


    var tabStripModel = new sim.model.TabStripModel();
    
    var tabstripview = new sim.view.TabStripView(tabStripModel);
    tabstripview.init();

};


