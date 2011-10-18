goog.provide('lgb.model.scenario.Base');

goog.require ("lgb.model.scenario.SystemNode");
goog.require ("lgb.model.ModelBase");
goog.require ("lgb.model.XmlParser");
goog.require ("lgb.event.ScenarioParsed");
goog.require('lgb.event.DataModelChanged');
goog.require('lgb.event.ComponentSelected');

/**
 * @namespace MVC model 
 */
lgb.model.scenario.Base = function() {
	
	lgb.model.ModelBase.call(this);
	
	this.xml = null;
	this.systemNodeArray = [];
	this.idxToNodeMap = {};
	this.selectedSystemNode = null;
	
};

goog.inherits(lgb.model.scenario.Base, lgb.model.ModelBase);


lgb.model.scenario.Base.prototype.load = function() {
	 var url = lgb.Config.XML_BASE_PATH + "DefaultScenario.xml";
	 
	  $.ajax({
	    type: "GET",
	    url: url,
	    dataType: "xml",
	    success: this.d(this.parse)
	  });
};

lgb.model.scenario.Base.prototype.selectId = function(id) {
	
	this.selectedSystemNode = this.idxToNodeMap[id];

	var e = new lgb.event.DataModelChanged();
	this.dispatchLocal(e);
};


lgb.model.scenario.Base.prototype.parse = function(xml) {
		
		this.xml  = xml;
		
		var parser = new lgb.model.XmlParser(xml);
		parser.makeRootNode('/scenario/sysVars/systemNode');
		
		while (parser.currentNode) {
			var systemNode = new lgb.model.scenario.SystemNode (parser);
			parser.next();
			
			this.idxToNodeMap[systemNode.id] = systemNode;
			this.systemNodeArray.push(systemNode);
        };
		
		var event = new lgb.event.ScenarioParsed(this);
		this.dispatch(event);
	
};















