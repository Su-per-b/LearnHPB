o3djs.base.o3d = o3d;
o3djs.require('lgb.utils');
o3djs.require('lgb.loader');
o3djs.require('lgb.animation');
o3djs.require('lgb.progressBar');
o3djs.require('lgb.Base');

o3djs.require('lgb.controller.ControllerBase');
o3djs.require('lgb.controller.AdminController');
o3djs.require('lgb.controller.component.RadioButtonGroupController');
o3djs.require('lgb.controller.EnvelopeController');
o3djs.require('lgb.controller.ModeController');
o3djs.require('lgb.controller.ZoneController');
o3djs.require('lgb.controller.LeftNavController');

o3djs.require('lgb.model.ModelBase');
o3djs.require('lgb.model.component.ControlBase');
o3djs.require('lgb.model.component.ControlTrigger');
o3djs.require('lgb.model.component.SelectionGroup');
o3djs.require('lgb.model.component.SelectionItem');
o3djs.require('lgb.model.EnvelopeModel');
o3djs.require('lgb.model.ModeController');
o3djs.require('lgb.model.ZoneController');
o3djs.require('lgb.model.XmlParser');
o3djs.require('lgb.model.LeftNavModel');

o3djs.require('lgb.view.ViewBase');
o3djs.require('lgb.view.component.Button');
o3djs.require('lgb.view.component.Link');
o3djs.require('lgb.view.component.RadioButtonGroup');

o3djs.require('lgb.view.component.Slider');

o3djs.require('lgb.view.AdminPanel');
o3djs.require('lgb.view.AdminSubPanel');
o3djs.require('lgb.view.EnvelopeView');
o3djs.require('lgb.view.gui');
o3djs.require('lgb.view.LeftNavView');

o3djs.require('lgb.event.EnvelopeEvent');
o3djs.require('lgb.event.Event');
o3djs.require('lgb.event.EventBus');


/**
 * @namespace MVC controller for the project
 */
