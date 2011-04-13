
		function returnKey(evt)
		{
			var evt  = (evt) ? evt : ((event) ? event : null);
		 
			if (evt.keyCode == 13) 
			{
				var vd = new hemi.view.ViewData();
				vd.eye = [16.6,25.3,-23.6];
				
				hemi.world.camera.moveToView(vd,40);
				
			}
		}
		
		function onSceneLoaded() {

			console.log('onSceneLoaded');
			
			this.opacity = lgb.animation.createAlphaParam('Mesh_033');
			

			var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
			vp.eye = [-56,61,39];					// Set viewpoint eye
			vp.target = [0,10,0];					// Set viewpoint target

			
			this.subscriberCameraStopped = hemi.world.camera.subscribe(
					hemi.msg.stop,
					this,
					'onCameraMoved');
					
					
			hemi.model.modelRoot.rotateX(4.72);
			hemi.world.camera.enableControl();	// Enable camera mouse control
			hemi.world.camera.moveToView(vp,40);
		}
		
		
		function onCameraMoved(msg) {
			var result = hemi.world.camera.unsubscribe(this.subscriberCameraStopped, hemi.msg.stop);
			lgb.gui.showHud();
			
		//	document.onkeypress = returnKey;
			
			lgb.utils.preload('icon_exterior_envelope_over.png,icon_lighting_over.png,icon_general_over.png,icon_exterior_envelope_over.png');
		}
	
