goog.provide('lgb.utils.XmlParser');

/**
 * @constructor
 * @param {*=} xml
 * @extends {lgb.BaseClass}
 */
lgb.utils.XmlParser = function(xml){
	
	lgb.BaseClass.call(this);
	
	this.xml = xml;
	this.xpathResult = null;
	this.currentNode = null;
};

goog.inherits(lgb.utils.XmlParser, lgb.BaseClass);

lgb.utils.XmlParser.prototype.makeRootNode = function(xpath) {
		
	this.xpathResult = this.evaluate_(xpath, this.xml);
	this.currentNode = this.xpathResult.iterateNext();
	
	return this.currentNode;
};

lgb.utils.XmlParser.prototype.evaluate_ = function(xpath, searchNode) {
	try {
		var result = this.xml.evaluate(xpath, searchNode, null, XPathResult.ANY_TYPE, null);
	} 
	catch (e) {
		jQuery.error('lgb.utils.XmlParser.evaluate_(){0}'.format(e));
	}
	
	return result;
};

		
lgb.utils.XmlParser.prototype.getId = function() {
	return this.getNodeValue("@id",  this.currentNode);
};


lgb.utils.XmlParser.prototype.next = function() {
	this.currentNode = this.xpathResult.iterateNext();
};

lgb.utils.XmlParser.prototype.getNodeValue = function(xpath, searchNode) {
	if (searchNode ==null) {
		searchNode = this.currentNode;
	}
	
	var xpathResult = this.evaluate_(xpath, searchNode);
	
	
//	var xpathRes = this.xml.evaluate(xpath, searchNode, null, XPathResult.ANY_TYPE, null);
	var resultNode = xpathResult.iterateNext();
	
	
	return resultNode.nodeValue;
};


lgb.utils.XmlParser.prototype.getContent = function(xpath) {
	//var xpathRes = this.xml.evaluate(xpath, this.currentNode, null, XPathResult.ANY_TYPE, null);
	var xpathResult = this.evaluate_(xpath, this.currentNode);
	
	var resultNode = xpathResult.iterateNext();
	
	
	return resultNode.textContent;
};

lgb.utils.XmlParser.prototype.getContentAsFloat = function(xpath) {
		var str = this.getContent(xpath);
		return parseFloat(str);
};


/**
 * @param {string=} xpath optional argument
 **/
lgb.utils.XmlParser.prototype.getFloatArray = function(xpath) {
	var ary = this.getTextArray(xpath);
	var len = ary.length;

	//convert by all array elements to integer
	for(var i=0;i<len;i++) {
		ary[i] = parseFloat(ary[i]);
	}
		
	return ary;
};

/**
 * @param {string=} xpath optional argument
 **/
lgb.utils.XmlParser.prototype.getTextArray = function(xpath) {
	var searchNode;
	if (xpath == null) {
		searchNode = this.currentNode;
	} else {
		var xpathResult = this.evaluate_(xpath, this.currentNode);
		
	//	var xpathRes = this.xml.evaluate(xpath, this.currentNode, null, XPathResult.ANY_TYPE, null);
		searchNode = xpathResult.iterateNext();
	}
	
	var ary = searchNode.textContent.split(',');

		
	return ary;
};














