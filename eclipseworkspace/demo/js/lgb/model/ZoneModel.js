/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ZoneModel');

goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.model.ModelBase');
goog.require('lgb.model.ZoneShapeModel');


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

  this.z[0] = new lgb.model.ZoneShapeModel(15, 0, 15, 0, 0, 0);
  this.z[1] = new lgb.model.ZoneShapeModel(90, 0, 15, 15, 0, 0);
  this.z[2] = new lgb.model.ZoneShapeModel(15, 0, 15, 105, 0, 0);
  this.z[3] = new lgb.model.ZoneShapeModel(15, 0, 50, 0, 0, 15);
  this.z[4] = new lgb.model.ZoneShapeModel(90, 0, 50, 15, 0, 15);
  this.z[5] = new lgb.model.ZoneShapeModel(15, 0, 50, 105, 0, 15);
  this.z[6] = new lgb.model.ZoneShapeModel(15, 0, 15, 0, 0, 65);
  this.z[7] = new lgb.model.ZoneShapeModel(90, 0, 15, 15, 0, 65);
  this.z[8] = new lgb.model.ZoneShapeModel(15, 0, 15, 105, 0, 65);

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


