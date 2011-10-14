

/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	lgb.model.scenario = lgb.model.scenario || {};
		
	lgb.model.scenario.SystemNode = function(xmlParser) {
		lgb.model.ModelBase.call(this);
		this.sysVarArray = [];
		
		this.parse(xmlParser);
	};
	

	lgb.model.scenario.SystemNode.prototype = {
		
		parse: function(xmlParser) {
			
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
		}, 
		
		getFaultDataSource: function() {
			

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

		}, 
		
		
		
		
	};
	
	lgb.model.scenario.SystemNode.inheritsFrom(lgb.model.ModelBase);
	
	return lgb;
	
})(lgb || {});



