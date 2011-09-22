


var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.SelectableController = function() {
		
		lgb.controller.ControllerBase.call(this);
		
		
		this.selectableObjects = {};
		
		var func = this.d(this.onPick);
		hemi.world.subscribe(hemi.msg.pick, func);
		
		
		this.dataModel = new lgb.model.SelectableModel();
		this.view = new lgb.view.SelectableView(this.dataModel);
		
				
		this.listen(lgb.event.SelectableEvent.REGISTER, this.onRegister);

		
		this.currentSelected=null;
	};
	
	
	lgb.controller.SelectableController.prototype = {
		
		onRegister: function(event) {
			
			var name = event.value[0].transformName;
			
			this.selectableObjects[name] = event.value[0];
			
		},
		onPick : function(msg) {
			var pickedName = msg.data.pickInfo.shapeInfo.parent.transform.name;

			
			
			if (this.currentSelected != null && this.currentSelected != selectable) {
				this.currentSelected.setVisible(false);
			}
				
			if(this.selectableObjects[pickedName]) {
				
				
				var selectable = this.selectableObjects[pickedName];
				var isVis = selectable.isVisible();
			
				selectable.setVisible(true);
				

				
				this.currentSelected = selectable;
				
				this.dispatch(lgb.event.SelectableEvent.SELECT, this.currentSelected);
			} else {
				//select none
				this.currentSelected = null;
				this.dispatch(lgb.event.SelectableEvent.SELECT, null);
			}
			

		}


	};
	
	lgb.controller.SelectableController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










