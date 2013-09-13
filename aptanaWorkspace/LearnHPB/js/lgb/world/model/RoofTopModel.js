/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.RoofTopModel');

goog.require('lgb.world.model.BaseModel');



/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.world.model.RoofTopModel = function() {

  /**@const */
  this._TITLE = 'Roof-top Unit';

  lgb.world.model.BaseModel.call(this);

  this.init_();

};
goog.inherits(lgb.world.model.RoofTopModel, lgb.world.model.BaseModel);


/**
 * Initializes the object setting default properties.
 * @private
 */
lgb.world.model.RoofTopModel.prototype.init_ = function() {


};


