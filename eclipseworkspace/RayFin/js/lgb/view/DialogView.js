goog.provide('lgb.view.DialogView');

goog.require('lgb.events.ViewClosed');
goog.require('lgb.view.ViewBase');

/**
 * @constructor
 * @param {lgb.model.ModelBase=} dataModel The data model to display.
 * @extends {lgb.view.ViewBase}
 */
lgb.view.DialogView = function(dataModel) {
	lgb.view.ViewBase.call(this, dataModel);
	this.subPanels = [];
  	this.useSlideEffect = false;
};
goog.inherits(lgb.view.DialogView, lgb.view.ViewBase);


lgb.view.DialogView.prototype.toggleVisible = function() {
	if (this.isOpen()) {
		this.hide();
	}
	else {
		this.show();
	}
};

lgb.view.DialogView.prototype.isOpen = function() {
	return this.jq().dialog('isOpen');
};

lgb.view.DialogView.prototype.show = function() {
	var selector = this.jq();

	if (!this.isOpen()) {
		selector.dialog('open');

		if (this.useSlideEffect) {
			var widget = selector.dialog('widget');
			
			var result = widget.show('slide', {
				direction: 'right',
				easing: 'swing'
			}, 1000);
		}
	}
};


lgb.view.DialogView.prototype.hide = function() {
	this.jq().dialog('close');
};


lgb.view.DialogView.prototype.onCloseButtonClicked = function(event) {
	//this.dispatch(this.closedEventStr );

	this.dispatchLocal(new lgb.events.ViewClosed());

//	alert('lgb.view.DialogView.prototype.onCloseButtonClicked : you must override this');
};












