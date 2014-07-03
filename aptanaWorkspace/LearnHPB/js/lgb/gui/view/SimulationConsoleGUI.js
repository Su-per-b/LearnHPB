goog.provide('lgb.gui.view.SimulationConsoleGUI');

goog.require('lgb.gui.view.BaseGUI');



/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.SimulationConsoleGUI = function(dataModel) {

  this._TITLE = 'Console';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 74;
};
goog.inherits(lgb.gui.view.SimulationConsoleGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.SimulationConsoleGUI.prototype.init = function() {
  
    var el = this.getMainElement();
    
    el.css({
       "overflow-y":"scroll",
       "height":"100%"
    });
    

    this.listenForChange_('messageStruct');
};


lgb.gui.view.SimulationConsoleGUI.prototype.calculateLayout = function() {
  
  
  var p = this.getParentElement();
  var gp = p[0].parentElement;
  var paneHeight = gp.clientHeight;

  var contentHeight = paneHeight - this.totalHeaderHeight_;
  var cssStr = contentHeight + 'px';
  
  this.getMainElement().css("height", cssStr);
     
};


lgb.gui.view.SimulationConsoleGUI.prototype.injectInto = function(parentElement) {
  
  goog.base(this,  'injectInto', parentElement);
  this.calculateLayout();
  
};



lgb.gui.view.SimulationConsoleGUI.prototype.onChange_messageStruct_ = function(messageStruct) {
  
  var el = this.getMainElement();
  el.prepend(  messageStruct.msgText + '<br />' + "\n");
  

};

