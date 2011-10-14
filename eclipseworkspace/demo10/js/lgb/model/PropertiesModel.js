
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	
	/**
	 * @class MVC model for the building envelope
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.PropertiesModel = function() {
		
		lgb.model.ModelBase.call(this);

		this.name = "none";
		
		this.listen(lgb.event.SelectableEvent.SELECT, this.onSelected);
		//this.listen(lgb.event.SelectableEvent.SELECT_ID, this.onSelectedID);
	};


	lgb.model.PropertiesModel.prototype = {
		
		onSelected : function (event) {
			var selected = event.value;
			var txt = 'none';
			if(selected) {
				txt = selected.label;
			}
			this.name = txt;
			
			this.dispatchLocal(lgb.event.Event.DATA_MODEL_CHANGED);
		}
		
	};
	

	lgb.model.PropertiesModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












