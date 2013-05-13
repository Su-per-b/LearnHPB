/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.DuctworkModel');

goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.DuctworkModel = function() {


  /**@const */
  this._NAME = 'lgb.model.DuctworkModel';
  /**@const */
  this._TITLE = 'Ductwork';
  lgb.model.BaseModel.call(this);

  this.groupMembership = {};
  this.groupMembership[lgb.model.BuildingModel.Group.ALL] = true;
  this.groupMembership[lgb.model.BuildingModel.Group.HVAC] = true;
  this.groupMembership[lgb.model.BuildingModel.Group.DUCTWORK] = true;

  this.isVisible = true;
};
goog.inherits(lgb.model.DuctworkModel, lgb.model.BaseModel);




lgb.model.DuctworkModel.prototype.setVisiblityGroup = function(group) {

  if (this.groupMembership[group]) {
    this.changeProperty('isVisible', true);
  } else {
    this.changeProperty('isVisible', false);
  }
};