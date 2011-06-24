
o3djs.require('lgb.animation');
o3djs.require('lgb.model.ParticleSystem');

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
		
		//this.showConfigPanel = false;
		//this.makeViewpoints();
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

	//	floatingMenu.add('leftNav', {targetLeft: -63, targetBottom: 90, snap: true });
	
		//var menuIds = mainController.getFloatingMenuViews();


/*
		
		if (null === element) {
			throw new Error(msg.format(id));
		} else {
			floatingMenu.add(id, {
				centerX: true,
				targetTop: -41,
				snap: true
			});
		}
*/


		var floatingMenuConfig = {
				targetBottom: 90,
				targetLeft: -63
			};
		
		lgb.view.gui.initMenu('leftNav', floatingMenuConfig)
		
		

		floatingMenuConfig = {
				centerX: true,
				targetTop: -41
			};
		
		lgb.view.gui.initMenu( 'topTitle', floatingMenuConfig);
		
		
		floatingMenuConfig = {
                targetRight: -40,
                targetBottom: 180,
			};
		
		lgb.view.gui.initMenu( 'adminPanel', floatingMenuConfig);
		
		
		
		

		
		floatingMenu.init();
		
		floatingArray[0].targetLeft=0;
		floatingArray[1].targetTop=0;
		floatingArray[2].targetRight=8;
	};
	
	
	
	

	
	lgb.view.gui.initMenu = function(id, floatingMenuConfig) {
		
		element = document.getElementById(id);
		floatingMenuConfig.snap = true;
		
		if (null === element) {
			throw new Error('lgb.view.gui.initMenu() id: {0} not found in HTML document'.format(id));
		} else {
			floatingMenu.add(id, floatingMenuConfig);
		}

	};
	
	

	
	lgb.view.gui.makeArrayFromIds = function(idsArray, objs){
		
		var ary = [];
		var len = idsArray.length;
		
		for (var i=0;i<len;i++) {
			var id = idsArray[i];
			var obj = objs[id];
			
			ary.push(obj);
		}
		
		return ary;
	};

	
	lgb.view.gui.onParticleSystemStart = function(event) {
		lgb.view.gui.particleSystem.start();
		lgb.view.gui.exitSystem.start();
	};
	
	lgb.view.gui.onParticleSystemStop = function(event) {
		lgb.view.gui.particleSystem.stop();
		lgb.view.gui.exitSystem.stop();
	};
	
	lgb.view.gui.onToggleBoxes = function(event) {
		this.showBoxes = !this.showBoxes;
		
		if (this.showBoxes ) {
			lgb.view.gui.particleSystem.showBoxes();	
		} else {
			lgb.view.gui.particleSystem.hideBoxes();	
		}

	};
	
	
	


	lgb.view.gui.bindJavaScript = function() {
		

		//$('#check_camera').click(this.onCheckCamera);
		
		var delegate = $.proxy(this.onParticleSystemStart, this);
		$('#particleSystemStart').click(delegate);
		
		var delegate2 = $.proxy(this.onParticleSystemStop, this);
		$('#particleSystemStop').click(delegate2);
		
		var delegate4 = $.proxy(this.onToggleBoxes, this);
		$('#particleSystemBoxes').click(delegate4);

	};
	

			

	
	return lgb;
	
})(lgb || {});










