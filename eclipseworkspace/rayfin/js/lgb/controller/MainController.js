goog.provide('lgb.controller.MainController');

goog.require ("lgb.controller.ControllerBase");
goog.require ("lgb.controller.WorldController");
goog.require ("lgb.controller.GuiController");

goog.require ("lgb.controller.ScenarioController");
goog.require('lgb.event.WindowResizeEvent');
goog.require('lgb.event.WorldCreated');
goog.require('lgb.Config');
goog.require('goog.debug.Logger');

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
	
	var that = this;
	handleErrors_();
	
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
	
	
	$('<title>')
		.append(lgb.Config.getTitle())
		.appendTo('head');
	
	/**
	* The logger used by this object.
	* @type {goog.debug.Logger}
	* @private
	*/
	this.logger_ = goog.debug.Logger.getLogger('lgb.controller.MainController');
  
	lgb.logInfo(lgb.Config.getTitle());
	lgb.logInfo("jQuery version: " + $('').jquery);
	lgb.logInfo("jQuery.ui version: " + $.ui.version);
	
  	//this.logger_.info(lgb.Config.getTitle());
  //	this.logger_.info();
  //	this.logger_.info();
  	

	
	this.guiController = new lgb.controller.GuiController();
	this.scenarioController = new lgb.controller.ScenarioController();
	
	
	listen_();
	
	//var e = new lgb.event.ShowGUI();
	//this.dispatch(e);
	
	
	
	function listen_() {
		$(window).resize(onWindowResize_);
	//	$(window).unload(that.d(that.onWindowUnload));
	}
	
	function onWindowResize_() {
		that.dispatch(
			new lgb.event.WindowResizeEvent(
				window.innerWidth, 
				window.innerHeight
			)
		);
	}
	

	function handleErrors_() {
			
		$('<p>')
			.attr('id', 'errorWindow')
			.append('body');
			
		window.onerror = function (errorMsg, url, lineNumber) {
			 
			 var w = $("#errorWindow").kendoWindow({
			     draggable: false,
			     resizable: false,
			     width: "500px",
			     height: "300px",
			     title: "Exception Ocurred",
			     modal: true,
			     actions: ["Refresh", "Maximize", "Close"]
			 }).data("kendoWindow");
			 
			 w.content(errorMsg + "<br />url:" + url+ "<br />line:" + lineNumber);
		     w.center();
		     w.open();
		};
	}

		
};


lgb.controller.MainController.prototype.onWindowResize = function(event) {
	var e = new lgb.event.WindowResizeEvent(window.innerWidth, window.innerHeight);
	this.dispatch(e);
};



lgb.controller.MainController.prototype.getCanvas = function() {

	return this.containerDiv_.children[1];
};
lgb.controller.MainController.prototype.getGL = function() {

	return this.worldController_.renderer_.context;
};


		




