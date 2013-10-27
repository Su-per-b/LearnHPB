/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.CrossSectionGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.DropDown');




/**
 * @constructor
 * @param {lgb.world.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseGUI}
 */
lgb.gui.view.CrossSectionGUI = function(dataModel) {

  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.gui.view.CrossSectionGUI, lgb.gui.view.BaseGUI);




/**
 * Initializes the View
 */
lgb.gui.view.CrossSectionGUI.prototype.init = function() {
  this.triggerLocal(e.RequestAddToTestingInput, this);
};



lgb.gui.view.CrossSectionGUI.prototype.bind_ = function() {
  

  this.listenTo(this.dropDownExternalInsulation_, e.Select, this.onExternalInsulationSelect_);
  this.listenTo(this.dropDownExternalInsulation_, e.OpenDropDown, this.onExternalInsulationOpen_);
  
  this.listenTo(this.dropDownAirBarrier_, e.Select, this.onAirBarrierSelect_);
  this.listenTo(this.dropDownAirBarrier_, e.OpenDropDown, this.onAirBarrierOpen_);
  
  this.listenTo(this.dropDownGap_, e.Select, this.onGapSelect_);
  this.listenTo(this.dropDownGap_, e.OpenDropDown, this.onGapOpen_);
  
  
  this.listenTo(this.dropDownVeneer_, e.Select, this.onVeneerSelect_);
  this.listenTo(this.dropDownVeneer_, e.OpenDropDown, this.onVeneerOpen_);
  
};




lgb.gui.view.CrossSectionGUI.prototype.onGapOpen_ = function(event) {

    this.gotoViewPoint('SideViewPoint');  
};


lgb.gui.view.CrossSectionGUI.prototype.onGapSelect_ = function(event) {
  
  var selectedOption = event.payload;
  this.requestDataModelChange('showGap', selectedOption.value);
  
};


lgb.gui.view.CrossSectionGUI.prototype.onVeneerOpen_ = function(event) {

    this.gotoViewPoint('VeneerViewPoint');
       
};


lgb.gui.view.CrossSectionGUI.prototype.onVeneerSelect_ = function(event) {
  
  var selectedOption = event.payload;
  this.requestDataModelChange('veneerMeshName', selectedOption.value);
  
};



lgb.gui.view.CrossSectionGUI.prototype.onAirBarrierOpen_ = function(event) {

    this.gotoViewPoint('AirViewPoint');
      
};


lgb.gui.view.CrossSectionGUI.prototype.onAirBarrierSelect_ = function(event) {
  
  var selectedOption = event.payload;
  this.requestDataModelChange('showAirBarrier', selectedOption.value);
  
};



lgb.gui.view.CrossSectionGUI.prototype.onExternalInsulationOpen_ = function(event) {
    this.gotoViewPoint('SideViewPoint');
};

lgb.gui.view.CrossSectionGUI.prototype.onExternalInsulationSelect_ = function(event) {
  
  var selectedOption = event.payload;
  this.requestDataModelChange('externalInsulationThickness', selectedOption.value);
  
};


lgb.gui.view.CrossSectionGUI.prototype.gotoViewPoint = function(name) {

      var viewpointNode = this.dataModel.getViewPoint(name);
    
    if (viewpointNode) {
      viewpointNode.updateWorldPositions();
      this.triggerLocal(e.RequestGoToViewpointNode, viewpointNode);
    }
};




lgb.gui.view.CrossSectionGUI.prototype.getViewPoint = function(name) {
  
  
   var viewpointNode = this.dataModel.getViewPoint(name);
   
   if (null == viewpointNode) {
     debugger;
   }
   return viewpointNode;
  
};





lgb.gui.view.CrossSectionGUI.prototype.injectTo = function(parentElement) {
  
  goog.base(this,  'injectTo', parentElement);
  var el = this.getMainElement();
  
  this.dropDownExternalInsulation_ = new lgb.component.DropDown(this.dataModel.externalInsulationOptions);
  this.dropDownAirBarrier_ = new lgb.component.DropDown(this.dataModel.airBarrierOptions);
  this.dropDownVeneer_ = new lgb.component.DropDown(this.dataModel.veneerOptions);
  this.dropDownGap_ = new lgb.component.DropDown(this.dataModel.gapOptions);
  
  
  this.bind_();
  
  this.dropDownExternalInsulation_.injectTo(el);
  this.dropDownAirBarrier_.injectTo(el);
  this.dropDownGap_.injectTo(el);
  this.dropDownVeneer_.injectTo(el);
  
};




