goog.provide('lgb.view.BaseViewGUI');

goog.require('lgb.view.BaseV');
goog.require('lgb.events.DataModelChanged');

goog.require('lgb.utils');

/**
 * MVC View base class
 * @constructor
 * @extends {lgb.BaseV}
 * @param {lgb.model.BaseModel=} dataModel that the view with display.
 */
lgb.view.BaseViewGUI = function(dataModel, htmlID, parentHtmlID) {
  
  lgb.view.BaseV.call(this, dataModel, htmlID, parentHtmlID);


};
goog.inherits(lgb.view.BaseViewGUI, lgb.view.BaseV);





