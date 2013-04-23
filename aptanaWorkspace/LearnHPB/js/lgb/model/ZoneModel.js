/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ZoneModel');

goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.model.ModelBase');
goog.require('lgb.model.ZoneShapeModel');
goog.require('lgb.model.ViewPointCollection');

/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.ZoneModel = function() {
  /**
   * @const
   * @type {string}
   */
  this._NAME = 'lgb.model.ZoneModel';
  this._TITLE = 'Zones';
  this.init_();
  this.zoneIdxVisible = -1;

};
goog.inherits(lgb.model.ZoneModel, lgb.model.ModelBase);


/**
 * Sets default properties.
 * @private
 */
lgb.model.ZoneModel.prototype.init_ = function() {
  this.z = [];

  this.z[0] = new lgb.model.ZoneShapeModel(4.5, 0, 4.5);
  this.z[1] = new lgb.model.ZoneShapeModel(28.524599075317383, 0, 4.7540998458862305);
  this.z[2] = new lgb.model.ZoneShapeModel(4.7540998458862305, 0, 4.7540998458862305);
  this.z[3] = new lgb.model.ZoneShapeModel(4.7540998458862305, 0, 15.24000048637390125);
  this.z[4] = new lgb.model.ZoneShapeModel(28.524599075317383, 0, 15.24000048637390125);
  this.z[5] = new lgb.model.ZoneShapeModel(4.7540998458862305, 0, 15.24000048637390125);
  this.z[6] = new lgb.model.ZoneShapeModel(4.7540998458862305, 0, 4.7540998458862305);
  this.z[7] = new lgb.model.ZoneShapeModel(28.524599075317383, 0, 4.7540998458862305);
  this.z[8] = new lgb.model.ZoneShapeModel(4.7540998458862305, 0, 4.7540998458862305);
  

  
  var currentX = 0;
  var currentZ = 0;
  
  var len = 3;
  
  for (var j = 0; j < 3; j++) {

      for (var i = 0; i < 3; i++) {
          
           var idx = (j * 3) + i;
           this.z[idx].position = new THREE.Vector3(currentX, 0, currentZ);
           
           currentX += this.z[i].dimensions.x;
           
      }
      
      currentX = 0;
      currentZ += this.z[idx].dimensions.z;
  }
  

 

};


/**
 * updates the geometry and location of the zones
 * @param {lgb.model.EnvelopeModel} envelopeModel The data model to
 * use in the computation.
 */
lgb.model.ZoneModel.prototype.update = function(envelopeModel) {

  this.floorHeight = envelopeModel.floorHeight;
  this.envelopeModel = envelopeModel;

  this.dispatchChange(
      {
        config: true
      }
  );

};


/**
 * @param {number} zoneIdx Used to locate the zone in an array.
 * @param {boolean} makeVisible Used to change the visibility.
 */
lgb.model.ZoneModel.prototype.setVisible = function(zoneIdx, makeVisible) {

  var theZone = this.z[zoneIdx];
  if (theZone.isVisible != makeVisible) {

    theZone.isVisible = makeVisible;


    this.dispatchChange(
      {
        isVisible: true,
        zoneIdx: zoneIdx,
        config: false
      }
    );
  }
};


lgb.model.ZoneModel.prototype.setViewPointCollection = function(viewPointCollection) {

    this.viewPointCollection_ = viewPointCollection;
    
};


