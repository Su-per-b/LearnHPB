goog.provide('lgb.view.AdminButtonView');
goog.require('lgb.events.RequestActivateView');
goog.require('lgb.view.ViewBase');
goog.require('lgb.view.component.ToggleButtonA');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.AdminButtonView = function() {
  lgb.view.ViewBase.call(this);
  this.htmlID = 'adminButton';
  this._NAME = 'lgb.view.AdminButtonView';
};
goog.inherits(lgb.view.AdminButtonView, lgb.view.ViewBase);

lgb.view.AdminButtonView.prototype.init = function() {

  this.button =
    new lgb.view.component.ToggleButtonA({
      htmlId: 'adminButtonLink',
      buttonHeight: 33,
      xPosition: 66,
      title: 'Show / Hide Admin panel',
      cssClass: 'leftNavButton'
    });

    this.injectCss();
    this.injectHtml();
    this.bind_();
    //this.setSelected(true);
    this.listen(lgb.events.WindowResize.TYPE, this.onResize);
};

lgb.view.AdminButtonView.prototype.show = function() {
  this.position();
};

lgb.view.AdminButtonView.prototype.position = function() {

  var x = this.getXpos();

  var props = {left: x + 'px'};
    this.jq().css(props);

  };

  lgb.view.AdminButtonView.prototype.onResize = function() {

    var x = this.getXpos();

    var options = {
      duration: 500,
      easing: 'easeInOutSine'
  };
  var props = {left: x + 'px'};

  this.jq().animate(
      props,
      options
  );



};


lgb.view.AdminButtonView.prototype.getXpos = function() {
  return window.innerWidth - 33 - 4;
};


lgb.view.AdminButtonView.prototype.injectHtml = function() {
  var html = '<div id="adminButton">' + this.button.getHtml() +
        '</div>';


   $('body').append(html);
};

lgb.view.AdminButtonView.prototype.injectCss = function() {

    var cssInner = this.button.getCss();
    var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);

    $(cssStr).appendTo('head');
};



lgb.view.AdminButtonView.prototype.setSelected = function(isSelected) {
  this.isSelected = isSelected;

  if (this.isSelected) {
    $('#adminButtonLink').addClass('selected');
  } else {
    $('#adminButtonLink').removeClass('selected');
  }

};

/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.AdminButtonView.prototype.bind_ = function() {

  $('#adminButtonLink').click(this.d(this.onClick));

  var toolTipConfig = {
    skin: 'light',
    hook: {
      target: 'leftmiddle',
      tooltip: 'rightmiddle'
    },
    background: { color: '#fff', opacity: .85 },
    closeButton: false
  };

  Tipped.create('#adminButtonLink', toolTipConfig);
};

lgb.view.AdminButtonView.prototype.onClick = function() {
  this.dispatchLocal(new lgb.events.RequestActivateView(!this.isSelected));
};

















