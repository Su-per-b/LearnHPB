goog.provide('lgb.view.ParticleSystemView2');

goog.require ("lgb.view.ViewBase");
goog.require ("lgb.event.MeshLoadedEvent");
goog.require ("hemi.curve.Curve");
goog.require ("hemi.curve");
goog.require ("lgb.view.ParticleWrapper");
goog.require('lgb.view.ParticlePath');



/**
 * MVC View for the RoofTop Unit
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.ParticleSystemView2 = function(dataModel) {
	lgb.view.ViewBase.call(this);
	
	this.dataModel = dataModel;
	
	this.listenTo(this.dataModel, lgb.event.DataModelChanged, this.onDataModelChanged);
	
	//this.init();

};



goog.inherits(lgb.view.ParticleSystemView2, lgb.view.ViewBase);

lgb.view.ParticleSystemView2.prototype.onDataModelChanged = function(event) {
	this.init();
}


/** 
 * Initializes the View
 */
lgb.view.ParticleSystemView2.prototype.init = function() {
	

	
	this.parseConfig();
	//this.calculateTotalVolume();
	//this.showBoxes();
	this.generateParticlePaths();
	this.showParticlePaths();
	this.createParticleSystem();
	
	return;
	
/*
	
	this.particleCount = 200;
	this.particlesGeometry = new THREE.Geometry();
	    
	// create the particle variables
	var pMaterial = new THREE.ParticleBasicMaterial({
	        color: 0xff6666,
	        size: 1,
	        map: THREE.ImageUtils.loadTexture(
	            "3d-assets/textures/circle.png"
	        ),
	        blending: THREE.AdditiveBlending,
	        transparent: true
	    });
		

	
	// now create the individual particles
	for(var p = 0; p < this.particleCount; p++) {
	
	    // create a particle with random
	    // position values, -250 -> 250
	    var pX = (Math.random() * this.volX) - this.volX / 2,
	        pY = (Math.random() * this.volY) - this.volY / 2,
	        pZ = (Math.random() * this.volZ) - this.volZ / 2,
	        
	        particleVertex = new THREE.Vertex(
	            new THREE.Vector3(pX, pY, pZ)
	        );
	        
	        var particleWrapper = new lgb.view.ParticleWrapper(particleVertex);

	    
	    // add it to the geometry
	    this.particlesGeometry.vertices.push(particleVertex);
	}
	
	// create the particle system
	this.particleSystem = new THREE.ParticleSystem(
	    this.particlesGeometry,
	    pMaterial);
	
	// also update the particle system to
	// sort the particles which enables
	// the behaviour we want
	//this.particleSystem.sortParticles = true;
	
	
	var event = new lgb.event.MeshLoadedEvent(this.particleSystem);
	this.dispatch(event);
	
	this.listen(lgb.event.RenderEvent, this.onRender);
	*/
};


lgb.view.ParticleSystemView2.prototype.calculateTotalVolume = function() {
    
    var volume=[[0,0,0], [0,0,0]]
    
    var i = this.boxes.length;
    while(i--) {
    	var box = this.boxes[i];
		//this.showBox(box)

    }
    
    	
}

lgb.view.ParticleSystemView2.prototype.parseConfig = function() {
	this.config = this.dataModel.configs['1'];
	this.boxes = this.config.boxes;
	this.particlePaths = [];
	this.particleCount = 6;
	this.particlePathCount = 6;
	this.fps = 30;
	this.frameCount = this.config.life * this.fps;
	this.tension = 0;
	this.currentFrameNumber = 0;
	this.visibleParticleCount = 0;
	
};

