
o3djs.require('lgb.animation');

/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace A module for managing the 2D GUI
	 */
	lgb.view = lgb.view || {};
	lgb.view.gui = lgb.view.gui || {};
	

	
	lgb.view.gui.init = function(){
		
		this.latestResizeWidth = window.innerWidth;
		this.latestResizeHeight = window.innerHeight;
		
	    var oTop = document.documentElement.scrollTop;  
	    document.documentElement.scroll = "no";  
	    document.documentElement.style.overflow = "hidden";  
	    document.documentElement.scrollTop = oTop;
		this.bindJavaScript();
	
	};
	
	lgb.view.gui.setCanvasSize = function(){
		var theO3d = document.getElementById("o3d");
		theO3d.style.width= (window.innerWidth ) + 'px';
		theO3d.style.height= (window.innerHeight ) + 'px';
	};
	
	lgb.view.gui.resizeNow = function(){

		if ((this.latestResizeWidth == window.innerWidth) && (this.latestResizeHeight == window.innerHeight)) {
			return;
		}
		
		this.latestResizeWidth = window.innerWidth;
		this.latestResizeHeight = window.innerHeight;
		this.setCanvasSize();

	};
	
	lgb.view.gui.showHud = function(){

		floatingMenu.add('leftNav', {targetLeft: -63, targetBottom: 90, snap: true });
		floatingMenu.add('topTitle', {centerX:true, targetTop: -41, snap: true });
		
		floatingMenu.init();
		floatingArray[0].targetLeft=0;
		floatingArray[1].targetTop=0;

	};
	
	
	lgb.view.gui.onLeftNavClick = function(event) {
		
		var newEvent = jQuery.Event('SWITCH_MODE');
		newEvent.mode = event.data.mode;
		
		
		$(lgb.view.gui).trigger(newEvent);
	};
	
	lgb.view.gui.bindJavaScript = function() {
		$('#leftNavButton_1').click({mode:'ALL'},this.onLeftNavClick);
		$('#leftNavButton_2').click({mode:'HVAC'},this.onLeftNavClick);
		$('#leftNavButton_3').click({mode:'ENVELOPE'},this.onLeftNavClick);
		$('#leftNavButton_4').click({mode:'LIGHTING'},this.onLeftNavClick);
		$('#leftNavButton_5').click({mode:'DAYLIGHTING'},this.onLeftNavClick);
	};
	

			

	
	return lgb;
	
})(lgb || {});










