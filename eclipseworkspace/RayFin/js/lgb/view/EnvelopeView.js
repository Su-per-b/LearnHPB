goog.provide('lgb.view.EnvelopeView');

goog.require('lgb.Loader');
goog.require('lgb.events.ColladaSceneLoadedEvent');
goog.require('lgb.events.MeshLoaded');
goog.require('lgb.view.ViewBase');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.EnvelopeView = function(dataModel) {
	lgb.view.ViewBase.call(this, dataModel);
	this.init_();
};
goog.inherits(lgb.view.EnvelopeView, lgb.view.ViewBase);


/**
 * Initializes the View 
 * and loads the meshes from remote files
 * @private
 */
lgb.view.EnvelopeView.prototype.init_ = function() {
	this.loader_ = new lgb.Loader();
	this.loader_.loadFile('9footEnvelopeStrip-joined.b.js', this.d(this.onGeometryLoaded));

};


/**
 * @override
 * @param {goo.events.Event} event The event.
 * @protected
 */
lgb.view.EnvelopeView.prototype.onChange = function(event) {
	this.updateAllFromModel_();
};



/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.EnvelopeView.prototype.updateAllFromModel_ = function() {
	this.updateVisible_();
};


/**
 * Updates this view to reflect the changes in the visibility state of the MVC model.
 * @private
 */
lgb.view.EnvelopeView.prototype.updateVisible_ = function() {
	this.floor1.visible = this.dataModel.isVisible;
	this.floor2.visible = this.dataModel.isVisible;
	this.floor3.visible = this.dataModel.isVisible;
};


lgb.view.EnvelopeView.prototype.onGeometryLoaded = function(geometry) {
	
	this.floorGeometry = geometry;
	this.floorGeometry.computeBoundingBox();
	
	var bb = this.floorGeometry.boundingBox;
	
	this.xExt = bb.x[1] - bb.x[0];
	this.yExt = bb.y[1] - bb.y[0];
	this.zExt = bb.z[1] - bb.z[0];
	
	this.floor1 = this.makeFloor_();
	this.floor2 = this.makeFloor_();
	this.floor3 = this.makeFloor_();
	
	this.floor2.position.y -= 1 * this.yExt;
	this.floor3.position.y -= 2 * this.yExt;
	
	this.masterGroup = new THREE.Object3D();
	this.masterGroup.add(this.floor1);
	this.masterGroup.add(this.floor2);
	this.masterGroup.add(this.floor3);
	//this.floor2
		
	var event = new lgb.events.Object3DLoaded(this.masterGroup);
	this.dispatchLocal(event);
};


/**
 * @private
 * @return {THREE.Mesh}
 */
lgb.view.EnvelopeView.prototype.makeFloor_ = function() {
	
	var floor  = new THREE.Mesh(this.floorGeometry, new THREE.MeshFaceMaterial());
	
	floor.position.x = -1 * this.xExt / 2;
	floor.position.y = -1 * this.yExt;
	floor.position.z = this.zExt / 2;
	floor.doubleSided = true;
	floor.scale.x = floor.scale.y = floor.scale.z = 1;
	
	return floor;
	
}









