goog.provide('lgb.view.DuctworkView');

goog.require('lgb.Loader');
goog.require('lgb.events.ColladaSceneLoadedEvent');
goog.require('lgb.events.MeshLoaded');
goog.require('lgb.view.ViewBase');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.DuctworkView = function(dataModel) {
	lgb.view.ViewBase.call(this, dataModel);

	this.dataModel = dataModel;
	this._NAME ='lgb.view.DuctworkView';
	this.init_();

};
goog.inherits(lgb.view.DuctworkView, lgb.view.ViewBase);



/**
 * Initializes the View
 * loads the geometry
 * @private
 */
lgb.view.DuctworkView.prototype.init_ = function() {
	this.loader_ = new lgb.Loader();
	this.loader_.loadFile('ductwork102611.b.js', this.d(this.onGeometryLoaded));
};


/**
 * @override
 * @param {goo.events.Event} event The event.
 * @protected
 */
lgb.view.DuctworkView.prototype.onChange = function(event) {
	this.updateAllFromModel_();
};



/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.DuctworkView.prototype.updateAllFromModel_ = function() {
	this.updateVisible_();
};


/**
 * Updates this view to reflect the changes in the visibility state of the MVC model.
 * @private
 */
lgb.view.DuctworkView.prototype.updateVisible_ = function() {
	this.mesh.visible = this.dataModel.isVisible;
};


lgb.view.DuctworkView.prototype.onGeometryLoaded = function(geometry) {
	
	this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
	this.mesh.doubleSided = true;
	this.mesh.name = 'Ductwork';

	this.mesh.rotation.y = 90 * Math.PI / 180;
	this.mesh.position.x += 1;
	this.mesh.position.y -= 0.7;
	this.mesh.updateMatrix();
	
	var event = new lgb.events.MeshLoaded(this.mesh);
	this.dispatchLocal(event);
	
};
