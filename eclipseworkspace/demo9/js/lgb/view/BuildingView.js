
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.BuildingView = function(dataModel){
		lgb.view.ViewBase.call(this, dataModel);
		
		//the buildingView is composed of other views
		this.envelopeView = new lgb.view.EnvelopeView(this.dataModel);
		this.hvacView = new lgb.view.HVACview(this.dataModel);
		this.roofTopView = new lgb.view.RoofTopView(this.dataModel);
		this.crossSectionView = new lgb.view.CrossSectionView(this.dataModel);
		
		this.listen(lgb.event.Loader.ALL_MESHES_LOAD_COMPLETE, this.onMeshesLoaded);
		this.spanY = 0;
	};			
	
	lgb.view.BuildingView.prototype = {
			
		onChange : function(event) {
			this.show();
		},
		getCenterPoint : function(event) {
			
			var localPoint = [this.spanX /2, this.spanY /2,-this.spanZ /2];

			return localPoint;
		},
		onMeshesLoaded : function(event) {
			this.envelopeView.meshesLoaded();
			this.hvacView.meshesLoaded();
			this.roofTopView.meshesLoaded();
			this.crossSectionView.meshesLoaded();
			
			this.hvacView.positionOffset = [0,0,0];
			var envelopeMesh = this.envelopeView.namedMeshList['9'];
			this.spanX = envelopeMesh.spanX;
			this.spanY = envelopeMesh.spanY;
			
			var x1 = envelopeMesh.spanX;
			var x2 = this.hvacView.mesh.spanX;
			var deltaX = (x1 -x2) / 2;
			
			var y1 = envelopeMesh.spanY;
			var y2 = this.hvacView.mesh.spanY;
			var deltaY = -1 * (y1 -y2) / 2;
			
			this.hvacView.positionOffset[0] = deltaX;
			this.hvacView.positionOffset[2] = deltaY;
			this.hvaczOffset = this.hvacView.mesh.spanZ;
			this.crossSectionZoffset = this.crossSectionView.mesh.spanZ;
			
			var rooftopDeltaX =  1 * (envelopeMesh.spanX - this.roofTopView.mesh.spanX) / 2;
			var rooftopDeltaY =  -1 * (envelopeMesh.spanY - this.roofTopView.mesh.spanY) / 2;
			
			rooftopDeltaX +=3.05;
			rooftopDeltaY +=.8;
			
			this.roofTopView.positionOffset[0] = rooftopDeltaX;
			this.roofTopView.positionOffset[2] = rooftopDeltaY;
			
			this.crossSectionView.positionOffset[0] = envelopeMesh.spanX - this.crossSectionView.mesh.spanX;
			this.crossSectionView.positionOffset[2] = -envelopeMesh.spanY + this.crossSectionView.mesh.spanY;
			
			this.showHelper();
		},
		show : function() {

			this.showHelper();
			

		},
		showHelper : function() {
			this.envelopeView.show();
			
			var envelopeHeight =  this.envelopeView.getMeshHeight();
			

			this.hvacView.positionOffset[1] = envelopeHeight - this.hvaczOffset;
			this.hvacView.show( );
			
			this.roofTopView.positionOffset[1] = envelopeHeight;
			this.roofTopView.show();
			
			this.spanZ = envelopeHeight + this.roofTopView.mesh.spanZ;
			
			
			this.crossSectionView.positionOffset[1] = envelopeHeight;// - this.crossSectionZoffset;
			this.crossSectionView.show();
			
			this.dispatch(lgb.event.BuildingEvent.GEOMETRY_CHANGED, this);
		}

		
	};

	lgb.view.BuildingView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











