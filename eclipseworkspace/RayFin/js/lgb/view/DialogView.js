goog.provide('lgb.view.DialogView');

goog.require ("lgb.view.ViewBase");
goog.require('lgb.event.ViewClosed');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.DialogView = function(dataModel){

	lgb.view.ViewBase.call(this, dataModel);
	this.subPanels = [];

	
};

goog.inherits(lgb.view.DialogView, lgb.view.ViewBase);

lgb.view.DialogView.prototype.init = function() {
	this.injectHtml();
};

lgb.view.DialogView.prototype.toggleVisible = function() {
	if (this.isOpen()) {
		this.hide();
	}
	else {
		this.show(false);
	}
};

lgb.view.DialogView.prototype.isOpen = function() {
	var selector = this.getJq();
	//var widget = selector.dialog("isOpen");
	
	return selector.dialog("isOpen");
};

lgb.view.DialogView.prototype.show = function(slideFlag) {
	var selector = this.getJq();
	
	if (!this.isOpen()) {
		selector.dialog("open");
	
		if (slideFlag) {
			selector.dialog("widget").show("slide", {
				direction: "right",
				easing: "swing"
			}, 1000);
		}
	}
};

	
lgb.view.DialogView.prototype.hide = function() {
	this.getJq().dialog("close");
};
	
	
lgb.view.DialogView.prototype.onCloseButtonClicked = function(event) {
	//this.dispatch(this.closedEventStr );
	
	this.dispatchLocal(new lgb.event.ViewClosed());
	
//	alert('lgb.view.DialogView.prototype.onCloseButtonClicked : you must override this');
};
	
	










