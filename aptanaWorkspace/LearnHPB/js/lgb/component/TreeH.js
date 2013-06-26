/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/

goog.provide('lgb.component.TreeH');
goog.require('lgb.view.BaseV');


/**
 * Html component that contains a cusmtom TreeH
 * @param {string} parentHtmlID The CSS id of the parent.
 * @param {string} subID The second  part fo the CSS id.
 * @param {string} title Ysed for the label of the component.
 * @constructor
 * @extends {lgb.BaseV}
 */
lgb.component.TreeH = function(ds) {
    
  lgb.view.BaseV.call(this);
  
  lgb.assert (ds);
  this.ds = ds;
  
  this.nodeStatusList_ = [];
};
goog.inherits(lgb.component.TreeH, lgb.view.BaseV);


lgb.component.TreeH.prototype.bind_ = function() {
  
    this.listenTo(
        this.ds,
        e.DataModelChanged,
        this.onDataModelChanged_
    );
    
    this.kendoTreeView_.bind("select", this.d(this.onSelect_));
}


lgb.component.TreeH.prototype.onDataModelChanged_ = function(event) {
  
 // var whatIsDirty = event.payload;
  
 // if (whatIsDirty.selectedKNode) {
   // this.triggerLocal(e.Select, this.ds.selectedKNode);
 // }
  
  this.triggerLocal(e.Select, this.ds.selectedKNode);
};



lgb.component.TreeH.prototype.getHtml = function() {

  var el = $('<div>'); 
  this.setMainElement(el);
  
  var options =     {
    expanded : true,
    loadOnDemand : false,
    dataSource : this.ds.kendoDS
  };
  
  if (this.ds.propertyName_ != null) {
    options.checkboxes =  {checkChildren : true}
  }
  
  this.kendoTreeView_ =           
    el.kendoTreeView(options).data("kendoTreeView");
  
  this.bind_();
  
  return el;
};

lgb.component.TreeH.prototype.onSelect_ = function(event) {

  var uid = event.node.dataset.uid;
  this.ds.select(uid);

}


