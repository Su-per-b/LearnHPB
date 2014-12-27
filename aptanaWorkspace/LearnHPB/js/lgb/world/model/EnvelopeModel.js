/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.EnvelopeModel');

goog.require('lgb.core.BaseModel');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.EnvelopeModel = function() {

  lgb.core.BaseModel.call(this);
  
  this.init();
};
goog.inherits(lgb.world.model.EnvelopeModel, lgb.core.BaseModel);


/**
 * Initializes the MVC Model setting default properties.
 * @private
 */
lgb.world.model.EnvelopeModel.prototype.init = function() {

  /**@const */
  this._TITLE = 'Envelope Model';

  lgb.core.BaseModel.call(this);

  this.floorCount = 5;
  this.floorHeight = 11;
  this.floorWidth = 125;
  this.floorDepth = 80;
  
  this.floorWidthMeters = 38.032798767089844;
  this.floorDepthMeters = 24.384000778198242;
  this.floorHeightMeters = 4.267199993133545;
  
   
  this.floorHeightOptions = [9,11,13];
  this.floorHeightOptionsMeters = 
  [3.6576159000396728,
  4.267199993133545,
  4.8768000602722168];
  
  this.isVisible = true;


};


