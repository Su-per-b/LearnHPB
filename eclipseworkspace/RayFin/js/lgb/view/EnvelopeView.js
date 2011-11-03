goog.provide('lgb.view.EnvelopeView');

goog.require('lgb.Loader');
goog.require('lgb.events.ColladaSceneLoadedEvent');
goog.require('lgb.events.MeshLoaded');
goog.require('lgb.events.ViewInitialized');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.EnvelopeView = function(dataModel) {
	lgb.view.ViewBase.call(this, dataModel);
	
	/**@const */
	this._NAME ='lgb.view.EnvelopeView';
	
	/**@type {Array.<THREE.Geometry>} */
	this.floorGeometry = [];
	
	this.init_();
};
goog.inherits(lgb.view.EnvelopeView, lgb.view.ViewBase);


/**
 * Initializes the View 
 * and loads the meshes from remote files
 * @private
 */
lgb.view.EnvelopeView.prototype.init_ = function() {
	this.loader1_ = new lgb.Loader();
	
	
	this.loader1_.loadFile('envelope/9footEnvelopeStrip-joined.b.js', this.d(this.onGeometryLoaded, 9));
	
	this.loader2_ = new lgb.Loader();
	this.loader2_.loadFile('envelope/11footEnvelopeStrip.b.js', this.d(this.onGeometryLoaded, 11));
	
	this.loader3_ = new lgb.Loader();
	this.loader3_.loadFile('envelope/13footEnvelopeStrip.b.js', this.d(this.onGeometryLoaded, 13));
	
};


/**
 * @override
 * @param {lgb.events.DataModelChanged} event The event.
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
	this.makeFloors_();
	this.updateVisible_();

	
};


/**
 * @private
 */
lgb.view.EnvelopeView.prototype.makeFloors_ = function() {
	
	var geometry = this.floorGeometry[this.dataModel.floorHeight];
	var bb = geometry.boundingBox;
	
	this.xExt = bb.x[1] - bb.x[0];
	this.yExt = bb.y[1] - bb.y[0];
	this.zExt = bb.z[1] - bb.z[0];
	
	var m = this.masterGroup.children.length;
	
	for (var i = this.masterGroup.children.length - 1; i >= 0; i--){
		this.masterGroup.remove(this.masterGroup.children[i]);
	};

	var l = this.dataModel.floorCount;
	
	for (var j=0; j < l; j++) {
		var floor = this.makeFloor_(geometry);
		floor.position.y -= j * this.yExt;
		this.masterGroup.add(floor);
	};

};


/**
 * @private
 * @return {THREE.Mesh}
 */
lgb.view.EnvelopeView.prototype.makeFloor_ = function(geometry) {

	var floor  = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
	
	floor.position.x = -1 * this.xExt / 2;
	floor.position.y = -1 * this.yExt;
	floor.position.z = this.zExt / 2;
	floor.doubleSided = true;
	floor.scale.x = floor.scale.y = floor.scale.z = 1;
	
	return floor;
	
}

/**
 * Updates this view to reflect the changes in the visibility state of the MVC model.
 * @private
 */
lgb.view.EnvelopeView.prototype.updateVisible_ = function() {
	var m = this.masterGroup.children.length;
	
	for (var i=0; i < m; i++) {
		this.masterGroup.children[i].visible = this.dataModel.isVisible;
	};
};


lgb.view.EnvelopeView.prototype.makeMasterGroup = function() {
	this.masterGroup = new THREE.Object3D();
	this.updateAllFromModel_();
	
	var event = new lgb.events.Object3DLoaded(this.masterGroup);
	this.dispatchLocal(event);
	
	this.dispatchLocal(new lgb.events.ViewInitialized());
}


lgb.view.EnvelopeView.prototype.onGeometryLoaded = function(floorNumber, geometry) {
	this.floorGeometry[floorNumber] = geometry;
	this.floorGeometry[floorNumber].computeBoundingBox();
	
	if(this.floorGeometry[9] &&
	this.floorGeometry[11] &&
	this.floorGeometry[13]) {
		this.makeMasterGroup();
	}
	
	delete this.loader1_;
	delete this.loader2_;
	delete this.loader3_;
	
};












