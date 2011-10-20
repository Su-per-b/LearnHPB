goog.provide('lgb.model.scenario.SystemNode');

goog.require ("lgb.model.scenario.SysVar");
goog.require ("lgb.model.ModelBase");

/**
 * @constructor
 * @extends lgb.model.ModelBase
 * @param {Object} xmlParser
 */
lgb.model.scenario.SystemNode = function(xmlParser) {
	lgb.model.ModelBase.call(this);
	this.sysVarArray = [];
	
	this.parse(xmlParser);
};


goog.inherits(lgb.model.scenario.SystemNode, lgb.model.ModelBase);


lgb.model.scenario.SystemNode.prototype.parse = function(xmlParser) {
		this.name = xmlParser.getName();
		this.id = xmlParser.getId();
		
		var children = xmlParser.currentNode.children;
		var x = children.length;
		
		try {
			while(x--) {
				var sysVarNode = children[x];
				//var x= 0;
				
				var sysVar = new lgb.model.scenario.SysVar(sysVarNode);
				this.sysVarArray.push(sysVar);

			}
		} catch (err) {
			alert(err);
		}
};

lgb.model.scenario.SystemNode.prototype.getFaultDataSource = function() {
	var x = this.sysVarArray.length;
	

	var dsArray = [];
	while(x--) {
		var sysVar = this.sysVarArray[x];
	
		if(sysVar.isFault) {
			
			dsArray.push(
				{
					name: sysVar.name,
					Description : sysVar.displayName,
					unit: sysVar.unitSI
					
				}
				
			);
		}
	}

	var ds = new kendo.data.DataSource({
	     data: dsArray,
	     pageSize: 100
	});
	
	return ds;
};



