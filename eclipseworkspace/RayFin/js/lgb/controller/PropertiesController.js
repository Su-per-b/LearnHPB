goog.provide('lgb.controller.PropertiesController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.event.ComponentIDSelected');
goog.require('lgb.event.MakeViewActive');
goog.require('lgb.event.ScenarioParsed');
goog.require('lgb.view.PropertiesButtonView');
goog.require('lgb.view.PropertiesView');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.PropertiesController = function() {
	lgb.controller.ControllerBase.call(this);

	this.listen(lgb.event.ScenarioParsed.TYPE, this.onScenarioParsed);
};

goog.inherits(lgb.controller.PropertiesController, lgb.controller.ControllerBase);


lgb.controller.PropertiesController.prototype.onComponentIDSelected = function(event) {
	var id = event.payload;
	this.dataModel.selectId(id);
};


lgb.controller.PropertiesController.prototype.onScenarioParsed = function(event) {

	this.buttonView = new lgb.view.PropertiesButtonView();
	this.buttonView.init();


	this.dataModel = event.payload;
	this.view = new lgb.view.PropertiesView(this.dataModel);

	this.buttonView.show();
	//this.view.show(true);

	this.listenTo(this.view, lgb.event.ComponentIDSelected.TYPE, this.onComponentIDSelected);
	this.listenTo(this.view, lgb.event.ViewClosed.TYPE, this.onClosedPanel);
	this.listenTo(this.buttonView, lgb.event.MakeViewActive.TYPE, this.onMakeViewActive);

};



lgb.controller.PropertiesController.prototype.onMakeViewActive = function(event) {
	var makeActiveFlag = event.payload;

	this.buttonView.setSelected(makeActiveFlag);

	if (makeActiveFlag) {
		this.view.show(false);
	} else {
		this.view.hide();
	}

};


/*
lgb.controller.PropertiesController.prototype.onSelectID = function(event) {
	//this.buttonView.setSelected(false);
	var id = event.value;
	this.view.showID(id);
};
*/

lgb.controller.PropertiesController.prototype.onSelectedInWorld = function(event) {
	var obj = event.value;
	this.view.showNode(obj);
};

lgb.controller.PropertiesController.prototype.onClosedPanel = function(event) {
	this.buttonView.setSelected(false);
};

lgb.controller.PropertiesController.prototype.onTogglePanel = function(event) {
	this.view.toggleVisible();
	this.buttonView.toggleVisible();
};













