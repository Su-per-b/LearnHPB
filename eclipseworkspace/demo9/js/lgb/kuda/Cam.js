
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.kuda = lgb.kuda || {};

	/**
	 * @class
	 */
	lgb.kuda.Cam = function(){
		hemi.view.Camera.call(this);
		
	};
	

	lgb.kuda.Cam.prototype = {
	
		
		init : function() {
			this.dispatcher = new lgb.Base();
		},
		/**
		 * Update the camera.
		 */
		update : function(delta) {
			

			hemi.view.Camera.prototype.update.apply(this, [delta]);

			
			if (lgb.notNull(this.dispatcher)) {
				
				var e = this.getEye();
				var t = this.getTarget();
				
				var obj = {
					eye: e,
					target: t
				};
			
				this.dispatcher.dispatch(lgb.event.Cam.UPDATE, obj);		
			}

			
/*
			var time = this.state.time;
			if (time.current >= time.end && this.dispatcher != null) {
				
			}
*/
			
		},


		/**
		 * Set the eye and target of the camera. 
		 *
		 * @param {[number]} eye XYZ position of camera eye
		 * @param {[number]} target XYZ position of camera target
		 */
		setEyeTarget : function(eye,target) {
	
			hemi.view.Camera.prototype.setEyeTarget.apply(this, [eye,target]);
			
/*
			this.currentEye = eye;
			this.currentTarget = target;
			this.dispatcher.dispatch(lgb.event.Cam.MOVE_PROGRESS, this.vd.current);		
*/	
		}
		


	};

	lgb.kuda.Cam.staticInit = function() {
		lgb.kuda.Cam.inheritsFrom(hemi.view.Camera);
	};
	

	return lgb;
	
})(lgb || {});











