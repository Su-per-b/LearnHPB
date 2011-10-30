goog.provide('lgb.view.RoofTopView');

goog.require('lgb.Loader');
goog.require('lgb.events.MeshLoaded');
goog.require('lgb.view.ViewBase');



/**
 * MVC View for the RoofTop Unit
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.RoofTopView = function(dataModel) {
	lgb.view.ViewBase.call(this, dataModel);

	this.dataModel = dataModel;
	this.init();
	this._NAME ='lgb.view.RoofTopView';
};
goog.inherits(lgb.view.RoofTopView, lgb.view.ViewBase);



/**
 * Initializes the View
 */
lgb.view.RoofTopView.prototype.init = function() {

	this.loader_ = new lgb.Loader();
	//this.loader_.loadFile('rooftop-joined.b.js', this.d(this.onGeometryLoaded));
	this.binaryLoader_ = new THREE.BinaryLoader();
	
	
	var path = lgb.Config.ASSETS_BASE_PATH + 'rooftop-joined.b.js';
	
	var callbackDelegate = this.d(this.onGeometryLoaded);
	
	var loadObj = {
				model: path,
				callback: callbackDelegate,
				bin_path: '3d-assets'
		};
	
	
	
	this.binaryLoader_.load(loadObj);

};


lgb.view.RoofTopView.prototype.onGeometryLoaded = function(geometry) {
	this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
	this.mesh.doubleSided = true;
	this.mesh.name = 'RoofTop';

	//mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
	//mesh.rotation.y = Math.PI/2;

	var event = new lgb.events.MeshLoaded(this.mesh);
	this.dispatchLocal(event);
};


/**
 * @override
 * @param {goo.events.Event} event The event.
 * @protected
 */
lgb.view.RoofTopView.prototype.onChange = function(event) {
	this.updateAllFromModel_();
};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.RoofTopView.prototype.updateAllFromModel_ = function() {
	this.updateVisible_();
};


/**
 * Updates this view to reflect the changes in the visibility state of the MVC model.
 * @private
 */
lgb.view.RoofTopView.prototype.updateVisible_ = function() {
	this.mesh.visible = this.dataModel.isVisible;
};

