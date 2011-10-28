goog.provide('lgb.view.LeftNavView');

goog.require('lgb.view.ViewBase');
goog.require('lgb.view.component.ToggleButtonA');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.LeftNavView = function() {
	lgb.view.ViewBase.call(this);
	
	/**@const */
	this.htmlID = 'leftNav';

	this.init_();
	this.injectCss_();
	this.injectHtml_();
	this.makeToolTip_();
	this.listen_();
	
		
	this.showSelected('leftNavButton_1');
};



goog.inherits(lgb.view.LeftNavView, lgb.view.ViewBase);

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

	Tipped.create('.leftNavButton', toolTipConfig);
}

/**
 * @private
 */
lgb.view.LeftNavView.prototype.injectCss_ = function() {
	var cssInner = 
	'.leftNavButton  {' +
		'width:42px;' +
		'height:42px;' +
		'display:block;' +
		'margin:0 0 10px 0;' +
		'background-image:url("images/icon_grid_42.png");' +
	'}';

	cssInner += this.buttonGeneral.getCss();
	cssInner += this.buttonHvac.getCss();
	cssInner += this.buttonEnvelope.getCss();

	var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

	$('head').append(cssStr);
}


/**
 * @private
 */
lgb.view.LeftNavView.prototype.init_ = function() {
	this.buttonGeneral =
		new lgb.view.component.ToggleButtonA({
			htmlId: 'leftNavButton_1',
			xPosition: -42,
			title: 'General',
			cssClass: 'leftNavButton '
		});

	this.buttonHvac =
		new lgb.view.component.ToggleButtonA({
			htmlId: 'leftNavButton_2',
			xPosition: -84,
			title: 'HVAC',
			cssClass: 'leftNavButton '
		});

	this.buttonEnvelope =
		new lgb.view.component.ToggleButtonA({
			htmlId: 'leftNavButton_3',
			xPosition: -168,
			title: 'External Envelope',
			cssClass: 'leftNavButton '
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
		.appendTo('body');

		


};


/**
 * @private
 */
lgb.view.LeftNavView.prototype.listen_ = function() {
	this.listen(lgb.events.WindowResizeEvent.TYPE, this.onResize);
};



lgb.view.LeftNavView.prototype.getYpos = function() {
	return window.innerHeight - 140 - 352;
};

lgb.view.LeftNavView.prototype.onResize = function() {

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
 * @private
 */
lgb.view.LeftNavView.prototype.show = function() {

  	this.jq().animate({
  		left: '0',
  		easing: 'easeInOutSine'
  	}, 500);

};


lgb.view.LeftNavView.prototype.showSelected = function(newSelectedId) {
	if (this.currentlySelectedID != newSelectedId) {

		if ('#' + this.currentlySelectedID != 'none') {
			$('#' + this.currentlySelectedID).removeClass('selected');
		}

		$('#' + newSelectedId).addClass('selected');
		this.currentlySelectedID = newSelectedId;

	}
};


lgb.view.LeftNavView.prototype.onClick = function(event) {
		//this.showSelected(event.target.id);
		//this.dispatch(lgb.events.Visibility.GUI_SELECTION, event.data.mode);
};



















