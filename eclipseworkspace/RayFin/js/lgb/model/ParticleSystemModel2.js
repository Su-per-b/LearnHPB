goog.provide('lgb.model.ParticleSystemModel2');

goog.require ("lgb.model.ModelBase");
goog.require('lgb.utils.XmlParser');
goog.require('lgb.event.DataModelChanged');
goog.require('hemi.curve');



/**
 * @namespace MVC model 
 */
lgb.model.ParticleSystemModel2 = function(){

	this.xml = null;
	this.xpathResult = null;
	this.currentNode = null;
	
	this.boxes = {};
	this.colorKeys = {};
	this.scaleKeys = {};
	this.systems = {};
	this.configs = {};

};

goog.inherits(lgb.model.ParticleSystemModel2, lgb.model.ModelBase);

lgb.model.ParticleSystemModel2.prototype.load = function() {
	 var url = lgb.Config.XML_BASE_PATH + "particleSystems.xml";
	 
	  jQuery.ajax({
	    type: "GET",
	    url: url,
	    dataType: "xml",
	    success: this.d(this.parse)
	  });

};

lgb.model.ParticleSystemModel2.prototype.parse = function(xml){

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
	
	this.dispatchLocal(new lgb.event.DataModelChanged());
	

};


lgb.model.ParticleSystemModel2.prototype.makeParticleConfig = function(sys){
			
			var shapeStr = 'hemi.curve.shapeType.' + sys.shape;
			
			var bbAry = this.makeArrayFromIds(sys.boundingBoxIds,this.boxes);
			var ckAry = this.makeArrayFromIds(sys.colorKeyIds,this.colorKeys);
			var skAry = this.makeArrayFromIds(sys.scaleKeyIds,this.scaleKeys);
			
			var particleSystemConfig = {
				fast : false,
				life : sys.life,
				particleCount : sys.particleCount,
				boxes :  bbAry,
				particleShape : hemi.curve.ShapeType.SPHERE,
				particleSize : sys.particleSize,
				colorKeys : ckAry,
				scaleKeys : skAry
			};
			
			return particleSystemConfig;
};
	
	
	
	
lgb.model.ParticleSystemModel2.prototype.makeArrayFromIds = function(idsArray, objs){
		var ary = new Array();
		var len = idsArray.length;
		
		for (var i=0;i<len;i++) {
			var id = idsArray[i];
			var obj = objs[id];
			
			ary.push(obj);
		}
		
		return ary;
};
















