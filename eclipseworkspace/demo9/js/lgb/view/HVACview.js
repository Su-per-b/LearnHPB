

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view for displaying the building envelope
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.HVACview = function(){
		
		lgb.view.ViewBase.call(this);
				
		this.buildingFloors = [];
		this.dataModel = null;
		//this.floorsCreated = 0;
		this.parentTransform = null;
		
		this.meshList = [];
		this.currentFloorMesh = null;
		
	};
	
	lgb.view.HVACview.prototype = {
	
	
		init : function(dataModel) {
			
			this.dataModel = dataModel;
			
			this.listen(lgb.event.HVACevent.DATA_MODEL_CHANGED, this.onDataModelChanged);
			this.listen(lgb.event.Event.ALL_MESHES_LOADED, this.onMeshesLoaded);
			
		},
		
		show : function() {
			
		},
		
		cleanup : function() {

			
		},		

		/**
		 * Calculate the center point of the Model's bounding box.
		 * 
		 * @return {Array} [x,y,z] point in 3D space
		 */
		getCenterPoint: function() {
			this.buildingParent.recalculateBoundingBox();
			var boundingBox = this.buildingParent.boundingBox;
			
			var xExt = boundingBox.maxExtent[0] - boundingBox.minExtent[0],
				yExt = boundingBox.maxExtent[1] - boundingBox.minExtent[1],
				zExt = boundingBox.maxExtent[2] - boundingBox.minExtent[2];
 
			var center = [xSpan / 2, ySpan / 2, zSpan / 2];
			
			return center;
		},
		

		onMeshesLoaded : function(event) {
			
			this.mesh = mainController.loader.modelList['ductwork'];
			this.mesh.showBoundingBox();
			
			this.mesh.position();
			
/*
			this.buildingParent =  hemi.core.mainPack.createObject('Transform');
			this.buildingParent.parent = hemi.core.client.root;
			
			
			this.meshList['11']= mainController.loader.modelList['11FootEnvelope'];
			this.meshList['13']= mainController.loader.modelList['13FootEnvelope'];

			this.meshList['9'].setTransformVisible(this.meshList['9'].root, false);
			this.meshList['11'].setTransformVisible(this.meshList['11'].root, false);
			this.meshList['13'].setTransformVisible(this.meshList['13'].root, false);
		
			var radians = hemi.core.math.degToRad(270);
			this.buildingParent.rotateX( radians);

			this.show();
*/
			//this.position();
		},
		
		position : function() {
			var radians = hemi.core.math.degToRad(270);
			this.mesh.root.rotateX( radians);
		},
		
		onDataModelChanged : function(event) {
			this.show();
		},

		getMeshList: function() {
			
			var modelAry = [
				{file: 'ductwork.json', mode: 'HVAC', name: 'ductwork'}
			];
			
			return modelAry;
		}
		
	};

	lgb.view.HVACview.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











