/**
 * 
 */

o3djs.base.o3d = o3d;
o3djs.require('lgb.utils');
o3djs.require('lgb.loader');
o3djs.require('lgb.animation');
o3djs.require('lgb.progressBar');
o3djs.require('lgb.Base');

o3djs.require('lgb.controller.ControllerBase');
o3djs.require('lgb.controller.AdminController');
o3djs.require('lgb.controller.component.RadioButtonGroupController');
o3djs.require('lgb.controller.EnvelopeController');
o3djs.require('lgb.controller.HvacDamperConroller');
o3djs.require('lgb.controller.ModeController');
o3djs.require('lgb.controller.ZoneController');

o3djs.require('lgb.model.ModelBase');
o3djs.require('lgb.model.component.ControlBase');
o3djs.require('lgb.model.component.ControlTrigger');
o3djs.require('lgb.model.component.SelectionGroup');
o3djs.require('lgb.model.component.SelectionItem');
o3djs.require('lgb.model.EnvelopeModel');
o3djs.require('lgb.model.HvacDamperController');
o3djs.require('lgb.model.ModeController');
o3djs.require('lgb.model.ZoneController');
o3djs.require('lgb.model.XmlParser');

o3djs.require('lgb.view.ViewBase');
o3djs.require('lgb.view.component.Button');
o3djs.require('lgb.view.component.Link');
o3djs.require('lgb.view.component.RadioButtonGroup');

o3djs.require('lgb.view.component.Slider');

o3djs.require('lgb.view.AdminPanel');
o3djs.require('lgb.view.AdminSubPanel');
o3djs.require('lgb.view.EnvelopeView');
o3djs.require('lgb.view.gui');
o3djs.require('lgb.view.HvacDamperView');

o3djs.require('lgb.event.EnvelopeEvent');
o3djs.require('lgb.event.Event');



var lgb = (function(lgb) {
	
		
	
	/**
	 * The version of LGB released
	 * @constant
	 */
	lgb.version = '0.14';
	
	/**
	 * @namespace The main module for the LGB application
	 */
	lgb.core = lgb.core || {};
	
	/**
	 * @namespace Handles initialization, is being replaced by the mainController
	 */
	lgb.core.init = function() {
	
		console.log("kuda version: " + hemi.version);
		console.log("lgb version: " + lgb.version);
		console.log("jQuery version: " + $().jquery);
		
		lgb.view.gui.init();
		lgb.animation.init();
		lgb.utils.init();

	};
	

	

	return lgb;
	
})(lgb || {});



		

		
		