/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.model.BaseGuiModel');
goog.require('lgb.core.BaseModel');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.gui.model.BaseGuiModel = function() {

  /**@const */
  this._TITLE = 'BaseGuiModel';


  lgb.core.BaseModel.call(this);

};
goog.inherits(lgb.gui.model.BaseGuiModel, lgb.core.BaseModel);




