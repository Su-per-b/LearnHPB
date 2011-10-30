goog.provide('lgb.model.XmlParser');
goog.require('lgb.model.ModelBase');


/**
 * Parser for any XML document
 * @constructor
 * @extends lgb.model.ModelBase
 * @param {Document} xml The xml document to parse.
 */
lgb.model.XmlParser = function(xml) {
  lgb.model.ModelBase.call(this);

 /** @type {Document}  */
  this.xml = xml;

  /** @type {XPathResult}  */
  this.xpathResult = null;

  /** @type {Node} A Node Object */
  this.currentNode = null;
  
  /**@const */
  this._NAME ='lgb.model.XmlParser';
};
goog.inherits(lgb.model.XmlParser, lgb.model.ModelBase);

/**
 * @param {string} xpath An Xpath selector.
 * @return {Node} The current xml node.
 */
lgb.model.XmlParser.prototype.makeRootNode = function(xpath) {
  this.xpathResult = this.evaluate_(xpath, this.xml);
  this.currentNode = this.xpathResult.iterateNext();

  return this.currentNode;
};

/**
 * @private
 * @param {string} xpath An Xpath selector.
 * @param {Node} searchNode The xml node to search.
 * @return {XPathResult} the result
 * see https://developer.mozilla.org/en/XPathResult.
 */
lgb.model.XmlParser.prototype.evaluate_ = function(xpath, searchNode) {
  try {
    var result = this.xml.evaluate(
      xpath, searchNode, null, XPathResult.ANY_TYPE, null
    );
  }
  catch (e) {
      $.error('lgb.model.XmlParser.evaluate_(){0}'.format(e));
  }

  return result;
};

/**
 * @return {string} the id atribute of the current node.
 */
lgb.model.XmlParser.prototype.getId = function() {
  return this.getNodeValue('@id', this.currentNode);
};

/**
 * @return {string} the name atribute of the current node.
 */
lgb.model.XmlParser.prototype.getName = function() {
  return this.getNodeValue('@name', this.currentNode);
};
/**
 * changes the current node to the next in the result set.
 */
lgb.model.XmlParser.prototype.next = function() {
  this.currentNode = this.xpathResult.iterateNext();
};

/**
 * @param {string} xpath An Xpath selector.
 * @param {Node} searchNode The xml node to search.
 * @return {string} The string value.
 */
lgb.model.XmlParser.prototype.getNodeValue = function(xpath, searchNode) {
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
lgb.model.XmlParser.prototype.getContent = function(xpath) {
  var xpathResult = this.evaluate_(xpath, this.currentNode);
  var resultNode = xpathResult.iterateNext();

  return resultNode.textContent;
};

/**
 * @param {string} xpath An Xpath selector.
 * @return {number} The content of the XML node.
 */
lgb.model.XmlParser.prototype.getContentAsFloat = function(xpath) {
  var str = this.getContent(xpath);
  return parseFloat(str);
};


/**
 * Takes a string like this "1,2,3" and makes and array containing numbers
 * @param {string} xpath An Xpath selector.
 * @return {Array.<number>} The content of the XML node.
 */
lgb.model.XmlParser.prototype.getFloatArray = function(xpath) {
  /**@type Array.<string> */
  var ary = this.getTextArray(xpath);
  var len = ary.length;

  /**@type Array.<number> */
  var aryFloat = [];

  //convert by all array elements to floats
  for (var i = 0; i < len; i++) {
    var str = parseFloat(ary[i]);
    aryFloat[i] = parseFloat(str);
  }

  return aryFloat;
};


/**
 * @param {string} xpath An Xpath selector.
 * @return {Array.<string>} The content of the XML node.
 */
lgb.model.XmlParser.prototype.getTextArray = function(xpath) {
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
