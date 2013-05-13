/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.LeftNavView');

goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.ToggleButtonA');


/**
 * @constructor
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.LeftNavView = function() {
    
  this._NAME = 'lgb.view.LeftNavView';
  lgb.view.BaseViewGUI.call(this, null, 'leftNav');

  this.init_();
  this.injectCss_();
  this.injectHtml_();
  this.makeToolTip_();
  this.bind_();

  this.buttonGeneral.setSelected(true);

};
goog.inherits(lgb.view.LeftNavView, lgb.view.BaseViewGUI);


/**
 * @private
 */
lgb.view.LeftNavView.prototype.makeToolTip_ = function() {
  var toolTipConfig = {
    skin: 'light',
    hook: {
      target: 'rightmiddle',
      tooltip: 'leftmiddle'
    },
    background: { color: '#fff', opacity: .85 },
    closeButton: false
  };

  Tipped.create('#leftNav a', toolTipConfig);
};

/**
 * @private
 */
lgb.view.LeftNavView.prototype.injectCss_ = function() {
  var cssInner =
  '#leftNav a {' +
    'width:42px;' +
    'height:42px;' +
    'display:block;' +
    'margin:0 0 10px 0;' +
    'background-image:url("images/icon_grid_42.png");' +
  '}';

  cssInner += this.buttonGeneral.getCss();
  cssInner += this.buttonHvac.getCss();
  cssInner += this.buttonEnvelope.getCss();
  cssInner += this.buttonLighting.getCss();

  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);
};


/**
 * @private
 */
lgb.view.LeftNavView.prototype.init_ = function() {
  this.buttonGeneral =
    new lgb.component.ToggleButtonA({
      htmlID: 'leftNavButton_1',
      xPosition: -42,
      title: 'General'
    });

  this.buttonHvac =
    new lgb.component.ToggleButtonA({
      htmlID: 'leftNavButton_2',
      xPosition: -84,
      title: 'HVAC'
    });

  this.buttonEnvelope =
    new lgb.component.ToggleButtonA({
      htmlID: 'leftNavButton_3',
      xPosition: -168,
      title: 'External Envelope'
    });
    
  this.buttonLighting =
    new lgb.component.ToggleButtonA({
      htmlID: 'leftNavButton_4',
      xPosition: -126,
      title: 'Lighting'
    });

  this.currentlySelectedID = 'none';
};

/**
 * @private
 */
lgb.view.LeftNavView.prototype.injectHtml_ = function() {

    var top = this.getYpos();

      $('<div>')
      .attr('id', this.htmlID)
      .append(this.buttonGeneral.getHtml())
      .append(this.buttonHvac.getHtml())
      .append(this.buttonEnvelope.getHtml())
      .append(this.buttonLighting.getHtml())
      .css({
          position: 'absolute',
        width: '53px',
        height: '292px',
        left: '-63px',
        top: top + 'px',
          'z-index': '101',
          'background-image': 'url(images/leftnav.png)',
          opacity: '0.92',
          padding: '60px 0 0 10px'
        })
    .appendTo('#webGLcanvas');
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.LeftNavView.prototype.bind_ = function() {
  this.listen(lgb.events.WindowResize.TYPE, this.onResize);

  var delegate = this.d(this.onClick_);

  this.buttonGeneral.jq().click(
    lgb.model.BuildingModel.Group.ALL, delegate
  );

  this.buttonHvac.jq().click(
    lgb.model.BuildingModel.Group.HVAC, delegate
  );

  this.buttonEnvelope.jq().click(
    lgb.model.BuildingModel.Group.ENVELOPE, delegate
  );
  
  this.buttonLighting.jq().click(
    lgb.model.BuildingModel.Group.LIGHTING, delegate
  );

};

/**
 * Event handler -> fires when any of the left nav buttons are clicked
 * @param {jQuery.event} event The Event.
 * @private
 */
lgb.view.LeftNavView.prototype.onClick_ = function(event) {

  (/** @type {lgb.model.BuildingModel.Group.<number>} */ event.data);

  var e = new lgb.events.RequestVisibilityChange(event.data);
  this.dispatchLocal(e);
};

/**
 * used to position the nav bar.
 * @return {number} The y position.
 */
lgb.view.LeftNavView.prototype.getYpos = function() {
  return window.innerHeight - 140 - 352;
};

/**
 * @param {lgb.model.BuildingModel.Group} visibilityGroup The group selected.
 */
lgb.view.LeftNavView.prototype.updateSelected = function(visibilityGroup) {
  switch (visibilityGroup) {
    case lgb.model.BuildingModel.Group.ALL:
      this.buttonGeneral.setSelected(true);
      this.buttonHvac.setSelected(false);
      this.buttonEnvelope.setSelected(false);
      this.buttonLighting.setSelected(false);
      break;
    case lgb.model.BuildingModel.Group.HVAC:
      this.buttonGeneral.setSelected(false);
      this.buttonHvac.setSelected(true);
      this.buttonEnvelope.setSelected(false);
      this.buttonLighting.setSelected(false);
      break;
    case lgb.model.BuildingModel.Group.ENVELOPE:
      this.buttonGeneral.setSelected(false);
      this.buttonHvac.setSelected(false);
      this.buttonEnvelope.setSelected(true);
       this.buttonLighting.setSelected(false);
      break;
    case lgb.model.BuildingModel.Group.LIGHTING:
      this.buttonGeneral.setSelected(false);
      this.buttonHvac.setSelected(false);
      this.buttonEnvelope.setSelected(false);
      this.buttonLighting.setSelected(true);
      break;
    default :
      this.buttonGeneral.setSelected(false);
      this.buttonHvac.setSelected(false);
      this.buttonEnvelope.setSelected(false);
      break;
  }
};


/**
 * Event handler for browser resize
 * @param {goog.events.Event} event The Event.
 */
lgb.view.LeftNavView.prototype.onResize = function(event) {

  var y = this.getYpos();

  var props = {top: y + 'px'};
  var options = {
    duration: 500,
    easing: 'easeInOutSine'
  };

  this.jq().animate(
      props,
      options
  );

};

/**
 * Moves the GUI element onto the screen
 */
lgb.view.LeftNavView.prototype.show = function() {
    this.jq().animate({
      left: '0',
      easing: 'easeInOutSine'
    }, 500);
};

















