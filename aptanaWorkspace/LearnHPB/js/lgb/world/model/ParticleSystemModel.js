/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.ParticleSystemModel');


goog.require('lgb.world.model.BaseModel');
goog.require('lgb.utils.XmlWrapper');


/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 * @param {Object} systemConfig The particle system config
 * generated by parsing the XML.
 */
lgb.world.model.ParticleSystemModel = function(systemConfig, idx) {


  this.idx = idx;

  /**@type {string} */
  this.title = systemConfig.title;

  lgb.world.model.BaseModel.call(this);

  this.isRunning = false;
  this.isStarted = false;
  this.showBoxes = false;
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
goog.inherits(lgb.world.model.ParticleSystemModel, lgb.world.model.BaseModel);





lgb.world.model.ParticleSystemModel.prototype.changeProperty_isStarted = function( newValue) {
  
    this.isStarted = newValue;
    
    if (this.isStarted) {
      if (!this.isRunning) {
        this.isRunning = true;
      }
      if (!this.isEmitting) {
        this.isEmitting = true;
      }
    } else {
      if (this.isEmitting) {
        this.isEmitting = false;
      }
    }
    
   
   this.dispatchChangedEx('isRunning', this.isRunning);
    
};


lgb.world.model.ParticleSystemModel.prototype.changePropertyEx = function(name, newValue) {

    if (this[name] != newValue) {
      if (name == 'isStarted') {
        this.changeProperty_isStarted(newValue);
      } else {
        
        goog.base(this, 'changePropertyEx', name, newValue);

      }
    }
};


