/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.AdminController');
goog.require('lgb.controller.ControllerBase');
goog.require('lgb.view.AdminButtonView');
goog.require('lgb.view.AdminView');

/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.AdminController = function() {

  lgb.controller.ControllerBase.call(this);
  this.init_();
};
goog.inherits(lgb.controller.AdminController, lgb.controller.ControllerBase);


/**
 * @private
 */
lgb.controller.AdminController.prototype.init_ = function() {
  this.view = new lgb.view.AdminView();

  this.buttonView = new lgb.view.AdminButtonView();
  this.buttonView.init();

  this.listen(lgb.events.ScenarioParsed.TYPE, this.onScenarioParsed_);
};


/**
 * @private
 * @param {lgb.events.ScenarioParsed} event the event fired when
 * the XML is parsed.
 */
lgb.controller.AdminController.prototype.onScenarioParsed_ = function(event) {
  this.buttonView.show();

  this.listenTo(
    this.buttonView,
    lgb.events.RequestActivateView.TYPE,
    this.onRequestActivateView_
    );

  this.listenTo(this.view, lgb.events.ViewClosed.TYPE, this.onClosedPanel_);
};


/**
 * @private
 * @param {lgb.events.RequestActivateView} event Fired from the buttonView.
 */
lgb.controller.AdminController.prototype.onRequestActivateView_ =
  function(event) {

  var makeActiveFlag = event.payload;
  this.buttonView.setSelected(makeActiveFlag);

  if (makeActiveFlag) {
    this.view.show();
  } else {
    this.view.hide();
  }
};


/**
 * @private
 * @param {lgb.events.ViewClosed} event Fired when the panel is closed.
 */
lgb.controller.AdminController.prototype.onClosedPanel_ = function(event) {
  this.buttonView.setSelected(false);
};
