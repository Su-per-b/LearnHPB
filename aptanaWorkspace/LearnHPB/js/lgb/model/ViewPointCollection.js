/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewPointCollection');

goog.require('lgb.model.ModelBase');
goog.require('lgb.model.ViewPointNode');


/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.ViewPointCollection = function(name, object3Dlist) {
    
  /**@const */
  this._NAME = 'lgb.model.ViewPointCollection';
  
  /**@const */
  this._TITLE = 'ViewPointCollection';
  lgb.model.ModelBase.call(this);
  
  this.name = name;
  //this.url = name;
  this.nodeList = [];

  this.init_(object3Dlist);
};
goog.inherits(lgb.model.ViewPointCollection, lgb.model.ModelBase);



/**
 * @private
 */
lgb.model.ViewPointCollection.prototype.init_ = function(object3Dlist) {
    
    var len = object3Dlist.length;
    
    for (var i = 0; i < len; i++) {
        var node = new lgb.model.ViewPointNode(object3Dlist[i]);
       // node.url = '#' + this.name + '-' + node.name;
        node.value = this.name + '-' + i;
        
        this.nodeList.push(node);
    }
    
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








