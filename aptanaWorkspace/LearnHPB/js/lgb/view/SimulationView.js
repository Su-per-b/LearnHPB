/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.SimulationView');

goog.require('lgb.simulation.model.MainModel');
goog.require('lgb.simulation.model.voNative.SimStateNative');
goog.require('lgb.component.LinkDataSource');
goog.require('lgb.component.Link');
goog.require('lgb.view.input.DialogView');
goog.require('lgb.simulation.events.SimStateNativeRequest');


/**
 * @constructor
 * @extends {lgb.view.input.DialogView}
 */
lgb.view.SimulationView = function(dataModel) {
  
    lgb.view.input.DialogView.call(this, dataModel, 'simulationView');
    this.title = 'Simulation View';
    this.useSlideEffect = false;

};
goog.inherits(lgb.view.SimulationView, lgb.view.input.DialogView);

lgb.view.SimulationView.prototype.init = function() {
    this.listenForChange_('simStateNative');
    this.listenForChange_('messageStruct');
    this.listenForChange_('xmlParsedInfo');
    this.listenForChange_('scalarValueResults');
    this.listenForChange_('webSocketConnectionState');
};



lgb.view.SimulationView.prototype.onChange_webSocketConnectionState_ = function(webSocketConnectionState) {
  
  this.disableAllButtons();
  var state = lgb.simulation.model.WebSocketConnectionState;
  

  switch (webSocketConnectionState) {

      case state.uninitialized :
          // this.connectLink_.setEnabled(false);
          break;
      case state.open_requested :
          // this.connectLink_.setEnabled(false);
          break;
      case state.opened :
          this.connectLink_.setEnabled(true);
          break;
      case state.closed :
          // this.connectLink_.setEnabled(true);
          break;
      case state.timed_out :
          // this.connectLink_.setEnabled(true);
          break;
      case state.dropped :
          // this.connectLink_.setEnabled(true);
          break;
      case state.error :
          // this.connectLink_.setEnabled(false);
          debugger;
          break;
      default :
        debugger;
  }
  

  return;
};

lgb.view.SimulationView.prototype.onChange_simStateNative_ = function(simStateNative) {
  
    this.disableAllButtons();

    switch (simStateNative) {

        case lgb.simulation.model.voNative.SimStateNative.simStateNative_0_uninitialized :
            this.connectLink_.setEnabled(true);
            break;
        case lgb.simulation.model.voNative.SimStateNative.simStateNative_1_connect_completed :
            this.xmlParseLink_.setEnabled(true);
            break;
        case lgb.simulation.model.voNative.SimStateNative.simStateNative_2_xmlParse_completed :
            this.initLink_.setEnabled(true);
            break;

        case lgb.simulation.model.voNative.SimStateNative.simStateNative_3_ready :
            this.runLink_.setEnabled(true);
            this.stepLink_.setEnabled(true);
            this.terminateLink_.setEnabled(true);
            this.clearLink_.setEnabled(true);
            break;

        case lgb.simulation.model.voNative.SimStateNative.simStateNative_4_run_started :
            this.stopLink_.setEnabled(true);
            break;

    }
};

lgb.view.SimulationView.prototype.onChange_messageStruct_ = function(messageStruct) {
  this.messageBox_.append(messageStruct.msgText + '<br />' + "\n");
};

lgb.view.SimulationView.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  var dataItem = {};
    var fields = {time:  { type: "number" , width: "100px" } };
    dataItem.time = 0;
    
    this.scalarVariablesAll_ = xmlParsedInfo.scalarVariablesAll_;
    this.columnHeaders_ = ['time'];

    var resultLogVars = this.scalarVariablesAll_.output_.realVarList_;


    var fields = {time: { type: "number" }};
    
    var len = resultLogVars.length;
    for (var i = 0, j = len; i < j; i++) {

        var oneVar = resultLogVars[i];

        var propertyName = oneVar.name_;
        propertyName = propertyName.split('[').join('_');
        propertyName = propertyName.split(']').join('');
        fields[propertyName] = { type: "number" , width: "150px" };
        
        this.columnHeaders_ .push(propertyName);
        
        dataItem[propertyName] = 1;
    };
    

    var dataAry = [dataItem];

    
    
    
    this.resultLogDataSource_ = new kendo.data.DataSource( {
      data: dataAry,
      schema: {
           model: {
               fields: fields
           }
       }

       }
    );
    
    this.resultsLogGrid_ = $('<div>');
    this.resultsLogBox_.append( this.resultsLogGrid_ );
    
    this.resultsLogGrid_.kendoGrid({
        dataSource : this.resultLogDataSource_,
        autoBind: true,
        height:700,
        scrollable: true,
        groupable: false,
        pageable: false
    });
    

    this.resultsLogGrid_.css('width', "12000px");
  
};


