goog.provide('lgb.model.scenario.SystemNode');
goog.require('lgb.model.ModelBase');
goog.require('lgb.model.scenario.SysVar');

/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.ModelBase
 * @param {!lgb.model.XmlParser} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.SystemNode = function(xmlParser) {
  
  /**@const */
  this._NAME ='lgb.model.scenario.SystemNode';
  
  lgb.model.ModelBase.call(this);

  /** @type {Array.<lgb.model.scenario.SysVar>} **/
  this.sysVarArray = [];
  this.parse(xmlParser);
   /** @type {number} */
  this.idx =0;
  

	
};
goog.inherits(lgb.model.scenario.SystemNode, lgb.model.ModelBase);


/**
 * parses the xml for a given SystemNode
 * @param {!lgb.model.XmlParser} xmlParser The xmlParser
 * object that contains the xml.
 */
lgb.model.scenario.SystemNode.prototype.parse = function(xmlParser) {


	if (undefined === xmlParser) {
		throw Error('xmlParser == undefined)');
	}
	
	if (xmlParser.currentNode === undefined) {
		throw Error('xmlParser.currentNode == undefined)');
	}
	if (xmlParser.currentNode.childNodes === undefined) {
		throw Error('xmlParser.currentNodes.childNodes == undefined)');
	}

	
    /** @type {string} **/
    this.name = xmlParser.getName();
    /** @type {string} **/
    this.id = xmlParser.getId();

    /** @type {NodeList} **/
    var childNodes = xmlParser.currentNode.childNodes;
    
    /** @type {number} **/
    var l=childNodes.length;
    
    for (var i=0; i < l; i++) {
      var node = childNodes[i];
      
      if (node.nodeType != 1) continue;
      
      /** @type {lgb.model.scenario.SysVar} **/
      var sysVar = new lgb.model.scenario.SysVar(node);
      sysVar.idx = i;
      this.sysVarArray.push(sysVar);

     // lgb.logInfo('sysVar.name: {0}'.format(sysVar.name));
    };
    


    
    
};


/**
 * filters the sysVars and only returns the faults
 * @return {Array.<lgb.model.scenario.SysVar>} The object that stores the input and fault data sources.
 */
lgb.model.scenario.SystemNode.prototype.getFaults = function() {

  var x = this.sysVarArray.length;

  var dsFaultArray = [];
  
  while (x--) {
    var sysVar = this.sysVarArray[x];
    if (sysVar.isFault) {
      dsFaultArray.push(sysVar);
    }
  }
  return dsFaultArray;
}


/**
 * filters the sysVars and only returns the inputs
 * @return {Array.<lgb.model.scenario.SysVar>} The object that stores the input and fault data sources.
 */
lgb.model.scenario.SystemNode.prototype.getInputs = function() {

  var x = this.sysVarArray.length;

  var dsInputArray = [];
  
  while (x--) {
    var sysVar = this.sysVarArray[x];
    if (sysVar.ioType == 'INPUT' && !sysVar.isFault ) {
      dsInputArray.push(sysVar);
    }
  }
  return dsInputArray;
}


/**
 * creates kendo datasources from the sysvars array
 * @return {Object} The object that stores the input and fault data sources.
 */
lgb.model.scenario.SystemNode.prototype.getDataSources = function() {

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
