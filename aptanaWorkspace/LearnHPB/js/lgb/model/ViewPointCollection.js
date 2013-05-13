/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewPointCollection');

goog.require('lgb.model.BaseModel');
goog.require('lgb.model.ViewPointNode');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.ViewPointCollection = function(name, object3Dlist, showViewPoints) {
    
  /**@const */
  this._NAME = 'lgb.model.ViewPointCollection';
  
  /**@const */
  this._TITLE = 'ViewPointCollection';
  lgb.model.BaseModel.call(this);
  
  this.name = name;
  this.nodeList = [];
  this.showViewPoints = showViewPoints || false;
  this.init_(object3Dlist);
};
goog.inherits(lgb.model.ViewPointCollection, lgb.model.BaseModel);



/**
 * @private
 */
lgb.model.ViewPointCollection.prototype.init_ = function(object3Dlist) {
    
    var len = object3Dlist.length;
    
    for (var i = 0; i < len; i++) {
      
        var object3d = object3Dlist[i];
       
        var node = new lgb.model.ViewPointNode(object3d, this, i);
        this.nodeList.push(node);
    }
    
};



lgb.model.ViewPointCollection.prototype.getNode = function(idx) {
    
    return this.nodeList[idx];
    
};

lgb.model.ViewPointCollection.prototype.getNodeList = function() {
    
    return this.nodeList;
    
};



lgb.model.ViewPointCollection.prototype.getTreeData = function() {
               
    var it = [];         
    var len = this.nodeList.length;
    
    for (var i = 0; i < len; i++) {
        var node = this.nodeList[i];
        it.push({ 
            text: node.name,
            id : this.name + '-' + node.name,
            value: node.value,
            hasChildren:false
        });
    }
    
    var d = { 
        text: this.name,
        url: '#' + this.url,
        value: this.name,
        id: 'root',
        items: it
        };
        
        
    return d;
    
};









