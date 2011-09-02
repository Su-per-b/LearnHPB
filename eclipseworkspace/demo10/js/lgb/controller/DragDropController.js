
var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building envelope
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.DragDropController = function() {
		


	};
	
	
	lgb.controller.MainController.prototype = {
		
		
		init: function() {

			document.body.addEventListener("dragenter", this.dragEnter, false);
			document.body.addEventListener("dragexit", this.dragExit, false);
			document.body.addEventListener("dragover", this.dragOver, false);
			document.body.addEventListener("drop", this.drop, false);
		},

		

		
	};
	

	return lgb;
	
})(lgb || {});










