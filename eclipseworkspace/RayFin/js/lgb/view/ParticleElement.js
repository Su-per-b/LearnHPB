goog.provide('lgb.view.ParticleElement');

goog.require ("lgb.view.ViewBase");




/**
 * MVC View 
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.ParticleElement = function(curve) {
	lgb.view.ViewBase.call(this);
	
	this.vertex = new THREE.Vertex(
	    new THREE.Vector3(0, 0, 0)
	);
     
    this.launchDelayBetweenParticles = 10;
};

goog.inherits(lgb.view.ParticleElement, lgb.view.ViewBase);

lgb.view.ParticleElement.prototype.assignPath = function(path) {
	
	this.path = path;
	
};

lgb.view.ParticleElement.prototype.assignId = function(id) {
	
	this.id = id;
	this.launchDelayFrames = this.launchDelayBetweenParticles * id;
	this.currentFrameNumber = 0;
	
};



lgb.view.ParticleElement.prototype.render = function() {
	
	if(this.launchDelayFrames > 0 ) {
		this.launchDelayFrames--
	} else {
		
		//get the position
		var pos = this.path.frameToPositionMap[this.currentFrameNumber];
		
		this.vertex.position.x = pos[0];
		this.vertex.position.y = pos[1];
		this.vertex.position.z = pos[2];
		
		this.currentFrameNumber++;

		if (this.currentFrameNumber > this.path.frameToPositionMap.length-1) {
			this.currentFrameNumber = 0;
		}
		
		
	}
	
	
};
    
	    





	
	






