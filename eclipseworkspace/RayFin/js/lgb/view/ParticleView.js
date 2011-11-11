goog.provide('lgb.view.ParticleView');

goog.require('lgb.events.MeshLoaded');
goog.require('lgb.view.ViewBase');




/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.ParticleView = function() {
  lgb.view.ViewBase.call(this);


  this.init();
  this._NAME = 'lgb.view.ParticleView';
};
goog.inherits(lgb.view.ParticleView, lgb.view.ViewBase);



/**
 * Initializes the View
 */
lgb.view.ParticleView.prototype.init = function() {

  this.volX = 5;
  this.volY = 5;
  this.volZ = 5;

  this.particleCount = 200;
  this.particles = new THREE.Geometry();

  // create the particle variables
  var pMaterial = new THREE.ParticleBasicMaterial({
          color: 0x6666ff,
          size: 1,
          map: THREE.ImageUtils.loadTexture(
              '3d-assets/textures/circle.png'
          ),
          blending: THREE.AdditiveBlending,
          transparent: true
      });



  // now create the individual particles
  for (var p = 0; p < this.particleCount; p++) {

      // create a particle with random
      // position values, -250 -> 250
      var pX = (Math.random() * this.volX) - this.volX / 2,
          pY = (Math.random() * this.volY) - this.volY / 2,
          pZ = (Math.random() * this.volZ) - this.volZ / 2,

          particle = new THREE.Vertex(
              new THREE.Vector3(pX, pY, pZ)
          );




      // add it to the geometry
      this.particles.vertices.push(particle);
  }

  // create the particle system
  this.particleSystem = new THREE.ParticleSystem(
      this.particles,
      pMaterial);

  // also update the particle system to
  // sort the particles which enables
  // the behaviour we want
  //this.particleSystem.sortParticles = true;


  //var event = new lgb.events.MeshLoaded(this.particleSystem);
  //this.dispatchLocal(event);

  this.listen(lgb.events.Render.TYPE, this.onRender);

};



lgb.view.ParticleView.prototype.onRender = function(event) {

   // add some rotation to the system
   // this.particleSystem.rotation.y += 0.01;

    var pCount = this.particleCount;
    while (pCount--) {
        // get the particle
        var particle = this.particles.vertices[pCount];

        // check if we need to reset
        if (particle.position.y < -200) {
           // particle.position.y = 200;
        }


    }

    // flag to the particle system that we've
    // changed its vertices. This is the
    // dirty little secret.
    this.particleSystem.geometry.__dirtyVertices = true;


};
