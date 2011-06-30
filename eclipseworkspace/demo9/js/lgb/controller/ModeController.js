


/**
 * @namespace
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
			this.modelList = modelList;
			this.view = lgb.view.gui;

			this.listen(lgb.event.Event.SWITCH_MODE, this.onSwitchMode);
			
		},
		
		makeFloors: function(floorCount, floorHeight) {
			
			for (var i = 1; i < floorCount; i++){
				var floorName = 'floor'+ (i+1).toString();
				var floorModel = this.modelList[floorName];
				var zoffset = -1 * (floorHeight * i);
				
				var matrix = hemi.utils.copyArray(floorModel.root.localMatrix);
				
				matrix[3][2] = zoffset;
				floorModel.setTransformMatrix(floorModel.root, matrix);
				
				//floorModel.root.translate(0,0,zoffset);
				
				floorModel.setTransformMatrix(floorModel.root, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, zoffset, 1]]);
			};
			
			
			return;
						

		
		},

		onSwitchMode : function(event) {
			
			var mode = event.value;
			var msg = 'ModeController.onSwitchMode(): from mode: {0} to mode: {1}'
				.format(this.currentMode, mode);
				
		//	msg = msg.format(this.currentMode, event.mode);
			
			//console.log(msg);
			
			if (mode == this.currentMode) return;
			
			this.previousMode = this.currentMode;
			this.currentMode = event.mode;
			
			this.setModeVisible();
			return;
		},
		
		onShowConfigPanel : function(event) {
			
			var show = event.data.show;
			

			return;
		},
		
		setModeVisible : function () {
			
			var visible;
			
			//loop through all models
			for (var idx in this.modelList)
			{
				
				if (idx == null) continue;
				
				var model = this.modelList[idx];
				
				if (this.currentMode == 'ALL') {
					visible = true;
				}
				else {
					visible = (this.currentMode == model.LGBmode);
				}
				
				
				var config  = {vis:visible, transforms: [model.root]};
				model.setVisible(config);
				
			}
		}
		
		
		
		
		
	};
	


	return lgb;
	
})(lgb || {});










