/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.model.BaseInputModel');
goog.require('lgb.world.model.BaseModel');



/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.gui.model.BaseInputModel = function() {

  /**@const */
  this._TITLE = 'BaseInputModel';


  lgb.world.model.BaseModel.call(this);

};
goog.inherits(lgb.gui.model.BaseInputModel, lgb.world.model.BaseModel);