lgb.view.SimulationView.prototype.onChange_scalarValueResults_ = function(scalarValueResults) {
  
    var time = scalarValueResults.time_;
    
    var realVarList = scalarValueResults.output.realList;
    var newRow = {time:time};
    
    for (var i = 1, j = this.columnHeaders_.length; i < j; i++) {
        var columnHeader = this.columnHeaders_[i];
        newRow[columnHeader] = realVarList[i-1].value_;
    };
    
    var model = new kendo.data.Model(newRow);
    this.resultLogDataSource_.insert(0,model);
};




lgb.view.SimulationView.prototype.inject = function(parentElement) {
  
    goog.base(this, 'inject', parentElement);
  
    this.makeDialog_();
    this.makeTopPanel_();
    this.makeBottomPanel_();
    
    this.bind2_();
};


/**
 * event handler
 * @private
 * @param {lgb.events.Event} event The Event.
 */
lgb.view.SimulationView.prototype.onClickSimStateNativeRequest_ = function(event) {

    var simState = event.target.data;

    var e = new lgb.simulation.events.SimStateNativeRequest(simState);
    this.dispatchLocal(e);

};



/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.SimulationView.prototype.bind2_ = function() {

    //data model changed
    
    var len = this.topPanelButtons_.length;
    for (var i = 0; i < len - 1; i++) {

        var button = this.topPanelButtons_[i];

        button.bind();
        this.listenTo(button, e.MouseClick, this.onClickSimStateNativeRequest_);

    };

};



/**
 * Event handler triggered when the user clicks the
 * close button (x) on the dialog.
 * @param {goog.events.Event} event The event received.
 */
lgb.view.SimulationView.prototype.onCloseButtonClicked = function(event) {

    this.triggerLocal(e.ViewClosed);

};

/**
 * @private
 */
