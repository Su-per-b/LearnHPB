/**
 * This sample is based off of the Hello World sample, except the entire World
 * was created using the Kuda World Editor and saved as a JSON file in the Kuda
 * format called "Octane". Instead of scripting, the file is loaded and the
 * World is created from it.
 */

	
	var viewpoints;
			
	o3djs.require('o3djs.util');
	o3djs.require('hemi.loader');

	function init(clientElements) {
		hemi.core.init(clientElements[0]);
		hemi.view.setBGColor([0.7, 0.8, 9, 1]);
		loadWorld();
	}

	
	function loadWorld() {
		hemi.loader.loadOctane('assets/movingtest.json',loadWorldCallback);
	}
	
	function loadWorldCallback() {
			// This will be executed before hemi.world.ready() is called.
			hemi.world.subscribe(hemi.msg.ready,subscribeCallback);
	}
	
	
	function subscribeCallback(msg) {
			// We are not currently able to disable camera control
			// from the Kuda World Editor, so we must do it here.
			hemi.world.camera.disableControl();
			bindJavascript();
	}
	
	
	
	
	
	function moveToZone(zoneNumber) {
		hemi.world.camera.moveToView(viewpoints[zoneNumber]);
	}
	
	function bindJavascript() {
		
		viewpoints = hemi.world.getViewpoints();
		var camera = hemi.world.camera;
	
		hemi.input.addKeyDownListener({
			onKeyDown : function(event) {
				switch (event.keyCode) {
					case (49):
						moveToZone(1)
						break;
					case (50): 
						moveToZone(2)
						break;
					case (51):
						moveToZone(3)
						break;
					case (52): 
						moveToZone(4)
						break;
					case (53): 
						moveToZone(5)
						break;
					case (54): 
						moveToZone(6)
						break;
					case (55):
						moveToZone(7)
						break;	
					case (97): 
						moveToZone(1)
						break;
					case (98): 
						moveToZone(2)
						break;
					case (99):
						moveToZone(3)
						break;
					case (100): 
						moveToZone(4)
						break;
					case (101): 
						moveToZone(5)
						break;
					case (102): 
						moveToZone(6)
						break;
					case (103): 
						moveToZone(7)
						break;
						
						
			}
			
		
			}
		});
	}
		


	jQuery(window).load(function() {
		o3djs.util.makeClients(init,'LargeGeometry');
	});

	jQuery(window).unload(function() {
		if (hemi.core.client) {
			hemi.core.client.cleanup();
		}
	});
