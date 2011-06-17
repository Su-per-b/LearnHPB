
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
		
		this.showConfigPanel = false;
		this.makeViewpoints();
		this.bindJavaScript();
	
	};
	
	lgb.view.gui.makeViewpoints = function(){
		
		var delegateClick = $.proxy(this, this.onViewPointClick);
		var delegateMouseOver = $.proxy(this, this.onViewPointMouseOver);
		var delegateMouseOut = $.proxy(this, this.onViewPointMouseOut);
		var zoneNames = ['NorthWest', 'North', 'NorthEast', 'West',
		 'Core', 'East', 'SouthWest', 'South', 'SouthEast', 'Top'];
		
		
		for(var i=0; i < 10; i++) {
			
			var zoneName = zoneNames[i];
			
			var html = '<a id="viewPoint_{0}" class="viewPointLink" title="Go to {1}" href="#">Go to {1}</a><br />'.format(i.toString(), zoneName);
			$('#adminPanel1contents').append(html);
			
			var selector = '#viewPoint_'+ i.toString();
			var eventPayload = {zoneNumber: i.toString()};
			
			$(selector).click(eventPayload,delegateClick);
			$(selector).mouseover(eventPayload,delegateMouseOver);
			$(selector).mouseout(eventPayload,delegateMouseOut);
		}
	};
	
	lgb.view.gui.onViewPointMouseOver = function(event) {
		console.log ('onViewPointMouseOver ' + event.data.zoneNumber);
		
		var newEvent = jQuery.Event('SHOW_ZONE');
		
		newEvent.zoneNumber = event.data.zoneNumber;
		newEvent.visible = true; 
		
		$(lgb.view.gui).trigger(newEvent);
	};
	
	lgb.view.gui.onViewPointMouseOut = function(event) {
		console.log ('onViewPointMouseOut ' + event.data.zoneNumber);
		
		var newEvent = jQuery.Event('SHOW_ZONE');
		
		newEvent.zoneNumber = event.data.zoneNumber;
		newEvent.visible = false; 
		
		$(lgb.view.gui).trigger(newEvent);
	};
	
	
	
	lgb.view.gui.onViewPointClick = function(event) {
		
		console.log ('onViewPointClick ' + event.data.zoneNumber);
		
		var newEvent = jQuery.Event('SWITCH_VIEWPOINT');
		newEvent.zoneNumber = event.data.zoneNumber;

		$(lgb.view.gui).trigger(newEvent);
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
		floatingMenu.add('adminPanel', {targetRight:-40, targetBottom: 180, snap: true });
		
		floatingMenu.init();
		
		floatingArray[0].targetLeft=0;
		floatingArray[1].targetTop=0;
		floatingArray[2].targetRight=8;
	};
	
	
	lgb.view.gui.onLeftNavClick = function(event) {
		
		var newEvent = jQuery.Event('SWITCH_MODE');
		newEvent.mode = event.data.mode;

		$(lgb.view.gui).trigger(newEvent);
	};
	
	lgb.view.gui.onConfigClick = function(event) {
		
		var newEvent = jQuery.Event('CONFIG_PANEL');
		this.showConfigPanel = !this.showConfigPanel;
		newEvent.show = this.showConfigPanel;
		$(lgb.view.gui).trigger(newEvent);

	};
	
	lgb.view.gui.onCheckCamera = function(event) {
		
		var vd = hemi.view.createViewData(hemi.world.camera);
	};
	
	lgb.view.gui.particleSystemInit = function(xml) {
		
			//parse the XML
			var ps = new lgb.model.ParticleSystem(xml);

			var rootShape = hemi.shape.create (
				{shape: 'box',
				color: [1,1,0,0],
				h:1,w:1,d:1}
				);
				
			rootShape.translate(ps.translate[0],ps.translate[1],ps.translate[2]);
			

			var config = ps.configs['1'];
			config.parent = rootShape;
			
			
			lgb.view.gui.particleSystem = hemi.curve.createSystem(config);
			
			
			var config2 = ps.configs['2'];
			config2.parent = rootShape;
			
			lgb.view.gui.exitSystem = hemi.curve.createSystem(config2);
			lgb.view.gui.showBoxes = false;

	};
