goog.provide('lgb.view.ParticleSystem');

goog.require ("lgb.view.ViewBase");
goog.require ("hemi.curve");
goog.require ("hemi.curve.Curve");

goog.require ("lgb.view.ParticleWrapper");
goog.require('lgb.view.ParticlePath');
goog.require('lgb.view.ParticleElement');
goog.require('lgb.event.Object3DLoadedEvent');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.ParticleSystem = function(dataModel) {
	lgb.view.ViewBase.call(this);
	
	this.dataModel = dataModel;
	
	this.listenTo(this.dataModel, lgb.event.DataModelChanged, this.onDataModelChanged);
	
	//this.init();

};



goog.inherits(lgb.view.ParticleSystem, lgb.view.ViewBase);

lgb.view.ParticleSystem.prototype.onDataModelChanged = function(event) {
	this.init();
}


/** 
 * Initializes the View
 */
lgb.view.ParticleSystem.prototype.init = function() {
	
	
	this.boxGroup = new THREE.Object3D();
	this.curveGroup = new THREE.Object3D();
	this.systemGroup = new THREE.Object3D();
	this.masterGroup = new THREE.Object3D();
	
	this.masterGroup.add(this.boxGroup);
	this.masterGroup.add(this.curveGroup);
	this.masterGroup.add(this.systemGroup);
	
	this.parseConfig();
	
	this.positionVector = new THREE.Vector3(
	    this.translate[0], 
		this.translate[1], 
		this.translate[2]
	);
	
	var degreesX = this.rotate[0] * Math.PI / 180;
	var degreesY = this.rotate[1] * Math.PI / 180;
	var degreesZ = this.rotate[2] * Math.PI / 180;
	
	this.rotationVector = new THREE.Vector3(
	    degreesX, 
		degreesY, 
		degreesZ
	);
	
	this.masterGroup.position = this.positionVector;
	this.masterGroup.rotation = this.rotationVector;
	
	var event = new lgb.event.Object3DLoadedEvent(this.masterGroup);
	this.dispatch(event);
	
	
	//this.makeBoxes();
	this.generateParticlePaths();
	this.showParticlePaths();
	this.createParticleSystem();
	
	//this.totalFrames
};


lgb.view.ParticleSystem.prototype.parseConfig = function() {
	this.translate = this.dataModel.translate;
	this.rotate = this.dataModel.rotate;
	this.config = this.dataModel.configs['1'];
	this.boxes = this.config.boxes;
	this.particlePaths = [];
	this.particleCount = 200;
	this.launchDelayBetweenParticles = 4;
	this.particlePathCount = 6;
	this.fps = 30;
	this.frameCount = this.config.life * this.fps;
	this.tension = 0;
	this.currentFrameNumber = 0;
	this.visibleParticleCount = 0;
	this.totalFrames = 0;
	
};

lgb.view.ParticleSystem.prototype.createParticleSystem = function() {

	var pMaterial = new THREE.ParticleBasicMaterial({
	        color: 0x6666ff,
	        size: 1,
	        map: THREE.ImageUtils.loadTexture(
	            "3d-assets/textures/circle.png"
	        ),
	        blending: THREE.AdditiveBlending,
	        transparent: true
	    });
	    
	this.particlesGeometry = new THREE.Geometry();
	this.particleWrapperAry = [];
	this.particleElements = [];
	
	var i = this.particleCount;
	
	while(i--) {
	        
        var particleVertex = new THREE.Vertex(
            new THREE.Vector3(0, 0, 0)
        );
        
        var particleElement = new lgb.view.ParticleElement();
	    this.particleElements[i] = particleElement;
	    
	    // add it to the geometry
	    this.particlesGeometry.vertices[i] = particleElement.vertex;


	    var idx = i % this.particlePathCount;
	    
	    particleElement.assignPath(this.particlePaths[idx]);
	    particleElement.launchDelayBetweenParticles = this.launchDelayBetweenParticles;
	    particleElement.assignId(i);
	    
	}
	

	this.threeParticleSystem = new THREE.ParticleSystem(
	    this.particlesGeometry,
	    pMaterial);
	
	this.threeParticleSystem.sortParticles = true;

	this.systemGroup.add(this.threeParticleSystem);
	

	this.listen(lgb.event.RenderEvent, this.onRender); 
};



