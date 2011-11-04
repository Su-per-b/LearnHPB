goog.provide('lgb.view.TitleBarView');
goog.require('lgb.view.ViewBase');





/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.TitleBarView = function() {

	lgb.view.ViewBase.call(this);
	this.htmlID = 'titleBar';

	this.injectHtml_();
	this.bind_();
	this._NAME ='lgb.view.TitleBarView';
};
goog.inherits(lgb.view.TitleBarView, lgb.view.ViewBase);

/**
 * @private
 */
lgb.view.TitleBarView.prototype.injectHtml_ = function() {
		$('<div>')
		.attr('id', this.htmlID)
		.css({
				top: '-41px',
				width: '245px',
				height: '41px',
				'z-index': '101',
				'background-image': 'url(images/top_title.png)'
			})
		.center({
			vertical: false
		})
		.appendTo('body');

};



/**
 * @private
 */
lgb.view.TitleBarView.prototype.bind_ = function() {
		this.listen(lgb.events.WindowResize.TYPE, this.onResize);
}

lgb.view.TitleBarView.prototype.show = function() {

  	this.jq().animate({
  		top: '0',
  		easing: 'easeInOutSine'
  	}, 500);

};


lgb.view.TitleBarView.prototype.onResize = function() {

	var jq = this.jq();

    jq.center({
    	vertical: false,
    	duration: 500,
    	easing: 'easeInOutSine'
    });
};



