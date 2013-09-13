/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.model.LayoutModel');

goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.gui.model.LayoutModel = function() {

  /**@const */
  this._TITLE = 'LayoutModel';

  lgb.model.BaseModel.call(this);
  this.init_();
};
goog.inherits(lgb.gui.model.LayoutModel, lgb.model.BaseModel);



lgb.gui.model.LayoutModel.prototype.init_ = function() {
  this.guiViewList_ = [];
};


lgb.gui.model.LayoutModel.prototype.add = function(guiView) {

  this.guiViewList_.push(guiView);
  this.dispatchChangedEx('add', guiView);
};
