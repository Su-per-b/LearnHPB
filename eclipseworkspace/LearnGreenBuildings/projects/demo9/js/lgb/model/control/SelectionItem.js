

/**
 */
var lgb = (function(lgb) {

	lgb.model = lgb.model || {};
	lgb.model.control = lgb.model.control || {};
	
	/**
	 * @class MVC model for select controls like RadioButton
	 * @extends lgb.model.control.ControlBase
	 */
	lgb.model.control.SelectionItem = function(label, value, isSelected) {
		
		this.label = label;
		this.value = value;
		
		if (null === isSelected) {
			this.isSelected = false;
		} else {
			this.isSelected = isSelected;
		}

	};


	lgb.model.control.SelectionItem.prototype = {
		

		
	};
	


	
	return lgb;
	
})(lgb || {});












