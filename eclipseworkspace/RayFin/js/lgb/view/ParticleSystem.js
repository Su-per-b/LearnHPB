goog.provide('lgb.view.ParticleSystem');

goog.require('hemi.curve');
goog.require('hemi.curve.Curve');
goog.require('lgb.event.Object3DLoadedEvent');
goog.require('lgb.view.ParticleElement');
goog.require('lgb.view.ParticlePath');
goog.require('lgb.view.ParticleWrapper');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.ParticleSystem = function(dataModel) {
	lgb.view.ViewBase.call(this);

	this.dataModel = dataModel;
	this.listenTo(this.dataModel, lgb.event.DataModelChanged.TYPE, this.onDataModelChanged);
	//this.init();
};
goog.inherits(lgb.view.ParticleSystem, lgb.view.ViewBase);

lgb.view.ParticleSystem.prototype.onDataModelChanged = function(event) {
	
	var whatIsDirty = event.payload;
	
	if (whatIsDirty.isRunning) {
		if (this.dataModel.isRunning) {
			this.listen(lgb.event.RenderEvent.TYPE, this.onRender);
		} else {
			this.unlisten(lgb.event.RenderEvent.TYPE, this.onRender);
		}
	}
	
	if (whatIsDirty.showBoxes) {
		this.showBoxes(this.dataModel.showBoxes);
	}
	if (whatIsDirty.showCurves) {
		this.showCurves(this.dataModel.showCurves);
	}
	
};


/**
 * Initializes the View
 */
lgb.view.ParticleSystem.prototype.init = function() {


	this.boxGroup = null;
	this.visibleLineGroup = null;
	this.systemGroup = new THREE.Object3D();
	this.masterGroup = new THREE.Object3D();

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

	this.generateParticlePaths();
	this.createParticleSystem();

	this.showBoxes(this.dataModel.showBoxes);
	this.showCurves(this.dataModel.showCurves);	
	
	if (this.dataModel.isRunning) {
		this.listen(lgb.event.RenderEvent.TYPE, this.onRender);
	} else {
		this.unlisten(lgb.event.RenderEvent.TYPE, this.onRender);
	}
	this.currentFrameNumber = this.launchDelayBetweenParticles + 1;
	
	var event = new lgb.event.Object3DLoadedEvent(this.masterGroup);
	this.dispatch(event);

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
	this.launchDelayBetweenParticles = 3;
};

lgb.view.ParticleSystem.prototype.createParticleSystem = function() {


	var cicle = THREE.ImageUtils.loadTexture("3d-assets/textures/circle.png");

	this.pMaterial = new THREE.ParticleBasicMaterial({
	        color: 0x0000ff,
	        size: 1,
	        map: cicle,
	        blending: THREE.AdditiveBlending,
	        transparent: true
	    });
	    
	this.pMaterialHide = new THREE.ParticleBasicMaterial({
	        color: 0xff0000,
	        size: 1,
	        map: cicle,
	        blending: THREE.AdditiveBlending,
	        transparent: true,
	        opacity :1
	    });   
	    
	    

	this.particlesGeometry = new THREE.Geometry();
	this.particlesGeometry.dynamic = true;
	
	this.particleWrapperAry = [];
	this.particleElements = [];

	var i = this.particleCount;
	var particlesNeeded = 0;
	
	
	this.inActiveParticles = [];
	
	while (i--) {

        //var particleVertex = new THREE.Vertex(
           // new THREE.Vector3(0, 0, 0)
       // );
		//this.makeParticleElement();
	
		
        var particleElement = new lgb.view.ParticleElement(this.pMaterial, this.pMaterialHide);
        particleElement.setVisible(false);
        
	    this.particleElements[i] = particleElement;
		this.inActiveParticles[i] = particleElement;
	    // add it to the geometry
	    this.particlesGeometry.vertices[i] = particleElement.threeParticle;

	    var idx = i % this.particlePathCount;

	    particleElement.assignPath(this.particlePaths[idx]);
	   // particleElement.launchDelayBetweenParticles = this.launchDelayBetweenParticles;
	    particleElement.assignId(i);
	}
	
	//this.particlesGeometry.vertices = [];
	this.activeParticles = [];

	//var p = this.makeParticleElement();
//this.activeParticles.push(p);
	
	this.threeParticleSystem = new THREE.ParticleSystem(
	    this.particlesGeometry,
	    this.pMaterial);
	    
	//this.threeParticleSystem.dynamic = true;

	this.threeParticleSystem.sortParticles = false;
	this.threeParticleSystem.dynamic = true;
	this.systemGroup.add(this.threeParticleSystem);


	//this.listen(lgb.event.RenderEvent.TYPE, this.onRender);
};



