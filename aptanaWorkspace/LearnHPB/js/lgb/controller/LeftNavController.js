/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.LeftNavController');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.VisibilityChanged');
goog.require('lgb.view.LeftNavView');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.LeftNavController = function() {
  this._NAME = 'lgb.controller.LeftNavController';
  lgb.controller.ControllerBase.call(this);
  this.init_();

};
goog.inherits(lgb.controller.LeftNavController, lgb.controller.ControllerBase);


/**
 * @private
 */
lgb.controller.LeftNavController.prototype.init_ = function() {

  /**@type {lgb.view.LeftNavView} */
  this.view = new lgb.view.LeftNavView();
  this.view.show();
  this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.LeftNavController.prototype.bind_ = function() {


  //TODO (Raj) why do I need this cast?
  this.listenTo((/**@type {goog.events.EventTarget} */ this.view),
    lgb.events.RequestVisibilityChange.TYPE,
    this.onRequestVisibilityChange_);

  this.listen(
    lgb.events.VisibilityChanged.TYPE,
    this.onVisibilityChanged_);
};


/**
 * Global Event handler.
 * @private
 * @param {lgb.events.RequestVisibilityChange} event Fired by a view
 * requesting the a group of components be made visible.
 */
lgb.controller.LeftNavController.prototype.onRequestVisibilityChange_ =
  function(event) {
  this.dispatch(event);
};




/**
 * @private
 * @param {goog.events.Event} event The Event.
 */
lgb.controller.LeftNavController.prototype.onVisibilityChanged_ =
  function(event) {
  this.view.updateSelected(event.payload);
};
