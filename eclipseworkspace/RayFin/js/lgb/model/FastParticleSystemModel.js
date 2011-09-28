goog.provide('lgb.model.FastParticleSystemModel');

goog.require ("lgb.model.ModelBase");
goog.require('lgb.utils.XmlParser');
goog.require('lgb.event.DataModelChanged');
goog.require('hemi.curve');


	/**
	 * @namespace MVC model 
	 */
	lgb.model.FastParticleSystemModel = function(){
		this.xml = null;
		this.xpathResult = null;
		this.currentNode = null;
		
		this.boxes = {};
		this.colorKeys = {};
		this.scaleKeys = {};
		this.systems = {};
		this.configs = {};
		
		this.title = "Particle Systems";
		this.name = "PARTICLE_SYSTEMS";
	};
	
	goog.inherits(lgb.model.FastParticleSystemModel, lgb.model.ModelBase);
	
	lgb.model.FastParticleSystemModel.prototype.load = function() {
		 var url = lgb.Config.XML_BASE_PATH + "fastParticleSystems.xml";
		 
		  jQuery.ajax({
		    type: "GET",
		    url: url,
		    dataType: "xml",
		    success: this.d(this.parse)
		  });
	
	};
	
	lgb.model.FastParticleSystemModel.prototype.parse = function(xml){

		var parser = new lgb.utils.XmlParser(xml);
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
			
			var sys = {	id: theID, 
						life: parser.getContentAsFloat("life"),
						particleCount: parser.getContentAsFloat("particleCount"),
						boundingBoxIds: parser.getTextArray("boundingBoxIds"),
						shape: parser.getContent("shape"),
						particleSize: parser.getContentAsFloat("particleSize"),
						curve: parser.getContentAsFloat("curve"),
						colorKeyIds: parser.getFloatArray("colorKeyIds"),
						scaleKeyIds: parser.getFloatArray("scaleKeyIds")
			};
			
			
			this.systems[theID] = sys;
			
			var cfg = this.makeParticleConfig(sys);
			this.configs[theID] = cfg;
			
			parser.next();
        }
		
		//this.dispatchLocal(lgb.event.Event.DATA_MODEL_CHANGED);
  		
  		this.dispatchLocal(new lgb.event.DataModelChanged());
  		
  		//new goog.provide('lgb.event.DataModelChanged');

	};
	
	
	lgb.model.FastParticleSystemModel.prototype.makeParticleConfig = function(sys){
				
		var shapeStr = 'hemi.curve.shapeType.' + sys.shape;
		
		var bbAry = this.makeArrayFromIds(sys.boundingBoxIds,this.boxes);
		var ckAry = this.makeArrayFromIds(sys.colorKeyIds,this.colorKeys);
		var skAry = this.makeArrayFromIds(sys.scaleKeyIds,this.scaleKeys);

		var blue = [0, 0, 1, 0.5];
		var green = [0, 1, 0, 0.5];
		var red = [1, 0, 0, 0.5];

		var scaleKey1 = {key: 0, value: [40,40,40]};
		var scaleKey2 = {key: 1, value: [40,40,40]};


		var particleSystemConfig = {
			fast : true,
			aim: false,
			trail: true,
			particleCount : sys.particleCount,
			particleSize : sys.particleSize,
			life : sys.life,
			boxes :  bbAry,
			particleShape: hemi.curve.ShapeType.SPHERE,
			colors: [blue],
			scaleKeys : [scaleKey1, scaleKey2]
		};
		
		return particleSystemConfig;
	};
	
	
	
	
lgb.model.FastParticleSystemModel.prototype.makeArrayFromIds = function(idsArray, objs){
		var ary = new Array();
		var len = idsArray.length;
		
		for (var i=0;i<len;i++) {
			var id = idsArray[i];
			var obj = objs[id];
			
			ary.push(obj);
		}
		
		return ary;
};
















