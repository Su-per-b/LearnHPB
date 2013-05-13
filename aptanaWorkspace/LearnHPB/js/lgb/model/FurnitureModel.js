/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.FurnitureModel');


goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.FurnitureModel = function() {


  /**@const */
  this._NAME = 'lgb.model.FurnitureModel';
  
  /**@const */
  this._TITLE = 'Furniture';
  lgb.model.BaseModel.call(this);


  this.groupMembership = {};
  this.groupMembership[lgb.model.BuildingModel.Group.ALL] = true;
  this.groupMembership[lgb.model.BuildingModel.Group.LIGHTING] = true;

  this.isVisible = true;
  
  
};
goog.inherits(lgb.model.FurnitureModel, lgb.model.BaseModel);


/**
 * updates the geometry and location of the furniture
 * @param {lgb.model.EnvelopeModel} envelopeModel The data model to
 * use in the computation.
 */
lgb.model.FurnitureModel.prototype.update = function(envelopeModel) {

  this.floorHeight = envelopeModel.floorHeight;
  this.envelopeModel = envelopeModel;


  this.dispatchChange(
      {
        config: true
      }
  );

};





/**
 * @param {lgb.model.BuildingModel.Group} group The group name
 * to set as visible.
 */
lgb.model.FurnitureModel.prototype.setVisiblityGroup = function(group) {

  if (this.groupMembership[group]) {
    this.changeProperty('isVisible', true);
  } else {
    this.changeProperty('isVisible', false);
  }
};