lgb.view.ParticleSystem.prototype.makeVisibleLines_ = function() {
	this.visibleLineGroup = new THREE.Object3D();
	
    var j = this.particlePaths.length;
    while (j--) {
    	var onePath = this.particlePaths[j];
    	var line = onePath.makeVisibleLine();
    	this.visibleLineGroup.add(line);
    }
};

lgb.view.ParticleSystem.prototype.generateParticlePaths = function() {

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
lgb.view.ParticleSystem.prototype.newCurve = function(tension) {
	var pointsAlongCurve = [];
	var num = this.boxes.length;

	for (var i = 0; i < num; i++) {
		var min = this.boxes[i][0];
		var max = this.boxes[i][1];
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
 * @param {boolean} isVisible whether to show the curves or hide them
 */
lgb.view.ParticleSystem.prototype.showCurves = function(isVisible) {
	
	if(isVisible) {
		if (this.visibleLineGroup == null) {
			this.makeVisibleLines_();
		}
		this.masterGroup.add(this.visibleLineGroup);
		
	} else {
		this.masterGroup.remove(this.visibleLineGroup);
	}
}


/**
 * @param {boolean} isVisible whether to show the boxes or hide them
 */
lgb.view.ParticleSystem.prototype.showBoxes = function(isVisible) {
	
	if(isVisible) {
		if (this.boxGroup == null) {
			this.makeBoxes_();
		}
		this.masterGroup.add(this.boxGroup);
		
	} else {
		this.masterGroup.remove(this.boxGroup);
	}
}

/**
 * creates the box mesh objects and
 * adds them to the boxGroup
 * @private
 */
lgb.view.ParticleSystem.prototype.makeBoxes_ = function() {
	
	this.boxGroup = new THREE.Object3D();
	this.boxMaterial = new THREE.MeshPhongMaterial(
		{ ambient: 0x0303ff,
			color: 0x0303ff,
			specular: 0x990000,
			shininess: 60,
			opacity: 0.8
		}
	);

    var i = this.boxes.length;
    while (i--) {
    	var box = this.boxes[i];
		var boxMesh = this.makeOneBox_(box);

		this.boxGroup.add(boxMesh);
    }

};


/**
 * creates one box mesh objects
 * @private
 * @return {THREE.Mesh} The Box mesh.
 */
lgb.view.ParticleSystem.prototype.makeOneBox_ = function(box) {

	var width = box[1][0] - box[0][0];
	var height = box[1][1] - box[0][1];
	var depth = box[1][2] - box[0][2];

	var x = box[0][0] + width / 2,
		y = box[0][1] + height / 2,
		z = box[0][2] + depth / 2;


	var geometry = new THREE.CubeGeometry(width, height, depth, 3, 3, 3);
	var mesh = new THREE.Mesh(geometry, this.boxMaterial);

	mesh.position.x = x;
	mesh.position.y = y;
	mesh.position.z = z;

	return mesh;

};


lgb.view.ParticleSystem.prototype.makeParticleElement = function() {

    var particleElement = new lgb.view.ParticleElement(this.pMaterial, this.pMaterialHide);
    
 ///   this.particleElements.pus = particleElement;
		
    
	particleElement.assignId(this.particlesGeometry.vertices.length);
	
	var idx = this.activeParticles.length % this.particlePathCount;
	particleElement.assignPath(this.particlePaths[idx]);
	
	this.activeParticles.push(particleElement);

	
	this.particlesGeometry.vertices.push(particleElement.threeParticle);
	//this.particlesGeometry.mergeVertices();


	return particleElement;
}


lgb.view.ParticleSystem.prototype.onRender = function(event) {
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
	};
	

	

	
	var i = this.activeParticles.length;
	var popIdxList = [];
	while (i--) {
		var p = this.activeParticles[i];
		
		if (p==null) {
			throw ('error rendering particle element')
		}
		if (p.render==null) {
			throw ('error rendering particle element')
		}
		
		p.render();
		if (p.isFinished) {
			popIdxList.push(i);
		}
	}
	
	if (popIdxList.length >0 ) {
		var finishedParticle = this.activeParticles.splice(popIdxList[0],1)[0];
		//var finishedParticle = this.activeParticles.pop();
		//var removedVertex = this.particlesGeometry.vertices.pop();
		
		//var removedVertex = this.particlesGeometry.vertices.splice(finishedParticle.id,1)[0];
		//this.threeParticleSystem.updateMatrix();
		//this.particlesGeometry.remove(finishedParticle.threeParticle);

		this.inActiveParticles.push(finishedParticle);
	};
	
	//this.threeParticleSystem.__dirtyVertices = true;
    this.threeParticleSystem.geometry.__dirtyVertices = true;

};
