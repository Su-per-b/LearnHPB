/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ParticleElement');

goog.require('lgb.view.ViewBase');




/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {THREE.ParticleBasicMaterial} pMaterial the material to use.
 */
lgb.view.ParticleElement = function(pMaterial) {
    
  this._NAME = 'lgb.view.ParticleElement';
  
  lgb.view.ViewBase.call(this);

  this.pMaterial = pMaterial;
  this.threeParticle = new THREE.Particle(pMaterial);

  this.currentFrameNumber = 0;
  this.isFinished = false;

};
goog.inherits(lgb.view.ParticleElement, lgb.view.ViewBase);


/**
 * I made an accessor.
 * @param {lgb.view.ParticlePath} path This particle should follwo this path.
 */
lgb.view.ParticleElement.prototype.assignPath = function(path) {
  this.path = path;
};


/**
 * I made an accessor for this property.  There
 * is probably a better way to do this.
 * @param {string} id The ID or idx of htis particle.
 */
lgb.view.ParticleElement.prototype.assignId = function(id) {
  this.id = id;
};


/**
 * The Particle Element has finished its trip along the path,
 * now it is rest.
 */
lgb.view.ParticleElement.prototype.reset = function() {
  this.currentFrameNumber = 0;
  this.isFinished = false;
  this.setVisible(true);
};


/**
 * acessor.
 * @param {boolean} makeVisible If true then show.
 */
lgb.view.ParticleElement.prototype.setVisible = function(makeVisible) {
  if (makeVisible) {
    //this.threeParticle.materials.opacity = 1;
  } else {
    this.threeParticle.position.set(1000, 1000, 0);
  }
};


/**
 * called by the controller I think.
 */
lgb.view.ParticleElement.prototype.render = function() {


  if (this.isFinished) {
    throw ('should not render particle that is finished');
  }

  //get the postion
  var vector3 = this.path.frameToPositionMap[this.currentFrameNumber];

  //set the position
  this.threeParticle.position.copy(vector3);

  
  this.currentFrameNumber++;

  if (this.currentFrameNumber > this.path.frameToPositionMap.length - 1) {
    this.isFinished = true;
    this.setVisible(false);
  }

};















