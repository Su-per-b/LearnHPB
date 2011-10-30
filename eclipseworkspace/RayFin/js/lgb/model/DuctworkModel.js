goog.provide('lgb.model.DuctworkModel');

goog.require('lgb.model.ModelBase');
goog.require('lgb.model.BuildingModel.Group');


/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.DuctworkModel = function() {

	lgb.model.ModelBase.call(this);
	/**@const */
	this._NAME ='lgb.model.DuctworkModel';
	
	this.groupMembership = {};
	this.groupMembership[lgb.model.BuildingModel.Group.ALL] = true;
	this.groupMembership[lgb.model.BuildingModel.Group.HVAC] = true;
	this.groupMembership[lgb.model.BuildingModel.Group.DUCTWORK] = true;
	
	this.isVisible = true;
};

goog.inherits(lgb.model.DuctworkModel, lgb.model.ModelBase);


lgb.model.DuctworkModel.prototype.init = function() {




};


/**
 * param {boolean} makeVisible Used to change the visibility.
 */
lgb.model.DuctworkModel.prototype.setVisible = function(makeVisible) {

	if(this.isVisible != makeVisible) {
		this.isVisible = makeVisible;
		
		this.dispatchChange();
	};
};

/**
 * @public
 * @param {lgb.model.Building.Group}
 */
lgb.model.DuctworkModel.prototype.setVisiblityGroup = function(group) {
	
	if (this.groupMembership[group]) {
		this.setVisible(true);
	} else {
		this.setVisible(false);
	}
};
