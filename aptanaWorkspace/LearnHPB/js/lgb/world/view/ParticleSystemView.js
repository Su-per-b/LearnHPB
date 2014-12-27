/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.world.view.ParticleSystemView');

goog.require('lgb.world.view.ParticleElement');
goog.require('lgb.world.view.ParticlePath');
goog.require('lgb.world.view.BaseWorldView');
goog.require('lgb.world.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {lgb.world.view.BaseWorldView}
 * @param {lgb.world.model.ParticleSystemModel} dataModel The data model to display.
 */
lgb.world.view.ParticleSystemView = function(dataModel) {

  lgb.world.view.BaseWorldView.call(this, dataModel);

  this.title = dataModel.title;

  this.topFloorMaxY_ = null;
  this.sceneY_ = null;
  this.listenForChange_('isRunning');
  this.listenForChange_('showBoxes');
  this.listenForChange_('showCurves');

    
};
goog.inherits(lgb.world.view.ParticleSystemView, lgb.world.view.BaseWorldView);


lgb.world.view.ParticleSystemView.prototype.onChange_isRunning_ = function(isRunning) {
    this.updateIsRunning_();
};

lgb.world.view.ParticleSystemView.prototype.onChange_showBoxes_ = function(showBoxes) {
    this.showBoxes(showBoxes);
};

lgb.world.view.ParticleSystemView.prototype.onChange_showCurves_ = function(showCurves) {
    this.showCurves(showCurves);
};




/**
 * Updates the running state from the dataModel.
 * @private
 */
lgb.world.view.ParticleSystemView.prototype.updateIsRunning_ = function() {

  if (this.dataModel.isRunning) {
    this.renderListenerKey_ = this.listen(e.RenderNotify, this.onRender);
  } else {
    if (this.renderListenerKey_) {
      this.unlisten(this.renderListenerKey_);
    }
  }
};

/**
 * Initializes the View.
 */
lgb.world.view.ParticleSystemView.prototype.init = function() {

  /**@type THREE.Object3D */
  this.visibleLineGroup = null;

  /**@type THREE.Object3D */
  this.masterGroup_ = new THREE.Object3D();
  this.masterGroup_.name = 'PsView-masterGroup-' + this.dataModel.title;

  this.parseConfig();

  this.positionVector = new THREE.Vector3(this.dataModel.translate[0], this.dataModel.translate[1], this.dataModel.translate[2]);

  var degreesX = this.dataModel.rotate[0] * Math.PI / 180;
  var degreesY = this.dataModel.rotate[1] * Math.PI / 180;
  var degreesZ = this.dataModel.rotate[2] * Math.PI / 180;

  this.rotationEuler = new THREE.Euler(degreesX, degreesY, degreesZ);

  this.masterGroup_.position = this.positionVector;
  this.masterGroup_.rotation = this.rotationEuler;

  this.generateParticlePaths();
  this.createSystem();

  this.showBoxes(this.dataModel.showBoxes);
  this.showCurves(this.dataModel.showCurves);

  this.updateIsRunning_();
  this.currentFrameNumber = this.launchDelayBetweenParticles + 1;
  this.requestAddToWorld(this.masterGroup_);

};

/**
 * parse the particle system config.
 */
lgb.world.view.ParticleSystemView.prototype.parseConfig = function() {
  this.translate = this.dataModel.translate;
  this.rotate = this.dataModel.rotate;
  this.particlePaths = [];
  this.particleCount = 200;
  this.particlePathCount = 6;
  this.fps = 30;
  this.frameCount = this.dataModel.lifeSpanInSeconds * this.fps;
  this.tension = 0;
  this.currentFrameNumber = 0;
  this.visibleParticleCount = 0;
  this.totalFrames = 0;
  this.launchDelayBetweenParticles = this.dataModel.launchDelayBetweenParticles;

};

/**
 * create the particle system.
 */
lgb.world.view.ParticleSystemView.prototype.createSystem = function() {

  var cicle = THREE.ImageUtils.loadTexture('3d-assets/textures/circle.png');

  this.pMaterial = new THREE.ParticleSystemMaterial({
    color : 0x0000ff,
    size : 0.75,
    map : cicle,
    blending : THREE.AdditiveBlending,
    transparent : true
  });

  this.particlesGeometry = new THREE.Geometry();
  this.particlesGeometry.dynamic = true;
  this.particleElements = [];

  var i = this.particleCount;
  var particlesNeeded = 0;

  this.inActiveParticles = [];

  while (i--) {
    var particleElement = new lgb.world.view.ParticleElement(this.pMaterial);
    particleElement.setVisible(false);

    this.particleElements[i] = particleElement;
    this.inActiveParticles[i] = particleElement;

    // add it to the geometry
    var vec = new THREE.Vector3(particleElement.threeParticle);
    this.particlesGeometry.vertices[i] = particleElement.threeParticle.position;

    var idx = i % this.particlePathCount;
    particleElement.assignPath(this.particlePaths[idx]);
    particleElement.assignId(i);
  }

  this.activeParticles = [];
  this.threePS = new THREE.ParticleSystem(this.particlesGeometry, this.pMaterial);
  this.threePS.name = 'PsView-ParticleSystem-' + this.dataModel.title;

  this.threePS.sortParticles = true;
  this.threePS.dynamic = true;
  this.masterGroup_.add(this.threePS);
};

/**
 * creates the THREE.js lines.
 * @private
 */
lgb.world.view.ParticleSystemView.prototype.makeVisibleLines_ = function() {

  this.visibleLineGroup = new THREE.Object3D();
  this.visibleLineGroup.name = 'PsView-visibleLineGroup-' + this.dataModel.title;

  var j = this.particlePaths.length;
  while (j--) {
    var onePath = this.particlePaths[j];
    var line = onePath.makeVisibleLine();
    this.visibleLineGroup.add(line);
  }
};

/**
 * converts the curves to paths.
 */
lgb.world.view.ParticleSystemView.prototype.generateParticlePaths = function() {

  var j = this.particlePathCount;
  while (j--) {

    var curve = this.newCurve();
    var pp = new lgb.world.view.ParticlePath(curve, this.frameCount);

    this.totalFrames += pp.frameToPositionMap.length;
    this.particlePaths.push(pp);
  }
};

/**
 * Generate a new curve running through the system's bounding boxes.
 *
 * @param {number} tension tension parameter for the curve.
 * @return {THREE.SplineCurve3} The randomly generated Curve object.
 */
lgb.world.view.ParticleSystemView.prototype.newCurve = function() {

  var vec3AlongCurve = [];

  var num = this.dataModel.meshes.length;

  for (var i = 0; i < num; i++) {
    var boxMesh = this.dataModel.meshes[i];
    lgb.assert(boxMesh);
    
    var vex3 = THREE.GeometryUtils.randomPointsInGeometry( boxMesh.geometry, 1 )[0];
    vec3AlongCurve.push(vex3);
  }

  var splineCurve3 = new THREE.SplineCurve3(vec3AlongCurve);

  return splineCurve3;
};

/**
 * @param {boolean} isVisible whether to show the curves or hide them.
 */
lgb.world.view.ParticleSystemView.prototype.showCurves = function(isVisible) {

  if (isVisible) {
    if (this.visibleLineGroup == null) {
      this.makeVisibleLines_();
    }
    this.masterGroup_.add(this.visibleLineGroup);

  } else {

    if (undefined !== this.visibleLineGroup && this.visibleLineGroup !== null) {
      this.masterGroup_.remove(this.visibleLineGroup);
    }

  }
};

/**
 * @param {boolean} isVisible whether to show the boxes or hide them.
 */
lgb.world.view.ParticleSystemView.prototype.showBoxes = function(isVisible) {

  if (isVisible) {

    this.boxGroup_ = new THREE.Object3D();
    this.boxGroup_.name = this.title + '-BoxGroup';

    var len = this.dataModel.meshes.length;

    for (var i = 0; i < len; i++) {
      var boxMesh = this.dataModel.meshes[i];
      this.boxGroup_.add(boxMesh);
    }

    this.masterGroup_.add(this.boxGroup_);

  } else {
    this.masterGroup_.remove(this.boxGroup_);
  }
};

lgb.world.view.ParticleSystemView.prototype.setBuildingHeight = function(buildingHeightModel) {

  this.topFloorMaxY_ = buildingHeightModel.topFloorMaxY;
  this.setY_();
};

lgb.world.view.ParticleSystemView.prototype.setY_ = function() {

  if (null != this.topFloorMaxY_ && null != this.sceneY_) {
    this.masterGroup_.position.y = this.topFloorMaxY_ + this.sceneY_;
  }

};

/**
 * event Handler
 * @param {e.RenderNotify} event The event.
 */
lgb.world.view.ParticleSystemView.prototype.onRender = function(event) {
  //first remove any particles at the end

  //if none are at the end, create a new particle
  this.currentFrameNumber++;
  if (this.currentFrameNumber > this.launchDelayBetweenParticles) {
    this.currentFrameNumber = 0;

    if (this.inActiveParticles.length > 0 && this.dataModel.isEmitting) {
      var p = this.inActiveParticles.pop();
      p.reset();
      this.activeParticles.push(p);
    }
    
  }

  var i = this.activeParticles.length;
  var popIdxList = [];
  while (i--) {
    var p = this.activeParticles[i];

    if (p == null || p.render == null) {
      lgb.logSevere ('error rendering particle element');
    }

    p.render();

    if (p.isFinished) {
      popIdxList.push(i);
    }
  }

  if (popIdxList.length > 0) {
    var finishedParticle = this.activeParticles.splice(popIdxList[0], 1)[0];
    this.inActiveParticles.push(finishedParticle);
  }

  if (!this.dataModel.isEmitting) {
    if (this.activeParticles.length < 1) {
      if (this.dataModel.isRunning) {
        this.requestDataModelChange('isRunning', false);
      }
    }
  }

  this.threePS.geometry.verticesNeedUpdate = true;
};
