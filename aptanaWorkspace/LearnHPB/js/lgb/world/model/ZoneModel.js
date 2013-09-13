/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.ZoneModel');

goog.require('lgb.world.model.BaseModel');
goog.require('lgb.world.model.ZoneShapeModel');

/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.world.model.ZoneModel = function() {

  this._TITLE = 'Zones';
  this.init_();
  this.zoneIdxVisible = -1;

};
goog.inherits(lgb.world.model.ZoneModel, lgb.world.model.BaseModel);


/**
 * Sets default properties.
 * @private
 */
lgb.world.model.ZoneModel.prototype.init_ = function() {
  this.z = [];

  this.z[0] = new lgb.world.model.ZoneShapeModel(4.5, 0, 4.5);
  this.z[1] = new lgb.world.model.ZoneShapeModel(28.524599075317383, 0, 4.7540998458862305);
  this.z[2] = new lgb.world.model.ZoneShapeModel(4.7540998458862305, 0, 4.7540998458862305);
  this.z[3] = new lgb.world.model.ZoneShapeModel(4.7540998458862305, 0, 15.24000048637390125);
  this.z[4] = new lgb.world.model.ZoneShapeModel(28.524599075317383, 0, 15.24000048637390125);
  this.z[5] = new lgb.world.model.ZoneShapeModel(4.7540998458862305, 0, 15.24000048637390125);
  this.z[6] = new lgb.world.model.ZoneShapeModel(4.7540998458862305, 0, 4.7540998458862305);
  this.z[7] = new lgb.world.model.ZoneShapeModel(28.524599075317383, 0, 4.7540998458862305);
  this.z[8] = new lgb.world.model.ZoneShapeModel(4.7540998458862305, 0, 4.7540998458862305);
  
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
 * @param {lgb.world.model.EnvelopeModel} envelopeModel The data model to
 * use in the computation.
 */
lgb.world.model.ZoneModel.prototype.setEnvelopeModel = function(envelopeModel) {

  this.envelopeModel = envelopeModel;
  this.dispatchChangedEx('envelopeModel', envelopeModel);
   
};


/**
 * @param {number} zoneIdx Used to locate the zone in an array.
 * @param {boolean} makeVisible Used to change the visibility.
 */
lgb.world.model.ZoneModel.prototype.setVisible = function(zoneIdx, makeVisible) {

  var theZone = this.z[zoneIdx-1];
  
  if (undefined == theZone) {
    debugger;
  }
  
  if (theZone.isVisible != makeVisible) {

    theZone.isVisible = makeVisible;

     var statusObject = {   
         isVisible: makeVisible,
         zoneIdx: zoneIdx
     };
    
    this.dispatchChangedEx('isVisible', statusObject);
    
  }
  
  
};


