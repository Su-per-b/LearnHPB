/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.world.controller.VisibilityController');

goog.require('lgb.core.BaseController');


goog.require('lgb.world.view.input.VisibilityGUI');
goog.require('lgb.world.model.VisibilityModel');




/**
 * MVC controller for the VisibilityController
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.VisibilityController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.world.controller.VisibilityController, lgb.core.BaseController);



/**
 * initializes the controller
 * @private
 */
lgb.world.controller.VisibilityController.prototype.init = function() {

  this.dataModel = new lgb.world.model.VisibilityModel();
  this.guiView = new lgb.world.view.input.VisibilityGUI ( this.dataModel );

  this.bind_();

  this.trigger(e.RequestAddToTestingInput, this.guiView);
};


lgb.world.controller.VisibilityController.prototype.getGui = function() {
  
  return this.guiView;
  
};



/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.VisibilityController.prototype.bind_ = function() {


  this.listen(
    e.VisibilityNodesLoaded,
    this.onVisibilityNodesLoaded_
   );
    
  this.listenTo(
    this.guiView,
    e.RequestDataModelChange,
    this.onRequestDataModelChange_
   );


};




lgb.world.controller.VisibilityController.prototype.onVisibilityNodesLoaded_ =
  function(event) {

  this.dataModel.addNode(event.payload);
  
};




lgb.world.controller.VisibilityController.prototype.onRequestDataModelChange_ =
  function(event) {

  var changeRequest = event.payload;

  if ("changeVisibility" == changeRequest.property) {
    
     this.dataModel.changeVisibility(changeRequest.newValue);
  
  } else {
    debugger;
  }
  


  
};




