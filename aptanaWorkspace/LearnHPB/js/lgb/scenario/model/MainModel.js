/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.MainModel');

goog.require('lgb.core.BaseModel');
goog.require('lgb.scenario.model.tag.SystemList');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.core.Config');
goog.require('lgb.integrated.model.DisplayUnitSystem');
goog.require('lgb.chart.model.GraphModel');
goog.require('lgb.scenario.model.tag.VariableList');
goog.require('lgb.scenario.model.tag.GraphList');
goog.require('lgb.scenario.model.tag.Scenario');

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

    this.scenario = new lgb.scenario.model.tag.Scenario(rootNode);
    
    
    
	this.triggerLocal(e.DataModelInitialized); 

};








