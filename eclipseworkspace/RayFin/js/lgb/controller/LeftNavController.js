goog.provide('lgb.controller.LeftNavController');
goog.require('lgb.view.LeftNavView');
goog.require('lgb.events.DataModelCreated');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.NotifyVisibilityChanged');


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
	this.view = new lgb.view.LeftNavView();
	this.view.show();
	this.bind_();
};


/**
 * @private
 */
lgb.controller.LeftNavController.prototype.bind_ = function() {
	
	this.listenTo(this.view, 
		lgb.events.RequestVisibilityChange.TYPE, 
		this.onRequestVisibilityChange_);
		
	this.listen(
		lgb.events.NotifyVisibilityChanged.TYPE, 
		this.onNotifyVisibilityChanged_);	
};


/**
 * Global Event handler.
 * @private
 */
lgb.controller.LeftNavController.prototype.onRequestVisibilityChange_ = function(event) {
	this.dispatch(event);
};


/**
 * Global Event handler.
 * @private
 * @param {goog.events.Event} event The Event.
 */
lgb.controller.LeftNavController.prototype.onDataModelCreated_ = function(event) {
	
	var dataModel = event.payload;
	
	if (dataModel._NAME == 'lgb.model.EnvelopeModel') {
	//	this.dataModel = dataModel;
		this.view.addDataModel(dataModel);
		

	};
};


/**
 * Updates the view from the MVC data model.
 * @private
 * @param {goog.events.Event} event The Event.
 */
lgb.controller.LeftNavController.prototype.updateFromDataModel_ = function(event) {
	
}

/**
 * @private
 * @param {goog.events.Event} event The Event.
 */
lgb.controller.LeftNavController.prototype.onNotifyVisibilityChanged_ = function(event) {
	this.view.updateSelected(event.payload);
}
