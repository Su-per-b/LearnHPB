/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Bs2');

goog.require('lgb.model.BaseModel');
goog.require('lgb.scenario.model.SystemList');
goog.require('lgb.utils.XmlWrapper');


/**
 * @constructor
 * @extends lgb.model.Bs2Model
 */
lgb.scenario.model.Bs2 = function() {

  lgb.model.BaseModel.call(this);

  this.xml = null;
  this.systemNodeArray = [];
  this.idxToNodeMap = {};
  this.selectedSystemNode = null;

};
goog.inherits(lgb.scenario.model.Bs2, lgb.model.BaseModel);



/**
 * Loads the scario from a remote XML file.
 */
lgb.scenario.model.Bs2.prototype.load = function() {
   var url = lgb.Config.XML_BASE_PATH + 'Building.xml';

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
lgb.scenario.model.Bs2.prototype.parse = function(xml) {

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