lgb.view.ParticleSystem.prototype.showParticlePaths = function() {
		
    var j = this.particlePaths.length;
    while(j--) {
    	var onePath = this.particlePaths[j];
    	var line = onePath.makeVisibleLine();
    	this.curveGroup.add(line); 
    }
    

	
	
	//var event = new lgb.event.MeshLoadedEvent(this.curveGroup);
	//this.dispatch(event);
	
	
}

lgb.view.ParticleSystem.prototype.generateParticlePaths = function() {
	
	var j = this.particlePathCount;
	while(j--) {
		
		var curve = this.newCurve(this.tension);
		var pp = new lgb.view.ParticlePath(curve, this.frameCount);
		
		this.totalFrames += pp.frameToPositionMap.length;
		this.particlePaths.push(pp);
	}
	

		

};


/**
 * Generate a new curve running through the system's bounding boxes.
 * 
 * @param {number} tension tension parameter for the curve
 * @return {hemi.curve.Curve} The randomly generated Curve object.
 */
lgb.view.ParticleSystem.prototype.newCurve = function(tension) {
	

	var pointsAlongCurve = [];
	var num = this.boxes.length;
	
	//while(i--)
	
	for (var i = 0; i < num; i++) {
		var min = this.boxes[i][0];
		var max = this.boxes[i][1];
		pointsAlongCurve[i+1] = hemi.curve.randomPoint(min,max);
	}
	
	//make point 0 and point 1 the same hmm ?
	pointsAlongCurve[0] = pointsAlongCurve[1].slice(0,3);
	
	//take the final point and copy it to the end sort-of doubling it
	pointsAlongCurve[num+1] = pointsAlongCurve[num].slice(0,3);
	
	var curve = new hemi.curve.Curve(
		pointsAlongCurve,
		hemi.curve.curveType.Cardinal, 
		{tension: tension}
	);
		
	return curve;
    
     
};



lgb.view.ParticleSystem.prototype.makeBoxes = function() {
	
	this.boxMaterial = new THREE.MeshPhongMaterial( 
		{ 	ambient: 0x0303ff, 
			color: 0x0303ff, 
			specular: 0x990000, 
			shininess: 60,
			opacity: 0.05
		}
	);
	

	
    var i = this.boxes.length;
    while(i--) {
    	var box = this.boxes[i];
		var boxMesh = this.makeOneBox(box);
		
		this.boxGroup.add( boxMesh );
    }



    
   
	//var event = new lgb.event.MeshLoadedEvent(this.boxGroup);
	//this.dispatch(event);
}



lgb.view.ParticleSystem.prototype.makeOneBox = function(box) {
	
	var width = box[1][0] - box[0][0];
	var height = box[1][1] - box[0][1];
	var depth = box[1][2] - box[0][2];
	
	var x = box[0][0] + width/2,
		y = box[0][1] + height/2,
		z = box[0][2] + depth/2;
				
				
	var geometry = new THREE.CubeGeometry (width, height, depth, 3, 3, 3);
	var mesh = new THREE.Mesh( geometry, this.boxMaterial);
	
	mesh.position.x = x;
	mesh.position.y = y;
	mesh.position.z = z;
	
	return mesh;
	
}


lgb.view.ParticleSystem.prototype.onRender = function(event) {


	var i = this.particleElements.length;
	while(i--) {
		this.particleElements[i].render();
	};
	
    this.threeParticleSystem.geometry.__dirtyVertices = true;

};