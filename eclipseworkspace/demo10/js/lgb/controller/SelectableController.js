


var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.SelectableController = function() {
		
		lgb.controller.ControllerBase.call(this);
		
		
		this.selectableObjects = {};
		this.selectableObjectsById = {};
		
		var func = this.d(this.onPick);
		hemi.world.subscribe(hemi.msg.pick, func);
		
		
		this.dataModel = new lgb.model.SelectableModel();
		this.view = new lgb.view.SelectableView(this.dataModel);
		
				
		this.listen(lgb.event.SelectableEvent.REGISTER, this.onRegister);
		this.listen(lgb.event.SelectableEvent.SELECT_ID, this.onSelectId);

		
		this.currentSelected=null;
	};
	
	
	lgb.controller.SelectableController.prototype = {
		
		onSelectId: function(event) {
			var id = event.value;
			var selectable = this.selectableObjectsById[id];
			
			if (selectable == null) return;
							
			if (this.currentSelected != null && this.currentSelected != selectable) {
				this.currentSelected.setVisible(false);
			}
			
			var isVis = selectable.isVisible();
			
			selectable.setVisible(true);
			this.currentSelected = selectable;

				
			this.dispatch(lgb.event.SelectableEvent.SELECT, this.currentSelected);
			
		},
		onRegister: function(event) {
			
			var name = event.value[0].transformName;
			var id = event.value[0].id;
			
			this.selectableObjects[name] = event.value[0];
			
			if (id !== undefined) {
				this.selectableObjectsById[id] = event.value[0];
			}
		},
		onPick : function(msg) {
			var pickedName = msg.data.pickInfo.shapeInfo.parent.transform.name;
			if (pickedName == "") return;
			
			
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










