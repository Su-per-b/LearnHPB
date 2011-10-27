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
	
	this.listen(lgb.event.ScenarioParsed.TYPE, this.onScenarioParsed);
	
	/*
	this.listen(lgb.event.Event.USER_ACTIONS_CREATED, this.onUserActionsCreated);
	this.listen(lgb.event.Loader.ALL_MESHES_LOAD_START, this.onMeshesLoadStart);
	this.listen(lgb.event.Cam.MOVE_COMPLETE, this.onCameraMoveComplete);
	this.listen(lgb.event.Event.TOGGLE_ADMIN_PANEL, this.onToggleAdminPanel);
	this.listen(lgb.event.Event.CLOSED_ADMIN_PANEL, this.onClosedAdminPanel);
	*/
};
goog.inherits(lgb.controller.AdminController, lgb.controller.ControllerBase);


lgb.controller.AdminController.prototype.onScenarioParsed = function(event) {
	this.buttonView.show();
	//this.view.show(true);
	
	this.listenTo(this.buttonView, lgb.event.MakeViewActive.TYPE, this.onMakeViewActive);
	this.listenTo(this.view, lgb.event.ViewClosed.TYPE, this.onClosedPanel);
};



lgb.controller.AdminController.prototype.onMakeViewActive = function(event) {
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







