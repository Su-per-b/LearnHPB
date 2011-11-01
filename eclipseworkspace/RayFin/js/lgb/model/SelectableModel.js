goog.provide('lgb.model.SelectableModel');

goog.require('lgb.model.ModelBase');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.SelectableModel = function() {

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
		TopDamper : true
	}
	this.selectableMeshes = {};
	this.selected = [];
	//this.selectableMeshes = [];
};



/**
 * param {THREE.Mesh} mesh
 */
lgb.model.SelectableModel.prototype.select = function(intersect) {
	this.selected = [];
	if (this.selectableMeshes[intersect.mesh.name]) {
		this.selected.push(this.selectableMeshes[intersect.mesh.name]);
	}
	
	this.dispatchChange();
//	var x;
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


