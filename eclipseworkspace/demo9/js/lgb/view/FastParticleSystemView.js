
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class MVC view class 
	 */
	lgb.view.FastParticleSystemView = function(dataModel){
		lgb.view.ViewBase.call(this, dataModel);	
	};
	
	lgb.view.FastParticleSystemView.prototype = {
	

		show : function() {

		},
		onChange : function(event) {
			this.init();
		},
		
		init : function() {
			var dataModel = this.dataModel;
/*
			
			this.rootPosition = dataModel.translate;
*/
/*
			
			this.rootTransform = hemi.shape.create (
				{shape: 'box',
				color: [1,1,0,0],
				h:1,w:1,d:1}
				);
				
			this.rootTransform.translate(this.rootPosition[0],this.rootPosition[1],this.rootPosition[2]);
			
*/
			var config = dataModel.configs['1'];
			config.parent = this.rootTransform;
			this.particleSystem = hemi.curve.createSystem(config);
			

			this.particleSystem.translate(
				dataModel.translate[0], 
				dataModel.translate[1], 
				dataModel.translate[2]);

				

			
			var config2 = dataModel.configs['2'];
			config2.parent = this.rootTransform;
			this.exitSystem = hemi.curve.createSystem(config2);
			

			this.exitSystem.translate(
				dataModel.translate[0], 
				dataModel.translate[1], 
				dataModel.translate[2]);

			this.originalVertialHeight = dataModel.translate[1];
			this.vertalDelta1 = null;
			
			this.showBoxes = false;
		},
		
		positionAll: function(verticalHeight) {
					
			var x = this.dataModel.translate[0];
			var y = this.dataModel.translate[1];
			var z = this.dataModel.translate[2];
			
			//var yDelta = verticalHeight -  this.originalVertialHeight;
			
			if(lgb.isNull(this.vertalDelta1)) {
				this.vertalDelta1 = verticalHeight - this.originalVertialHeight;
			} 
			
			var adjustedNewHeight = verticalHeight - this.vertalDelta1;
			var deta2 = adjustedNewHeight -  this.originalVertialHeight;
			
			
			this.originalVertialHeight += deta2;
			
			//this.particleSystem.setupBounds(this.particleSystem.material, this.dataModel.boxes);
		//	setupBounds(this.material, this.boxes);
			
			//this.particleSystem.identity();
			//this.exitSystem.identity();
			
			this.particleSystem.translate(0 ,deta2,0);
			this.exitSystem.translate(0 ,deta2,0);
			
			if (this.showBoxes) {
				this.toggleBoxes();
				this.toggleBoxes();
			}
			
		//	this.exitSystem.translate(x,y,z);
			
			
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

	lgb.view.FastParticleSystemView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











