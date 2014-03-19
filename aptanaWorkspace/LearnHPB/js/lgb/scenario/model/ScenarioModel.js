/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.ScenarioModel');

goog.require('lgb.world.model.BaseModel');
goog.require('lgb.scenario.model.SystemList');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.core.Config');


/**
 * @constructor
 * @extends lgb.world.model.ScenarioModelModel
 */
lgb.scenario.model.ScenarioModel = function() {

  lgb.world.model.BaseModel.call(this);
  
  this.xml = null;
  this.systemNodeArray = [];
  this.idxToNodeMap = {};
  this.selectedSystemNode = null;

};
goog.inherits(lgb.scenario.model.ScenarioModel, lgb.world.model.BaseModel);



/**
 * Loads the scario from a remote XML file.
 */
lgb.scenario.model.ScenarioModel.prototype.load = function(xmlFileName) {
  
  
  
  var url = lgb.core.Config.WEBROOT + lgb.core.Config.XML_BASE_PATH + xmlFileName;

  var delegate = this.d(this.parse);
  
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'xml',
      success: delegate
    });
    
};



/**
 * After the XML  file is loaded it is parsed here.
 * @param {Document} xml The XML document to parse.
 */
lgb.scenario.model.ScenarioModel.prototype.parse = function(xml) {

  var xmlWrapper = new lgb.utils.XmlWrapper(xml);
  var node = xmlWrapper.makeRootNode('/SystemList');
  
  if (null == node) {
    debugger;
  }
  
  this.systemList = new lgb.scenario.model.SystemList(node);
  
 // this.systemMap = systemList.systemMap;
 // this.systemList = this.systemList.systemList;
  
  this.triggerLocal(e.DataModelInitialized);

};














