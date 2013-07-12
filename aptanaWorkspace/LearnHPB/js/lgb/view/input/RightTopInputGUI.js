/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.RightTopInputGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.input.RightTopInputGUI = function(dataModel) {
  
  this._TITLE = "RightTop";
  this.layoutID = lgb.Config.LAYOUT_ID.RightTopInputGUI;
  
  lgb.view.BaseViewGUI.call(this, dataModel, 'RightTopInputGUI');
};
goog.inherits(lgb.view.input.RightTopInputGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.RightTopInputGUI.prototype.init = function() {
  
  this.trigger(e.RequestAddToLayout, this);
};




lgb.view.input.RightTopInputGUI.prototype.bind_ = function() {
  


      
}


lgb.view.input.RightTopInputGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  var el = this.getMainElement();
  var titleDiv = el.append('<h4>RightTop Stuff</h4>');
  
  
  var dataSource3 = new sim.component.TabStripDataSource
        ('TabStripTitle', '', 'tabStrip3');
     
  dataSource3.setIcon("images/tabs/viewBtn_grid_25.png", 25, 25);
      
  dataSource3.addTab('', 'content 1 <br />', 1);
  dataSource3.addTab('', 'content 2 <br />', 2);
  dataSource3.addTab('', 'content 3 <br />', 3);
  dataSource3.addTab('', 'content 4 <br />', 4);
  dataSource3.addTab('', 'content 5 <br />', 5);
  dataSource3.addTab('', 'content 6 <br />', 6);
  dataSource3.addTab('', 'content 7 <br />', 7);
  dataSource3.addTab('', 'content 8 <br />', 8);
  dataSource3.addTab('', 'content 9 <br />', 9);
  
  this.tabStrip3 = new sim.component.TabStrip(dataSource3);
  
  this.tabStrip3.setOptions(
      {
          width : 500
          
      }
  );
  
  el.append(this.tabStrip3);
};

