/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.ScenarioModel');

goog.require('lgb.core.BaseModel');
goog.require('lgb.scenario.model.SystemList');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.core.Config');
goog.require('lgb.simulation.model.DisplayUnitSystem');
goog.require('lgb.chart.model.GraphModel');


/**
 * @constructor
 * @extends lgb.world.model.ScenarioModelModel
 */
lgb.scenario.model.ScenarioModel = function() {

  lgb.core.BaseModel.call(this);
  
  this.xml = null;
  this.systemNodeArray = [];
  this.idxToNodeMap = {};
  this.selectedSystemNode = null;
  
  this.loadSuccessDelegate_ = this.d(this.loadSuccess_);
  this.loadErrorDelegate_ = this.d(this.loadError_);

};
goog.inherits(lgb.scenario.model.ScenarioModel, lgb.core.BaseModel);



/**
 * Loads the scario from a remote XML file.
 */
lgb.scenario.model.ScenarioModel.prototype.load = function(fileName) {
  
  var url = lgb.core.Config.WEBROOT + lgb.core.Config.XML_BASE_PATH + fileName + ".xml";

  var delegate = this.d(this.parse);
  
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'xml',
      success: this.loadSuccessDelegate_,
      error: this.loadErrorDelegate_
    }); 
    
};


lgb.scenario.model.ScenarioModel.prototype.loadError_ = function(req, status, err ) {

    console.log( 'something went wrong', status, err );

    debugger;

};



lgb.scenario.model.ScenarioModel.prototype.getChildren = function( ) {

    return this.systemList.getChildren();

};


/**
 * After the XML  file is loaded it is parsed here.
 * @param {Document} xml The XML document to parse.
 */
lgb.scenario.model.ScenarioModel.prototype.loadSuccess_ = function(xml) {

  var xmlWrapper = new lgb.utils.XmlWrapper(xml);
  var node = xmlWrapper.makeRootNode('/SystemList');
  
  if (null == node) {
    debugger;
  }
  
   this.systemList = new lgb.scenario.model.SystemList(node);
   this.graphModelList = [];
  
   this.makeGraph_('ZN1', ['y_ZN_1', 'y_SYS_1', 'u_ZN_1', 'u_ZN_2']);
   this.makeGraph_('ZN2', ['y_ZN_5', 'y_SYS_1', 'u_ZN_5', 'u_ZN_6']);
   this.makeGraph_('ZN3', ['y_ZN_9', 'y_SYS_1', 'u_ZN_9', 'u_ZN_10']);
   this.makeGraph_('ZN4', ['y_ZN_13', 'y_SYS_1', 'u_ZN_13', 'u_ZN_14']);
   this.makeGraph_('ZN5', ['y_ZN_17', 'y_SYS_1', 'u_ZN_17', 'u_ZN_18']);
   this.makeGraph_('ZN6', ['y_ZN_21', 'y_SYS_1', 'u_ZN_21', 'u_ZN_22']);
   this.makeGraph_('ZN7', ['y_ZN_25', 'y_SYS_1', 'u_ZN_25', 'u_ZN_26']);
   this.makeGraph_('ZN8', ['y_ZN_29', 'y_SYS_1', 'u_ZN_29', 'u_ZN_30']);
   this.makeGraph_('ZN9', ['y_ZN_33', 'y_SYS_1', 'u_ZN_33', 'u_ZN_34']);
   
   this.triggerLocal(e.DataModelInitialized);
};



lgb.scenario.model.ScenarioModel.prototype.makeGraph_ = function(title, varList) {
  
   var dateStart = new Date(2000,5,30,9,40,00,0);
   
   var graphGUIModel = new lgb.chart.model.GraphModel();
   graphGUIModel.setTitle(title);
   graphGUIModel.setDomainY(5, 30);
   
   graphGUIModel.setDomainX2(dateStart, 20);
   
   var len = varList.length;
   this.graphModelList.push(graphGUIModel);
   
   
   for (var i=0; i < len; i++) {
      graphGUIModel.makePathModel(varList[i]);
   };
   
   
   graphGUIModel.makeRandomData(20);
};





lgb.scenario.model.ScenarioModel.prototype.updateDisplayUnitSystem = function() {
  
    

  if (undefined != this.systemList) {

    this.systemList.updateDisplayUnitSystem();
    
  }
  

};


lgb.scenario.model.ScenarioModel.prototype.getVarList = function() {
  
    var varList = this.systemList.getVarList();
    return varList;
    
};















