/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.WorldView');


goog.require('lgb.world.model.WorldModel');
goog.require('lgb.world.view.BaseV');


/**
 * @constructor
 * @param {lgb.world.model.WorldModel} dataModel The data model to display.
 * @extends {lgb.world.view.BaseV}
 */
lgb.world.view.WorldView = function(dataModel) {

  lgb.world.view.BaseV.call(this);
};
goog.inherits(lgb.world.view.WorldView, lgb.world.view.BaseV);


/**
 * Initializes the View
 */
lgb.world.view.WorldView.prototype.init = function() {


  

};


