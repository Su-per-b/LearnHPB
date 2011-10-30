goog.provide('lgb.view.PropertiesButtonView');
goog.require('lgb.events.MakeViewActive');
goog.require('lgb.view.ViewBase');
goog.require('lgb.view.component.ToggleButtonA');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.PropertiesButtonView = function() {
	lgb.view.ViewBase.call(this);
	this.htmlID = 'propertiesButton';

};
goog.inherits(lgb.view.PropertiesButtonView, lgb.view.ViewBase);

lgb.view.PropertiesButtonView.prototype.init = function() {
	this._NAME ='lgb.view.PropertiesView';
	this.button =
		new lgb.view.component.ToggleButtonA({
			htmlId: 'propertiesButtonLink',
			buttonHeight: 33,
			xPosition: 33,
			title: 'Show / Hide Properties panel',
			cssClass: 'leftNavButton'
		});

	this.injectCss();
	this.injectHtml();
	this.bindEvents();
	this.listen(lgb.events.WindowResizeEvent.TYPE, this.onResize);
		
};


lgb.view.PropertiesButtonView.prototype.show = function() {
	this.position();
};


lgb.view.PropertiesButtonView.prototype.position = function() {

	var x = this.getXpos();

	var props = {left: x + 'px'};
		this.jq().css(props);

	};

	lgb.view.PropertiesButtonView.prototype.onResize = function() {

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


lgb.view.PropertiesButtonView.prototype.getXpos = function() {
	return window.innerWidth - 33 - 33 - 8;
};


lgb.view.PropertiesButtonView.prototype.injectHtml = function() {
	var html = '<div id="propertiesButton">' + this.button.getHtml() +
				'</div>';


	 $('body').append(html);
};

lgb.view.PropertiesButtonView.prototype.injectCss = function() {
		var cssInner = this.button.getCss();
		var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
		$(cssStr).appendTo('head');
};



lgb.view.PropertiesButtonView.prototype.setSelected = function(isSelected) {
	this.isSelected = isSelected;

	if (this.isSelected) {
		$('#propertiesButtonLink').addClass('selected');
	} else {
		$('#propertiesButtonLink').removeClass('selected');
	}

};

lgb.view.PropertiesButtonView.prototype.bindEvents = function() {

	$('#propertiesButtonLink').click(this.d(this.onClick));

	var toolTipConfig = {
	  skin: 'light',
		hook: {
		  target: 'leftmiddle',
		  tooltip: 'rightmiddle'
		},
		background: { color: '#fff', opacity: .85 },
	  closeButton: false
	};

	Tipped.create('#propertiesButtonLink', toolTipConfig);
};

lgb.view.PropertiesButtonView.prototype.onClick = function() {
	this.dispatchLocal(new lgb.events.MakeViewActive(!this.isSelected));
};

















