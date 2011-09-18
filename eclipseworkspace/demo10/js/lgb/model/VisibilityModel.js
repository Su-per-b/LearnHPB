




/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	
	/**
	 * @class MVC model for the Visibility envelope
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.VisibilityModel = function() {
		
		lgb.model.ModelBase.call(this);

		this.title = "Visibility";
		this.name = "VISIBILITY";
		
		this.state = lgb.model.VisibilityTag.ALL;
		this.buildingComponents = [];
		
		var selectionGroup1 = new lgb.model.component.SelectionGroup(
				'Show:',
				lgb.event.Visibility.GUI_SELECTION
			);
			
		selectionGroup1.createItem('All', lgb.model.VisibilityTag.ALL, true);
		selectionGroup1.createItem('HVAC Group', lgb.model.VisibilityTag.HVAC);
		selectionGroup1.createItem('Envelope Group', lgb.model.VisibilityTag.ENVELOPE);
		selectionGroup1.createItem('Rooftop', lgb.model.VisibilityTag.ROOFTOP);
		selectionGroup1.createItem('Ductwork', lgb.model.VisibilityTag.DUCTWORK);
		selectionGroup1.createItem('Cross Section', lgb.model.VisibilityTag.CROSS_SECTION);
		
/*
		selectionGroup1.createItem('Filter', lgb.model.VisibilityTag.FILTER);
		selectionGroup1.createItem('Heating Coil', lgb.model.VisibilityTag.HEATING_COIL);
		selectionGroup1.createItem('Cooling Coil', lgb.model.VisibilityTag.COOLING_COIL);
		selectionGroup1.createItem('Fan', lgb.model.VisibilityTag.FAN);
		selectionGroup1.createItem('Dampers', lgb.model.VisibilityTag.DAMPERS);
*/

		this.userActions = [selectionGroup1];
		this.buildingComponents = [];
		this.dispatch(lgb.event.Event.USER_ACTIONS_CREATED, this);
	};


	lgb.model.VisibilityModel.prototype = {
		
		setVisibility : function(visibilityState) {
			this.state = visibilityState;
			this.each(this.buildingComponents, this.setVisibilityOne);
			//this.dispatch(lgb.event.Event.DATA_MODEL_CHANGED);
		},
		
		setVisibilityOne : function(oneBuildingComponent) {
			oneBuildingComponent.applyVisiblilityFilter(this.state);
		},
		
		addComponent : function(buildingComponent) {
			this.buildingComponents.push(buildingComponent);
		}
		
	};
	
	lgb.model.VisibilityTag = function() {
		
	}
	
	lgb.model.VisibilityTag.ALL = 'ALL';
	lgb.model.VisibilityTag.HVAC = 'HVAC';
	lgb.model.VisibilityTag.ENVELOPE = 'ENVELOPE';
	lgb.model.VisibilityTag.ROOFTOP = 'ROOFTOP';
	lgb.model.VisibilityTag.FILTER = 'FILTER';
	lgb.model.VisibilityTag.HEATING_COIL = 'HEATING_COIL';
	lgb.model.VisibilityTag.COOLING_COIL = 'COOLING_COIL';
	lgb.model.VisibilityTag.FAN = 'FAN';
	lgb.model.VisibilityTag.DAMPERS = 'DAMPERS';
	lgb.model.VisibilityTag.DUCTWORK = 'DUCTWORK';
	lgb.model.VisibilityTag.CROSS_SECTION = 'CROSS_SECTION';
	
	lgb.model.VisibilityModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












