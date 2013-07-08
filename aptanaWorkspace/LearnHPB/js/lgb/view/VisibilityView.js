/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.VisibilityView');



goog.require('lgb.model.VisibilityModel');
goog.require('lgb.view.BaseV');


/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @extends {lgb.view.BaseV}
 */
lgb.view.VisibilityView = function(dataModel) {

  lgb.view.BaseV.call(this, dataModel, "VisibilityView", null);
};
goog.inherits(lgb.view.VisibilityView, lgb.view.BaseV);


/**
 * Initializes the View
 */
lgb.view.VisibilityView.prototype.init = function() {


  
  return;
};


