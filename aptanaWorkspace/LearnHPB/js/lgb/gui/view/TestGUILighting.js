/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.TestGUILighting');

goog.require('lgb.world.model.LightingModel');
goog.require('lgb.gui.view.BaseGUI');


/**
 * @constructor
 * @param {lgb.world.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseGUI}
 */
lgb.gui.view.TestGUILighting = function(dataModel) {

  this._TITLE = "Settings";
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.gui.view.TestGUILighting, lgb.gui.view.BaseGUI);




lgb.gui.view.TestGUILighting.prototype.bind_ = function() {
  
  this.kendoComboBox_.bind('select', this.d(this.onComboBoxSelect_));

};


lgb.gui.view.TestGUILighting.prototype.onComboBoxSelect_ = function(event) {
  
  var idx = event.item.index();
  var dataItem = this.kendoComboBox_.dataItem(idx);
  
  var value = parseInt(dataItem.value);
  
  this.dataModel.changePropertyEx('lightingType', value);
};



lgb.gui.view.TestGUILighting.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  
   var items = [
          {text: "Recessed", value:"1"},
          {text: "Pendant", value:"0"}
          ];
          
          
  var el = this.getMainElement();
  

  var titleDiv = el.append('<h4>Lighting</h4>');
    
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

