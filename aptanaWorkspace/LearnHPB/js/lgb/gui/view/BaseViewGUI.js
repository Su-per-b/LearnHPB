goog.provide('lgb.gui.view.BaseViewGUI');

goog.require('lgb.world.view.BaseV');


/**
 * MVC View base class
 * @constructor
 * @extends {lgb.BaseV}
 * @param {lgb.world.model.BaseModel=} dataModel that the view with display.
 */
lgb.gui.view.BaseViewGUI = function(dataModel, htmlID, parentHtmlID) {
  
  lgb.world.view.BaseV.call(this, dataModel, htmlID, parentHtmlID);
  this.isVisible_ = true;

};
goog.inherits(lgb.gui.view.BaseViewGUI, lgb.world.view.BaseV);





