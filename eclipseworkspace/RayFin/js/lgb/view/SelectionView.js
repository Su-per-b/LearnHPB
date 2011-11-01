goog.provide('lgb.view.SelectionView');

goog.require('lgb.events.RenderEvent');
goog.require('lgb.view.ViewBase');
goog.require('lgb.model.SelectableModel');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.SelectableModel} dataModel
 * @param {*} containerDiv
 * @param {THREE.Camera} camera
 */
lgb.view.SelectionView = function(dataModel, containerDiv, camera) {
	lgb.view.ViewBase.call(this, dataModel);
	this.containerDiv_ = containerDiv;
	this.camera_ = camera;
	
	this.init();
	this._NAME ='lgb.view.SelectionView';
};
goog.inherits(lgb.view.SelectionView, lgb.view.ViewBase);



/**
 * Initializes the View
 */
lgb.view.SelectionView.prototype.init = function() {
	
	/**
   * @type {THREE.Projector}
   * @private
   */
	this.projector_ = new THREE.Projector();
	this.mouse = { x: 0, y: 0 };
	this.mouseMoveDirty = false;
	this.containerDiv_.addEventListener( 'mouseup',   this.d(this.onClick), false );
};


lgb.view.SelectionView.prototype.onClick = function(event) {
	this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	this.mouseMoveDirty = true;
	
	this.listen(lgb.events.RenderEvent.TYPE, this.onRender);
};



lgb.view.SelectionView.prototype.onChange = function(event) {
	this.highlightMesh(this.dataModel.selected[0]);
};

lgb.view.SelectionView.prototype.highlightMesh = function(mesh) {
		lgb.logInfo(mesh.name , 'highlightMesh');
};


lgb.view.SelectionView.prototype.onMouseMove = function(event) {
	this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
};



lgb.view.SelectionView.prototype.checkCollision = function() {
	var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
	this.projector_.unprojectVector(vector, this.camera_);

	var ray = new THREE.Ray(
		this.camera_.position,
		vector.subSelf(this.camera_.position).normalize());

	var intersect = THREE.Collisions.rayCastNearest(ray);

	if (intersect) {
		this.dataModel.select(intersect);
		//lgb.logInfo('mouse over ' + c.mesh.name, 'lgb.controller.WorldController.renderHelper');
	} 

};


lgb.view.SelectionView.prototype.onRender = function(event) {
	this.checkCollision();
	this.unlisten(lgb.events.RenderEvent.TYPE, this.onRender);
};


