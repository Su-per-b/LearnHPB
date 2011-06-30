

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view for displaying the building envelope
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.EnvelopeView = function(dataModel){
		
		lgb.view.ViewBase.call(this);
				
		this.buildingFloors = [];
		this.parentTransform = null;
		
		this.meshList = [];
		this.namedMeshList = [];
		
		this.currentFloorMesh = null;
		this.dataModel = dataModel;
		this.meshFloorHeight = 0;
		
		this.namedMeshList['9'] = new lgb.view.Mesh('9FootEnvelope.json');
		this.namedMeshList['11'] = new lgb.view.Mesh('11FootEnvelope.json');
		this.namedMeshList['13'] = new lgb.view.Mesh('13FootEnvelope.json');
		
		this.meshList = [
			this.namedMeshList['9'],
			this.namedMeshList['11'],
			this.namedMeshList['13']
		];
		

		this.dispatch(lgb.event.Event.MESH_REQUEST, this.meshList);
	};
	
	lgb.view.EnvelopeView.prototype = {
	

					
					
		getMeshHeight : function() {
			return this.meshFloorHeight * this.dataModel.totalFloors;
		},
		show : function() {
			this.cleanup();
			this.createFloors();
		},
		
		cleanup : function() {
			var len = this.buildingFloors.length;
			
			for (var i=0; i<len; i++) {
				
				this.buildingFloors[i].cleanup();
			}
			
			this.buildingFloors = [];
			
		},		
			
		createFloors : function() {
			
			var idx = this.dataModel.floorHeight.toString();
			this.currentFloorMesh = this.namedMeshList [idx];
			

			
			var core = hemi.core,
				pack = core.mainPack,
				shapes = this.currentFloorMesh.getShapes(),
				boundingBox = this.currentFloorMesh.root.boundingBox;
				
			this.meshFloorHeight = boundingBox.maxExtent[2] - boundingBox.minExtent[2];
			

			for (var i=0; i < this.dataModel.totalFloors; i++) {
				
				var floorMesh = this.currentFloorMesh.clone();
				floorMesh.rotateX(270);
					
				if (i > 0) {
					var delta = this.meshFloorHeight * (i);
					floorMesh.translate(0, delta, 0);
				}
				
				
				this.buildingFloors.push(floorMesh);
			}

		},
		


		meshesLoaded : function() {
		
			this.buildingParent =  hemi.core.mainPack.createObject('Transform');
			this.buildingParent.parent = hemi.core.client.root;

			this.namedMeshList['9'].setVisible(false);
			this.namedMeshList['11'].setVisible(false);
			this.namedMeshList['13'].setVisible(false);
			
		}
		

		
	};
	

	
	lgb.view.EnvelopeView.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











