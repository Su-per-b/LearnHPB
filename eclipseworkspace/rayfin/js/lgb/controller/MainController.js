goog.provide('lgb.controller.MainController');

goog.require ("lgb.controller.ControllerBase");
goog.require ("lgb.controller.WorldController");
goog.require ("lgb.controller.GuiController");
goog.require ("lgb.controller.PropertiesController");
goog.require ("lgb.controller.ScenarioController");
goog.require('lgb.event.WindowResizeEvent');
goog.require('lgb.event.WorldCreated');
goog.require('lgb.Config');

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.MainController = function() {
	
	lgb.controller.ControllerBase.call(this);
	lgb.globalEventBus = new lgb.event.EventBus();
	
	var delegate = jQuery.proxy(this.init, this);
	jQuery(document).ready(delegate);

};


goog.inherits(lgb.controller.MainController, lgb.controller.ControllerBase);



/** 
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.MainController.prototype.init = function() {


	/**
   * @type {Element}
   * @private
   */
	this.containerDiv_ = document.createElement( 'div' );
	document.body.appendChild( this.containerDiv_ );
		
	this.worldController_ = new lgb.controller.WorldController(this.containerDiv_);
	this.worldController_.init();
		
	var e = new lgb.event.WorldCreated();
	this.dispatch(e);
	
	$('head').append ('<title>{0}</title>'.format(lgb.Config.getTitle()));
	
	console.log(lgb.Config.getTitle());
	
	var j = jQuery();

	
	console.log("jQuery version: " + $().jquery);
	console.log("jQuery.ui version: " + $.ui.version);
	
	this.guiController = new lgb.controller.GuiController();
	this.propertiesController = new lgb.controller.PropertiesController();
	this.scenarioController = new lgb.controller.ScenarioController();
	
	//lgb.controller.GuiController 
	//var e = new lgb.event.ShowGUI();
	//this.dispatch(e);
	
	
	jQuery(window).resize(this.d(this.onWindowResize));
	jQuery(window).unload(this.d(this.onWindowUnload));
			
};


lgb.controller.MainController.prototype.onWindowResize = function(event) {
	var e = new lgb.event.WindowResizeEvent(window.innerWidth, window.innerHeight);
	this.dispatch(e);
};

lgb.controller.MainController.prototype.onWindowUnload = function(event) {

	
};

lgb.controller.MainController.prototype.getCanvas = function() {

	return this.containerDiv_.children[1];
};
lgb.controller.MainController.prototype.getGL = function() {

	return this.worldController_.renderer_.context;
};


		




