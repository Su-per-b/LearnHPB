goog.provide('lgb.model.EnvelopeModel');

goog.require('lgb.model.ModelBase');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.EnvelopeModel = function() {

	lgb.model.ModelBase.call(this);
	
	this.floorCount = 3;
	this.floorHeight = 9;
	this.isVisible = true;
	/**@const */
	this._NAME ='lgb.model.EnvelopeModel';
	
	this.groupMembership = {};
	this.groupMembership[lgb.model.BuildingModel.Group.ALL] = true;
	this.groupMembership[lgb.model.BuildingModel.Group.ENVELOPE] = true;
};

goog.inherits(lgb.model.EnvelopeModel, lgb.model.ModelBase);


lgb.model.EnvelopeModel.prototype.init = function() {




};

/**
 * param {boolean} makeVisible Used to change the visibility.
 */
lgb.model.EnvelopeModel.prototype.setVisible = function(makeVisible) {

	if(this.isVisible != makeVisible) {
		this.isVisible = makeVisible;
		
		this.dispatchChange();
	};
};

/**
 * @public
 * @param {lgb.model.Building.Group}
 */
lgb.model.EnvelopeModel.prototype.setVisiblityGroup = function(group) {
	
	if (this.groupMembership[group]) {
		this.setVisible(true);
	} else {
		this.setVisible(false);
	}
};
