/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.RoofTopModel');

goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.RoofTopModel = function() {

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


};


