/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.PsModel');

goog.require('lgb.events.DataModelChanged');
goog.require('lgb.model.ModelBase');
goog.require('lgb.utils.XmlParser');


/**
 * @constructor
 * @extends lgb.model.ModelBase
 * @param {Object} systemConfig The particle system config
 * generated by parsing the XML.
 */
lgb.model.PsModel = function(systemConfig) {

  /**
   * @const
   * @type {string}
   */
  this._NAME = 'lgb.model.PsModel';

  /**@type {string} */
  this.title = systemConfig.title;

  lgb.model.ModelBase.call(this);

  this.isRunning = false;
  this.showBoxes = true;
  this.showCurves = false;
  this.isEmitting = true;
  this.particleCount = systemConfig.particleCount;
  this.particleSize = systemConfig.particleSize;
  this.meshes = systemConfig.meshes;
  this.rotate = systemConfig.rotate;
  this.translate = systemConfig.translate;
  this.id = systemConfig.id;
  this.launchDelayBetweenParticles = systemConfig.launchDelayBetweenParticles;
  this.lifeSpanInSeconds = systemConfig.lifeSpanInSeconds;
};
goog.inherits(lgb.model.PsModel, lgb.model.ModelBase);




/**
 * @param {Object} stateObject Contains information about what to change.
 */
lgb.model.PsModel.prototype.change = function(stateObject) {

  var isAnythingDirty = false;
  var whatIsDirty = {};

  if (stateObject.isRunning != null &&
    stateObject.isRunning != this.isRunning) {

    this.isRunning = stateObject.isRunning;
    whatIsDirty.isRunning = true;
    isAnythingDirty = true;
  }

  if (stateObject.showBoxes != null &&
    stateObject.showBoxes != this.showBoxes) {

    this.showBoxes = stateObject.showBoxes;
    whatIsDirty.showBoxes = true;
    isAnythingDirty = true;
  }

  if (stateObject.showCurves != null &&
    stateObject.showCurves != this.showCurves) {

    this.showCurves = stateObject.showCurves;
    whatIsDirty.showCurves = true;
    isAnythingDirty = true;
  }

  if (stateObject.isEmitting != null &&
    stateObject.isEmitting != this.isEmitting) {

    this.isEmitting = stateObject.isEmitting;
    whatIsDirty.isEmitting = true;
    isAnythingDirty = true;
  }

  if (isAnythingDirty) {
    this.dispatchLocal(new lgb.events.DataModelChanged(whatIsDirty));
  }

};
