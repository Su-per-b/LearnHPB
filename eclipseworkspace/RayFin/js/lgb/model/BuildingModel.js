goog.provide('lgb.model.BuildingModel');
goog.provide('lgb.model.BuildingModel.Group');

goog.require('lgb.model.ModelBase');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.BuildingModel = function() {
  /**@const */
  this._NAME = 'lgb.model.BuildingModel';
  /**@const */
  this._TITLE = 'Building';

  lgb.model.ModelBase.call(this);

};
goog.inherits(lgb.model.BuildingModel, lgb.model.ModelBase);


lgb.model.BuildingModel.prototype.init = function() {



};



/**
 * @enum {number}
 */
lgb.model.BuildingModel.Group = {
  ALL: 0,
  HVAC: 1,
  ENVELOPE: 2,
  ROOFTOP: 3,
  DUCTWORK: 4
};

/*
  lgb.model.VisibilityTag.ALL = 'ALL';
  lgb.model.VisibilityTag.HVAC = 'HVAC';
  lgb.model.VisibilityTag.ENVELOPE = 'ENVELOPE';
  lgb.model.VisibilityTag.ROOFTOP = 'ROOFTOP';
  lgb.model.VisibilityTag.FILTER = 'FILTER';
  lgb.model.VisibilityTag.HEATING_COIL = 'HEATING_COIL';
  lgb.model.VisibilityTag.COOLING_COIL = 'COOLING_COIL';
  lgb.model.VisibilityTag.FAN = 'FAN';
  lgb.model.VisibilityTag.DAMPERS = 'DAMPERS';
  lgb.model.VisibilityTag.DUCTWORK = 'DUCTWORK';
  lgb.model.VisibilityTag.CROSS_SECTION = 'CROSS_SECTION';

*/
