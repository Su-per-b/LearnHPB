/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.EnvelopeModel');

goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.EnvelopeModel = function() {

  lgb.model.BaseModel.call(this);
  
  this.init_();
};
goog.inherits(lgb.model.EnvelopeModel, lgb.model.BaseModel);


/**
 * Initializes the MVC Model setting default properties.
 * @private
 */
lgb.model.EnvelopeModel.prototype.init_ = function() {

  /**@const */
  this._TITLE = 'Envelope Model';

  lgb.model.BaseModel.call(this);

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


