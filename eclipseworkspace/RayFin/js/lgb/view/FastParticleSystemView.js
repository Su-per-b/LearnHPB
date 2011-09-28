goog.provide('lgb.view.FastParticleSystemView');

goog.require ("lgb.view.ViewBase");
goog.require('hemi.curve.GpuParticleSystem');


/**
 * @class MVC view class 
 */
lgb.view.FastParticleSystemView = function(dataModel){
	lgb.view.ViewBase.call(this, dataModel);	
	
	this.dataModel = dataModel;
	//this.init();
	
	this.listenTo(this.dataModel, lgb.event.DataModelChanged, this.init);
};

goog.inherits(lgb.view.FastParticleSystemView, lgb.view.ViewBase);



lgb.view.FastParticleSystemView.prototype.init = function() {
	//var dataModel = this.dataModel;

	var config = this.dataModel.configs['1'];
	//config.parent = this.rootTransform;
	
	
	this.particleSystem = new hemi.curve.GpuParticleSystem(config);
	//hemi.curve.createSystem(config);
	

	this.particleSystem.translate(
		this.dataModel.translate[0], 
		this.dataModel.translate[1], 
		this.dataModel.translate[2]);

/*
	var config2 = this.dataModel.configs['2'];
	//config2.parent = this.rootTransform;
	this.exitSystem = new hemi.curve.GpuParticleSystem(config2);
	

	this.exitSystem.translate(
		this.dataModel.translate[0], 
		this.dataModel.translate[1], 
		this.dataModel.translate[2]);

	this.originalVertialHeight = dataModel.translate[1];
	this.vertalDelta1 = null;
	
	this.showBoxes = false;
	
	*/
	
};


lgb.view.FastParticleSystemView.prototype.positionAll = function() {
				
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
		
			
};


lgb.view.FastParticleSystemView.prototype.start = function() {
	this.particleSystem.start();
	
	if (this.exitSystem) {
		this.exitSystem.start();
	}
	
};

lgb.view.FastParticleSystemView.prototype.stop = function() {
	
	this.particleSystem.stop();
	
	if (this.exitSystem) {
		this.exitSystem.stop();
	}
	
};


lgb.view.FastParticleSystemView.prototype.toggleBoxes = function() {
	
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
	
};

	
	













