goog.provide('lgb.model.scenario.Base');

goog.require('lgb.events.ComponentSelected');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.ScenarioParsed');
goog.require('lgb.model.ModelBase');
goog.require('lgb.model.XmlParser');
goog.require('lgb.model.scenario.SystemNode');

/**
 * @constructor
 * @extends lgb.model.ModelBase
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
	 var url = lgb.Config.XML_BASE_PATH + 'DefaultScenario.xml';

	  $.ajax({
	    type: 'GET',
	    url: url,
	    dataType: 'xml',
	    success: this.d(this.parse)
	  });
};


lgb.model.scenario.Base.prototype.selectId = function(id) {

	this.selectedSystemNode = this.idxToNodeMap[id];
	//this.selectedSystemID = id;

	var e = new lgb.events.DataModelChanged();
	this.dispatchLocal(e);
};


lgb.model.scenario.Base.prototype.parse = function(xml) {

		this.xml = xml;

		var parser = new lgb.model.XmlParser(xml);
		parser.makeRootNode('/scenario/sysVars/systemNode');
		
		var idx = 0;
		while (parser.currentNode) {
			var systemNode = new lgb.model.scenario.SystemNode(parser);
			systemNode.idx = idx;

			this.idxToNodeMap[systemNode.id] = systemNode;
			this.systemNodeArray.push(systemNode);
			
			idx++;
			parser.next();
        }
        
        this.selectedSystemNode = this.systemNodeArray[0];

		var event = new lgb.events.ScenarioParsed(this);
		this.dispatch(event);

};














