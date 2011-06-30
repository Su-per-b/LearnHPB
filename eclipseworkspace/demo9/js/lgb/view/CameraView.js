

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view for displaying the building envelope
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.CameraView = function(dataModel){
	
		lgb.view.ViewBase.call(this);
		this.dataModel = dataModel; //building

	};
	
	lgb.view.CameraView.prototype = {
	

		meshesLoaded : function() {

		},
		
		show : function() {

		}
		
	};

	lgb.view.CameraView.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