lgb.view.SimulationView.prototype.makeTopPanel_ = function() {

    this.topPanelID = this.htmlID + '-topPanel';

    this.topPanelButtons_ = new Array();

    // linkHtml = '';
    var ds = new lgb.component.LinkDataSource('Connect~', this.htmlID, 'connect')
    this.connectLink_ = new lgb.component.Link(ds);
    this.connectLink_.data = lgb.simulation.model.voNative.SimStateNative.simStateNative_1_connect_requested;
    this.topPanelButtons_.push(this.connectLink_);

    var ds2 = new lgb.component.LinkDataSource('XML Parse {}', this.htmlID, 'xmlParse-link')
    this.xmlParseLink_ = new lgb.component.Link(ds2);
    this.xmlParseLink_.data = lgb.simulation.model.voNative.SimStateNative.simStateNative_2_xmlParse_requested;

    this.topPanelButtons_.push(this.xmlParseLink_);

    var ds3 = new lgb.component.LinkDataSource('Init ^', this.htmlID, 'init-link')
    this.initLink_ = new lgb.component.Link(ds3);
    this.initLink_.data = lgb.simulation.model.voNative.SimStateNative.simStateNative_3_init_requested;

    this.topPanelButtons_.push(this.initLink_);

    var ds4 = new lgb.component.LinkDataSource('Run >', this.htmlID, 'run-link')
    this.runLink_ = new lgb.component.Link(ds4);
    this.runLink_.data = lgb.simulation.model.voNative.SimStateNative.simStateNative_4_run_requested;

    this.topPanelButtons_.push(this.runLink_);

    var ds5 = new lgb.component.LinkDataSource('Step >', this.htmlID, 'step-link')
    this.stepLink_ = new lgb.component.Link(ds5);
    this.stepLink_.data = lgb.simulation.model.voNative.SimStateNative.simStateNative_5_step_requested;

    this.topPanelButtons_.push(this.stepLink_);

    var ds6 = new lgb.component.LinkDataSource('Stop []', this.htmlID, 'stop-link')
    this.stopLink_ = new lgb.component.Link(ds6);
    this.stopLink_.data = lgb.simulation.model.voNative.SimStateNative.simStateNative_5_stop_requested;

    this.topPanelButtons_.push(this.stopLink_);

    var ds7 = new lgb.component.LinkDataSource('Terminate.', this.htmlID, 'terminate-link')
    this.terminateLink_ = new lgb.component.Link(ds7);
    this.terminateLink_.data = lgb.simulation.model.voNative.SimStateNative.simStateNative_7_terminate_requested;

    this.topPanelButtons_.push(this.terminateLink_);

    var ds8 = new lgb.component.LinkDataSource('Clear -', this.htmlID, 'clear-link')
    this.clearLink_ = new lgb.component.Link(ds8);
    this.topPanelButtons_.push(this.clearLink_);

    var linkHtml = "";
    //this.topPanelButtons_[0].getHTML2();

    var len = this.topPanelButtons_.length;
    for (var i = 0; i < len; i++) {

        var button = this.topPanelButtons_[i];

        button.ds.isEnabled = false;
        linkHtml += button.getHTML2();

    };

    var divHtml = '<div id="{0}" class="simulationViewClass">' + linkHtml + '</div>';
    divHtml = divHtml.format(this.topPanelID);
    this.dialog.append(divHtml);

};


lgb.view.SimulationView.prototype.disableAllButtons = function() {

    var len = this.topPanelButtons_.length;
    for (var i = 0; i < len; i++) {
        var button = this.topPanelButtons_[i];
        button.setEnabled(false);
    };

};

lgb.view.SimulationView.prototype.makeBottomPanel_ = function() {

    this.mainPanel_ = $('<div>').attr('id', "simulationViewMainPanel");
    this.append(this.mainPanel_);
    

    var tabsID = 'simulationView-tabs';
    var tabStripID = 'simulationView-tabstrip';

    var htmlTabs = '<div id="{0}" class="k-content">' + '<div id="{1}" />' + '</div>';

    htmlTabs = htmlTabs.format(tabsID, tabStripID);

    this.mainPanel_.append(htmlTabs);
    
    this.tabStripContainer_ = $('#' + tabStripID);
    this.mainPanel_.append(this.tabStripContainer_);
    

    this.kendoTabStrip = this.tabStripContainer_.kendoTabStrip({
        animation : false
    }).data('kendoTabStrip');

    this.kendoTabStrip.append([{
        text : 'Console',
        content: "<br> Console"
    }, {
        text : 'Input',
        content: "<br> Input"
    }, {
        text : 'Output',
        content: "<br> Output"
    }, {
        text : 'Results Log',
        content: "<br> Results"
    }]);

    this.kendoTabStrip.select(this.kendoTabStrip.tabGroup[0].children[0]);
    
    this.messageBox_ = $(this.kendoTabStrip.contentElements[0]);
    this.inputBox_ = $(this.kendoTabStrip.contentElements[1]);
    this.outputBox_ = $(this.kendoTabStrip.contentElements[2]);
    this.resultsLogBox_ = $(this.kendoTabStrip.contentElements[3]);

};


lgb.view.SimulationView.prototype.makeDialog_ = function() {

    var el = this.getMainElement();
    el.direction = 'left';

    this.dialog = el.dialog({
      title: this.title,
      dialogClass: this.htmlID + '-dialog',
      hide: 'fade',
        width : 800,
        height : 900,
        position : ['center', 'center'],
      autoOpen: false
    });
    
    el.bind('dialogclose', this.d(this.onCloseButtonClicked));
};

