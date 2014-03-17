goog.provide('lgb.gui.view.LeftPanelGUISimple');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.LeftPanelGUISimple = function(dataModel) {

  this._TITLE = 'LeftPanelGUI';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.init_();
};
goog.inherits(lgb.gui.view.LeftPanelGUISimple, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgb.gui.view.LeftPanelGUISimple.prototype.init_ = function() {


  
};


lgb.gui.view.LeftPanelGUISimple.prototype.add = function(gui) {


  var el = this.getMainElement();
  gui.injectTo(el);
  
};


/**
 * @public
 */
lgb.gui.view.LeftPanelGUISimple.prototype.injectTo = function(parentElement) {
  
    
  var el = this.getMainElement();
  
    
   var titleDiv = $('<div>').css({
      width:"120px",
      height:"40px",
      "background-image":"url(images/laura/logo.png)",
      "background-repeat":"no-repeat",
    })
    .attr('title', 'Learn High Performance Buildings');
    
    
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
     
   goog.base(this,  'injectTo', parentElement);
   
   
   return;
     

    
    

  
    
};




