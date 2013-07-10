/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.BaseInputModel');
goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.BaseInputModel = function() {

  /**@const */
  this._TITLE = 'BaseInputModel';


  lgb.model.BaseModel.call(this);

};
goog.inherits(lgb.model.BaseInputModel, lgb.model.BaseModel);


