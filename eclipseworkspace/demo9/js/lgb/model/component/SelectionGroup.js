
var lgb = (function(lgb) {

	lgb.model = lgb.model || {};
	lgb.model.component = lgb.model.component || {};
	
	/**
	 * @class MVC model for select controls like RadioButtonGroup
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.component.SelectionGroup = function(title, eventName, id) {
		
		lgb.model.ModelBase.call(this);
		
		this.title = title;
		this.eventName = eventName;
		
		this.id = this.generateId();
		this.selectionItems =[];

	};


	lgb.model.component.SelectionGroup.prototype = {
		
		generateId: function() {
			var id = this.eventName.split('_').join('-');
			return id;

		},
		

		addItem: function(selectionItem) {
			lgb.utils.validArgs(1, ['lgb.model.component.SelectionItem']);	  
				
			this.selectionItems.push(selectionItem);
		},
		
		createItem: function(label, value, isSelected) {
			
			var selectionItem = new lgb.model.component.SelectionItem(label, value, isSelected);
			this.selectionItems.push(selectionItem);
			
		}

	};
	

	lgb.model.component.SelectionGroup.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












