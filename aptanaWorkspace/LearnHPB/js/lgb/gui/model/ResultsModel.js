/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.model.ResultsModel');
goog.require('lgb.core.BaseModel');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.gui.model.ResultsModel = function() {

  /**@const */
  this._TITLE = 'ResultsModel';


  lgb.core.BaseModel.call(this);

};
goog.inherits(lgb.gui.model.ResultsModel, lgb.core.BaseModel);


