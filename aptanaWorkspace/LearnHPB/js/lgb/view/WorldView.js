/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.WorldView');


goog.require('lgb.model.WorldModel');
goog.require('lgb.view.BaseV');


/**
 * @constructor
 * @param {lgb.model.WorldModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseV}
 */
lgb.view.WorldView = function(dataModel) {

  lgb.view.BaseV.call(this);
};
goog.inherits(lgb.view.WorldView, lgb.view.BaseV);


/**
 * Initializes the View
 */
lgb.view.WorldView.prototype.init = function() {


  

};


