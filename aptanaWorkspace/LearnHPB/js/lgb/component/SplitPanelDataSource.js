/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/

goog.provide('lgb.component.SplitPanelDataSource');

goog.require('lgb.world.view.BaseV');
goog.require('lgb.component.BaseDataSource');

/**
 * Html component that contains a cusmtom SplitPanel
 * @param {string} parentHtmlID The CSS id of the parent.
 * @param {string} subID The second  part fo the CSS id.
 * @param {string} title Ysed for the label of the component.
 * @constructor
 * @extends {lgb.BaseV}
 */
lgb.component.SplitPanelDataSource = function() {
    
  lgb.component.BaseDataSource.call(this);

  
  this.pane1 = {
    size:'250px'
  };
  
  
};
goog.inherits(lgb.component.SplitPanelDataSource, lgb.component.BaseDataSource);






lgb.component.SplitPanelDataSource.prototype.makeElement = function() {


};




