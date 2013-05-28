/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.controller.VisibilityController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.events.RequestDataModelChange');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.VisibilityNodesLoaded');

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
    lgb.events.VisibilityNodesLoaded.TYPE,
    this.onVisibilityNodesLoaded_
   );
    
  this.listenTo(
    this.guiView,
    lgb.events.RequestDataModelChange.TYPE,
    this.onRequestDataModelChange_
   );

  this.relay(
    this.guiView,
    e.RequestAddToGUI
    );
    
};



/**
 * @private
 * @param {lgb.events.RequestDataModelChange} event Fired by a view.
 */
lgb.controller.VisibilityController.prototype.onVisibilityNodesLoaded_ =
  function(event) {

  this.dataModel.addNode(event.payload);
  
};



/**
 * @private
 * @param {lgb.events.RequestDataModelChange} event Fired by a view.
 */
lgb.controller.VisibilityController.prototype.onRequestDataModelChange_ =
  function(event) {

  this.dataModel.changeAry(event.payload);
  
};




