/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.model.TestModel');

goog.require('lgb.world.model.BaseModel');


/**
 * @constructor
 * @extends test.world.model.BaseModel
 */
test.world.model.TestModel = function() {

  lgb.world.model.BaseModel.call(this);
  
  this.init();
};
goog.inherits(test.world.model.TestModel, lgb.world.model.BaseModel);


/**
 * Initializes the MVC Model setting default properties.
 * @private
 */
test.world.model.TestModel.prototype.init = function() {

  /**@const */
  this._TITLE = 'Test Model';

  lgb.world.model.BaseModel.call(this);


};


