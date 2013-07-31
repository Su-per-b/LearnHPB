goog.provide('lgb.view.input.BaseViewGUI');

goog.require('lgb.view.BaseV');


goog.require('lgb.utils');

/**
 * MVC View base class
 * @constructor
 * @extends {lgb.BaseV}
 * @param {lgb.model.BaseModel=} dataModel that the view with display.
 */
lgb.view.input.BaseViewGUI = function(dataModel, htmlID, parentHtmlID) {
  
  lgb.view.BaseV.call(this, dataModel, htmlID, parentHtmlID);
  this.isVisible_ = true;

};
goog.inherits(lgb.view.input.BaseViewGUI, lgb.view.BaseV);





