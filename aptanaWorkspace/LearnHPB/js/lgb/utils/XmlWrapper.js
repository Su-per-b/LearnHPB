/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.utils.XmlWrapper');

/**
 * @constructor
 * @param {Document} xml The xml document that we will parse.
 * @extends {lgb.core.BaseClass}
 */
lgb.utils.XmlWrapper = function(xml) {


  lgb.core.BaseClass.call(this);

 /** @type {Document}  */
  this.xml = xml;
  /** @type {XPathResult}  */
  this.xpathResult = null;
  /** @type {Node} A Node Object */
  this.currentNode = null;
};
goog.inherits(lgb.utils.XmlWrapper, lgb.core.BaseClass);


/**
 * pases the XML docuement based on the xpath and creates a root node
 * which can then be operated on.
 * @param {string} xpath If you are not familiar with Xpath,
 * it is like a SQL query performed against an XML document.
 * @return {Node} In case caller wants this.
 */
lgb.utils.XmlWrapper.prototype.makeRootNode = function(xpath) {

  this.xpathResult = this.evaluate_(xpath, this.xml);
  this.currentNode = this.xpathResult.iterateNext();

  return this.currentNode;
};


/**
 * Using the xpath query and a node known as the searchnode
 * this function parses part of the XML document.
 * @private
 * @param {string} xpath The query string.
 * @param {Node} searchNode The xml node to search.
 * @return {XPathResult} the result
 * see https://developer.mozilla.org/en/XPathResult.
 */
lgb.utils.XmlWrapper.prototype.evaluate_ = function(xpath, searchNode) {
  try {
    var result = this.xml.evaluate(
      xpath,
      searchNode,
      null,
      XPathResult.ANY_TYPE,
      null
      );
  }
  catch (e) {
    jQuery.error('lgb.utils.XmlWrapper.evaluate_(){0}'.format(e));
  }

  return result;
};



/**
 * changes the current node to the next in the result set.
 */
lgb.utils.XmlWrapper.prototype.next = function() {
  this.currentNode = this.xpathResult.iterateNext();
};

/**
 * @param {string} xpath An Xpath selector.
 * @param {Node} searchNode The xml node to search.
 * @return {string} The string value.
 */
lgb.utils.XmlWrapper.prototype.getNodeValue = function(xpath, searchNode) {
  if (searchNode == null) {
    searchNode = this.currentNode;
  }
  var xpathResult = this.evaluate_(xpath, searchNode);
  var resultNode = xpathResult.iterateNext();

  return resultNode.nodeValue;
};

/**
 * @param {string} xpath An Xpath selector.
 * @return {string} The string content of the XML node.
 */
lgb.utils.XmlWrapper.prototype.getContent = function(xpath) {

  var xpathResult = this.evaluate_(xpath, this.currentNode);
  var resultNode = xpathResult.iterateNext();

  return resultNode.textContent;
};

/**
 * @param {string} xpath An Xpath selector.
 * @return {number} The content of the XML node.
 */
lgb.utils.XmlWrapper.prototype.getContentAsFloat = function(xpath) {
    var str = this.getContent(xpath);
    return parseFloat(str);
};


/**
 * Takes a string like this "1,2,3" and makes and array containing numbers
 * @param {string=} xpath An Xpath selector.
 * @return {Array.<number>} The content of the XML node.
 */
lgb.utils.XmlWrapper.prototype.getFloatArray = function(xpath) {
  var txtAry = this.getTextArray(xpath);
  var len = txtAry.length;

  /**@type {Array.<number>} */
  var numberAry = [];
  //convert by all array elements to integer
  for (var i = 0; i < len; i++) {
    numberAry[i] = parseFloat(txtAry[i]);
  }

  return numberAry;
};

/**
 * @param {string=} xpath An Xpath selector.
 * @return {Array.<string>} The content of the XML node.
 */
lgb.utils.XmlWrapper.prototype.getTextArray = function(xpath) {
  var searchNode;
  if (xpath == null) {
    searchNode = this.currentNode;
  } else {
    var xpathResult = this.evaluate_(xpath, this.currentNode);
    searchNode = xpathResult.iterateNext();
  }

  var ary = searchNode.textContent.split(',');


  return ary;
};


/**
 * @return {string} the name atribute of the current node.
 */
lgb.utils.XmlWrapper.prototype.getName = function() {
  return this.getNodeValue('@name', this.currentNode);
};

lgb.utils.XmlWrapper.prototype.getAbbr = function() {
  return this.getNodeValue('@abbr', this.currentNode);
};

/**
 * returns the attribute 'id' from xml.
 * @return {string} The id.
 */
lgb.utils.XmlWrapper.prototype.getId = function() {
  return this.getNodeValue('@id', this.currentNode);
};

lgb.utils.XmlWrapper.prototype.getAttribute = function(attributeName) {
  
  return this.getNodeValue('@'+ attributeName, this.currentNode);
};






