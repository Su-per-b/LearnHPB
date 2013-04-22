/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewPointModel');

goog.require('lgb.model.ModelBase');
goog.require('lgb.model.ViewPointNode');

/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.ViewPointModel = function() {
  /**@const */
  this._NAME = 'lgb.model.ViewPointModel';
  /**@const */
  this._TITLE = 'ViewPoints';
  lgb.model.ModelBase.call(this);
  this.init_();
  
};
goog.inherits(lgb.model.ViewPointModel, lgb.model.ModelBase);


/**
 * @private
 */
lgb.model.ViewPointModel.prototype.init_ = function() {
    
  this.masterViewPointList_ = [];
  this.kendoDS = new kendo.data.HierarchicalDataSource({});
  
};

/**
 * @param {string} name The camera name.
 */
/*
lgb.model.ViewPointModel.prototype.getCameraByName = function(name) {

  return this.viewPointNodeMap[name];
  
};
*/



lgb.model.ViewPointModel.prototype.addViewPointCollection = function(viewPointCollection) {

   var list = viewPointCollection.getNodeList();
   var len = list.length;
   
   var idx  = this.masterViewPointList_.length;
    
    for (var i = 0; i < len; i++) {
        var viewPointNode = list[i];
        viewPointNode.value = idx;
        
        this.masterViewPointList_[idx] = viewPointNode;
        
        idx++
    }
   
   
   
    var d = viewPointCollection.getTreeData();
       
    this.kendoDS.add(d);
    
  
      this.dispatchChange(
          {
            viewPointCollection: viewPointCollection
          }
      );
  
};

lgb.model.ViewPointModel.prototype.getViewPoint = function(idx) {
    
    return this.masterViewPointList_[idx];

};


/**
 * @param {Array.<THREE.Camera>} cameras An array of camera objects.
 */
/*
lgb.model.ViewPointModel.prototype.addCameras = function(cameras) {

  for (var camName in cameras) {
    
    if (undefined !== camName) {
      
        var theCamera = cameras[camName];
        theCamera.name = camName;
    
        this.camMap[camName] = theCamera;
        this.cameras.push(theCamera);

    }

  }

};
*/
