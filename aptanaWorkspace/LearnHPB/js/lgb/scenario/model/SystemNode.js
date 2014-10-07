/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.SystemNode');
goog.require('lgb.core.BaseModel');
goog.require('lgb.scenario.model.SysVar');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb');

/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlWrapper The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.SystemNode = function(xmlWrapper) {


  lgb.core.BaseModel.call(this);

  /** @type {Array.<lgb.scenario.model.SysVar>} **/
  this.sysVarArray = [];
  this.parse(xmlWrapper);
   /** @type {number} */
  this.idx = 0;



};
goog.inherits(lgb.scenario.model.SystemNode, lgb.core.BaseModel);


/**
 * parses the xml for a given SystemNode
 * @param {!lgb.utils.XmlWrapper} xmlWrapper The xmlWrapper
 * object that contains the xml.
 */
lgb.scenario.model.SystemNode.prototype.parse = function(xmlWrapper) {


  if (undefined === xmlWrapper) {
    throw Error('xmlWrapper == undefined)');
  }

  if (xmlWrapper.currentNode === undefined) {
    throw Error('xmlWrapper.currentNode == undefined)');
  }
  if (xmlWrapper.currentNode.childNodes === undefined) {
    throw Error('xmlWrapper.currentNodes.childNodes == undefined)');
  }


    /** @type {string} **/
    this.name = xmlWrapper.getName();
    /** @type {string} **/
    this.id = xmlWrapper.getId();

    /** @type {NodeList} **/
    var childNodes = xmlWrapper.currentNode.childNodes;

    /** @type {number} **/
    var l = childNodes.length;

    for (var i = 0; i < l; i++) {
      var node = childNodes[i];

      if (node.nodeType != 1) continue;

      /** @type {lgb.scenario.model.SysVar} **/
      var sysVar = new lgb.scenario.model.SysVar(node);
      sysVar.idx = i;
      this.sysVarArray.push(sysVar);

     // lgb.logInfo('sysVar.name: {0}'.format(sysVar.name));
    }
};


/**
 * filters the sysVars and only returns the faults
 * @return {Array.<lgb.scenario.model.SysVar>} The object that
 * stores the input and fault data sources.
 */
lgb.scenario.model.SystemNode.prototype.getFaults = function() {

  var x = this.sysVarArray.length;
  var dsFaultArray = [];

  while (x--) {
    var sysVar = this.sysVarArray[x];
    if (sysVar.isFault) {
      dsFaultArray.push(sysVar);
    }
  }
  return dsFaultArray;
};


/**
 * filters the sysVars and only returns the inputs
 * @return {Array.<lgb.scenario.model.SysVar>} The object that stores the
 * input and fault data sources.
 */
lgb.scenario.model.SystemNode.prototype.getInputs = function() {

  var x = this.sysVarArray.length;

  var dsInputArray = [];

  while (x--) {
    var sysVar = this.sysVarArray[x];
    if (sysVar.ioType == 'INPUT' && !sysVar.isFault) {
      dsInputArray.push(sysVar);
    }
  }
  return dsInputArray;
};


/**
 * creates kendo datasources from the sysvars array
 * @return {Object} The object that stores the input and fault data sources.
 */
lgb.scenario.model.SystemNode.prototype.getDataSources = function() {

  var dataSources = {};

  var x = this.sysVarArray.length;


  var dsFaultArray = [];
  var dsInputArray = [];
  while (x--) {
    var sysVar = this.sysVarArray[x];

    if (sysVar.isFault) {

      dsFaultArray.push(
        {
          name: sysVar.name,
          Description: sysVar.displayName,
          unit: sysVar.unitSI

        }

      );
    } else {
      dsInputArray.push(
        {
          name: sysVar.name,
          Description: sysVar.displayName,
          unit: sysVar.unitSI
        }

      );
    }

  }

  var dsFaults = new kendo.data.DataSource({
       data: dsFaultArray,
       pageSize: 100
  });

  var dsInputs = new kendo.data.DataSource({
       data: dsInputArray,
       pageSize: 100
  });

  dataSources.faults = dsFaults;
  dataSources.inputs = dsInputs;

  return dataSources;
};
