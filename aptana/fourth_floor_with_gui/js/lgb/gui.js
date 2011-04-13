
o3djs.require('lgb.animation');

/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace A module for managing the 2D GUI
	 */
	lgb.gui = lgb.gui || {};
	
	
	lgb.gui.init = function(){
		this.latestResizeWidth = window.innerWidth;
		this.latestResizeHeight = window.innerHeight;
		
	    var oTop = document.documentElement.scrollTop;  
	    document.documentElement.scroll = "no";  
	    document.documentElement.style.overflow = "hidden";  
	    document.documentElement.scrollTop = oTop;
	
	}
	
	lgb.gui.setCanvasSize = function(){
		var theO3d = document.getElementById("o3d");
		theO3d.style.width= (window.innerWidth ) + 'px';
		theO3d.style.height= (window.innerHeight ) + 'px';
	}
	
	lgb.gui.resizeNow = function(){

		if ((this.latestResizeWidth == window.innerWidth) && (this.latestResizeHeight == window.innerHeight)) {
			return;
		}
		
		this.latestResizeWidth = window.innerWidth;
		this.latestResizeHeight = window.innerHeight;
		this.setCanvasSize();

	}
	
	lgb.gui.showHud = function(){

		floatingMenu.add('leftNav', {targetLeft: -63, targetBottom: 90, snap: true });
		floatingMenu.add('topTitle', {centerX:true, targetTop: -41, snap: true });
		
		floatingMenu.init();
		floatingArray[0].targetLeft=0;
		floatingArray[1].targetTop=0;

	}
	
	lgb.gui.onLeftNavClick_1 = function() {
		lgb.animation.toggleOpacity();
	}
	
	

	
	return lgb;
	
})(lgb || {});










