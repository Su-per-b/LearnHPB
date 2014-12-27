/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.model.LayoutModel');

goog.require('lgb.core.BaseModel');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.gui.model.LayoutModel = function() {

  /**@const */
  this._TITLE = 'LayoutModel';

  lgb.core.BaseModel.call(this);

};
goog.inherits(lgb.gui.model.LayoutModel, lgb.core.BaseModel);


