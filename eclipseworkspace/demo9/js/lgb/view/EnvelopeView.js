

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
		
		this.dataModel = dataModel;
		this.meshFloorHeight = 0;
		
		this.namedMeshList['9'] = new lgb.kuda.Mesh('9FootEnvelope.json');
		this.namedMeshList['11'] = new lgb.kuda.Mesh('11FootEnvelope.json');
		this.namedMeshList['13'] = new lgb.kuda.Mesh('13FootEnvelope.json');
		
		this.floorInstances = null;
		this.allFloorInstances = {};
		
		this.meshList = [
			this.namedMeshList['9'],
			this.namedMeshList['11'],
			this.namedMeshList['13']
		];
		
		this.meshFloorHeight = {};

		this.dispatch(lgb.event.Event.MESH_REQUEST, this.meshList);
	};
	
	lgb.view.EnvelopeView.prototype = {
	
		
		getMeshHeight : function() {
			var idx = this.dataModel.floorHeight.toString();
			return this.meshFloorHeight[idx] * this.dataModel.totalFloors;
		},
		show : function() {
			this.cleanup();
			this.position();
		},
		
		cleanup : function() {
			var len = this.buildingFloors.length;
			
			for (var i=0; i<len; i++) {
				
				var floorMesh = this.buildingFloors[i];
				floorMesh.setVisible(false);
			}
			this.buildingFloors = [];
		},
		position : function() {
			
			
			var height = this.dataModel.floorHeight.toString();

			
			for (var i=0; i < this.dataModel.totalFloors; i++) {
				var floorMesh = this.allFloorInstances[height][i];
				
				floorMesh.resetPosition();
				floorMesh.setVisible(true);
				floorMesh.rotateX(270);
					
				if (i > 0) {
					var delta = this.meshFloorHeight[height] * (i);
					floorMesh.translate(0, delta, 0);
				}
				
				this.buildingFloors.push(floorMesh);
			}
		},
		
		getOriginalMesh: function(){
			var height = this.dataModel.floorHeight.toString();
			return this.namedMeshList [height];
		},

		createFloorsHelper : function(height) {
			

			var originalMesh = this.namedMeshList [height];
			

			var core = hemi.core,
				pack = core.mainPack,
				boundingBox = originalMesh.root.boundingBox;
				
			this.meshFloorHeight[height] = boundingBox.maxExtent[2] - boundingBox.minExtent[2];

			
			floorsAry = [];

			for (var i=0; i < 7; i++) {
				
				var floorMesh = originalMesh.clone();
				floorMesh.setVisible(false);
				
				var comp = new lgb.model.BuildingComponentModel(floorMesh.root);
				comp.addVisibilityTags(lgb.model.VisibilityTag.ENVELOPE);
				this.dispatch(lgb.event.Event.REGISTER_COMPONENT, comp);
				
				floorsAry.push(floorMesh);
			}
			
			return floorsAry;
		},
		

		meshesLoaded : function() {
		
			this.namedMeshList['9'].setVisible(false);
			this.namedMeshList['11'].setVisible(false);
			this.namedMeshList['13'].setVisible(false);
			

			this.allFloorInstances['9'] = this.createFloorsHelper('9');
			this.allFloorInstances['11'] = this.createFloorsHelper('11');
			this.allFloorInstances['13'] = this.createFloorsHelper('13');

		}
		
	};
	

	
	lgb.view.EnvelopeView.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











