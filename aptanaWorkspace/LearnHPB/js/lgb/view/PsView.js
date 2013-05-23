/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.PsView');

goog.require('lgb.events.Object3DLoaded');
goog.require('lgb.events.RequestDataModelChange');

goog.require('lgb.view.ParticleElement');
goog.require('lgb.view.ParticlePath');
goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {lgb.view.BaseView}
 * @param {lgb.model.PsModel} dataModel The data model to display.
 */
lgb.view.PsView = function(dataModel) {

  this._NAME = 'lgb.view.PsView';
  lgb.view.BaseView3dScene.call(this, dataModel);

  this.title = dataModel.title;

  this.topFloorMaxY_ = null;
  this.sceneY_ = null;
};
goog.inherits(lgb.view.PsView, lgb.view.BaseView3dScene);

/**
 * Event Handler.
 * @param {lgb.events.DataModelChanged} event The event.
 */
lgb.view.PsView.prototype.onChange = function(event) {

  var whatIsDirty = event.payload;

  if (whatIsDirty.isRunning) {
    this.updateIsRunning_();
  }

  if (whatIsDirty.showBoxes) {
    this.showBoxes(this.dataModel.showBoxes);
  }
  if (whatIsDirty.showCurves) {
    this.showCurves(this.dataModel.showCurves);
  }
};

/**
 * Updates the running state from the dataModel.
 * @private
 */
lgb.view.PsView.prototype.updateIsRunning_ = function() {

  if (this.dataModel.isRunning) {
    this.renderListenerKey = this.listen(lgb.events.Render.TYPE, this.onRender);
  } else {
    if (this.renderListenerKey) {
      this.unlisten(this.renderListenerKey);
    }

  }
};

/**
 * Initializes the View.
 */
lgb.view.PsView.prototype.init = function() {

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

  this.rotationVector = new THREE.Vector3(degreesX, degreesY, degreesZ);

  this.masterGroup_.position = this.positionVector;
  this.masterGroup_.rotation = this.rotationVector;

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
lgb.view.PsView.prototype.parseConfig = function() {
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
lgb.view.PsView.prototype.createSystem = function() {

  var cicle = THREE.ImageUtils.loadTexture('3d-assets/textures/circle.png');

  this.pMaterial = new THREE.ParticleBasicMaterial({
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
    var particleElement = new lgb.view.ParticleElement(this.pMaterial);
    particleElement.setVisible(false);

    this.particleElements[i] = particleElement;
    this.inActiveParticles[i] = particleElement;

    // add it to the geometry
    vec = new THREE.Vector3(particleElement.threeParticle);
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
lgb.view.PsView.prototype.makeVisibleLines_ = function() {

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
lgb.view.PsView.prototype.generateParticlePaths = function() {

  var j = this.particlePathCount;
  while (j--) {

    var curve = this.newCurve();
    var pp = new lgb.view.ParticlePath(curve, this.frameCount);

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
lgb.view.PsView.prototype.newCurve = function() {

  var vec3AlongCurve = [];

  var num = this.dataModel.meshes.length;

  for (var i = 0; i < num; i++) {
    var boxMesh = this.dataModel.meshes[i];
    var vex3 = THREE.GeometryUtils.randomPointsInGeometry( boxMesh.geometry, 1 )[0];
    vec3AlongCurve.push(vex3);
  }

  var splineCurve3 = new THREE.SplineCurve3(vec3AlongCurve);

  return splineCurve3;
};

/**
 * @param {boolean} isVisible whether to show the curves or hide them.
 */
lgb.view.PsView.prototype.showCurves = function(isVisible) {

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
lgb.view.PsView.prototype.showBoxes = function(isVisible) {

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

lgb.view.PsView.prototype.setBuildingHeight = function(buildingHeightModel) {

  this.topFloorMaxY_ = buildingHeightModel.topFloorMaxY;
  this.setY_();
};

lgb.view.PsView.prototype.setY_ = function() {

  if (null != this.topFloorMaxY_ && null != this.sceneY_) {
    this.masterGroup_.position.y = this.topFloorMaxY_ + this.sceneY_;
  }

};

/**
 * event Handler
 * @param {lgb.events.Render} event The event.
 */
lgb.view.PsView.prototype.onRender = function(event) {
  //first remove any particles at the end

  //if none are at the end, create a new particle
  this.currentFrameNumber++;
  if (this.currentFrameNumber > this.launchDelayBetweenParticles) {
    this.currentFrameNumber = 0;

    if (this.inActiveParticles.length > 0 && this.dataModel.isEmitting) {
      var p = this.inActiveParticles.pop();
      p.reset();
      this.activeParticles.push(p);
    } //else if (this.dataModel.isEmitting) {
    //var p = this.makeParticleElement();
    //}
  }

  var i = this.activeParticles.length;
  var popIdxList = [];
  while (i--) {
    var p = this.activeParticles[i];

    if (p == null || p.render == null) {
      throw ('error rendering particle element');
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
