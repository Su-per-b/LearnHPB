goog.provide('lgb.model.EnvelopeModel');

goog.require('lgb.model.ModelBase');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.EnvelopeModel = function() {

	lgb.model.ModelBase.call(this);
	
	this.floorCount = 3;
	this.floorHeight = 9;

};

goog.inherits(lgb.model.EnvelopeModel, lgb.model.ModelBase);


lgb.model.EnvelopeModel.prototype.init = function() {




};
