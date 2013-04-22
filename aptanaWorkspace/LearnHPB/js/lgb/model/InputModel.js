/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.InputModel');
goog.require('lgb.model.ModelBase');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.InputModel = function() {
  /**@const */
  this._NAME = 'lgb.model.InputModel';
  /**@const */
  this._TITLE = 'InputModel';

  lgb.model.ModelBase.call(this);

};
goog.inherits(lgb.model.InputModel, lgb.model.ModelBase);


