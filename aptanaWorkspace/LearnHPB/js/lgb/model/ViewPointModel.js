/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewPointModel');

goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.ViewPointModel = function() {

  /**@const */
  this._TITLE = 'ViewPoints';
  lgb.model.BaseModel.call(this);
  this.init_();
  this.name = "";
};
goog.inherits(lgb.model.ViewPointModel, lgb.model.BaseModel);


/**
 * @private
 */
lgb.model.ViewPointModel.prototype.init_ = function() {
    
  this.masterViewPointList_ = [];
  this.kendoDS = new kendo.data.HierarchicalDataSource({});

};



lgb.model.ViewPointModel.prototype.addViewPointCollection = function(viewPointCollection) {
 

   var list = viewPointCollection.getNodeList();
   var len = list.length;
    
    for (var i = 0; i < len; i++) {
        var viewPointNode = list[i];
        this.masterViewPointList_[viewPointNode.value] = viewPointNode;
    }
   

   var d = viewPointCollection.getTreeData();
       
    this.kendoDS.add(d);
    
 
    this.dispatchChange(
        {
          viewPointCollection: viewPointCollection
        }
    );
  
};

lgb.model.ViewPointModel.prototype.getViewPoint = function(key) {
    
    return this.masterViewPointList_[key];

};


