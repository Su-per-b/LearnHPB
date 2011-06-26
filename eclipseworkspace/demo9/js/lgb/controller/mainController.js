
o3djs.base.o3d = o3d;
o3djs.require('lgb.Base');
o3djs.require('lgb.controller.ControllerBase');

o3djs.require('lgb.animation');

o3djs.require('lgb.controller.AdminController');
o3djs.require('lgb.controller.component.RadioButtonGroupController');
o3djs.require('lgb.controller.EnvelopeController');
o3djs.require('lgb.controller.ModeController');
o3djs.require('lgb.controller.ZoneController');
o3djs.require('lgb.controller.LeftNavController');
o3djs.require('lgb.controller.GuiController');
o3djs.require('lgb.controller.HVACcontroller');
o3djs.require('lgb.controller.BuildingController');

o3djs.require('lgb.model.ModelBase');
o3djs.require('lgb.model.component.ControlTrigger');
o3djs.require('lgb.model.component.SelectionGroup');
o3djs.require('lgb.model.component.SelectionItem');
o3djs.require('lgb.model.EnvelopeModel');
o3djs.require('lgb.model.ModeModel');
o3djs.require('lgb.model.ZoneModel');
o3djs.require('lgb.model.XmlParser');
o3djs.require('lgb.model.LeftNavModel');
o3djs.require('lgb.model.HVACmodel');

o3djs.require('lgb.view.ViewBase');
o3djs.require('lgb.view.component.Button');
o3djs.require('lgb.view.component.Link');
o3djs.require('lgb.view.component.RadioButtonGroup');

o3djs.require('lgb.view.component.Slider');

o3djs.require('lgb.view.AdminPanel');
o3djs.require('lgb.view.AdminSubpanel');
o3djs.require('lgb.view.EnvelopeView');
o3djs.require('lgb.view.LeftNavView');
o3djs.require('lgb.view.ProgressBar');
o3djs.require('lgb.view.HVACview');
o3djs.require('lgb.view.Mesh');

o3djs.require('lgb.event.EnvelopeEvent');
o3djs.require('lgb.event.Event');
o3djs.require('lgb.event.EventBus');
o3djs.require('lgb.event.Loader');
o3djs.require('lgb.event.HVACevent');

o3djs.require('lgb.util.Loader');
o3djs.require('lgb.util.F');



var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building envelope
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.MainController = function() {
		
		lgb.controller.ControllerBase.call(this);

	};
	
	
	lgb.controller.MainController.prototype = {
		
		init: function() {
			
			jQuery(document).ready(this.d(this.onDocumentReady));
			jQuery(window).resize(this.d(this.onWindowResize));
			jQuery(window).unload(this.d(this.onWindowUnload));

		},
		
		onDocumentReady : function(event) {
		
			console.log("kuda version: " + hemi.version);
		//	console.log("lgb version: " + lgb.version);
			console.log("jQuery version: " + $().jquery);
			
			this.guiController = new lgb.controller.GuiController();
			this.guiController.init();
			
			lgb.animation.init();
			
			this.buildingController = new lgb.controller.BuildingController();
			this.buildingController.init();
			
			this.leftNavController = new lgb.controller.LeftNavController();
			this.leftNavController.init();
			
			this.adminController = new lgb.controller.AdminController();
			this.adminController.init([this.buildingController.envelopeController.dataModel]);
			
			this.progressBar = new lgb.view.ProgressBar();	
			this.progressBar.init("Loading Geometry");
			this.progressBar.show(); 
				
			this.loader = new lgb.util.Loader();
			this.loader.init();
			
			this.loader.loadModels(  this.d(this.onMeshesLoaded), 
									this.getFullMeshList() );
		},
		
		getFullMeshList : function() {
			
			var list = [];
			list = list.concat(
				this.buildingController.getMeshList()
				);
			
			return list;
		},
		
		onWindowResize : function(event) {
			this.dispatch(lgb.event.Event.WINDOW_RESIZE);
		},
		
		onWindowUnload : function(event) {
			//alert('Handler for .unload() called.');
			if (hemi.core.client) {
				hemi.core.client.cleanup();
			}
		},
		
		onMeshesLoaded : function(event) {
			hemi.world.camera.unsubscribe(this.subscriberCameraStopped, hemi.msg.stop);
			this.dispatch(lgb.event.Event.ALL_MESHES_LOADED);


			hemi.world.camera.enableControl();	// Enable camera mouse control
	
			lgb.util.F.preload('icon_exterior_envelope_over.png,icon_lighting_over.png,icon_general_over.png,icon_exterior_envelope_over.png');
			this.setViewPoint();
		
		},
	
		parseXml : function(xml) {
			lgb.view.gui.particleSystemInit(xml);
		},
		
		setViewPoint : function() {
		
			this.makeBoxAtOrigin();
	
			
			var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
			vp.eye = [0,0,80];					// Set viewpoint eye
			vp.target = [0,0,0];					// Set viewpoint target
			
			this.subscriberCameraStopped = hemi.world.camera.subscribe(
					hemi.msg.stop,
					this.d(this.onCameraMoved)
			);
			
					
			hemi.world.camera.moveToView(vp,40);
		
		},
	
		makeBoxAtOrigin : function() {
			hemi.shape.create({
				shape: 'box',
				color: [0, 1, 0, 0.9],
				h: 1,
				w: 1,
				d: 1
			});
			
		},
		
		onCameraMoved : function(event) {
			
			hemi.world.camera.unsubscribe(this.subscriberCameraStopped, hemi.msg.stop);
			this.guiController.showHud();
		
			lgb.util.F.preload('icon_exterior_envelope_over.png,icon_lighting_over.png,icon_general_over.png,icon_exterior_envelope_over.png');
		}
		

	
	};
	
	lgb.controller.MainController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










