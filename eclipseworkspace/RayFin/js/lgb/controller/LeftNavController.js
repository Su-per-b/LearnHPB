goog.provide('lgb.controller.LeftNavController');
goog.require('lgb.view.LeftNavView');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.VisibilityChanged');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.LeftNavController = function() {
	
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
 */
lgb.controller.LeftNavController.prototype.onRequestVisibilityChange_ = function(event) {
	this.dispatch(event);
};




/**
 * @private
 * @param {goog.events.Event} event The Event.
 */
lgb.controller.LeftNavController.prototype.onVisibilityChanged_ = function(event) {
	this.view.updateSelected(event.payload);
}
