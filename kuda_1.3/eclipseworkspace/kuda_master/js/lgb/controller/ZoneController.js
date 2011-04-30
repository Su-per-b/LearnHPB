


/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace MVC controller 
	 */
	lgb.controller = lgb.controller || {};
	lgb.controller.ModeController = function(){
		this.currentMode = 'ALL';
		this.previousMode = 'ALL';

	};
	
	lgb.controller.ModeController.prototype = {
		init: function(modelList) {
			
			
			this.modeToModelMapping = {
				HVAC :'ductwork',
				ENVELOPE : 'envelope',
				LIGHTING : 'rooftop'
			}
			
			
			this.modelList = modelList;
			this.view = lgb.view.gui;
			
			var delegate = jQuery.proxy( this.onSwitchMode, this );
			
			$(lgb.view.gui).bind("SWITCH_MODE",delegate);
			
			
		},

		onSwitchMode : function(event) {
			
			var msg = 'ModeController.onSwitchMode(): from mode: {0} to mode: {1}'
				.format(this.currentMode, event.mode);
				
			//msg.format(this.currentMode, event.mode);
			
			console.log(msg);
			
			if (event.mode == this.currentMode) return;
			this.previousMode = this.currentMode;
			this.currentMode = event.mode;
			
			if (this.currentMode == 'ALL') {
				this.setModelsVisible('ALL');

			} else {
					
				var newModelName = this.modeToModelMapping[event.mode];
				
				if(!newModelName in this.modelList) {
					console.error('newModelName: ' + newModelName + ' does not exist');
					return;
				}

				this.setModelsVisible(newModelName);
			}
			

			
			/*
			//show only the selected model
			for (var idx in this.modelList)
			{
				
				if (idx == null) continue;
				
				var model = this.modelList[idx];
				var visible = (this.currentMode == 'ALL');
				if (idx == newModelName) {
					visible = true;
				}
				
				var config  = {vis:visible, transforms: model.transforms};
				model.setVisible(config);
				
			}
			*/

		},
		
		setModelsVisible : function (modelName) {
			
			var visible;
			for (var idx in this.modelList)
			{
				
				if (idx == null) continue;
				
				var model = this.modelList[idx];
				
				if (idx == modelName || modelName == 'ALL') {
					visible = true;
				} else {
					visible = false;
				}
				
				var config  = {vis:visible, transforms: model.transforms};
				model.setVisible(config);
				
			}
		}
		
		
		
		
		
	};
	


	return lgb;
	
})(lgb || {});










