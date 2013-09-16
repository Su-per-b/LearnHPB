/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

/**
 * @author Raj Dye - raj@rajdye.com
 */

goog.provide('lgb.component.TreeH');

goog.require('lgb.world.view.BaseV');
goog.require('lgb.component.TreeDataSourceH');

/**
 * Html component that contains a cusmtom TreeH
 * @param {string} parentHtmlID The CSS id of the parent.
 * @param {string} subID The second  part fo the CSS id.
 * @param {string} title Ysed for the label of the component.
 * @constructor
 * @extends {lgb.BaseV}
 */
lgb.component.TreeH = function(ds) {

  lgb.world.view.BaseV.call(this);

  lgb.assert(ds);
  this.ds = ds;

  this.nodeStatusList_ = [];
  
};
goog.inherits(lgb.component.TreeH, lgb.world.view.BaseV);

lgb.component.TreeH.prototype.bind_ = function() {

  this.kendoTreeView_.bind("select", this.d(this.onSelect_));

  if (true == this.ds.options.events.mouseOver ) {
    this.kendoTreeView_.wrapper.on("mouseenter.kendoTreeView", ".k-in", this.d(this.onMouseEnter_));
    this.kendoTreeView_.wrapper.on("mouseleave.kendoTreeView", ".k-in", this.d(this.onMouseLeave_));
  }

};


lgb.component.TreeH.prototype.onChange_showKNode_ = function(knode) {

  var uid = event.node.dataset.uid;
  this.ds.select(uid);

};


lgb.component.TreeH.prototype.onSelect_ = function(event) {

  var uid = event.node.dataset.uid;
  this.ds.select(uid);

};

lgb.component.TreeH.prototype.onMouseEnter_ = function(event) {

  var liElement = event.currentTarget.parentElement.parentElement;
  var dataItem = this.kendoTreeView_.dataItem(liElement);

  if (dataItem.focusEvent) {
    this.ds.setFocus(dataItem.uid);
  }

};

lgb.component.TreeH.prototype.onMouseLeave_ = function(event) {

  var liElement = event.currentTarget.parentElement.parentElement;
  var dataItem = this.kendoTreeView_.dataItem(liElement);

  if (dataItem.focusEvent) {
    this.ds.removeFocus(dataItem.uid);
  }
};




lgb.component.TreeH.prototype.getHtml = function() {

  var el = $('<div>');
  this.setMainElement(el);

  var options = {
    expanded : true,
    loadOnDemand : false,
    dataSource : this.ds.kendoDS
  };

  if (this.ds.propertyName_ != null) {
    options.checkboxes = {
      checkChildren : true
    };
  }

  this.kendoTreeView_ = el.kendoTreeView(options).data("kendoTreeView");

  this.bind_();

  return el;
};






