/**
 * 
 */
//o3djs.base.o3d = o3d;
//o3djs.require('o3djs.webgl');


var lgb = (function(lgb) {
	

	/**
	 * @namespace A module for managing 3D models and their assets.
	 */
	lgb.loader = lgb.loader || {};
	
	lgb.loader.init = function() {
		
		jQuery(window).unload(function() {
			//alert('Handler for .unload() called.');
			if (hemi.core.client) {
				hemi.core.client.cleanup();
			}
		});
			
		
		this.theModel = null;
		this.msgHandler = null;
		this.count = 0; // Counter to keep track of wall opacity
		this.dir = 1; // Whether wall is becoming more or less opaque
		this.subscriberWorldReady = null;
		this.subscriberCameraStopped = null;
		this.opacity = null;
		this.filePath = 'scene.json';
		var that = this;
		
		this.init2 = function(clientElements) {
			hemi.core.init(clientElements[0]);
			that.init3();
		}
		

	}
	
	lgb.loader.loadScene = function(callbackFunction){
		this.callbackFunction = callbackFunction;
		o3djs.webgl.makeClients(this.init2);
	}
	

	lgb.loader.init3 = function() {
		
		hemi.view.setBGColor([0.8, 0.8, 0.8, 1]);
			
		this.theModel = new hemi.model.Model();	// Create a new Model
		

		this.subscriberWorldReady = hemi.world.subscribe(
				hemi.msg.ready,
				this,
				'init4'
			);
		
		this.theModel.setFileName(this.filePath); // Set the model file
		hemi.world.ready();   // Indicate that we are ready to start our script
	}
	
	
	lgb.loader.init4 = function(){
		
		console.log('lgb.loader.init4');
		
		var result = hemi.world.camera.unsubscribe(this.subscriberWorldReady, hemi.msg.stop);
		this.callbackFunction.call();
	}
	
	
		
	lgb.loader.onLoadComplete = function() {
	
				var result = hemi.world.camera.unsubscribe(this.subscriberWorldReady, hemi.msg.stop);
				
				var transformList = this.theModel.getTransforms('Mesh_033');
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
				this.opacity = transform.createParam('opacity','ParamFloat');
				this.opacity.value = 1.0;
				
				/* On any keyDown, begin the fading. Reverse the direction each time */

					
				/* Fade the wall a little more on each frame, between 1 and 0.4 */
				//hemi.view.addRenderListener(this);
				
				
				var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
				vp.eye = [-56,61,39];					// Set viewpoint eye
				vp.target = [0,10,0];					// Set viewpoint target


				//hemi.console.addToPage();
				console.log("kuda version: %s", hemi.version);
				
				hemi.world.camera.enableControl();	// Enable camera mouse control
				hemi.model.modelRoot.rotateX(4.72);
				
				
				this.subscriberCameraStopped = hemi.world.camera.subscribe(
						hemi.msg.stop,
						this,
						'onCameraMoved');
				
				hemi.world.camera.moveToView(vp,40);
				
			}
			
	lgb.loader.onCameraMoved = function(msg) {
		
				var result = hemi.world.camera.unsubscribe(this.subscriberCameraStopped, hemi.msg.stop);
				onWorldSetup();
		}
			

	lgb.loader.leftNavClick = function(buttonNumber) {
				switch(buttonNumber)
				{
					case 0:
						
						if (this.count == 0) {
							this.count = 40;
							this.dir = -this.dir;
						} 
						
					  break;
					case 1:
			
					  break;
					default:
			
					}
		
		}
			

	
	return lgb;
	
})(lgb || {});
