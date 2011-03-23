
	o3djs.require('o3djs.util');
	o3djs.require('hemi.loader');

	function init(clientElements) {
		hemi.core.init(clientElements[0]);
		hemi.view.setBGColor([.9, .9, .9, 1]);
	//	loadWorld();
	}
	
	function loadWorld() {
		// All we have to do is pass the file name to the Hemi loader.
		hemi.loader.loadOctane('assets/hotspot_red_cubes.json');
	}

	jQuery(window).load(function() {
		o3djs.util.makeClients(init);
	});

	jQuery(window).unload(function() {
		if (hemi.core.client) {
			hemi.core.client.cleanup();
		}
	});

