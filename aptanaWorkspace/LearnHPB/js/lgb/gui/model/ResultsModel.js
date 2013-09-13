/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.model.ResultsModel');
goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.gui.model.ResultsModel = function() {

  /**@const */
  this._TITLE = 'ResultsModel';


  lgb.model.BaseModel.call(this);

};
goog.inherits(lgb.gui.model.ResultsModel, lgb.model.BaseModel);


