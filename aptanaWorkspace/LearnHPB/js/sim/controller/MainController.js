goog.provide('sim.controller.MainController');

goog.require('sim.controller.ControllerBase');
goog.require('goog.debug.Logger');
goog.require('sim.Config');
goog.require('sim.controller.InputController');



sim.controller.MainController = function() {
    
  sim.controller.ControllerBase.call(this);
  sim.globalEventBus = new sim.events.EventBus();

  var delegate = jQuery.proxy(this.init, this);
  jQuery(document).ready(delegate);
};
goog.inherits(sim.controller.MainController, sim.controller.ControllerBase);


/**
 * Initializes the Main Controller after the document is ready
 */
sim.controller.MainController.prototype.init = function() {


  this.injectSimulationWindow_();
  this.injectErrorWindow_();
  
  var inputController = new sim.controller.InputController();
  inputController.init();

};



/**
 * Injects the HTML needed for the modal
 * dialog that apears if an exception occurs
 * @private
 */
sim.controller.MainController.prototype.injectSimulationWindow_ = function() {
  $('<p>')
    .attr('id', 'simulationWindow')
    .appendTo('body');

   var w = $('#simulationWindow').kendoWindow({
       draggable: false,
       resizable: false,
       width: '500px',
       height: '300px',
       title: 'Simulation Output',
       modal: true,
       visible: false,
       actions: ['Refresh', 'Maximize', 'Close']
   }).data('kendoWindow');

   w.center();
};



/**
 * Injects the HTML needed for the modal
 * dialog that apears if an exception occurs
 * @private
 */
sim.controller.MainController.prototype.injectErrorWindow_ = function() {
  $('<p>')
    .attr('id', 'errorWindow')
    .appendTo('body');

   var w = $('#errorWindow').kendoWindow({
       draggable: false,
       resizable: false,
       width: '500px',
       height: '300px',
       title: 'Exception Ocurred',
       modal: true,
       visible: false,
       actions: ['Refresh', 'Maximize', 'Close']
   }).data('kendoWindow');

   w.center();
};


/**
 * Handles the browser resize event
 * then dispatches a lgb event
 * @private
 * @param {Event} event The browser's event.
 */
sim.controller.MainController.prototype.onWindowResize_ =
  function(event) {

  this.dispatch(
    new sim.events.WindowResize(
      window.innerWidth,
      window.innerHeight
    )
  );

};
