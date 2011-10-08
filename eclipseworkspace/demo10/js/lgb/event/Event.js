	/**
 * @namespace 
 */
var lgb = (function(lgb) {



	lgb.event = lgb.event || {};
	
	lgb.event.Event = function() {

	};
	


	lgb.event.Event.WINDOW_RESIZE = 'EVENT__WINDOW_RESIZE';
	lgb.event.Event.MESH_REQUEST = 'EVENT__MESH_REQUEST';
	lgb.event.Event.USER_ACTIONS_CREATED = 'EVENT__USER_ACTIONS_CREATED';
	lgb.event.Event.TOGGLE_ADMIN_PANEL = 'EVENT__TOGGLE_ADMIN_PANEL';
	lgb.event.Event.CLOSED_ADMIN_PANEL = 'EVENT__CLOSED_ADMIN_PANEL';
	lgb.event.Event.TOGGLE_PROPERTIES_PANEL = 'EVENT__TOGGLE_PROPERTIES_PANEL';
	lgb.event.Event.CLOSED_PROPERTIES_PANEL = 'EVENT__CLOSED_PROPERTIES_PANEL';
	lgb.event.Event.OPEN_ADMIN_PANEL = 'EVENT__OPEN_ADMIN_PANEL';
	
	lgb.event.Event.REGISTER_COMPONENT = 'EVENT__REGISTER_COMPONENT';
	lgb.event.Event.UNREGISTER_COMPONENT = 'UNREGISTER_COMPONENT';
	
	lgb.event.Event.DATA_MODEL_CHANGED = 'EVENT__DATA_MODEL_CHANGED';
	lgb.event.Event.FADE_OUT_COMPLETE = 'EVENT__FADE_OUT_COMPLETE';
	lgb.event.Event.FADE_IN_COMPLETE = 'EVENT__FADE_IN_COMPLETE';
	lgb.event.Event.ZONES_REPOSITIONED = 'EVENT__ZONES_REPOSITIONED';
	
	lgb.event.Event.SHOW_GUI = 'EVENT__SHOW_GUI';
	lgb.event.Event.SCENARIO_PARSED = 'EVENT__SCENARIO_PARSED';


	
	return lgb;
	
	
})(lgb || {});
	
	
	
	
	