//	
//	lgb.view.gui.getTestParticleconfig = function(){
//	
//	
//		var vp = new hemi.view.Viewpoint(); // Create a new Viewpoint
//		vp.eye = [-10, 800, 1800]; // Set viewpoint eye
//		vp.target = [10, 250, 30]; // Set viewpoint target
//		hemi.world.camera.enableControl(); // Enable camera mouse control
//		var box1 = [[-510, -110, -10], [-490, -90, 10]];
//		var box2 = [[-600, 400, -200], [-400, 600, 0]];
//		var box3 = [[-10, 790, 180], [10, 810, 200]];
//		var box4 = [[400, 450, -300], [600, 650, -100]];
//		var box5 = [[490, -110, -10], [510, -90, 10]];
//		
//		/* The colors these arrows will be as they move through:
//	 * Start out yellow and transparent, then turn red and opaque,
//	 * quickly turn to blue, then fade to black and transparent.
//	 */
//		var colorKey1 = {
//			key: 0,
//			value: [1, 1, 0, 0.2]
//		};
//		var colorKey2 = {
//			key: 0.45,
//			value: [1, 0, 0, 1]
//		};
//		var colorKey3 = {
//			key: 0.55,
//			value: [0, 0, 1, 1]
//		};
//		var colorKey4 = {
//			key: 1,
//			value: [0, 0, 0, 0.2]
//		};
//		
//		/* The scale of the arrows as they move through:
//	 * Start out infinitesimal, then grow to a decent size,
//	 * kind of stretched out, then shrink away again.
//	 */
//		var scaleKey1 = {
//			key: 0,
//			value: [10, 10, 10]
//		};
//		var scaleKey2 = {
//			key: 0.5,
//			value: [50, 80, 50]
//		};
//		var scaleKey3 = {
//			key: 1,
//			value: [10, 10, 10]
//		};
//		
//		/* Create a particle system configuration with the above parameters,
//	 * plus a rate of 20 particles per second, and a lifetime of
//	 * 5 seconds. Specify the shapes are arrows.
//	 */
//		var particleSystemConfig = {
//			fast: true,
//			aim: true,
//			trail: false,
//			particleCount: 100,
//			life: 5,
//			boxes: [box1, box2, box3, box4, box5],
//			particleShape: hemi.curve.ShapeType.ARROW,
//			colorKeys: [colorKey1, colorKey2, colorKey3, colorKey4],
//			scaleKeys: [scaleKey1, scaleKey2, scaleKey3],
//			particleSize: 10
//		};
//		
//		return particleSystemConfig;
//		
//	}
//	
//	lgb.view.gui.makeParticleConfig = function(sys, boxes, colorKeys, scaleKeys){
//		
//		var shapeStr = 'hemi.curve.shapeType.' + sys.shape;
//		var bbAry = this.makeArrayFromIds(sys.boundingBoxIds,boxes);
//		var ckAry = this.makeArrayFromIds(sys.colorKeyIds,colorKeys);
//		var skAry = this.makeArrayFromIds(sys.scaleKeyIds,scaleKeys);
//		
//		var particleSystemConfig = {
//			rate : sys.rate,
//			life : sys.life,
//			boxes :  bbAry,
//			shape : hemi.curve.ShapeType.SPHERE,
//			colorKeys : ckAry,
//			scaleKeys : skAry
//		};
//		
//		return particleSystemConfig;
//	}
	
//	
//	lgb.view.gui.makeArrayFromIds = function(idsArray, objs){
//		
//		var ary = new Array();
//		var len = idsArray.length;
//		
//		for (var i=0;i<len;i++) {
//			var id = idsArray[i];
//			var obj = objs[id];
//			
//			ary.push(obj);
//		}
//		
//		return ary;
//	}

	
	lgb.view.gui.onParticleSystemStart = function(event) {
		lgb.view.gui.particleSystem.start();
		
		if (lgb.view.gui.exitSystem) {
			lgb.view.gui.exitSystem.start();
		}

	};
	
	lgb.view.gui.onParticleSystemStop = function(event) {
		lgb.view.gui.particleSystem.stop();
		
		if (lgb.view.gui.exitSystem) {
			lgb.view.gui.exitSystem.stop();
		}

	};
	
	lgb.view.gui.onToggleBoxes = function(event) {
		this.showBoxes = !this.showBoxes;
		
		if (this.showBoxes ) {
			
			//lgb.view.gui.particleSystem.showBoxes();
			
			hemi.curve.showBoxes(lgb.view.gui.particleSystem.boxes, lgb.view.gui.particleSystem.transform.parent);
			if (lgb.view.gui.exitSystem) {
				hemi.curve.showBoxes(lgb.view.gui.exitSystem.boxes, lgb.view.gui.exitSystem.transform.parent);
			}
				
		} else {
			//lgb.view.gui.particleSystem.hideBoxes();	
			hemi.curve.hideBoxes(lgb.view.gui.particleSystem.boxes);
			if (lgb.view.gui.exitSystem) {
				hemi.curve.hideBoxes(lgb.view.gui.exitSystem.boxes);
			}
			
		}

	};
	
	
	
	lgb.view.gui.bindJavaScript = function() {
		
		$('#leftNavButton_1').click({mode:'ALL'},this.onLeftNavClick);
		$('#leftNavButton_2').click({mode:'HVAC'},this.onLeftNavClick);
		$('#leftNavButton_3').click({mode:'ENVELOPE'},this.onLeftNavClick);
		$('#leftNavButton_4').click({mode:'LIGHTING'},this.onLeftNavClick);
		$('#leftNavButton_5').click({mode:'DAYLIGHTING'},this.onLeftNavClick);

		$('#check_camera').click(this.onCheckCamera);
		
		var delegate = $.proxy(this, this.onParticleSystemStart);
		$('#particleSystemStart').click(delegate);
		
		var delegate2 = $.proxy(this, this.onParticleSystemStop);
		$('#particleSystemStop').click(delegate2);
		
		var delegate4 = $.proxy(this, this.onToggleBoxes);
		$('#particleSystemBoxes').click(delegate4);

	};
	

			

	
	return lgb;
	
})(lgb || {});










