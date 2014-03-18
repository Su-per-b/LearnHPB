goog.provide('lgb.gui.view.SimulationStateControlGUIh');

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
goog.require('lgb.simulation.model.SimStateNativeWrapper');


lgb.gui.view.SimulationStateControlGUIh = function(dataModel) {


  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
};
goog.inherits(lgb.gui.view.SimulationStateControlGUIh, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgb.gui.view.SimulationStateControlGUIh.prototype.init = function() {
  
    this.listenForChange_('webSocketConnectionState');
    this.listenForChange_('simStateNative');
    this.listenForChange_('scalarValueResultsConverted');
    
};


lgb.gui.view.SimulationStateControlGUIh.prototype.onChange_scalarValueResultsConverted_ = 
  function(scalarValueResultsConverted) {
  
  this.simTime_.html (scalarValueResultsConverted.time_);
  
};


lgb.gui.view.SimulationStateControlGUIh.prototype.onChange_simStateNative_ = function(simStateNative) {
  

  var stateObject = new lgb.simulation.model.SimStateNativeWrapper(simStateNative);
  
  if (stateObject.getString() == undefined) {
    debugger;  
  }
  
  var msg = "{0}:{1}".format(stateObject.getInteger(), stateObject.getString());
  this.simStatus_.html (msg);
  this.each(this.simControlButtons_, this.checkIfButtonEnabled_, stateObject);

};


lgb.gui.view.SimulationStateControlGUIh.prototype.onChange_webSocketConnectionState_ = function(webSocketConnectionState) {
  
  var WebSocketConnectionState = lgb.simulation.model.WebSocketConnectionState;
  var stateObject = new lgb.simulation.model.WSConnectionState(webSocketConnectionState);
  
  var canConnect = stateObject.canRequestTransitionTo(lgb.simulation.model.WSConnectionState.ENUM.opened);
  var canDisconnect = stateObject.canRequestTransitionTo(lgb.simulation.model.WSConnectionState.ENUM.closed);
  
  var msg = "{0}:{1}".format(stateObject.getInteger(), stateObject.getString());
  this.wsStatus_.html (msg);
  
  this.wsConnectLink_.setEnabled(canConnect);
  this.wsDisConnectLink_.setEnabled(canDisconnect);

};


lgb.gui.view.SimulationStateControlGUIh.prototype.checkIfButtonEnabled_ = function(button, stateObject) {
  
  var buttonPayloadState = button.ds.clickPayload;
  
  var isEnabled = stateObject.canRequestTransitionTo(buttonPayloadState);
  button.setEnabled(isEnabled);
  
};


lgb.gui.view.SimulationStateControlGUIh.prototype.add = function(gui) {

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
lgb.gui.view.SimulationStateControlGUIh.prototype.injectInto = function(parentElement) {
  

  goog.base(this,  'injectInto', parentElement);

  var el = this.getMainElement();
  

  
  this.wsConnectLink_ = this.makeLink1_('Socket Open', 'wsConnect');
  this.wsDisConnectLink_ = this.makeLink1_('Socket Close', 'wsDisConnect');
  
  
  el.append('State:');
  this.wsStatus_ = $('<strong>{}</strong>');
  el.append(this.wsStatus_);
  
  el.append('Time:');
  this.simTime_ = $('<strong>{}</strong>');
  el.append(this.simTime_);
  
  


  el.append('<br />');


  

  


  
  this.simControlButtons_ = new Array();
  var SimStateNative = lgb.simulation.model.voNative.SimStateNative;
  
  
  this.makeLink2_('Connect~', 'connect-link', SimStateNative.simStateNative_1_connect_requested);
  this.makeLink2_('XML Parse {}', 'xmlParse-link', SimStateNative.simStateNative_2_xmlParse_requested);
  this.makeLink2_('Init ^', 'init-link', SimStateNative.simStateNative_3_init_requested);
  
  this.makeLink2_('Run ^', 'run-link', SimStateNative.simStateNative_4_run_requested);
  this.makeLink2_('Step >', 'step-link', SimStateNative.simStateNative_5_step_requested);
  this.makeLink2_('Stop []', 'stop-link', SimStateNative.simStateNative_5_stop_requested);
  
  this.makeLink2_('Terminate.', 'terminate-link', SimStateNative.simStateNative_7_terminate_requested);
  
  el.append('State:');
  this.simStatus_ = $('<strong>{}</strong>');
  el.append(this.simStatus_);
  
  this.bind2_();
  


};


lgb.gui.view.SimulationStateControlGUIh.prototype.bind2_ = function() {

    this.listenTo(this.wsConnectLink_, e.MouseClick, this.onWsConnectLink_);
    this.listenTo(this.wsDisConnectLink_, e.MouseClick, this.onWsDisConnectLink_);
  
    var len = this.simControlButtons_.length;
    for (var i = 0; i < len - 1; i++) {

        var button = this.simControlButtons_[i];
        this.listenTo(button, e.MouseClick, this.onClickSimStateNativeRequest_);

    };

};





lgb.gui.view.SimulationStateControlGUIh.prototype.makeLink2_ = function(label, cssId, simStateNative) {
  
  var link = this.makeLink1_(label, cssId);
  link.ds.clickPayload = simStateNative;
  this.simControlButtons_.push(link);
  
};


lgb.gui.view.SimulationStateControlGUIh.prototype.makeLink1_ = function(label, cssId) {
  
  var ds = new lgb.component.LinkDataSource(label, this.htmlID, cssId);
  ds.cssClass = "sim";
  var link = new lgb.component.Link(ds);
  
  var el = this.getMainElement();
  var html = link.getHTML();
  
  var result = el.append(html);
  var idx = el.children.length-1;
  
  link.bind(el.children[idx]);
  
  return link;
  
};


lgb.gui.view.SimulationStateControlGUIh.prototype.onClickSimStateNativeRequest_ = function(event) {
  
    var simState = event.target.ds.clickPayload;

    var e = new lgb.simulation.events.SimStateNativeRequest(simState);
    this.dispatchLocal(e);
};


lgb.gui.view.SimulationStateControlGUIh.prototype.onWsConnectLink_ = function(event) {
  
  this.triggerLocal(se.WebSocketChangeRequest, lgb.simulation.model.WebSocketConnectionStateRequest.open);
  
};

lgb.gui.view.SimulationStateControlGUIh.prototype.onWsDisConnectLink_ = function(event) {
  
  this.triggerLocal(se.WebSocketChangeRequest, lgb.simulation.model.WebSocketConnectionStateRequest.close);
  
};



