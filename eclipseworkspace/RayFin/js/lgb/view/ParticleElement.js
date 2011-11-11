goog.provide('lgb.view.ParticleElement');

goog.require('lgb.view.ViewBase');




/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.ParticleElement = function(pMaterial, pMaterialHide) {
  lgb.view.ViewBase.call(this);

  this.pMaterial = pMaterial;
  this.pMaterialHide = pMaterialHide;

  this.threeParticle = new THREE.Particle();

  //this.vertex = new THREE.Vertex(
  //    new THREE.Vector3(0, 0, 0)
  //);

  this.currentFrameNumber = 0;
    this.isFinished = false;
  this._NAME = 'lgb.view.ParticleElement';
};
goog.inherits(lgb.view.ParticleElement, lgb.view.ViewBase);

lgb.view.ParticleElement.prototype.assignPath = function(path) {
  this.path = path;
};

lgb.view.ParticleElement.prototype.assignId = function(id) {

  this.id = id;
  //this.launchDelayFrames = this.launchDelayBetweenParticles * id;
  //this.currentFrameNumber = 0;

};


lgb.view.ParticleElement.prototype.reset = function(id) {
//  this.threeParticle.scale.set(1, 1, 1);
  this.currentFrameNumber = 0;
  this.isFinished = false;
  this.setVisible(true);
};


lgb.view.ParticleElement.prototype.setVisible = function(makeVisible) {
  if (makeVisible) {
    //this.threeParticle.materials.opacity = 1;
  } else {
    //this.threeParticle.materials[0].opacity = 0.1;
    this.threeParticle.position.set(1000, 1000, 0);
    //this.threeParticle.scale.set(0, 0, 0);
    //this.threeParticle.parent.remove(this.threeParticle);
  }
};

lgb.view.ParticleElement.prototype.render = function() {


  if (this.isFinished) {
    throw ('should not render particle that is finished');
  }

  //get the postion
  var pos = this.path.frameToPositionMap[this.currentFrameNumber];

  //set the position
  this.threeParticle.position.set(pos[0], pos[1], pos[2]);

  this.currentFrameNumber++;

  if (this.currentFrameNumber > this.path.frameToPositionMap.length - 1) {
    this.isFinished = true;
    this.setVisible(false);
  }

};















