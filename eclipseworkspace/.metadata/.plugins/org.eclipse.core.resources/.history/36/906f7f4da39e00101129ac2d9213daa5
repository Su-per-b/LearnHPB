
o3djs.require('lgb.view.AdminPanel');

/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace A module for managing the 2D GUI
	 */
	lgb.view = lgb.view || {};

	
	lgb.view.HvacDamperView = function(){
		lgb.view.ViewBase.call(this);
		this.model = null;
	};
	
	lgb.view.HvacDamperView.prototype = {
	
		init : function(model) {
			
			//add the HTML elements to the Admin panel
			this.model = model;
			
		},
		

		
		model3dLoaded: function(model3d) {
			
			this.model3d = model3d;
			
			this.finalFrame  = this.model3d.getMaxAnimationTime();
			this.frame0 = 0;
			this.frame1 = hemi.view.getTimeOfFrame(1);
			
			this.animation = hemi.animation.createModelAnimation(this.model3d, this.frame0, this.frame1);
			
		},
		resetAnimation : function() {
			this.animation.start();
		},

		animationOpen : function() {

			if (this.animation.target.isAnimating) {
				this.animation.stop();
			}

			this.animation = hemi.animation.createModelAnimation(this.model3d, this.animation.currentTime, this.frame1);
			this.animation.start();
		},
		animationClose : function() {
			if (this.animation.target.isAnimating) {
				this.animation.stop();
			}
			
			this.animation = hemi.animation.createModelAnimation(this.model3d, this.animation.currentTime, this.finalFrame);
			this.animation.start();
		},
		animationStop : function() {
			if (this.animation.target.isAnimating) {
				this.animation.stop();
			}
		},
		animationJumpToPercent : function(percent) {
			
			percent = -percent + 100;
			 
			if (this.animation.target.isAnimating) {
				this.animation.stop();
			}
			
			var decimal = percent / 100;
			var targetTime  = decimal * this.model3d.getMaxAnimationTime();
			
			this.animation.updateTarget(targetTime);

		}
		
	};

	lgb.view.HvacDamperView.inheritsFrom(lgb.view.ViewBase);
	return lgb;
	
})(lgb || {});











