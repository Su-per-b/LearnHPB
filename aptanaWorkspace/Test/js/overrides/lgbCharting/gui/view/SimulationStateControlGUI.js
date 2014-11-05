goog.provide('lgbCharting.gui.view.SimulationStateControlGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

goog.require('lgb.component.LinkDataSource');
goog.require('lgb.component.Link');

goog.require('lgb.simulation.model.WebSocketConnectionStateRequest');
goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.WSConnectionState');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.model.voNative.SimStateNative');


/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgbCharting.gui.view.SimulationStateControlGUI = function(dataModel) {

	lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgbCharting.gui.view.SimulationStateControlGUI, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgbCharting.gui.view.SimulationStateControlGUI.prototype.init = function() {


};



lgbCharting.gui.view.SimulationStateControlGUI.prototype.checkIfButtonEnabled_ = function(button, stateObject) {

	var buttonPayloadState = button.ds.clickPayload;

	var isEnabled = stateObject.canRequestTransitionTo(buttonPayloadState);
	button.setEnabled(isEnabled);

};

lgbCharting.gui.view.SimulationStateControlGUI.prototype.add = function(gui) {

	var title = gui.getTitle();
	var contentElement;

	if (this.tabTitleMap_[title]) {
		contentElement = this.tabTitleMap_[title];
	} else {

		contentElement = this.tabStrip1.addTab(title);
		this.tabTitleMap_[title] = contentElement;
	}

	gui.injectInto(contentElement);

};


/**
 * @public
 */
lgbCharting.gui.view.SimulationStateControlGUI.prototype.injectInto = function(parentElement) {

	goog.base(this, 'injectInto', parentElement);

	var el = this.getMainElement();

	this.simControlButtons_ = new Array();
	var SimStateNative = lgb.simulation.model.voNative.SimStateNative.ENUM;

	this.makeLink2_('Run ^', 'run-link', SimStateNative.simStateNative_4_run_requested);
	this.makeLink2_('Step >', 'step-link', SimStateNative.simStateNative_5_step_requested);
	this.makeLink2_('Stop []', 'stop-link', SimStateNative.simStateNative_5_stop_requested);
	
    var date1 = $('<span>Date:</span>').addClass('simulation-state');
    this.simDate_ = $('<strong>{}</strong>');
    date1.append(this.simDate_);

    var time1 = $('<span>Time:</span>').addClass('simulation-state');
    this.simTime_ = $('<strong>{}</strong>');
    time1.append(this.simTime_);
    
    el.append(date1);
    el.append(time1);

	this.bind2_();

};

lgbCharting.gui.view.SimulationStateControlGUI.prototype.bind2_ = function() {


	var len = this.simControlButtons_.length;
	for (var i = 0; i < len - 1; i++) {
		var button = this.simControlButtons_[i];
		this.listenTo(button, e.MouseClick, this.onClick_);
	};

};

lgbCharting.gui.view.SimulationStateControlGUI.prototype.onClick_ = function(event) {

    
    return;

};


lgbCharting.gui.view.SimulationStateControlGUI.prototype.makeLink2_ = function(label, cssId, simStateNative) {

	var link = this.makeLink1_(label, cssId);
	link.ds.clickPayload = simStateNative;
	this.simControlButtons_.push(link);

};

lgbCharting.gui.view.SimulationStateControlGUI.prototype.makeLink1_ = function(label, cssId) {

	var ds = new lgb.component.LinkDataSource(label, this.htmlID, cssId);
	ds.cssClass = "sim";
	var link = new lgb.component.Link(ds);

	var el = this.getMainElement();
	var linkElement = link.getHtmlElement();

	var result = el.append(linkElement);
	var idx = el.children.length - 1;

	link.bind(el.children[idx]);

	return link;

};





