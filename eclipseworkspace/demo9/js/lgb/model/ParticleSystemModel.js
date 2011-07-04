


/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	/**
	 * @namespace MVC model 
	 */
	lgb.model.ParticleSystemModel = function(){
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
		this.userActions =[];
		
		var trigger = new lgb.model.component.Link(
				this.name,
				'Start'
			);

		trigger.addEvents( 
			lgb.event.ParticleSystemEvent.START
		);
		
		this.userActions.push(trigger);
		
		
		trigger = new lgb.model.component.Link(
				this.name,
				'Stop'
			);

		trigger.addEvents( 
			lgb.event.ParticleSystemEvent.STOP
		);
		
		this.userActions.push(trigger);
		
		
		trigger = new lgb.model.component.Link(
				this.name,
				'Toggle Boxes'
			);

		trigger.addEvents( 
			lgb.event.ParticleSystemEvent.TOGGLE_BOXES
		);
		
		this.userActions.push(trigger);
		
		
		this.dispatch(lgb.event.Event.USER_ACTIONS_CREATED, this);
		
	};
	
	
	lgb.model.ParticleSystemModel.prototype = {
		
		load: function(){

			 var url = lgb.Config.XML_BASE_PATH + "particleSystems.xml";
			 
			  $.ajax({
			    type: "GET",
			    url: url,
			    dataType: "xml",
			    success: this.d(this.parse)
			  });
			  


			  
		},

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
				
				this.dispatchLocal(lgb.event.Event.DATA_MODEL_CHANGED);

				
			},
			
			/*
			config for staandard particle system:
			
			config.parent
			config.frames
			config.life
			config.tension
			config.boxes
			config.particleCount
			config.particleShape
			config.particleSize
			config.tension
			config.colorKeys
			config.colors
			config.scaleKeys
			config.aim
			
			config for GPU particle system:
			
			cfg.aim bool
			cfg.boxes
			cfg.life 5
			cfg.particleCount || 1;
			cfg.particleSize || 1;
			cfg.tension || 0;
			cfg.colorKeys
			cfg.scaleKeys
			cfg.material
			cfg.particleShape
			
			
			loadConfig(cfg)
			*/
			
			makeParticleConfig: function(sys) {
				
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
	
	
	lgb.model.ParticleSystemModel.inheritsFrom(lgb.model.ModelBase);


	return lgb;
	
})(lgb || {});










