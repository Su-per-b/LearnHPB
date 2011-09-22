

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view 
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.SelectableView = function(dataModel){
		lgb.view.ViewBase.call(this, dataModel);
	
	};
	
	lgb.view.SelectableView.prototype = {
	

		onChange : function(event) {

		},
		
		meshesLoaded : function() {

		},
		
		show : function() {

		}
		
	};

	lgb.view.SelectableView.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











