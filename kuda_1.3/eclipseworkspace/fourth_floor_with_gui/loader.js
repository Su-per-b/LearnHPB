

/**
 * This is a simple hello world, showing how to set up a simple world, 
 *		load a model, and set the camera to a viewpoint once the model
 *		has loaded.

 

function  rotateX() {
	hemi.model.modelRoot.rotateX(1.57);
}
function  rotateY() {
	hemi.model.modelRoot.rotateY(1);
}
function  rotateZ() {
	hemi.model.modelRoot.rotateZ(1);
}
 */

	o3djs.require('o3djs.util');
	var theModel;
	var msgHandler;
	
	
	
	function traceview() {
		var vp = hemi.view.createViewpoint("myvp", hemi.world.camera);
	}
	
	function init(clientElements) {
		/**
		 * It is possible to have multiple clients (i.e. multiple frames
		 * 		rendering 3d content) on one page that would have to be
		 * 		initialized. In this case, we only want to initialize the
		 *		first one.
		 */
		hemi.core.init(clientElements[0]);
		
		/**
		 * Set the background color to a light-bluish. The parameter is in
		 * 		the form [red,blue,green,alpha], with each value on a 
		 *		scale of 0-1.
		 */
		hemi.view.setBGColor([0.8, 0.8, 0.8, 1]);
		
		/**
		 * Set a prefix for the loader that will allow us to load assets as if
		 * the helloWorld.html file was in the root directory.
		 */
	//	hemi.loader.loadPath = '../../';
		
		createWorld();
	}

	
	
	function createWorld() {


		theModel = new hemi.model.Model();				// Create a new Model
		theModel.setFileName('scene.json'); // Set the model file
		
		
		
		hemi.world.subscribe(hemi.msg.ready,
			function(msg) {
				setupScene();
			});
		
		hemi.world.ready();   // Indicate that we are ready to start our script
	}
	
	var count = 0;			// Counter to keep track of wall opacity
	var dir = 1;			// Whether wall is becoming more or less opaque
	
	function leftNavClick(buttonNumber) {
		
		switch(buttonNumber)
		{
		case 0:
			
			if (count == 0) {
				count = 40;
				dir = -dir;
			} 
			
		  break;
		case 1:

		  break;
		default:

		}
		
		
	}
	
	function setupScene() {
		

		var transformList = theModel.getTransforms('Mesh_033');
		var transform = transformList[0];
		
		var theMaterial = transform.shapes[0].elements[0].material;
		
		var drawList = theMaterial.getParam('o3d.drawList').value;
		var zdrawList = hemi.view.viewInfo.zOrderedDrawList;
		
		theMaterial.getParam('o3d.drawList').value = zdrawList;
		
		var theMaterialOpacity = hemi.fx.addOpacity(theMaterial);
		theMaterialOpacity.value = 1.0;
		
		/* Create a transform-level opacity paramater that will override the
		 * material-level opacity parameter. That way, we can make this wall
		 * fade without fading every object that uses the wall material.
		 */
		var opacity = transform.createParam('opacity','ParamFloat');
		opacity.value = 1.0;
		
		/* On any keyDown, begin the fading. Reverse the direction each time */

			
		/* Fade the wall a little more on each frame, between 1 and 0.4 */
		hemi.view.addRenderListener({
			onRender : function(e) {
				if (count > 0) {
					opacity.value += dir*0.02;
					count--;
				}
			}});
		
		
		var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
		vp.eye = [-56,61,39];					// Set viewpoint eye
		vp.target = [0,10,0];					// Set viewpoint target
	//	vp.fov = 52;
		/**
		 * Move the camera from it's default position (eye : [0,0,-1],
		 *		target : [0,0,0]} to the new viewpoint, and take 120
		 *		render cycles (~2 seconds) to do so.
		 */
		
		//hemi.console.addToPage();
		//trace (hemi.version);
		console.log("kuda version: %s", hemi.version);
		
		hemi.world.camera.enableControl();	// Enable camera mouse control
		hemi.model.modelRoot.rotateX(4.72);
		
		
		msgHandler = hemi.world.camera.subscribe(
				hemi.msg.stop,
				onCameraMoved);
		
		
		hemi.world.camera.moveToView(vp,40);
		
	}
	
	
	function onCameraMoved(msg) {
		
		var result = hemi.world.camera.unsubscribe(msgHandler, hemi.msg.stop);
		
		onWorldSetup();
	}


