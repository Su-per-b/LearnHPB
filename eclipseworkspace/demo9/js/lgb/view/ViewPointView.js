

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view 
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.ViewPointView = function(dataModel){
	
		lgb.view.ViewBase.call(this);
		this.dataModel = dataModel; //building
		this.state = lgb.view.ViewPointViewState.PRE_INIT;
		this.frames = 60;  //the number of frames in the animation
		
		this.listen(lgb.event.Loader.ALL_MESHES_LOAD_COMPLETE, this.onMeshesLoaded);


	};
	
	lgb.view.ViewPointView.prototype = {
	
		onMeshesLoaded : function(event) {
		
		},
		

		show: function() {
			
			if (this.state == lgb.view.ViewPointViewState.PRE_INIT) {
				
				var vp = this.dataModel.getCurrentViewPoint();
				
				this.subscriberCameraStopped = hemi.world.camera.subscribe(
						hemi.msg.stop,
						this.d(this.onCameraMoveComplete));
				
				
				
				hemi.world.camera.moveToView(vp, this.frames);
				this.dispatch(lgb.view.ViewPointViewState.MOVING);
				
			}
		},
		
        onCameraMoveComplete: function(event) {
			this.dispatch(lgb.event.Cam.MOVE_COMPLETE);
        },
        changeTarget: function(event){

        }

	};



	lgb.view.ViewPointViewState = function() {

	};
	
	lgb.view.ViewPointViewState.PRE_INIT = 'PRE_INIT';
	lgb.view.ViewPointViewState.MOVING = 'MOVING';
	lgb.view.ViewPointViewState.STOPPED = 'STOPPED';
	
	lgb.view.ViewPointView.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











