/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.TestLightingGUI');

goog.require('lgb.model.LightingModel');
goog.require('lgb.view.BaseViewGUI');


/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.input.TestLightingGUI = function(dataModel) {

  this._TITLE = "Settings";
  lgb.view.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.input.TestLightingGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.TestLightingGUI.prototype.init = function() {

  this.triggerLocal(e.RequestAddToTestingInput, this);
  
};

lgb.view.input.TestLightingGUI.prototype.bind_ = function() {
  
  this.kendoComboBox_.bind('select', this.d(this.onComboBoxSelect_));

};


lgb.view.input.TestLightingGUI.prototype.onComboBoxSelect_ = function(event) {
  
  var idx = event.item.index();
  var dataItem = this.kendoComboBox_.dataItem(idx);
  
  var v = parseInt(dataItem.value);
  
  var stateObject = {lightingType : v};
  this.dataModel.change(stateObject);
  
  return;
};



lgb.view.input.TestLightingGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  
   var items = [
          {text: "Recessed", value:"1"},
          {text: "Pendant", value:"0"}
          ];
          
          
  var el = this.getMainElement();
  

  var titleDiv = el.append('<h4>Lighting</h4>')
    
  var cb = $('<div>');
  el.append(cb);
  
  
  this.kendoComboBox_ = 
      cb.kendoDropDownList( 
        {
          dataTextField: "text",
          dataValueField: "value",
          dataSource: items
        }
      ).data("kendoDropDownList");
      
      
      this.kendoComboBox_.select(0);
      
      this.bind_();
      

};
