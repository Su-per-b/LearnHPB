goog.provide('lgb.controller.DragDropController');



/**
 * @constructor
 */
lgb.controller.DragDropController = function() {


};


lgb.controller.DragDropController.prototype.init = function() {

	document.body.addEventListener('dragenter', this.dragEnter, false);
	document.body.addEventListener('dragexit', this.dragExit, false);
	document.body.addEventListener('dragover', this.dragOver, false);
	document.body.addEventListener('drop', this.drop, false);

};












