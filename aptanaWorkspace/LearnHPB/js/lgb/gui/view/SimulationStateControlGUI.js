goog.provide('lgb.gui.view.SimulationStateControlGUI');

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

goog.require('lgb.integrated.model.DisplayUnitSystem');

/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.SimulationStateControlGUI = function(dataModel) {

	lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.gui.view.SimulationStateControlGUI, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgb.gui.view.SimulationStateControlGUI.prototype.init = function() {
    
    this.displayUnitSystem_ = lgb.integrated.model.DisplayUnitSystem.getInstance();
    this.bind2_();

};


lgb.gui.view.SimulationStateControlGUI.prototype.bind2_ = function() {

    this.listenForChange_('webSocketConnectionState');
    this.listenForChange_('simStateNative');

    this.listenTo(this.displayUnitSystem_, e.DataModelChangedEx, this.onChange_displayUnitSystemValue_);
       
    this.listen(e.IntegratedDataModelValuesUpdated, this.onIntegratedDataModelValuesUpdated_);
};





lgb.gui.view.SimulationStateControlGUI.prototype.onIntegratedDataModelValuesUpdated_ = function(event) {


    var integratedMainModel = event.payload;
    
    var dateStr = integratedMainModel.getDateStr();
    var timeStr = integratedMainModel.getTimeStr();
    
    if (null != dateStr) {
        this.simDate_.html(dateStr);
        this.simTime_.html(timeStr); 
    }

};



lgb.gui.view.SimulationStateControlGUI.prototype.onChange_displayUnitSystemValue_ = function(event) {

	//var x = this.displaySystemUnitLink_;
	var displaySystemUnit = this.displayUnitSystem_.toString();

	//this.displaySystemUnitLink_.ds.title = displaySystemUnit;

	this.displaySystemUnitLink_.ds.changePropertyEx("title", displaySystemUnit);

	return;

};

lgb.gui.view.SimulationStateControlGUI.prototype.onChange_simStateNative_ = function(stateObject) {

	//var stateObject = new lgb.simulation.model.voNative.SimStateNative(simStateNative);
	goog.asserts.assert(stateObject, "stateObject not set");

	var str = stateObject.getString();
	goog.asserts.assert(str);

	var msg = "{0}:{1}".format(stateObject.getIntValue(), stateObject.getString());
	this.simStatus_.html(msg);
	this.each(this.simControlButtons_, this.checkIfButtonEnabled_, stateObject);

};

lgb.gui.view.SimulationStateControlGUI.prototype.onChange_webSocketConnectionState_ = function(webSocketConnectionState) {

	var WebSocketConnectionState = lgb.simulation.model.WebSocketConnectionState;
	var stateObject = new lgb.simulation.model.WSConnectionState(webSocketConnectionState);

	var canConnect = stateObject.canRequestTransitionTo(lgb.simulation.model.WSConnectionState.ENUM.opened);
	var canDisconnect = stateObject.canRequestTransitionTo(lgb.simulation.model.WSConnectionState.ENUM.closed);

	var msg = "{0}:{1}".format(stateObject.getIntValue(), stateObject.getString());
	this.wsStatus_.html(msg);

	this.wsConnectLink_.setEnabled(canConnect);
	this.wsDisConnectLink_.setEnabled(canDisconnect);

};

lgb.gui.view.SimulationStateControlGUI.prototype.checkIfButtonEnabled_ = function(button, stateObject) {

	var buttonPayloadState = button.ds.clickPayload;

	var isEnabled = stateObject.canRequestTransitionTo(buttonPayloadState);
	button.setEnabled(isEnabled);

};

lgb.gui.view.SimulationStateControlGUI.prototype.add = function(gui) {

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
lgb.gui.view.SimulationStateControlGUI.prototype.injectInto = function(parentElement) {

	goog.base(this, 'injectInto', parentElement);

	var el = this.getMainElement();

	this.wsConnectLink_ = this.makeLink1_('Socket Open', 'wsConnect');
	this.wsDisConnectLink_ = this.makeLink1_('Socket Close', 'wsDisConnect');

	var state1 = $('<span>State:</span>').addClass('simulation-state');

	this.wsStatus_ = $('<strong>{}</strong>');
	state1.append(this.wsStatus_);

	el.append(state1);

    var date1 = $('<span>Date:</span>').addClass('simulation-state');
    this.simDate_ = $('<strong>{}</strong>');
    date1.append(this.simDate_);
    el.append(date1);
    
	var time1 = $('<span>Time:</span>').addClass('simulation-state');
	this.simTime_ = $('<strong>{}</strong>');
	time1.append(this.simTime_);
	el.append(time1);
	

	var displaySystemUnit = this.displayUnitSystem_.toString();

	this.displaySystemUnitLink_ = this.makeLink1_(displaySystemUnit, 'displaySystemUnit-link');
	el.append(this.displaySystemUnitLink_);

	el.append('<br />');

	this.simControlButtons_ = new Array();
	var SimStateNative = lgb.simulation.model.voNative.SimStateNative.ENUM;

	this.makeLink2_('Connect~', 'connect-link', SimStateNative.simStateNative_1_connect_requested);
	this.makeLink2_('XML Parse {}', 'xmlParse-link', SimStateNative.simStateNative_2_xmlParse_requested);
	this.makeLink2_('Init ^', 'init-link', SimStateNative.simStateNative_3_init_requested);

	this.makeLink2_('Run ^', 'run-link', SimStateNative.simStateNative_4_run_requested);
	this.makeLink2_('Step >', 'step-link', SimStateNative.simStateNative_5_step_requested);
	this.makeLink2_('Stop []', 'stop-link', SimStateNative.simStateNative_5_stop_requested);

	this.makeLink2_('Terminate.', 'terminate-link', SimStateNative.simStateNative_7_terminate_requested);

	var state2 = $('<span>State:</span>').addClass('simulation-state');

	this.simStatus_ = $('<strong>{}</strong>');
	state2.append(this.simStatus_);

	el.append(state2);
	this.bind_();

};

lgb.gui.view.SimulationStateControlGUI.prototype.bind_ = function() {

	this.listenTo(this.wsConnectLink_, e.MouseClick, this.onWsConnectLink_);
	this.listenTo(this.wsDisConnectLink_, e.MouseClick, this.onWsDisConnectLink_);
	this.listenTo(this.displaySystemUnitLink_, e.MouseClick, this.onDisplaySystemUnitLink_);

	var len = this.simControlButtons_.length;
	for (var i = 0; i < len - 1; i++) {

		var button = this.simControlButtons_[i];
		this.listenTo(button, e.MouseClick, this.onClickSimStateNativeRequest_);

	};

};

lgb.gui.view.SimulationStateControlGUI.prototype.makeLink2_ = function(label, cssId, simStateNative) {

	var link = this.makeLink1_(label, cssId);
	link.ds.clickPayload = simStateNative;
	this.simControlButtons_.push(link);

};

lgb.gui.view.SimulationStateControlGUI.prototype.makeLink1_ = function(label, cssId) {

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


lgb.gui.view.SimulationStateControlGUI.prototype.onClickSimStateNativeRequest_ = function(event) {

	var simStateInt = event.target.ds.clickPayload;
	var simStateNative = new lgb.simulation.model.voNative.SimStateNative(simStateInt);

	var newEvent = new lgb.simulation.events.SimStateNativeRequest(simStateNative);
	this.dispatchLocal(newEvent);
};


lgb.gui.view.SimulationStateControlGUI.prototype.onDisplaySystemUnitLink_ = function(event) {

	var title = event.payload.ds.title;
	
	var d = new lgb.integrated.model.DisplayUnitSystem();
	
	
	this.triggerLocal(e.DisplayUnitSystemChangeRequest, title);

};

lgb.gui.view.SimulationStateControlGUI.prototype.onWsConnectLink_ = function(event) {

	this.triggerLocal(se.WebSocketChangeRequest, lgb.simulation.model.WebSocketConnectionStateRequest.open);

};

lgb.gui.view.SimulationStateControlGUI.prototype.onWsDisConnectLink_ = function(event) {

	this.triggerLocal(se.WebSocketChangeRequest, lgb.simulation.model.WebSocketConnectionStateRequest.close);

};

