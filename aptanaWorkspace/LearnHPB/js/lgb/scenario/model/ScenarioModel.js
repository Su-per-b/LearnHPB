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
  
  this.triggerLocal(e.DataModelInitialized);

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





/*
lgb.scenario.model.ScenarioModel.prototype.toggleDisplayUnitSystem = function() {
  
    
  this.displayUnitSystem.toggle();
  //
   
  if (undefined != this.systemList) {

    this.systemList.setDisplayUnitSystem(this.displayUnitSystem);
    
  }
  
  this.dispatchChangedEx('displayUnitSystem', this.displayUnitSystem);

};
 */

















