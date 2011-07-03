


/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace MVC controller 
	 */
	lgb.model = lgb.model || {};
	
	lgb.model.XmlParser = function(xml){
		
		lgb.model.XmlParser.call(this);
		
		this.xml = xml;
		this.xpathResult = null;
		this.currentNode = null;
	};
	
	
	
	lgb.model.XmlParser.prototype = {
		
		makeRootNode: function(xpath) {

			this.xpathResult = this.xml.evaluate(xpath, this.xml, null, XPathResult.ANY_TYPE, null);
			this.currentNode = this.xpathResult.iterateNext();
			
			return this.currentNode;
		},
		getId: function() {

			return this.getNodeValue("@id",  this.currentNode);
			
		},
		next: function() {

			this.currentNode = this.xpathResult.iterateNext();
			
		},
		
		getNodeValue : function(xpath, searchNode) {
			
			
			if (searchNode ==null) {
				searchNode = this.currentNode;
			}
			
			var xpathRes = this.xml.evaluate(xpath, searchNode, null, XPathResult.ANY_TYPE, null);
			var resultNode = xpathRes.iterateNext();
			
			
			return resultNode.nodeValue;
		},
		getContent : function(xpath) {

			var xpathRes = this.xml.evaluate(xpath, this.currentNode, null, XPathResult.ANY_TYPE, null);
			var resultNode = xpathRes.iterateNext();
			
			
			return resultNode.textContent;
		},
		getContentAsFloat : function(xpath) {

			var str = this.getContent(xpath);
			return parseFloat(str);
		},
		
		getFloatArray : function (xpath) {

			var ary = this.getTextArray(xpath);
			var len = ary.length;

			//convert by all array elements to integer
			for(var i=0;i<len;i++) {
				ary[i] = parseFloat(ary[i]);
			}
				
			return ary;
			
		},
		getTextArray : function (xpath) {
			
			var searchNode;
			if (xpath == null) {
				searchNode = this.currentNode;
			} else {
				var xpathRes = this.xml.evaluate(xpath, this.currentNode, null, XPathResult.ANY_TYPE, null);
				searchNode = xpathRes.iterateNext();
			}
			
			var ary = searchNode.textContent.split(',');

				
			return ary;
			
		}

	};
	
	lgb.model.XmlParser.inheritsFrom(lgb.model.ModelBase);
	
	return lgb;
	
})(lgb || {});









