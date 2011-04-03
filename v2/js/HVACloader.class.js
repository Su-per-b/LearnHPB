/**
 * This sample is based off of the Hello World sample, except the entire World
 * was created using the Kuda World Editor and saved as a JSON file in the Kuda
 * format called "Octane". Instead of scripting, the file is loaded and the
 * World is created from it.
 */


	
	/*
	var particleSystem;
	var vavSystem;
	var boxSystem;
	var showBoxes = false;	
	var theProgressObject;
	
*/

	o3djs.require('o3djs.util');
	o3djs.require('hemi.loader');
	
	
	
	function HVACloader(callbackObj, onComplete) {
		
		this.particleSystem;
		this.vavSystem;
		this.boxSystem;
		this.showBoxes = false;	
		this.theCallbackObject = callbackObj;
		
		var box1 = [[20,110,-10],[-60, 100,-70]];
		var box3 = [[-20,10,-10],[-40,-70,-60]];
		var box4 = [[100,10,-10],[120,-70,-60]];
		var box6 = [[410,-70,-20],[430,-65,-40]];
		var box7 = [[420,-300,-20],[440,-280,-40]];
		var box8 = [[420,-235,-20],[430,-125,-40]];
		var box9 = [[285,-165,-20],[295,-145,-40]];
		var box10= [[200,-400,-50],[400,-390,50]];
		var box11 = [[460,-145,-20],[470,-135,-40]];
		var box12 = [[800,-145,-20],[810,-135,-40]];
		var box13 = [[810,-145,400],[820,-135,410]];
		var box13 = [[810,-145,430],[820,-135,440]];
		var box14 = [[810,-165,510],[820,-175,520]];
		var box15 = [[730,-400,510],[890,-390,410]];
		
		var boxFan = [[305,-20,-10],[310,-10,-40]];
		var boxBump = [[285,-50,5],[290,-40,15]];
		var vavBox = [[385,-135,-20],[395,-145,-40]];

		/* The colors these arrows will be as they move through:
		 * Start out yellow and transparent, then turn red and opaque,
		 * quickly turn to blue, then fade to black and transparent.
		 */
		var colorKey1 = {key: 0, value: [1,1,0,1]};
		var colorKey2 = {key: 0.45, value: [1,0,0,1]};
		var colorKey3 = {key: 0.55, value: [0,0,1,1]};
		var colorKey4 = {key: 1, value: [0,0,0,1]};
		
		/* The scale of the arrows as they move through:
		 * Start out infinitesimal, then grow to a decent size,
		 * kind of stretched out, then shrink away again.
		 */
		var scaleKey1 = {key: 0, value: [8,8,8]};
		var scaleKey2 = {key: 1, value: [8,8,8]};
		var scaleKey3 = {key: 1, value: [8,8,8]};
		
		var rate = 1;
		
		this.particleSystemConfig = {
			rate : rate,
			life : 10,
			boundingBoxes : [box1, box3, box4,boxBump, boxFan, box6, box7],
			shape : hemi.curve.shapeType.SPHERE,
			colorKeys : [colorKey1, colorKey2, colorKey3, colorKey4],
			scaleKeys : [scaleKey1, scaleKey2, scaleKey3]
		};
		
		this.vavConfig = {
			rate : rate,
			life : 10,
			boundingBoxes : [box1, box3, box4,boxBump, boxFan, box6, box8, vavBox, box9, box10],
			shape : hemi.curve.shapeType.ARROW,
			colorKeys : [colorKey1, colorKey2, colorKey3, colorKey4],
			scaleKeys : [scaleKey1, scaleKey2, scaleKey3]
		};
		
		
		this.boxConfig = {
			rate : rate,
			life : 10,
			boundingBoxes : [box1, box3, box4,boxBump, boxFan, box6, box8, box11, box12, box13,box14, box15],
			shape : hemi.curve.shapeType.ARROW,
			colorKeys : [colorKey1, colorKey2, colorKey3, colorKey4],
			scaleKeys : [scaleKey1, scaleKey2, scaleKey3]
		}
		
	}
	
	

	HVACloader.prototype.setupParticleSystems1 = function() {
		 this.particleSystem = new hemi.curve.ParticleSystem (
			hemi.core.client.root, 
			this.particleSystemConfig);
			

	 	this.theCallbackObject.onProgress2(33);
		var del = delegate(this, this.setupParticleSystems2);
		
		window.setTimeout(del,150);
		
	}
        
        	
	
	HVACloader.prototype.setupParticleSystems2 = function() {
		//	console.time('-setupParticleSystems2');

		this.vavSystem = new hemi.curve.ParticleSystem
			(hemi.core.client.root, this.vavConfig);
			
		this.theCallbackObject.onProgress2(66);
		var del = delegate(this, this.setupParticleSystems3);
		window.setTimeout(del,150);

	}
	

	
	HVACloader.prototype.setupParticleSystems3 = function() {
		//console.time('-setupParticleSystems3');
		this.boxSystem = new hemi.curve.ParticleSystem
			(hemi.core.client.root, this.boxConfig);
		
		this.theCallbackObject.onProgress2(100);
	//	console.timeEnd('-setupParticleSystems3');

	}
	
	
	HVACloader.prototype.particleSystemStart = function() {
			this.particleSystem.start();
			if (this.vavSystem) {
			   this.vavSystem.stop();
			}
			if (this.boxSystem) {
			   this.boxSystem.stop();
			}
	}
	
	
	HVACloader.prototype.vavSystemStart = function() {
			this.particleSystem.stop();
			this.vavSystem.start();
			this.boxSystem.stop();
	}
	

	HVACloader.prototype.boxSystemStart = function() {
			this.particleSystem.stop();
			this.vavSystem.stop();
			this.boxSystem.start();
	}
	
	HVACloader.prototype.stopAllSystems = function() {
			this.particleSystem.stop();
			
			if (this.vavSystem) {
			   this.vavSystem.stop();
			}
			if (this.boxSystem) {
			   this.boxSystem.stop();
			}
	}
	
	HVACloader.prototype.toggleBoxes = function() {
		if (this.showBoxes) {
			this.particleSystem.hideBoxes();
			this.vavSystem.hideBoxes();
			this.boxSystem.hideBoxes();
			this.showBoxes = false;
		} else {
			this.particleSystem.showBoxes();
			this.vavSystem.showBoxes();
			this.boxSystem.showBoxes();
			this.showBoxes = true;
		}
		
	}
	
	
	function delegate ( that, thatMethod )	
	{
		return function() { return thatMethod.call(that); }
	}
	

	HVACloader.prototype.loadWorld = function() {

		// All we have to do is pass the file name to the Hemi loader.
		this.msgHandler = hemi.world.subscribe (
		  hemi.msg.progress,
		  this.theCallbackObject,
		  'onProgress'
		);
		
		hemi.loader.loadOctane('editor/project.json', this.onHemiComplete);
	}
	
	HVACloader.prototype.onHemiComplete = function() {
		
	}
	
	HVACloader.prototype.setViewPointNumber = function(viewNumber) {
		var vps = hemi.world.getViewpoints();
		hemi.world.camera.moveToView(vps[viewNumber]);
	}
	
	HVACloader.prototype.setViewPointName = function(viewName) {
		
		var obj = {"name":viewName}
		var vps = hemi.world.getViewpoints(obj);
		
		hemi.world.camera.moveToView(vps[0]);
	}	

	HVACloader.prototype.hideZone = function(zoneNumber) {
		
		var shapeName = 'zone' + zoneNumber + 'Volume';
		var theShape = this.getShape(shapeName);
		
		theShape.setVisible({"vis":false});
	}
	
	HVACloader.prototype.showZone = function(zoneNumber) {
		
		var shapeName = 'zone' + zoneNumber + 'Volume';
		var theShape = this.getShape(shapeName);
		
		theShape.setVisible({"vis":true});
	}

	HVACloader.prototype.getShape = function(shapeName) {
		
		var obj = {"name":shapeName}
		var shapes = hemi.world.getShapes(obj);
		var theShape = shapes[0];
		
		return theShape;
	}
	


