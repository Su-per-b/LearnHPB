


/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	lgb.model.scenario = lgb.model.scenario || {};	
	
	/**
	 * @namespace MVC model 
	 */
	lgb.model.scenario.Base = function() {
		
		lgb.model.ModelBase.call(this);
		
		this.xml = null;
		this.systemNodeArray = []
		
	};
	
	
	lgb.model.scenario.Base.prototype = {
		
		load: function(){

			 var url = lgb.Config.XML_BASE_PATH + "DefaultScenario.xml";
			 
			  $.ajax({
			    type: "GET",
			    url: url,
			    dataType: "xml",
			    success: this.d(this.parse)
			  });

		},

		parse: function(xml) {
			
			this.xml  = xml;
			
			var parser = new lgb.model.XmlParser(xml);
			parser.makeRootNode('/scenario/sysVars/systemNode');
			
			while (parser.currentNode) {
				var systemNode = new lgb.model.scenario.SystemNode (parser);
				parser.next();
				
				this.systemNodeArray.push(systemNode);
            };
			
			//this.dispatchLocal(lgb.event.Event.DATA_MODEL_CHANGED);
			
			this.dispatch (lgb.event.Event.SCENARIO_PARSED, this);
			
		}
			

			

		
	};
	
	
	lgb.model.scenario.Base.inheritsFrom(lgb.model.ModelBase);


	return lgb;
	
})(lgb || {});










