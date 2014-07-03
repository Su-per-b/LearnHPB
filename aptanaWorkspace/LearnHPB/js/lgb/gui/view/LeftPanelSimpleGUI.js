goog.provide('lgb.gui.view.LeftPanelSimpleGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');


/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.LeftPanelSimpleGUI = function(dataModel) {

  this._TITLE = 'LeftPanelGUI';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.init_();
};
goog.inherits(lgb.gui.view.LeftPanelSimpleGUI, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgb.gui.view.LeftPanelSimpleGUI.prototype.init_ = function() {


  
};


lgb.gui.view.LeftPanelSimpleGUI.prototype.add = function(gui) {


  var el = this.getMainElement();
  gui.injectInto(el);
  
};


/**
 * @public
 */
lgb.gui.view.LeftPanelSimpleGUI.prototype.injectInto = function(parentElement) {
  
    
  var el = this.getMainElement();
  
    
   var titleDiv = $('<div>')
    .attr('title', 'Learn High Performance Buildings')
    .addClass("logo-lhpb");
    
    var toolTipConfig = {
      skin: 'light',
      hook: {
        target: 'leftmiddle',
        tooltip: 'rightmiddle'
      },
      background: { color: '#fff', opacity: .95 },
      closeButton: false
    };

   Tipped.create(titleDiv, toolTipConfig);
  
  
   this.append(titleDiv);
   
 
   parentElement.append(el);  
     


  
    
};




