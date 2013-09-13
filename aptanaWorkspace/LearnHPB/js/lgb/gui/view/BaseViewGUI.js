goog.provide('lgb.gui.view.BaseViewGUI');

goog.require('lgb.view.BaseV');


/**
 * MVC View base class
 * @constructor
 * @extends {lgb.BaseV}
 * @param {lgb.model.BaseModel=} dataModel that the view with display.
 */
lgb.gui.view.BaseViewGUI = function(dataModel, htmlID, parentHtmlID) {
  
  lgb.view.BaseV.call(this, dataModel, htmlID, parentHtmlID);
  this.isVisible_ = true;

};
goog.inherits(lgb.gui.view.BaseViewGUI, lgb.view.BaseV);





