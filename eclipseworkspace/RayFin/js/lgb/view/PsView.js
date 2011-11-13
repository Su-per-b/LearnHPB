goog.provide('lgb.view.PsView');

goog.require('hemi.curve');
goog.require('hemi.curve.Curve');
goog.require('lgb.events.Object3DLoaded');
goog.require('lgb.view.ParticleElement');
goog.require('lgb.view.ParticlePath');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.PsModel} dataModel The data model to display.
 */
lgb.view.PsView = function(dataModel) {
  lgb.view.ViewBase.call(this);

  this.dataModel = dataModel;
  this.listenTo(
    this.dataModel,
    lgb.events.DataModelChanged.TYPE,
    this.onDataModelChanged
  );

  this._NAME = 'lgb.view.PsView';
};
goog.inherits(lgb.view.PsView, lgb.view.ViewBase);


/**
 * Event Handler.
 * @param {lgb.events.DataModelChanged} event The event.
 */
lgb.view.PsView.prototype.onDataModelChanged = function(event) {

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
    this.unlisten(this.renderListenerKey);
  }
};


/**
 * Initializes the View.
 */
lgb.view.PsView.prototype.init = function() {

  /**@type THREE.Object3D */
  //this.boxGroup = null;

  /**@type THREE.Object3D */
  this.visibleLineGroup = null;

  /**@type THREE.Object3D */
  this.systemGroup = new THREE.Object3D();
  this.systemGroup.name = 'PsView-systemGroup';

  /**@type THREE.Object3D */
  this.masterGroup = new THREE.Object3D();
  this.masterGroup.name = 'PsView-masterGroup';

  this.masterGroup.add(this.systemGroup);
  this.parseConfig();

  this.positionVector = new THREE.Vector3(
      this.dataModel.translate[0],
    this.dataModel.translate[1],
    this.dataModel.translate[2]
  );

  var degreesX = this.dataModel.rotate[0] * Math.PI / 180;
  var degreesY = this.dataModel.rotate[1] * Math.PI / 180;
  var degreesZ = this.dataModel.rotate[2] * Math.PI / 180;

  this.rotationVector = new THREE.Vector3(
      degreesX,
    degreesY,
    degreesZ
  );

  this.masterGroup.position = this.positionVector;
  this.masterGroup.rotation = this.rotationVector;

  this.generateParticlePaths();
  this.createSystem();

  this.showBoxes(this.dataModel.showBoxes);
  this.showCurves(this.dataModel.showCurves);


  this.updateIsRunning_();
  this.currentFrameNumber = this.launchDelayBetweenParticles + 1;

  var event = new lgb.events.Object3DLoaded(this.masterGroup);
  this.dispatchLocal(event);

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
          color: 0x0000ff,
          size: 1,
          map: cicle,
          blending: THREE.AdditiveBlending,
          transparent: true
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
      this.particlesGeometry.vertices[i] = particleElement.threeParticle;
      var idx = i % this.particlePathCount;
      particleElement.assignPath(this.particlePaths[idx]);
      particleElement.assignId(i);
  }

  this.activeParticles = [];

  this.threePS = new THREE.ParticleSystem(
    this.particlesGeometry,
    this.pMaterial);

  this.threePS.sortParticles = false;
  this.threePS.dynamic = true;
  this.systemGroup.add(this.threePS);

};


/**
 * creates the THREE.js lines.
 * @private
 */
lgb.view.PsView.prototype.makeVisibleLines_ = function() {
  this.visibleLineGroup = new THREE.Object3D();

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
    var curve = this.newCurve(this.tension);
    var pp = new lgb.view.ParticlePath(curve, this.frameCount);

    this.totalFrames += pp.frameToPositionMap.length;
    this.particlePaths.push(pp);
  }
};


/**
 * Generate a new curve running through the system's bounding boxes.
 *
 * @param {number} tension tension parameter for the curve.
 * @return {hemi.curve.Curve} The randomly generated Curve object.
 */
lgb.view.PsView.prototype.newCurve = function(tension) {
  var pointsAlongCurve = [];


  var num = this.dataModel.meshes.length;

  for (var i = 0; i < num; i++) {
    var boxMesh = this.dataModel.meshes[i];
    var bb = boxMesh.geometry.getBoundingBoxPoints();
    var min = [bb[0].x, bb[0].y, bb[0].z];
    var max = [bb[1].x, bb[1].y, bb[1].z];

    pointsAlongCurve[i + 1] = hemi.curve.randomPoint(min, max);
  }

  //make point 0 and point 1 the same hmm ?
  pointsAlongCurve[0] = pointsAlongCurve[1].slice(0, 3);

  //take the final point and copy it to the end sort-of doubling it
  pointsAlongCurve[num + 1] = pointsAlongCurve[num].slice(0, 3);

  var curve = new hemi.curve.Curve(
    pointsAlongCurve,
    hemi.curve.curveType.Cardinal,
    {tension: tension}
  );

  return curve;
};


/**
 * @param {boolean} isVisible whether to show the curves or hide them.
 */
lgb.view.PsView.prototype.showCurves = function(isVisible) {

  if (isVisible) {
    if (this.visibleLineGroup == null) {
      this.makeVisibleLines_();
    }
    this.masterGroup.add(this.visibleLineGroup);

  } else {
    this.masterGroup.remove(this.visibleLineGroup);
  }
};


/**
 * @param {boolean} isVisible whether to show the boxes or hide them.
 */
lgb.view.PsView.prototype.showBoxes = function(isVisible) {

  if (isVisible) {

    this.boxGroup = new THREE.Object3D();
    var num = this.dataModel.meshes.length;

    for (var i = 0; i < num; i++) {
      var boxMesh = this.dataModel.meshes[i];
      this.boxGroup.add(boxMesh);
    }

    this.masterGroup.add(this.boxGroup);

  } else {
    this.masterGroup.remove(this.boxGroup);
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

    if (p == null) {
      throw ('error rendering particle element');
    }
    if (p.render == null) {
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

    this.threePS.geometry.__dirtyVertices = true;

};
