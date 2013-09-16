/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

/**
 * @author Raj Dye - raj@rajdye.com
 */

goog.provide('lgb.component.TreeDataSourceH');
goog.require('lgb.component.BaseDataSource');


lgb.component.TreeDataSourceH = function(lgbNode, propertyName, parentHtmlID, subID, title) {

  
  if(title) {
    this.title_ = title;
  }
  
  this.propertyName_ = propertyName;
  
  lgb.component.BaseDataSource.call(this);

  this.parentHtmlID = parentHtmlID;
  this.generateHTMLid_();
  
  this.changedItems_ = [];
  
  if(lgbNode) {
    this.build_(lgbNode);
    
    if (!this.title_) {
        this.title_ = lgbNode.title;
    }
  }
  
  this.selectedKNode = null;
  this.showKNode = null;
  this.hideKNode = null;
  
  
  this.options =  (
    {
      events : {mouseOver:false}
    }
  );

};
goog.inherits(lgb.component.TreeDataSourceH, lgb.component.BaseDataSource);


lgb.component.TreeDataSourceH.prototype.setOptions = function(options) {
  this.options = options;
};


lgb.component.TreeDataSourceH.prototype.select = function(uid) {
    var knode = this.kendoDS.getByUid(uid);
    this.changePropertyEx('selectedKNode', knode);
};

lgb.component.TreeDataSourceH.prototype.setFocus = function(uid) {
    var knode = this.kendoDS.getByUid(uid);
    this.changePropertyEx('showKNode', knode);
    this.hideKNode = null;
};

lgb.component.TreeDataSourceH.prototype.removeFocus = function(uid) {
    var knode = this.kendoDS.getByUid(uid);
    this.changePropertyEx('hideKNode', knode);
    this.showKNode = null;
};


lgb.component.TreeDataSourceH.prototype.generateHTMLid_ = function(node) {
  
    var str = this.title_.split(' ').join('');
    str = str.split('.').join('');
    
    this.htmlID = this.parentHtmlID + '-' + str;
    
};

lgb.component.TreeDataSourceH.prototype.update = function(lgbNode) {

  if (this.rootNode) {
    var n = this.makeKendoNodes_(lgbNode);
    this.kendoDS.add(n);
  } else {
    this.build_(lgbNode);
  }

};

lgb.component.TreeDataSourceH.prototype.build_ = function(lgbNode) {


  this.rootKendoNode = this.makeKendoNodes_(lgbNode);
  
  var options = {
    data : [this.rootKendoNode]
  };

  this.kendoDS = new kendo.data.HierarchicalDataSource(options);
  this.kendoDS.read();

  this.rootNode = this.kendoDS.get(this.rootKendoNode.id);
  this.rootNode.load();

  this.bind_();
  
};
  


lgb.component.TreeDataSourceH.prototype.makeOneKendoNode_ = function(lgbNode) {
  
  var knode = {
    text : lgbNode.title,
    hasChildren : lgbNode.hasChildren,
    id :lgbNode.idx,
    focusEvent : lgbNode.focusEvent
  };
  
  
  if (this.propertyName_ != null) {
    knode.checked = lgbNode[this.propertyName_];
  }
  
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
    this.each(lgbNode.children, this.makeKendoNodes_, knode);
  }
  
  return knode;
};

  
lgb.component.TreeDataSourceH.prototype.bind_ = function() {
  
  this.kendoDS.bind("change", this.d(this.onChangeDS_));
  
};



lgb.component.TreeDataSourceH.prototype.onChangeDS_ = function(event) {

  if (event.field == "checked") {

    this.changedItems_ = [];
    this.view_ = this.kendoDS.view();
    
    event.items.forEach(this.d(this.processOneItem));
    
    if (this.changedItems_.length > 0) {
      this.dispatchChangedEx('changedItems', this.changedItems_);
    }

  }

};

lgb.component.TreeDataSourceH.prototype.processOneItem = function(node, idx, that) {


  if (node.id > -1) {
    
    var statusItem = {
      id : node.id,
      newValue : node.checked,
      text : node.text
    };
  
    this.changedItems_.push(statusItem);
    
  }

};

