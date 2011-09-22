




/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	
	/**
	 * @class MVC model for the building envelope
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.SelectableModel = function() {
		
		lgb.model.ModelBase.call(this);


		this.title = "Selected";
		this.name = "SELECTABLE";
		
		
		this.selectedItem = new lgb.model.component.TextInput (
				this.name,
				'Selected Item:',
				'none'
		);
			


		this.userActions = [this.selectedItem];
		
							

		this.dispatch(lgb.event.Event.USER_ACTIONS_CREATED, this);
		this.listen(lgb.event.SelectableEvent.SELECT, this.onSelected);

	};


	lgb.model.SelectableModel.prototype = {
		
		onSelected : function (event) {
			
			var selected = event.value;
			
			
			var txt = 'none';
			if(selected) {
				txt = selected.label;
			}
			
			
			this.jqSelectedItem = $('#' + this.selectedItem.id);
		

			this.jqSelectedItem.attr('value', txt); 
		}

	};
	

	lgb.model.SelectableModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












