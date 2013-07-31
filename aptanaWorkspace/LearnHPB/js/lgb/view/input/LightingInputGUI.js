/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.LightingInputGUI');

goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.input.LightingInputGUI = function(dataModel) {
  
  this._TITLE = "Lighting";
  this.layoutID = lgb.Config.LAYOUT_ID.BaseGUI;
  
  lgb.view.input.BaseViewGUI.call(this, dataModel, 'LightingInputGUI');
};
goog.inherits(lgb.view.input.LightingInputGUI, lgb.view.input.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.LightingInputGUI.prototype.init = function() {
  
    this.triggerLocal(e.RequestAddToParentGUI);
};




lgb.view.input.LightingInputGUI.prototype.bind_ = function() {
  


      
}


lgb.view.input.LightingInputGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  var el = this.getMainElement();
  var titleDiv = el.append('<h3>Lighting</h3>');
  
  el.append('<h4>General</h4>');
  
  var ary = ['1990', '2000','2004', '2010', '2020'];
  this.injectComboBox('Lighting Vintage', ary, null, 1);
  
  var ary = ['Parabolic Troffer', 'Volumetric Troffer','Direct / Indirect Pendant', 'Desk Top', 'Wall Washer'];
  this.injectComboBox('Luminaire Type', ary, null, 1);
  
  var ary = ['Manual Controls', 'Automatic Controls','Open Loop Photosensor', 'Closed Loop Photosensor'];
  this.injectComboBox('Controls Type', ary, null, 1);
    
  el.append('<h4>Luminaires</h4>');
  
  var ary = ['1x4', '2x2', '2x4'];
  this.injectComboBox('Luminaire Size', ary, null, 3);
  
  var ary = ['8 x 8','8 x 10', '10 x 10'];
  this.injectComboBox('Luminaire Spacing', ary, null, 2);
  
  var ary = ['0'];
  this.injectComboBox('Mounting Distance', ary, null, 1);
  
  el.append('<h4>Lamps</h4>');
  
  var ary = ['2', '3','4'];
  this.injectComboBox('Number of Lamps', ary, null, 1);
  
  var ary = ['T5', 'T8','T12'];
  this.injectComboBox('Lamp Type', ary, null, 2);
  
  
  var ary = ['2700', '3500','4100'];
  this.injectComboBox('Color Temperature (CCT)', ary, null, 2);
  
  
  el.append('<h4>Ballast</h4>');
  
  var ary = ['Magnetic', 'Electronic'];
  this.injectComboBox('Type of Ballast', ary, null, 1);
  
  
  var ary = ['Rapid', 'Instant','Programed Start'];
  this.injectComboBox('Ballast Start Type', ary, null, 1);
  
  
  
  
};

lgb.view.input.LightingInputGUI.prototype.injectComboBox = function(lbl, textAry, valuesAry, defaultIdx) {
  
  if (null == valuesAry) {
    valuesAry = textAry;
  }
  
   var el = this.getMainElement();
   var items = [];
    
  var len = textAry.length;
  
  for (var i=0; i < len; i++) {
    var oneItem = {text: textAry[i], value:valuesAry[i]};
    items.push (oneItem);
  }
  
  
  var rowDiv = $('<div>').addClass('inputRow');
  
  var labelDiv = $('<div>').addClass('inputLabel');
  labelDiv.append(lbl);
  
  var comboBoxDiv = $('<div>').addClass('inputComboBox');
  
  rowDiv.append(labelDiv);
  rowDiv.append(comboBoxDiv);
  
  this.append(rowDiv);
    
  

  this.kendoComboBox_ = 
      comboBoxDiv.kendoDropDownList( 
        {
          dataTextField: "text",
          dataValueField: "value",
          dataSource: items
        }
      ).data("kendoDropDownList");
      
      
  this.kendoComboBox_.select(1);
  
}


