/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.RoofTopModel');

goog.require('lgb.core.BaseModel');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.RoofTopModel = function() {

  /**@const */
  this._TITLE = 'Roof-top Unit';

  lgb.core.BaseModel.call(this);

  this.init_();

};
goog.inherits(lgb.world.model.RoofTopModel, lgb.core.BaseModel);


/**
 * Initializes the object setting default properties.
 * @private
 */
lgb.world.model.RoofTopModel.prototype.init_ = function() {


};