var mainController = (function(mainController) {


	/**
	 * @namespace MVC controller for the project
	 */
	mainController = mainController || {};
	mainController._NAME = 'mainController';
	
	mainController.init = function(controller) {

		var result = jQuery(document).ready($.proxy(this.onDocumentReady, this));	
		jQuery(window).resize($.proxy(this.onWindowResize, this));
			
		mainController.progressbar = null; // the progress bar that we display
	};
	
	mainController.onDocumentReady = function(event) {
		
		console.log("kuda version: " + hemi.version);
		console.log("lgb version: " + lgb.version);
		console.log("jQuery version: " + $().jquery);
		
		lgb.view.gui.init();
		lgb.animation.init();
		lgb.utils.init();
		
		this.eventBus = $(new lgb.event.EventBus());
	
		this.envelopeController = new lgb.controller.EnvelopeController();
		this.envelopeController.init();
		
		this.leftNavController = new lgb.controller.LeftNavController();
		this.leftNavController.init();
		
		this.adminController = new lgb.controller.AdminController();
		this.adminController.init([this.envelopeController.dataModel]);
		
		var envelopeMeshList = this.envelopeController.getMeshList();
		
		var allMeshes = [];
		allMeshes = allMeshes.concat(envelopeMeshList);
		
		this.progressbar = new lgb.progressBar.Progressbar();	
		this.progressbar.init("Loading Geometry");
		this.progressbar.show(); 
			
		lgb.core.init();
		lgb.loader.init(this);
		lgb.view.gui.setCanvasSize();
		
		var delegateProgress = jQuery.proxy(this.onProgress, this);
		var delegateComplete = jQuery.proxy(this.onMeshesLoaded, this);
		
		lgb.loader.loadModels(  delegateComplete, 
								delegateProgress,
								allMeshes );

	};
	
	 mainController.onWindowResize = function(event) {
		lgb.view.gui.resizeNow();
	};
		
			
	mainController.onMeshesLoaded = function(event) {
		hemi.world.camera.unsubscribe(this.subscriberCameraStopped, hemi.msg.stop);

		mainController.dispatchEvent(lgb.event.Event.ALL_MESHES_LOADED);
			
		console.log('onMeshesLoaded');

		window.setTimeout('mainController.progressbar.hide();',100);
		hemi.world.camera.enableControl();	// Enable camera mouse control

		lgb.utils.preload('icon_exterior_envelope_over.png,icon_lighting_over.png,icon_general_over.png,icon_exterior_envelope_over.png');
		mainController.setViewPoint();
		
	};
	
	mainController.parseXml = function(xml) {
		lgb.view.gui.particleSystemInit(xml);
	};
	
	mainController.dispatchEvent = function(eventName) {
		var newEvent = jQuery.Event(eventName);
		mainController.eventBus.trigger(newEvent);
	};
	

	
	mainController.setViewPoint = function() {
		
		mainController.makeBoxAtOrigin();

		
		var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
		vp.eye = [0,0,80];					// Set viewpoint eye
		vp.target = [0,0,0];					// Set viewpoint target
		
		this.subscriberCameraStopped = hemi.world.camera.subscribe(
				hemi.msg.stop,
				this,
				'onCameraMoved');
				
		hemi.world.camera.moveToView(vp,40);
		
	};
	
	mainController.makeBoxAtOrigin = function() {
		var shapeGreenTarget = hemi.shape.create({
			shape: 'box',
			color: [0, 1, 0, 0.9],
			h: 1,
			w: 1,
			d: 1
		});
		
		//shapeGreenTarget.translate(vp.target[0], vp.target[1], vp.target[2]);
	};

	mainController.onCameraMoved = function(event) {
		
		console.log('onCameraMoved');
		var result = hemi.world.camera.unsubscribe(this.subscriberCameraStopped, hemi.msg.stop);
		lgb.view.gui.showHud();
	
		lgb.utils.preload('icon_exterior_envelope_over.png,icon_lighting_over.png,icon_general_over.png,icon_exterior_envelope_over.png');
	};
	
	mainController.onProgress = function(percent) {
		this.progressbar.onProgress(percent);
	};
	
	

/*
	mainController.setModelRootToOrigin = function() {
		
		var model = lgb.loader.modelList['damper'];
		var min = model.getBoundingBox().minExtent;
		hemi.model.modelRoot.translate(-min[0],-min[1],-min[2]);
		
	};
*/
/*
	mainController.centerModelToOrigin = function(model) {

		mainController.showBB(model);
		mainController.rotate(model);
		
		mainController.showBB(model);
		mainController.translate2(model);
						

		
		return;
		

					
	
					
		mainController.showBB(model);

		
		
		
		//mainController.showBB(model);
		
		
		bb = model.getBoundingBox();	
		
		xDelta = -1 * bb.minExtent[0];
		yDelta = -1 * bb.minExtent[1];
		zDelta = -1 * bb.minExtent[2];
		model.root.translate(xDelta,yDelta,zDelta);
		
		mainController.showBB(model);
		
		console.log ('centerModelToOrigin ');
		
	};
*/
	
	
	
/*
	mainController.rotate = function(model){
		//rotate 90 degrees on the x axis
		var radians = hemi.core.math.degToRad(270);
		model.rotateTransformX(model.root, radians);
	};
	mainController.translate = function(model){
		var bb = model.root.boundingBox;	
		

		var pointMin = bb.minExtent;
		var pointMax = bb.minExtent;
		
		
		var xDelta = -1 * pointMin[0];
		var yDelta = -1 * pointMin[1];
		var zDelta = -1 * pointMin[2];
		model.root.translate(xDelta,yDelta,zDelta);
	};
	
	mainController.translate2 = function(model){
		var bb = model.root.boundingBox;	
		

		var pointMin = bb.minExtent;
		var pointMax = bb.minExtent;
		
		
		var xDelta = -1 * pointMin[0];
		var yDelta = -1 * pointMin[1];
		var zDelta = -1 * pointMin[2];
		
		model.root.translate(xDelta,-zDelta,yDelta);
	};
	
	
	mainController.showBB = function(model){
		var bb = model.root.boundingBox;
		
		box = [bb.minExtent, bb.maxExtent];
		hemi.curve.showBoxes([box]);
	};
*/
	
	

		
		
		
	
	return mainController;
	
})(mainController || {});


		

