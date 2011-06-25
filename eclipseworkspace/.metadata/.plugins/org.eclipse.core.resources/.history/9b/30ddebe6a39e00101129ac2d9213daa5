
o3djs.require('lgb.model.XmlParser');

/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace MVC controller 
	 */
	lgb.model = lgb.model || {};
	
	lgb.model.ParticleSystem = function(xml) {

		this.xml = xml;
		this.xpathResult = null;
		this.currentNode = null;
		
		this.boxes = {};
		this.colorKeys = {};
		this.scaleKeys = {};
		this.systems = {};
		this.configs = {};
		
		this.parse(xml);
		this.translate =null;
			
	};
	

	lgb.model.ParticleSystem.prototype = {
		
		parse: function(xml) {

		
			var parser = new lgb.model.XmlParser(xml);
			parser.makeRootNode('/particleSystems/@translate');
			
			this.translate = parser.getFloatArray();
			
			parser.makeRootNode('/particleSystems/boundingBoxes/box');
			
			while (parser.currentNode) {
				var theID = parser.getId();
				var ary = parser.getFloatArray();

				var point1 = ary.slice(0,3);
				var point2 = ary.slice(3,6);

				var box = [point1,point2];
				this.boxes[theID] = box;

				parser.next();
            };
			
			parser.makeRootNode('/particleSystems/colorKeys/ck');
			while (parser.currentNode) {
				
				var theID = parser.getId();
	
				var ck = {	key: parser.getContentAsFloat("key"),
							value: parser.getFloatArray("value")};
				
				this.colorKeys[theID] = ck;
				parser.next();
            };
			
			parser.makeRootNode('/particleSystems/scaleKeys/sk');
			while (parser.currentNode) {
				
				var theID = parser.getId();
	
				var sk = {
						key: parser.getContentAsFloat("key"),
						value: parser.getFloatArray("value")
				};
				
				this.scaleKeys[theID] = sk;
				parser.next();
            };
			
			parser.makeRootNode('/particleSystems/system');
			while (parser.currentNode) {
				
				var theID = parser.getId();
				
				
				var colors = parser.getFloatArray("colorKeyIds");
				
				
				var sys = {	id: theID, 
							rate: parser.getContentAsFloat("rate"),
							life: parser.getContentAsFloat("life"),
							boundingBoxIds: parser.getTextArray("boundingBoxIds"),
							shape: parser.getContent("shape"),
							curve: parser.getContentAsFloat("curve"),
							colorKeyIds: colors,
							scaleKeyIds: parser.getFloatArray("scaleKeyIds")
				};
				
				
				this.systems[theID] = sys;
				
				var cfg = this.makeParticleConfig(sys);
				this.configs[theID] = cfg;
				
				parser.next();
            }
			
			return this.configs;
			
		},
		
		makeParticleConfig: function(sys) {
			
			var shapeStr = 'hemi.curve.shapeType.' + sys.shape;
			
			var bbAry = this.makeArrayFromIds(sys.boundingBoxIds,this.boxes);
			var ckAry = this.makeArrayFromIds(sys.colorKeyIds,this.colorKeys);
			var skAry = this.makeArrayFromIds(sys.scaleKeyIds,this.scaleKeys);
			
			
			
//			this.aim = cfg.aim == null ? false : cfg.aim;
//			this.boxes = cfg.boxes ? hemi.utils.clone(cfg.boxes) : [];
//			this.life = cfg.life || 5;
//			this.particles = cfg.particleCount || 1;
//			this.size = cfg.particleSize || 1;
//			this.tension = cfg.tension || 0;
//			
//			if (!cfg.colors) {
//				this.colors = [];
//			} else if (cfg.colors.length === 1) {
//				// We need at least two to interpolate
//				var clr = cfg.colors[0];
//				this.colors = [clr, clr];
//			} else {
//				this.colors = cfg.colors;
//			}
//			
//			this.setMaterial(cfg.material || hemi.curve.newMaterial());
//			this.setParticleShape(cfg.particleShape || hemi.curve.ShapeType.CUBE);
		var blue = [0, 0, 1, 0.7];
		var green = [0, 1, 0, 0.7];
		var red = [1, 0, 0, 0.7];
	   var colors = [blue,green,red,blue];
	   
//			var particleSystemConfig = {
//				fast: true,
//				aim: false,
//				trail: false,
//				particleCount: 100,
//				life: 5,
//				boxes: bbAry,
//				particleShape: hemi.curve.ShapeType.SPHERE,
//				scaleKeys: skAry,
//				colors : colors,
//				particleSize: 0.1
//			};
		
		
			var particleSystemConfig = {
				aim: false,
				boxes :  bbAry,
				fast:false,
				life : sys.life,	
				rate : sys.rate,	
				trail: false,
				particleShape : hemi.curve.ShapeType.SPHERE,
				scaleKeys : skAry,
				colorKeys: ckAry
			};
			
			return particleSystemConfig;
		},
		
		makeArrayFromIds: function(idsArray, objs) {
			
			var ary = new Array();
			var len = idsArray.length;
			
			for (var i=0;i<len;i++) {
				var id = idsArray[i];
				var obj = objs[id];
				
				ary.push(obj);
			}
			
			return ary;
		}
		
		

	};
	


	return lgb;
	
})(lgb || {});










