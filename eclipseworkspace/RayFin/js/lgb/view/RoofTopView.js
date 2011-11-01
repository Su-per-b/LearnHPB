goog.provide('lgb.view.RoofTopView');

goog.require('lgb.Loader');
goog.require('lgb.events.MeshLoaded');
goog.require('lgb.events.Object3DLoaded');
goog.require('lgb.events.Object3DLoaded');
goog.require('lgb.view.ViewBase');



/**
 * MVC View for the RoofTop Unit
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.RoofTopView = function(dataModel) {
	lgb.view.ViewBase.call(this, dataModel);

	this.dataModel = dataModel;
	this._NAME ='lgb.view.RoofTopView';
	

};
goog.inherits(lgb.view.RoofTopView, lgb.view.ViewBase);



/**
 * Initializes the View
 */
lgb.view.RoofTopView.prototype.init = function() {
	this.loadScene_();
};

lgb.view.RoofTopView.prototype.loadScene_= function() {

	var path = lgb.Config.ASSETS_BASE_PATH + 'rooftop_cleaned_condensed.scene.js';
	var loader = new THREE.SceneLoaderEx();

	loader.callbackSync = this.d(this.onSceneLoaded_);
	//loader.callbackProgress = callbackProgress;

	loader.load( path );
	
	
};


lgb.view.RoofTopView.prototype.loadBinary_ = function() {
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

/**
 * @private
 */
lgb.view.RoofTopView.prototype.onSceneLoaded_ = function(result) {

	lgb.logInfo('onSceneLoaded_');
	this.masterGroup = new THREE.Object3D();
	
	for (var i = result.scene.objects.length - 1; i >= 0; i--){
	  	var mesh = result.scene.objects[i];
	  	this.masterGroup.add(mesh);

		var event = new lgb.events.SelectableLoaded(mesh);
		this.dispatchLocal(event);
		
	};
	
	this.masterGroup.rotation.x = 90 * Math.PI / 180;
	this.masterGroup.rotation.y = 180 * Math.PI / 180;
	this.masterGroup.rotation.z = 270 * Math.PI / 180;
		
	var event = new lgb.events.Object3DLoaded(this.masterGroup);
	this.dispatchLocal(event);

};

lgb.view.RoofTopView.prototype.onGeometryLoaded = function(geometry) {
	this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
	this.mesh.doubleSided = true;
	this.mesh.name = 'RoofTop';
	this.mesh.position.x -=1;
	//mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
	//

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
	this.masterGroup.visible = this.dataModel.isVisible;
};

