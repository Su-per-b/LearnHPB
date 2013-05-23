/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

/**
 * @author Raj Dye - raj@rajdye.com
 */

goog.provide('lgb.component.TreeDataSourceH');

goog.require('lgb.component.BaseDataSource');
goog.require('lgb.events.DataModelInitialized');


lgb.component.TreeDataSourceH = function(lgbNode, propertyName, parentHtmlID, subID) {
  
  //this.rootNode = rootNode;
  this.title_ = lgbNode.title;
  this.propertyName_ = propertyName;
  
  lgb.component.BaseDataSource.call(this);

  this.parentHtmlID = parentHtmlID;
  this.generateHTMLid_();
  
  this.changedItems_ = [];
  
  if(lgbNode) {
    this.build_(lgbNode);
  }

};
goog.inherits(lgb.component.TreeDataSourceH, lgb.component.BaseDataSource);


lgb.component.TreeDataSourceH.prototype.generateHTMLid_ = function(node) {
  
    var str = this.title_.split(' ').join('');
    str = str.split('.').join('');
    
    this.htmlID = this.parentHtmlID + '-' + str;
    
}

lgb.component.TreeDataSourceH.prototype.update = function(lgbNode) {

  var n = this.makeKendoNodes_(lgbNode);
  
  //var options = {
 //   data : [this.rootKendoNode]
 // };

 // this.kendoDS.init(options);

  

  
  this.kendoDS.add(n);
  //this.kendoDS.read();
  
  //this.rootNode.load();

  
  //this.kendoDS.load();
  
  //n.load();
 
  //this.rootNode.load();
  
  //this.kendoDS.read();
  //this.rootKendoNode.load();

 // this.bind_();
};

lgb.component.TreeDataSourceH.prototype.build_ = function(lgbNode) {


  this.rootKendoNode = this.makeKendoNodes_(lgbNode);
  
  
  var options = {
    data : [this.rootKendoNode]
  };

  this.kendoDS = new kendo.data.HierarchicalDataSource(options);
  this.kendoDS.read();

  this.rootNode = this.kendoDS.get(0);
  this.rootNode.load();

  this.bind_();
  
  return;

};
  


lgb.component.TreeDataSourceH.prototype.makeOneKendoNode_ = function(lgbNode) {
  
  var knode = {
    text : lgbNode.title,
    checked : lgbNode[this.propertyName_],
    hasChildren : lgbNode.hasChildren,
    id :lgbNode.idx,
    idx : lgbNode.idx
  };
  
  return knode;
  
};

lgb.component.TreeDataSourceH.prototype.makeKendoNodes_ = function(lgbNode, parentKendoNode) {
  
  //convert node
  var knode = this.makeOneKendoNode_(lgbNode);
  
  //add to parent
  if (parentKendoNode) {
    if(undefined == parentKendoNode.items) {
      parentKendoNode.items = [knode];
    } else {
      parentKendoNode.items.push(knode);
    }
  }
  
  if (knode.hasChildren) {
    this.each(lgbNode.children, this.makeKendoNodes_, knode)
  }
  
  return knode;
};

  
lgb.component.TreeDataSourceH.prototype.bind_ = function() {

  this.kendoDS.bind("change", this.d(this.onChangeDS_));
 // this.kendoDS.bind("update", this.d(this.onUpdate_));
//  this.kendoDS.bind("sync", this.d(this.onSync_));

};


lgb.component.TreeDataSourceH.prototype.onSync_ = function(event) {
 
 return; 
};


lgb.component.TreeDataSourceH.prototype.onUpdate_ = function(event) {
 
 return; 
};


lgb.component.TreeDataSourceH.prototype.getChangedItems = function() {

  return this.changedItems_;
  
};


lgb.component.TreeDataSourceH.prototype.onChangeDS_ = function(event) {



  if (event.field == "checked") {

    this.changedItems_ = [];
    this.view_ = this.kendoDS.view();
    
    event.items.forEach(this.d(this.processOneItem));
    
    if (this.changedItems_.length > 0) {
      
      this.changedItems_.propertyName = this.propertyName_;
      this.dispatchChange(this.changedItems_);
    }

  }

};

lgb.component.TreeDataSourceH.prototype.processOneItem = function(node, idx, that) {


  if (node.idx > -1) {
    
    var statusItem = {
      idx : node.idx,
      newValue : node.checked,
      text : node.text
    };
  
    this.changedItems_.push(statusItem);
    
  }

}

