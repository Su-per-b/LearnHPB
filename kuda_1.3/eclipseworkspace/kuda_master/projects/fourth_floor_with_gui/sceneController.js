//o3djs.require('lgb.animation');

o3djs.require('lgb.progressBar');
o3djs.require('lgb.controller.ModeController');

/**
 * @namespace MVC controller for the project
 */
var sceneController = (function(sceneController) {


	/**
	 * @namespace MVC controller for the project
	 */
	sceneController = sceneController || {};
	sceneController._NAME = 'sceneController';
	
	sceneController.init = function(controller){
		
		jQuery(document).ready($.proxy(this.onDocumentReady, this));	
		jQuery(window).resize($.proxy(this.onWindowResize, this));
		
		sceneController.progressbar = null; // the progress bar that we display

	};
	
	sceneController.onDocumentReady = function(event) {
	
		this.modeController = new lgb.controller.ModeController();
		
		this.progressbar = new lgb.progressBar.Progressbar();	
		this.progressbar.init("Loading Geometry");
		this.progressbar.show(); 
			
		lgb.core.init();
		lgb.loader.init(this);
		lgb.view.gui.setCanvasSize();
		
		var delegateProgress = jQuery.proxy(this.onProgress, this);
		var delegateComplete = jQuery.proxy(this.onSceneLoaded, this);
		
		lgb.loader.loadModels(
		delegateComplete, 
		delegateProgress,
		['ductwork.json', 'rooftop.json', 'envelope.json']
		);
		

	};
	
	 sceneController.onWindowResize = function(event) {
		lgb.view.gui.resizeNow();
	};
		
			
		
	sceneController.onSceneLoaded = function(event) {
	
		console.log('onSceneLoaded');
		
		window.setTimeout('sceneController.progressbar.hide();',200);
		
		//this.opacity = lgb.animation.createAlphaParam('Mesh_033');
		
	
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
		
		this.modeController.init(lgb.loader.modelList);
		
	};
	
	
	sceneController.onCameraMoved = function(event) {
		
		console.log('onCameraMoved');
		var result = hemi.world.camera.unsubscribe(this.subscriberCameraStopped, hemi.msg.stop);
		lgb.view.gui.showHud();
	
		lgb.utils.preload('icon_exterior_envelope_over.png,icon_lighting_over.png,icon_general_over.png,icon_exterior_envelope_over.png');
	};
	
	sceneController.onProgress = function(percent) {
		this.progressbar.onProgress(percent);
	};
		
		
		
	
	return sceneController;
	
})(sceneController || {});



sceneController.init();
