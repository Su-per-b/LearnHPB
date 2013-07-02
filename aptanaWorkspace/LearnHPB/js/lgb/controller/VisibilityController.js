/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.controller.VisibilityController');

goog.require('lgb.controller.BaseController');





goog.require('lgb.view.VisibilityGUI');
goog.require('lgb.model.VisibilityModel');
goog.require('lgb.view.VisibilityView');



/**
 * MVC controller for the VisibilityController
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.VisibilityController = function() {

  lgb.controller.BaseController.call(this);

};
goog.inherits(lgb.controller.VisibilityController, lgb.controller.BaseController);



/**
 * initializes the controller
 * @private
 */
lgb.controller.VisibilityController.prototype.init = function() {

  this.dataModel = new lgb.model.VisibilityModel();
  
  this.guiView = new lgb.view.VisibilityGUI ( this.dataModel );
  this.view = new lgb.view.VisibilityView ( this.dataModel );
  
  this.bind_();
  
  this.guiView.init();
  //this.view.init();
};


lgb.controller.VisibilityController.prototype.getGui = function() {
  
  return this.guiView;
  
};



/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.VisibilityController.prototype.bind_ = function() {


  this.listen(
    e.VisibilityNodesLoaded,
    this.onVisibilityNodesLoaded_
   );
    
  this.listenTo(
    this.guiView,
    e.RequestDataModelChange,
    this.onRequestDataModelChange_
   );

  this.relay(
    this.guiView,
    e.RequestAddToBasicInput
    );
    
};




lgb.controller.VisibilityController.prototype.onVisibilityNodesLoaded_ =
  function(event) {

  this.dataModel.addNode(event.payload);
  
};




lgb.controller.VisibilityController.prototype.onRequestDataModelChange_ =
  function(event) {

  this.dataModel.changeAry(event.payload);
  
};




