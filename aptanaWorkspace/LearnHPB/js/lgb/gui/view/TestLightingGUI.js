/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.TestLightingGUI');

goog.require('lgb.world.model.LightingModel');
goog.require('lgb.gui.view.BaseGUI');


/**
 * @constructor
 * @param {lgb.world.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.TestLightingGUI = function(dataModel) {

  this._TITLE = "Settings";
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.gui.view.TestLightingGUI, lgb.gui.view.BaseGUI);




lgb.gui.view.TestLightingGUI.prototype.bind_ = function() {
  
  this.kendoDropDownList_.bind('select', this.d(this.onDropDownSelect_));

};


lgb.gui.view.TestLightingGUI.prototype.onDropDownSelect_ = function(event) {
  
  var idx = event.item.index();
  var dataItem = this.kendoDropDownList_.dataItem(idx);
  
  var value = parseInt(dataItem.value);
  
  this.dataModel.changePropertyEx('lightingType', value);
};



lgb.gui.view.TestLightingGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  
   var items = [
          {text: "Recessed", value:"1"},
          {text: "Pendant", value:"0"}
          ];
          
          
  var el = this.getMainElement();
  

  var titleDiv = el.append('<h4>Lighting</h4>');
    
  var cb = $('<div>');
  el.append(cb);
  
  
  this.kendoDropDownList_ = 
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

