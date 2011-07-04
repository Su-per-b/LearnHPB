

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view 
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.ViewPointView = function(dataModel){
	
		lgb.view.ViewBase.call(this, dataModel);
		
		this.state = lgb.view.ViewPointViewState.PRE_INIT;
		this.frames = 30;  //the number of frames in the animation
		
		this.targetBox = null;
		this.eyeBox = null;

	};
	
	lgb.view.ViewPointView.prototype = {

		
		onChange : function(event) {
				var vp = this.dataModel.getCurrentViewPoint();
				
				
				hemi.world.camera.moveToView(vp, this.frames);
				this.dispatch(lgb.view.ViewPointViewState.MOVING);
		},
		

		show: function() {
			
			
			this.targetBox = hemi.shape.create(
				{
					shape: 'box',
					color: [0,0,1,1],
					h: 1, 
					w: 1, 
					d: 1 
				}
			);
			this.eyeBox = hemi.shape.create(
				{
					shape: 'box',
					color: [0,1,0,1],
					h: 1, 
					w: 1, 
					d: 1 
				}
			);
			
			this.targetBox.visible = false;
			this.eyeBox.visible = false;
			
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
			this.state = lgb.view.ViewPointViewState.STOPPED;
			this.dispatch(lgb.event.Cam.MOVE_COMPLETE);
        },
        showEyeAndTarget: function(viewPointName) {
			var vp = this.dataModel.viewPoints[viewPointName];

			this.positionElement_(this.targetBox, vp.target);
			this.positionElement_(this.eyeBox, vp.eye);
			 
        },
		
		positionElement_ : function (element, positionAry) {
			element.visible = true;
			element.identity();
			element.translate (positionAry[0], positionAry[1], positionAry[2]);
		},
		
		
        hideEyeAndTarget: function(event) {

			this.targetBox.visible = false;
			this.eyeBox.visible = false;
			
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











