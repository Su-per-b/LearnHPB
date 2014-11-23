/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Base');

goog.require('lgb.core.BaseModel');
goog.require('lgb.scenario.model.SystemNode');
goog.require('lgb.utils.XmlWrapper');

/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.scenario.model.Base = function() {


  lgb.core.BaseModel.call(this);

  this.xml = null;
  this.systemNodeArray = [];
  this.idxToNodeMap = {};
  this.selectedSystemNode = null;

};
goog.inherits(lgb.scenario.model.Base, lgb.core.BaseModel);





/**
 * @param {string} id The ID of the mesh.
 */
lgb.scenario.model.Base.prototype.selectId = function(id) {

  this.selectedSystemNode = this.idxToNodeMap[id];
  this.dispatchChangedEx('selectedSystemNode', this.selectedSystemNode);
};


/**
 * After the XML  file is loaded it is parsed here.
 * @param {Document} xml The XML document to parse.
 */
lgb.scenario.model.Base.prototype.parse = function(xml) {

  this.xml = xml;

  var xmlWrapper = new lgb.utils.XmlWrapper(xml);
  xmlWrapper.makeRootNode('/scenario/sysVars/systemNode');

  var idx = 0;
  while (xmlWrapper.currentNode) {
    var systemNode = new lgb.scenario.model.SystemNode(xmlWrapper);
    systemNode.idx = idx;

    this.idxToNodeMap[systemNode.id] = systemNode;
    this.systemNodeArray.push(systemNode);

    idx++;
    xmlWrapper.next();
   }

    this.selectedSystemNode = this.systemNodeArray[0];

  
  this.triggerLocal(e.DataModelInitialized);
};







