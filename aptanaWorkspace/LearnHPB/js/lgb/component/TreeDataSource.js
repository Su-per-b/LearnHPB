/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */

/**
 * @author Raj Dye - raj@rajdye.com
 */

goog.provide('lgb.component.TreeDataSource');

goog.require('lgb.component.BaseDataSource');



/**
 * @constructor
 * @extends {lgb.component.BaseDataSource}
 */
lgb.component.TreeDataSource = function(objectList, propertyName, title, parentHtmlID, subID) {

  
  this.title_ = title;
  this.propertyName_ = propertyName;
  
  lgb.component.BaseDataSource.call(this);

  this.parentHtmlID = parentHtmlID;
  this.htmlID = parentHtmlID + '-' + subID;
  this.changedItems_ = [];
  
  if(objectList) {
    this.build_(objectList);
  }

};
goog.inherits(lgb.component.TreeDataSource, lgb.component.BaseDataSource);



lgb.component.TreeDataSource.prototype.build_ = function(objectList) {

  var items = [];
  
  objectList.forEach( function(val, idx) {
    
    items.push(
      { text:val.title,
        checked:val[this.propertyName_ ],
        idx:val.idx,
        hasChildren : false
       }
    );
    
  });
  
  var rootNodeAry = [{
    text : this.title_,
    items : items,
    checked : false,
    hasChildren : true,
    id : 0,
    idx:-1
  }];

  var options = {
    data : rootNodeAry
  };

  this.kendoDS = new kendo.data.HierarchicalDataSource(options);
  this.kendoDS.read();

  this.rootNode  = this.kendoDS.get(0);
  this.rootNode .load();

  this.bind_();
};


  
lgb.component.TreeDataSource.prototype.bind_ = function() {

  this.kendoDS.bind("change", this.d(this.onChangeDS_));

};

lgb.component.TreeDataSource.prototype.getChangedItems = function() {

  return this.changedItems_;
  
};


lgb.component.TreeDataSource.prototype.onChangeDS_ = function(event) {

  if (event.field == "checked") {

    this.changedItems_ = [];
    this.view_ = this.kendoDS.view();
    
    event.items.forEach(this.d(this.processOneItem));
    
    if (this.changedItems_.length > 0) {
      
      this.changedItems_.propertyName = this.propertyName_;
      this.dispatchChangedEx('changedItems', this.changedItems_);
    }

  }

};

lgb.component.TreeDataSource.prototype.processOneItem = function(node, idx, that) {


  if (node.idx > -1) {
    
    var statusItem = {
      idx : node.idx,
      isChecked : node.checked,
      text : node.text
    };
  
    this.changedItems_.push(statusItem);
    
  }

};

