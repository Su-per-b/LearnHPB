goog.provide('lgb.controller.EnvelopeController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.model.EnvelopeModel');
goog.require('lgb.view.EnvelopeView');





/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.EnvelopeController = function() {

	lgb.controller.ControllerBase.call(this);
	this.init();
};
goog.inherits(lgb.controller.EnvelopeController, lgb.controller.ControllerBase);


lgb.controller.EnvelopeController.prototype.init = function() {

	this.model = new lgb.model.EnvelopeModel();
	this.view = new lgb.view.EnvelopeView(this.model);
	
	lgb.controller.EnvelopeController.superClass_.bind.call(this);
};
