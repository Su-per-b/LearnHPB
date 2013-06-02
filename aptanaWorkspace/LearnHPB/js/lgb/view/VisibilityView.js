/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.VisibilityView');



goog.require('lgb.model.VisibilityModel');
goog.require('lgb.view.BaseV');


/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseV}
 */
lgb.view.VisibilityView = function(dataModel) {

  lgb.view.BaseV.call(this, dataModel, "VisibilityView", null);
};
goog.inherits(lgb.view.VisibilityView, lgb.view.BaseV);


/**
 * Initializes the View
 */
lgb.view.VisibilityView.prototype.init = function() {

  var list = this.dataModel.getVisibilityGroupList();
  
  //make the data source for the component
  
  this.treeDS_ = new lgb.component.TreeDataSource(list,'isVisible',
    'Visibility',  this.htmlID, 'visibility');
      
  
  this.bind_();
  

};


