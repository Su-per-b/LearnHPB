goog.provide('lgb.view.ParticleSystemView');

goog.require ("lgb.view.ViewBase");
goog.require('hemi.curve.ParticleSystem');


/**
 * @class MVC view class 
 */
lgb.view.ParticleSystemView = function(dataModel){
	lgb.view.ViewBase.call(this, dataModel);	
	
	this.dataModel = dataModel;

	
	this.listenTo(this.dataModel, lgb.event.DataModelChanged, this.onDataModelChanged);
};

goog.inherits(lgb.view.ParticleSystemView, lgb.view.ViewBase);



lgb.view.ParticleSystemView.prototype.onDataModelChanged = function(event) {

		var dataModel = this.dataModel;
		
		/*
		this.rootPosition = dataModel.translate;
		
		this.rootTransform = hemi.shape.create (
			{shape: 'box',
			color: [1,1,0,0],
			h:1,w:1,d:1}
			);
			*/
			
		//this.rootTransform.translate(this.rootPosition[0],this.rootPosition[1],this.rootPosition[2]);
		
		var config = dataModel.configs['1'];
		config.parent = this.rootTransform;
		this.particleSystem = hemi.curve.createSystem(config);
		this.start();

		
		this.showBoxes = false;
	
};


lgb.view.ParticleSystemView.prototype.positionAll = function(verticalHeight) {
				
			var x = this.rootPosition[0];
			var y = this.rootPosition[1] + verticalHeight;
			var z = this.rootPosition[2];
			
			this.rootTransform.identity();
			this.rootTransform.translate(x,y,z);
		
			
};


lgb.view.ParticleSystemView.prototype.start = function() {
	this.particleSystem.start();
};

lgb.view.ParticleSystemView.prototype.stop = function() {
	
	this.particleSystem.stop();
	
};


lgb.view.ParticleSystemView.prototype.toggleBoxes = function() {
	
	this.showBoxes = !this.showBoxes;
	
	if (this.showBoxes ) {
		this.particleSystem.showBoxes();
	} else {
		this.particleSystem.hideBoxes();
	}
	
};

	
	













