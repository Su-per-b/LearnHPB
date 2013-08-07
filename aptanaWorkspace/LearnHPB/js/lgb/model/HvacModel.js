/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.HvacModel');

goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.HvacModel = function() {



  this._TITLE = 'Ductwork';
  lgb.model.BaseModel.call(this);

};
goog.inherits(lgb.model.HvacModel, lgb.model.BaseModel);



