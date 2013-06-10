/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.LightingGUI');

goog.require('lgb.model.LightingModel');
goog.require('lgb.view.BaseViewGUI');


/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.LightingGUI = function(dataModel) {

  this._TITLE = "Settings";
  lgb.view.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.LightingGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.LightingGUI.prototype.init = function() {

  this.triggerLocal(e.RequestAddToBasicInput, this);
  
};

lgb.view.LightingGUI.prototype.bind_ = function() {
  
  this.kendoComboBox_.bind('select', this.d(this.onComboBoxSelect_));

};


lgb.view.LightingGUI.prototype.onComboBoxSelect_ = function(event) {
  
  var idx = event.item.index();
  var dataItem = this.kendoComboBox_.dataItem(idx);
  
  var v = parseInt(dataItem.value);
  
  var stateObject = {lightingType : v};
  this.dataModel.change(stateObject);
  
  return;
};



lgb.view.LightingGUI.prototype.inject = function(parentElement) {
  
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

