goog.provide('lgb.controller.AdminController');
goog.require('lgb.view.AdminButtonView');
goog.require('lgb.view.AdminView');

/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.AdminController = function() {
	
	lgb.controller.ControllerBase.call(this);
	this.view =  new lgb.view.AdminView();
	this.buttonView =  new lgb.view.AdminButtonView();
	this.buttonView.init();
	
	
	this.listen(lgb.events.ScenarioParsed.TYPE, this.onScenarioParsed);
};
goog.inherits(lgb.controller.AdminController, lgb.controller.ControllerBase);


lgb.controller.AdminController.prototype.onScenarioParsed = function(event) {
	this.buttonView.show();

	this.listenTo(this.buttonView, lgb.events.RequestActivateView.TYPE, this.onRequestActivateView);
	this.listenTo(this.view, lgb.events.ViewClosed.TYPE, this.onClosedPanel);
};



lgb.controller.AdminController.prototype.onRequestActivateView = function(event) {
	var makeActiveFlag = event.payload;

	this.buttonView.setSelected(makeActiveFlag);

	if (makeActiveFlag) {
		this.view.show();
	} else {
		this.view.hide();
	}

};

lgb.controller.AdminController.prototype.onClosedPanel = function(event) {
	this.buttonView.setSelected(false);
};







