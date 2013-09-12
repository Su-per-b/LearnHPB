/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.input.ResultsModel');
goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.input.ResultsModel = function() {

  /**@const */
  this._TITLE = 'ResultsModel';


  lgb.model.BaseModel.call(this);

};
goog.inherits(lgb.model.input.ResultsModel, lgb.model.BaseModel);


