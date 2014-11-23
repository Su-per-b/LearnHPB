/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.MainModel');

goog.require('lgb.core.BaseModel');
goog.require('lgb.scenario.model.SystemList');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.core.Config');
goog.require('lgb.simulation.model.DisplayUnitSystem');
goog.require('lgb.chart.model.GraphModel');
goog.require('lgb.scenario.model.VariableList');

/**
 * @constructor
 * @extends lgb.world.model.ScenarioModelModel
 */
lgb.scenario.model.MainModel = function() {

  lgb.core.BaseModel.call(this);
  
  this.xml = null;

  this.loadSuccessDelegate_ = this.d(this.loadSuccess_);
  this.loadErrorDelegate_ = this.d(this.loadError_);

};
goog.inherits(lgb.scenario.model.MainModel, lgb.core.BaseModel);



/**
 * Loads the scario from a remote XML file.
 */
lgb.scenario.model.MainModel.prototype.load = function(fileName) {
  
  var url = lgb.core.Config.WEBROOT + lgb.core.Config.XML_BASE_PATH + fileName + ".xml";
  
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'xml',
      success: this.loadSuccessDelegate_,
      error: this.loadErrorDelegate_
    }); 
    
};


lgb.scenario.model.MainModel.prototype.loadError_ = function(req, status, err ) {

    console.log( 'something went wrong', status, err );

    debugger;

};



/**
 * After the XML  file is loaded it is parsed here.
 * @param {Document} xml The XML document to parse.
 */
lgb.scenario.model.MainModel.prototype.loadSuccess_ = function(xml) {


	var xmlWrapper = new lgb.utils.XmlWrapper(xml);
	var rootNode = xmlWrapper.makeRootNode('/Scenario');

	this.name = xmlWrapper.getName();

	if (null == rootNode) { debugger;
	}

	var variableListOutputNode = xmlWrapper.makeRootNode('/Scenario/VariableList');
    
    if (null == variableListOutputNode) {
        this.variableListOutput = null;
    } else {
        this.variableListOutput = new lgb.scenario.model.VariableList(variableListOutputNode);
    }

	var systemListNode = xmlWrapper.makeRootNode('/Scenario/SystemList');
	this.systemListInput = new lgb.scenario.model.SystemList(systemListNode);
	
	this.graphModelList = [];

	this.makeGraph_('ZN1', ['ZN1SPCool', 'OATemp', 'ZN1Temp', 'ZN1SPHeat']);
    this.makeGraph_('ZN2', ['ZN2SPCool', 'OATemp', 'ZN2Temp', 'ZN2SPHeat']);
    this.makeGraph_('ZN3', ['ZN3SPCool', 'OATemp', 'ZN3Temp', 'ZN3SPHeat']);
    this.makeGraph_('ZN4', ['ZN4SPCool', 'OATemp', 'ZN4Temp', 'ZN4SPHeat']);
    this.makeGraph_('ZN5', ['ZN5SPCool', 'OATemp', 'ZN5Temp', 'ZN5SPHeat']);
    this.makeGraph_('ZN6', ['ZN6SPCool', 'OATemp', 'ZN6Temp', 'ZN6SPHeat']);
    this.makeGraph_('ZN7', ['ZN7SPCool', 'OATemp', 'ZN7Temp', 'ZN7SPHeat']);
    this.makeGraph_('ZN8', ['ZN8SPCool', 'OATemp', 'ZN8Temp', 'ZN8SPHeat']);
    this.makeGraph_('ZN9', ['ZN9SPCool', 'OATemp', 'ZN9Temp', 'ZN9SPHeat']);
    
	this.triggerLocal(e.DataModelInitialized); 

};




lgb.scenario.model.MainModel.prototype.makeGraph_ = function(title, abbrList) {
  
   var graphGUIModel = new lgb.chart.model.GraphModel();
   graphGUIModel.setTitle(title);
   
   graphGUIModel.setVariablesByAbbrList(abbrList);
   this.graphModelList.push(graphGUIModel);

};

 

   
   
   



lgb.scenario.model.MainModel.prototype.updateDisplayUnitSystem = function() {
  
    

  if (undefined != this.systemList) {

    this.systemList.updateDisplayUnitSystem();
    
  }
  

};











