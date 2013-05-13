/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.RoofTopModel');

goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.RoofTopModel = function() {
  /**@const */
  this._NAME = 'lgb.model.RoofTopModel';

  /**@const */
  this._TITLE = 'Roof-top Unit';

  lgb.model.BaseModel.call(this);

  this.init_();

};
goog.inherits(lgb.model.RoofTopModel, lgb.model.BaseModel);


/**
 * Initializes the object setting default properties.
 * @private
 */
lgb.model.RoofTopModel.prototype.init_ = function() {
  this.groupMembership = {};
  this.groupMembership[lgb.model.BuildingModel.Group.ALL] = true;
  this.groupMembership[lgb.model.BuildingModel.Group.ROOFTOP] = true;
  this.groupMembership[lgb.model.BuildingModel.Group.HVAC] = true;
  this.isVisible = true;
};



/**
 * @param {lgb.model.BuildingModel.Group} group The group name
 * to set as visible.
 */
lgb.model.RoofTopModel.prototype.setVisiblityGroup = function(group) {

  if (this.groupMembership[group]) {
    this.changeProperty('isVisible', true);
  } else {
    this.changeProperty('isVisible', false);
  }
};


