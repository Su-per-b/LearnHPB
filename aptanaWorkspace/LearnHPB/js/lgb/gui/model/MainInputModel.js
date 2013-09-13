/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.model.MainInputModel');
goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.gui.model.MainInputModel = function() {

  /**@const */
  this._TITLE = 'MainInputModel';


  lgb.model.BaseModel.call(this);

};
goog.inherits(lgb.gui.model.MainInputModel, lgb.model.BaseModel);


