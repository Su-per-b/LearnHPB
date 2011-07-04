
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class MVC view class 
	 */
	lgb.view.ParticleSystemView = function(dataModel){
		lgb.view.ViewBase.call(this, dataModel);	
	};
	
	lgb.view.ParticleSystemView.prototype = {
	

		show : function() {

		},
		onChange : function(event) {
			this.init();
		},
		
		init : function() {
			var dataModel = this.dataModel;
			
			this.rootPosition = dataModel.translate;
			
			this.rootTransform = hemi.shape.create (
				{shape: 'box',
				color: [1,1,0,0],
				h:1,w:1,d:1}
				);
				
			this.rootTransform.translate(this.rootPosition[0],this.rootPosition[1],this.rootPosition[2]);
			
			var config = dataModel.configs['1'];
			config.parent = this.rootTransform;
			this.particleSystem = hemi.curve.createSystem(config);
			
			var config2 = dataModel.configs['2'];
			config2.parent = this.rootTransform;
			this.exitSystem = hemi.curve.createSystem(config2);
			
			this.showBoxes = false;
		},
		
		positionAll: function(verticalHeight) {
			
		//	var verticalHeight = buildingView.envelopeView.getMeshHeight();
				
			var x = this.rootPosition[0];
			var y = this.rootPosition[1] + verticalHeight;
			var z = this.rootPosition[2];
			
			this.rootTransform.identity();
			this.rootTransform.translate(x,y,z);
			
			
		},
		start : function() {
			this.particleSystem.start();
			
			if (this.exitSystem) {
				this.exitSystem.start();
			}
	
		},
		
		stop : function() {
			this.particleSystem.stop();
			
			if (this.exitSystem) {
				this.exitSystem.stop();
			}
	
		},
		
		toggleBoxes : function() {
			this.showBoxes = !this.showBoxes;
			
			if (this.showBoxes ) {
				
				this.particleSystem.showBoxes();
	
				if (this.exitSystem) {
					this.exitSystem.showBoxes();
				}
					
			} else {
				this.particleSystem.hideBoxes();
	
				if (this.exitSystem) {
					this.exitSystem.hideBoxes();
				}
				
			}
	
		}
		
	};

	lgb.view.ParticleSystemView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