lgb.view.ParticleSystemView2.prototype.createParticleSystem = function() {


	
	var pMaterial = new THREE.ParticleBasicMaterial({
	        color: 0x6666ff,
	        size: 1,
	        map: THREE.ImageUtils.loadTexture(
	            "3d-assets/textures/circle.png"
	        ),
	        blending: THREE.AdditiveBlending,
	        transparent: true
	    });
	    


	//var pMaterial = new THREE.ParticleBasicMaterial( { size: 1 } );
	
	this.particlesGeometry = new THREE.Geometry();

	//this.particleVertexToPathMap = [];
	//while(this.particleVertexToPathMap.push([]) < this.particlePathCount);
	
	this.particleWrapperAry = [];
	
	//var selectedPathIdx = 0;
	var i = this.particleCount;
	while(i--) {
	        
        var particleVertex = new THREE.Vertex(
            new THREE.Vector3(0, 0, 0)
        );
        
	    // add it to the geometry
	    this.particlesGeometry.vertices[i] = particleVertex;
	    
	    //assign vertex to Particle Path
	    var idx = i % this.particlePathCount;
	    this.particlePaths[idx].assignVertex(particleVertex);
	    
	}
	

	this.particleSystem = new THREE.ParticleSystem(
	    this.particlesGeometry,
	    pMaterial);
	
	this.particleSystem.sortParticles = true;

	var event = new lgb.event.MeshLoadedEvent(this.particleSystem);
	this.dispatch(event);
	
	this.listen(lgb.event.RenderEvent, this.onRender); 
};



lgb.view.ParticleSystemView2.prototype.showParticlePaths = function() {
		

	//this.visibleParticleLines = [];
	
    var j = this.particlePaths.length;
    while(j--) {
    	
    	var onePath = this.particlePaths[j];
    	onePath.show();
    	

			
		
    }
    
    
    	
}

lgb.view.ParticleSystemView2.prototype.generateParticlePaths = function() {
	

	var j = this.particlePathCount;
	while(j--) {
		
		var curve = this.newCurve(this.tension);
		var pp = new lgb.view.ParticlePath(curve);
		
		
		
		
		//var theParticlePath = [];
		var i = this.frameCount;
		
		//quantize the curve based on the number of frames
		//in the entire animation
		while(i--) {
			var percentageComplete = (i)/this.frameCount;
			var pointAlongCurve = curve.cubicHermite(percentageComplete);
			
			//pp.addPoint(pointAlongCurve);
			pp.frameToPositionMap[i] = pointAlongCurve;
			//theParticlePath.push(pointAlongCurve);
		}
		
		this.particlePaths.push(pp);
	}

};


/**
 * Generate a new curve running through the system's bounding boxes.
 * 
 * @param {number} tension tension parameter for the curve
 * @return {hemi.curve.Curve} The randomly generated Curve object.
 */
lgb.view.ParticleSystemView2.prototype.newCurve = function(tension) {
	

	var pointsAlongCurve = [];
	var num = this.boxes.length;
	
	//while(i--)
	
	for (i = 0; i < num; i++) {
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



lgb.view.ParticleSystemView2.prototype.showBoxes = function() {
	
    var i = this.boxes.length;
    while(i--) {
    	var box = this.boxes[i];
		this.showBox(box)
    }
}



lgb.view.ParticleSystemView2.prototype.showBox = function(box) {
	
	var width = box[1][0] - box[0][0];
	var height = box[1][1] - box[0][1];
	var depth = box[1][2] - box[0][2];
	
	var x = box[0][0] + width/2,
		y = box[0][1] + height/2,
		z = box[0][2] + depth/2;
				
				
	var geometry = new THREE.CubeGeometry (width, height, depth, 3, 3, 3);


	var material = new THREE.MeshPhongMaterial( 
		{ 	ambient: 0x0303ff, 
			color: 0x0303ff, 
			specular: 0x990000, 
			shininess: 60,
			opacity: 0.05
		}
	);
	
	var mesh = new THREE.Mesh( geometry, material);
	
	mesh.position.x = x;
	mesh.position.y = y;
	mesh.position.z = z;
	
	var event = new lgb.event.MeshLoadedEvent(mesh);
	this.dispatch(event);
	
}


lgb.view.ParticleSystemView2.prototype.onRender = function(event) {
	


	var i = this.particlePathCount;
	while(i--) {
		this.particlePaths[i].nextFrame();
	};


    this.particleSystem.geometry.__dirtyVertices = true;
    

};