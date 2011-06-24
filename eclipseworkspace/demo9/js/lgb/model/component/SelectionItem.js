

/**
 */
var lgb = (function(lgb) {

	lgb.model = lgb.model || {};
	lgb.model.component = lgb.model.component || {};
	
	/**
	 * @class MVC model for select controls like RadioButton
	 * @extends lgb.model.component.ControlBase
	 */
	lgb.model.component.SelectionItem = function(label, value, isSelected) {
		lgb.model.ModelBase.call(this);
		
		this.label = label;
		this.value = value;
		this.id = '';
		
		if (null === isSelected) {
			this.isSelected = false;
		} else {
			this.isSelected = isSelected;
		}

	};


	lgb.model.component.SelectionItem.prototype = {
		

		
	};
	


	lgb.model.component.SelectionItem.inheritsFrom(lgb.model.ModelBase);
	
	return lgb;
	
})(lgb || {});












