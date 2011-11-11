goog.provide('lgb.model.RoofTopModel');

goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.model.ModelBase');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.RoofTopModel = function() {
	/**@const */
	this._NAME = 'lgb.model.RoofTopModel';

	/**@const */
	this._TITLE = 'Roof-top Unit';

	lgb.model.ModelBase.call(this);

	this.groupMembership = {};
	this.groupMembership[lgb.model.BuildingModel.Group.ALL] = true;
	this.groupMembership[lgb.model.BuildingModel.Group.ROOFTOP] = true;
	this.groupMembership[lgb.model.BuildingModel.Group.HVAC] = true;

	this.isVisible = true;

};
goog.inherits(lgb.model.RoofTopModel, lgb.model.ModelBase);


lgb.model.RoofTopModel.prototype.init = function() {


};



/**
 * param {boolean} makeVisible Used to change the visibility.
 */
lgb.model.RoofTopModel.prototype.setVisible = function(makeVisible) {

	if (this.isVisible != makeVisible) {
		this.isVisible = makeVisible;

		this.dispatchChange();
	}
};

/**
 * @public
 * @param {lgb.model.BuildingModel.Group} group The group name to
 * set as visible.
 */
lgb.model.RoofTopModel.prototype.setVisiblityGroup = function(group) {

	if (this.groupMembership[group]) {
		this.setVisible(true);
	} else {
		this.setVisible(false);
	}
};
