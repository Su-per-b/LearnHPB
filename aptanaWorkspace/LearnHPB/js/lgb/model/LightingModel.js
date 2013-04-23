/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.LightingModel');
goog.provide('lgb.model.LightingModel.State');


goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.LightingModel = function() {


  /**@const */
  this._NAME = 'lgb.model.LightingModel';
  
  /**@const */
  this._TITLE = 'Lighting';
  lgb.model.BaseModel.call(this);

  this.lightingType = lgb.model.LightingModel.State.RECESSED;

  this.groupMembership = {};
  this.groupMembership[lgb.model.BuildingModel.Group.ALL] = true;
  this.groupMembership[lgb.model.BuildingModel.Group.LIGHTING] = true;

  this.isVisible = true;
  
  
};
goog.inherits(lgb.model.LightingModel, lgb.model.BaseModel);


/**
 * @param {boolean} makeVisible Used to change the visibility.
 */
lgb.model.LightingModel.prototype.setVisible = function(makeVisible) {

  if (this.isVisible != makeVisible) {
    this.isVisible = makeVisible;
    
    this.dispatchChange({isVisible : true});
  }
};


/**
 * @param {Object} stateObject Contains information about what to change.
 */
lgb.model.LightingModel.prototype.change = function(stateObject) {

  var isAnythingDirty = false;
  var whatIsDirty = {};

  if (stateObject.lightingType != null &&
    stateObject.lightingType != this.lightingType) {

    this.lightingType = stateObject.lightingType;
    whatIsDirty.lightingType = true;
    isAnythingDirty = true;
  }

  if (isAnythingDirty) {
    this.dispatchChange(whatIsDirty)
  }
};

/**
 * @param {lgb.model.BuildingModel.Group} group The group name
 * to set as visible.
 */
lgb.model.LightingModel.prototype.setVisiblityGroup = function(group) {

  if (this.groupMembership[group]) {
    this.setVisible(true);
  } else {
    this.setVisible(false);
  }
};


/**
 * @enum {number}
 */
lgb.model.LightingModel.State = {
  PENDANT: 0,
  RECESSED: 1
};




