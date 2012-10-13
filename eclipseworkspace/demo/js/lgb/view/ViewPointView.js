/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ViewPointView');

goog.require('goog.userAgent');
goog.require('lgb.ThreeUtils');
goog.require('lgb.events.CamerasLoaded');
goog.require('lgb.events.ViewInitialized');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.EnvelopeModel} dataModel The model to display.
 */
lgb.view.ViewPointView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  /**@const */
  this._NAME = 'lgb.view.ViewPointView';
  this._ASSETS_FOLDER = 'viewpoints';

};
goog.inherits(lgb.view.ViewPointView, lgb.view.ViewBase);





/**
 * Event handler called by the base class when the scene is loaded
 * @private
 */
lgb.view.ViewPointView.prototype.onSceneLoaded_ = function() {

  if (this.cameras_ !== undefined) {
    var e = new lgb.events.CamerasLoaded(this.cameras_);
    this.dispatchLocal(e);
  }
  
};












