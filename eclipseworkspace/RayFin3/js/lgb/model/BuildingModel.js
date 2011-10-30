goog.provide('lgb.model.BuildingModel');
goog.provide('lgb.model.BuildingModel.Group');

goog.require('lgb.model.ModelBase');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.BuildingModel = function() {

	lgb.model.ModelBase.call(this);
	
};

goog.inherits(lgb.model.BuildingModel, lgb.model.ModelBase);


lgb.model.BuildingModel.prototype.init = function() {



};



/**
 * @enum {number}
 */
lgb.model.BuildingModel.Group = {
  ALL:0,
  HVAC: 1,
  ENVELOPE: 2
};
