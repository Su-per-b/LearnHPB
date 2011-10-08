

/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	lgb.model.scenario = lgb.model.scenario || {};
	
	lgb.model.scenario.SysVar = function(node) {
		lgb.model.ModelBase.call(this);
		this.parse(node);
	};
	

	lgb.model.scenario.SysVar.prototype = {
		
		parse: function(node) {
			
		//this.name = xmlParser.getName();
			
			var y = node.children.length;
			while(y--) {
				var item = node.children[y];
				//sysVar[x] = 1;
				
				var type = item.getAttribute("type");
				var name = item.nodeName;
				var content = item.textContent;
				
				this.setValue(name, type, content);
			}
		},
		setValue: function(name, type, content) {
			
			//throw ("Test");
			var theValue; // = content;
			
			switch (type) {
				case "Integer" : {
					theValue = parseInt(content);
					break;
				}
				case "Boolean" : {
					theValue = Boolean (content);
					break;
				}
				case "Float" : {
					theValue = parseFloat(content);
					break;
				}
				case "String" : {
					theValue = String(content);
					break;
				}
			}
			
			
			this[name] = theValue;
			
			
			
			
		}
		
	};
	
	
	lgb.model.scenario.SysVar.inheritsFrom(lgb.model.ModelBase);
	
	return lgb;
	
})(lgb || {});



