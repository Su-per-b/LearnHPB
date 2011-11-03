goog.provide('lgb.model.SelectableModel');

goog.require('lgb.model.ModelBase');
goog.require('hemi.utils');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.SelectableModel = function() {
	/**@const */
	this._NAME ='lgb.model.SelectableModel';
	
	lgb.model.ModelBase.call(this);
	this.init_();

};
goog.inherits(lgb.model.SelectableModel, lgb.model.ModelBase);


lgb.model.SelectableModel.prototype.init_ = function() {
	this.selectable = {
		Filter : true,
		HeatingCoil : true,
		CoolingCoil : true,
		Fan : true,
		LeftDamper : true,
		CenterDamper : true,
		TopDamper : true,
		Diffuser01 : true,
		Diffuser02 : true,
		Diffuser03 : true,
		Diffuser04 : true,
		Diffuser05 : true,
		Diffuser06 : true,
		Diffuser07 : true,
		Diffuser08 : true,
		Diffuser09 : true
	}
	this.selectableMeshes = {};
	this.selected = [];
	this.deselected = [];
};



/**
 * param {THREE.Mesh} mesh
 */
lgb.model.SelectableModel.prototype.select = function(intersect) {

	//select none
	this.deselected = hemi.utils.clone(this.selected, false);
	this.selected = [];
	

	if (intersect != null) {
		
		if (intersect.mesh == null) {
			throw ('intersect.mesh == null');
		}
		if (intersect.mesh.name == null || intersect.mesh.name == '') {
			throw ('intersect.mesh.name  == null or ""');
		}
		if (this.selectableMeshes[intersect.mesh.name]) {
			this.selected.push(this.selectableMeshes[intersect.mesh.name]);
		}
	}
	
	this.dispatchChange();
};

/**
 * param {THREE.Mesh} mesh
 */
lgb.model.SelectableModel.prototype.addMesh = function(mesh) {

	if (this.selectable[mesh.name] == true) {
		var mc = THREE.CollisionUtils.MeshColliderWBox(mesh);
		THREE.Collisions.colliders.push( mc );
		
		this.selectableMeshes[mesh.name] = mesh;
		//this.selectableMeshes.push(mesh);
	}
};


