goog.provide('lgb.model.scenario.SysVar');

goog.require ("lgb.model.ModelBase");

/**
 * @constructor
 * @extends lgb.model.ModelBase
 * @param {Object} node
 */
lgb.model.scenario.SysVar = function(node) {
	lgb.model.ModelBase.call(this);
	this.parse(node);
	this.unitSI = '';
	this.displayName = '';
};
	
	
goog.inherits(lgb.model.scenario.SysVar, lgb.model.ModelBase);
	
	
lgb.model.scenario.SysVar.prototype.parse = function(node) {
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
};

lgb.model.scenario.SysVar.prototype.setValue = function(name, type, content) {
		//throw ("Test");
		var theValue; // = content;
		
		switch (type) {
			case "Integer" : {
				theValue = parseInt(content, 10);
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
			
};


