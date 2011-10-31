goog.provide('lgb.model.EnvelopeModel');

goog.require('lgb.model.ModelBase');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.EnvelopeModel = function() {

	lgb.model.ModelBase.call(this);
	
	this.floorCount = 5;
	this.floorHeight = 9;
	//this.floorHeightContraints = [9, 11, 13];
	
	this.isVisible = true;
	/**@const */
	this._NAME ='lgb.model.EnvelopeModel';
	/**@const */
	this._TITLE = 'Envelope';
	this.groupMembership = {};
	this.groupMembership[lgb.model.BuildingModel.Group.ALL] = true;
	this.groupMembership[lgb.model.BuildingModel.Group.ENVELOPE] = true;
};

goog.inherits(lgb.model.EnvelopeModel, lgb.model.ModelBase);


lgb.model.EnvelopeModel.prototype.init = function() {




};


/**
 * @param {Object} stateObject Contains information about what to change
 */
lgb.model.EnvelopeModel.prototype.change = function(stateObject) {
	
	var isAnythingDirty = false;
	var whatIsDirty = {};
	
	if (stateObject.floorHeight != null &&
		stateObject.floorHeight != this.floorHeight) {
		
	//	if (this.floorHeightContraints[stateObject.floorHeight] == undefined) {
	//		throw ('this.floorHeightContraints[stateObject.floorHeight] == undefined');
	//	}
	
		this.floorHeight = stateObject.floorHeight;
		whatIsDirty.floorHeight = true;
		isAnythingDirty = true;
	};
	
	if (stateObject.floorCount != null &&
		stateObject.floorCount != this.floorCount) {
		
		this.floorCount = stateObject.floorCount;
		whatIsDirty.floorCount = true;
		isAnythingDirty = true;
	};
	
	if (isAnythingDirty) {
		this.dispatchLocal(new lgb.events.DataModelChanged(whatIsDirty));
	}
}


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
