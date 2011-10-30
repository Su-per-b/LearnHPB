goog.provide('lgb.view.StatsView');

goog.require('lgb.view.ViewBase');




/**
 * MVC View
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.StatsView = function(containerDiv) {
	lgb.view.ViewBase.call(this);

	this.init(containerDiv);

};
goog.inherits(lgb.view.StatsView, lgb.view.ViewBase);



/**
 * Initializes the View
 */
lgb.view.StatsView.prototype.init = function(containerDiv) {

	this.stats_ = Stats();
	//this.stats_.domElement.style.position = 'absolute';
	//this.stats_.domElement.style.top = '0px';
	containerDiv.appendChild(this.stats_.domElement);

	this.listen(lgb.events.RenderEvent.TYPE, this.d(this.onRender));
};

lgb.view.StatsView.prototype.onRender = function(event) {
	this.stats_.update();
};











