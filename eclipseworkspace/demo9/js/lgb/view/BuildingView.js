
/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.BuildingView = function(){
		lgb.view.ViewBase.call(this);
	};
	
	lgb.view.BuildingView.prototype = {
	
		init: function(){
		
			
			this.listen(lgb.event.Event.ALL_MESHES_LOADED, this.onMeshesLoaded);
		},
		onMeshesLoaded : function(event) {
			

			
		}
		
		
		
	};

	lgb.view.BuildingView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











