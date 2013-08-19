/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.EnvelopeGUI');

goog.require('lgb.model.LightingModel');
goog.require('lgb.view.input.BaseViewGUI');


/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.input.EnvelopeGUI = function(dataModel) {

  this._TITLE = "Settings";
  lgb.view.input.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.input.EnvelopeGUI, lgb.view.input.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.EnvelopeGUI.prototype.init = function() {
  this.triggerLocal(e.RequestAddToTestingInput, this);
};

lgb.view.input.EnvelopeGUI.prototype.bind_ = function() {
  
  this.kendoListBoxFloorHeight_.bind('select', this.d(this.onFloorHeightSelect_));
  this.kendoListFloorCount_.bind('select', this.d(this.onFloorCountSelect_));

};


lgb.view.input.EnvelopeGUI.prototype.onFloorCountSelect_ = function(event) {
  
  var idx = event.item.index();
  var dataItem = this.kendoListFloorCount_.dataItem(idx);
  
  var v = parseInt(dataItem.value);
  this.requestDataModelChange('floorCount', v);

};


lgb.view.input.EnvelopeGUI.prototype.onFloorHeightSelect_ = function(event) {
  
  var idx = event.item.index();
  var dataItem = this.kendoListBoxFloorHeight_.dataItem(idx);
  
  var v = parseInt(dataItem.value);
  
  this.requestDataModelChange('floorHeight', v);
    
};



lgb.view.input.EnvelopeGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  
   var items = [
          {text: "13ft", value:"13"},
          {text: "11ft", value:"11"},
          {text: "9ft", value:"9"}
          ];
          
          
  var el = this.getMainElement();
  
  el.append('<h4>Envelope</h4>');
  el.append('<p>Select Floor-To-ceiling height</p>');
    
  var container1 = $('<div>');
  el.append(container1);
  
  
  this.kendoListBoxFloorHeight_ = 
      container1.kendoDropDownList( 
        {
          dataTextField: "text",
          dataValueField: "value",
          dataSource: items
        }
      ).data("kendoDropDownList");
      
      
      this.kendoListBoxFloorHeight_.select(1);
      
      
  el.append('<div><br /><p>Select Number of Stories</p></div>');
  
  var container2 = $('<div>');
  el.append(container2);
      
   var items2 = [
          {text: "3", value:"3"},
          {text: "5", value:"5"},
          {text: "7", value:"7"}
          ];
      
  this.kendoListFloorCount_ = 
      container2.kendoDropDownList( 
        {
          dataTextField: "text",
          dataValueField: "value",
          dataSource: items2
        }
      ).data("kendoDropDownList");
      
      
      this.kendoListFloorCount_.select(1);
      
      
      this.bind_();
      

};

