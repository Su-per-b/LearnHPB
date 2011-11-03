goog.provide('lgb.controller.SelectionController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.view.SelectionView');
goog.require('lgb.model.SelectableModel');
goog.require('lgb.events.SelectableLoaded');

/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.SelectionController = function(containerDiv, camera) {
	
	lgb.controller.ControllerBase.call(this);
	this.containerDiv_ = containerDiv;
	this.camera_ = camera;
	this.init_();

};
goog.inherits(lgb.controller.SelectionController, lgb.controller.ControllerBase);


lgb.controller.SelectionController.prototype.init_ = function() {
		

	this.dataModel = new lgb.model.SelectableModel();
	this.view = new lgb.view.SelectionView(this.dataModel, this.containerDiv_, this.camera_);
	
	lgb.controller.SelectionController.superClass_.bind.call(this);
	this.listen(lgb.events.SelectableLoaded.TYPE, this.onSelectableLoaded_);
	this.view.init();



	
};

/**
 * @public
 * @param {lgb.events.SelectableLoaded} event the event telling
 * about a new 3d Object which has loaded.
 */
lgb.controller.SelectionController.prototype.onSelectableLoaded_ = function(event) {
	//this.selectableObjects.push(event.payload);
	
	this.dataModel.addMesh(event.payload);
}