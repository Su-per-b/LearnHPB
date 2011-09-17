goog.provide('lgb.controller.DragDropController');


	
/**
 * @class MVC controller for the building envelope
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.DragDropController = function() {
	

};


lgb.controller.DragDropController.prototype.init = function() {
	
	document.body.addEventListener("dragenter", this.dragEnter, false);
	document.body.addEventListener("dragexit", this.dragExit, false);
	document.body.addEventListener("dragover", this.dragOver, false);
	document.body.addEventListener("drop", this.drop, false);
	
};
	











