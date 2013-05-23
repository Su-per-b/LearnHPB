/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/

goog.provide('lgb.component.Tree');
goog.require('lgb.view.BaseV');
goog.require('lgb.events.DataSourceChanged');

/**
 * Html component that contains a cusmtom Tree
 * @param {string} parentHtmlID The CSS id of the parent.
 * @param {string} subID The second  part fo the CSS id.
 * @param {string} title Ysed for the label of the component.
 * @constructor
 * @extends {lgb.BaseV}
 */
lgb.component.Tree = function(ds) {
    
  lgb.view.BaseV.call(this);
  
  lgb.assert (ds);
  this.ds = ds;
  
  this.nodeStatusList_ = [];
};
goog.inherits(lgb.component.Tree, lgb.view.BaseV);






lgb.component.Tree.prototype.makeElement = function() {

  this.mainDiv_= $('<div>');
  
  this.kendoTreeView_ = this.mainDiv_.kendoTreeView(
    {
    expanded : true,
    loadOnDemand : false,
    checkboxes : {
      checkChildren : true
    },
    dataSource : this.ds.kendoDS

  }).data("kendoTreeView");
  
  
  return this.mainDiv_;
};




