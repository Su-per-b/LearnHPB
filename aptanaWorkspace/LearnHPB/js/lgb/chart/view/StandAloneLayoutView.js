goog.provide('lgb.gui.view.StandAloneLayoutView');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');



lgb.gui.view.StandAloneLayoutView = function(dataModel) {

  this._TITLE = 'StandAloneLayoutView';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSource('StandAloneLayoutView-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);
  
};
goog.inherits(lgb.gui.view.StandAloneLayoutView, lgb.gui.view.BaseGUI);



lgb.gui.view.StandAloneLayoutView.prototype.init = function() {
    this.triggerLocal(e.RequestAddToLayout, this);
};


lgb.gui.view.StandAloneLayoutView.prototype.add = function(gui) {

  var title = gui.getTitle();

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title];
  } else {
    
    contentElement = this.tabStrip1.addTab(title);
    
    contentElement.css("min-height","100%");
    contentElement.css("height","100%");
    contentElement.css("overflow","none");
    
    
    this.tabTitleMap_[title] = contentElement;
  }
  
  gui.injectTo(contentElement);
  
};


/**
 * @public
 */
lgb.gui.view.StandAloneLayoutView.prototype.injectTo = function(parentElement) {
  
  goog.base(this,  'injectTo', parentElement);

  var el = this.getMainElement();
  

  el.append('<h4>Simulation</h4>');
  el.append('<h5>Websockets</h5>');
  
  el.append('State:');
  
  this.wsStatus_ = $('<strong>{}</strong>');

  el.append(this.wsStatus_);
  el.append('<br />');
  
  this.wsConnectLink_ = this.makeLink1_('Socket Open', 'wsConnect');
  this.wsDisConnectLink_ = this.makeLink1_('Socket Close', 'wsDisConnect');

  el.append('<br />');
  
   
  el.append('<h5>Simulation Control</h5>');
  
  el.append('State:');
  this.simStatus_ = $('<strong>{}</strong>');
  el.append(this.simStatus_);
  el.append('<br />');

  
  this.simControlButtons_ = new Array();
  var SimStateNative = lgb.simulation.model.voNative.SimStateNative;
  
  
  this.makeLink2_('Connect~', 'connect-link', SimStateNative.simStateNative_1_connect_requested);
  this.makeLink2_('XML Parse {}', 'xmlParse-link', SimStateNative.simStateNative_2_xmlParse_requested);
  this.makeLink2_('Init ^', 'init-link', SimStateNative.simStateNative_3_init_requested);
  el.append('<br />');
  
  this.makeLink2_('Run ^', 'run-link', SimStateNative.simStateNative_4_run_requested);
  this.makeLink2_('Step >', 'step-link', SimStateNative.simStateNative_5_step_requested);
  this.makeLink2_('Stop []', 'stop-link', SimStateNative.simStateNative_5_stop_requested);
  el.append('<br />');
  
  this.makeLink2_('Terminate.', 'terminate-link', SimStateNative.simStateNative_7_terminate_requested);
  
  el.append('<br />');
  el.append('<h5>Simulation Info</h5>');
  
  el.append('Time:');
  
  this.simTime_ = $('<strong>{}</strong>');
  el.append(this.simTime_);
  
  
  this.bind2_();
  
};


