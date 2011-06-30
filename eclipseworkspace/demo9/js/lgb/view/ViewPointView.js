

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

		
		
		
		//this.cam = new lgb.CameraWrapper();

			
		
	};
	
	lgb.view.ViewPointView.prototype = {
	
		onMeshesLoaded : function(event) {
			
/*
			this.targetBox = hemi.shape.create({
					shape: 'box',
					color: [0, 1, 0, 0.9],
					h: 1,
					w: 1,
					d: 1
				});
*/
			//this.cam.init();
			
/*
			this.subscriberCameraStopped = hemi.world.camera.subscribe(
					hemi.msg.stop,
					this.d(this.onCameraMoved)
			);
*/
			
		},
		

		show: function() {
			
			if (this.state == lgb.view.ViewPointViewState.PRE_INIT) {
				var vp = this.dataModel.getCurrentViewPoint();
				
				hemi.world.camera.moveToView(vp, this.frames);
				this.dispatch(lgb.view.ViewPointViewState.MOVING);
				
			}
		},
		
        onCameraMoveComplete: function(event) {
			//this.dispatch(lgb.view.ViewPointViewState.STOPPED);
        },
        changeTarget: function(event){
			//this.cam.changeTarget(vp.target);
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











