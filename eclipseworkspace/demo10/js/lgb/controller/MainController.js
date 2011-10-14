
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

			$.error = this.onError;
			//lgb.preload('icon_wrench_selected_over_34px.png,icon_wrench_selected_34px.png,icon_wrench_over_34px.png,icon_hvac_over.png,icon_exterior_envelope_over.png,icon_general_over.png');
			
			this.meshList = []; //an array of all the lgb.kuda.Mesh objects
			
			this.listen(lgb.event.Event.MESH_REQUEST, this.onMeshRequest);
			this.listen(lgb.event.Loader.ALL_MESHES_LOAD_COMPLETE, this.onMeshesLoaded);
			this.listen(lgb.event.Loader.ALL_MESHES_LOAD_START, this.onMeshesLoadStart);
			
			var nameSpaces = [
				'lgb',
				'lgb.controller',	
				'lgb.controller.component',	
				'lgb.model',	
				'lgb.model.component',	
				'lgb.view',	
				'lgb.view.component',	
				'lgb.util',	
				'lgb.event'	
			];
			
			hext.utils.debug.init(nameSpaces);
			
			jQuery(document).ready(this.d(this.onDocumentReady));
			jQuery(window).resize(this.d(this.onWindowResize));
			jQuery(window).unload(this.d(this.onWindowUnload));

		},
		onError : function(msg) {

			alert(msg);
		},
		onDocumentReady : function(event) {
		
			$('head').append ('<title>{0}</title>'.format(lgb.Config.getTitle()));
			
			console.log("kuda version: " + hemi.version);
			console.log(lgb.Config.getTitle());
			console.log("jQuery version: " + $().jquery);
			
			this.scenarioController = new lgb.controller.ScenarioController();
			this.listen(lgb.event.Cam.MOVE_COMPLETE, this.onCameraMoveComplete);
					
			this.adminController = new lgb.controller.AdminController();
			this.propertiesController = new lgb.controller.PropertiesController();
			this.selectableController = new lgb.controller.SelectableController();
			
			this.guiController = new lgb.controller.GuiController();
			
			this.buildingController = new lgb.controller.BuildingController();
			this.leftNavController = new lgb.controller.LeftNavController();
			this.titleBarController = new lgb.controller.TitleBarController();
			
			this.viewPointController = new lgb.controller.ViewPointController(this.buildingController);
			this.listen(lgb.view.ViewPointViewState.STOPPED, this.onCameraMoved);
			
			this.cameraController = new lgb.controller.CameraController();
			this.visibilityController = new lgb.controller.VisibilityController();
			
			this.zoneController = new lgb.controller.ZoneController();
			this.particleSystemController = new lgb.controller.ParticleSystemController(true);
			
			this.progressBar = new lgb.view.ProgressBar();
			this.progressBar.show();
				
			this.loader = new lgb.kuda.Loader();
			this.loader.loadMeshes( this.meshList );

		},
		
		//handles the MESH_REQUEST event and adds meshes to the load queue
		// a mesh to load
		onMeshRequest : function(event) {
			
			var meshListRequest = event.value;
			meshListRequest.assertContainsType(lgb.kuda.Mesh);
			this.meshList = this.meshList.concat(meshListRequest);
			
		},
		
		onCameraMoveComplete : function(event) {
			this.unlisten(lgb.event.Cam.MOVE_COMPLETE, this.onCameraMoveComplete);
			this.dispatch(lgb.event.Event.SHOW_GUI);
		},


		onMeshesLoaded : function(event) {
			hemi.model.modelRoot.rotateX(4.715);
			
			hemi.world.camera.enableControl();	// Enable camera mouse control
			_typeface_js.renderDocument(); 
			

		},

		onMeshesLoadStart : function(event) {
			//hemi.world.camera.enableControl();	// Enable camera mouse control
			
		},


		onWindowResize : function(event) {
			this.dispatch(lgb.event.Event.WINDOW_RESIZE);
		},
		
		onWindowUnload : function(event) {
			if (hemi.core.client) {
				hemi.core.client.cleanup();
			}
		}
		
	};
	
	lgb.controller.MainController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










