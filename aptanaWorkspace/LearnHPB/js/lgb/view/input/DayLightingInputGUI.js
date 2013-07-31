/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.DayLightingInputGUI');

goog.require('lgb.view.BaseViewGUI');



/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.input.DayLightingInputGUI = function(dataModel) {
  
  this._TITLE = "Day Lighting";
  this.layoutID = lgb.Config.LAYOUT_ID.BaseGUI;
  
  lgb.view.BaseViewGUI.call(this, dataModel, 'DayLightingInputGUI');
};
goog.inherits(lgb.view.input.DayLightingInputGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.DayLightingInputGUI.prototype.init = function() {
  
    this.triggerLocal(e.RequestAddToParentGUI);
};




lgb.view.input.DayLightingInputGUI.prototype.bind_ = function() {
  


      
}


lgb.view.input.DayLightingInputGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  var el = this.getMainElement();
  var titleDiv = el.append('<h3>Day Lighting</h3>');
  
  el.append('<h4>Zones</h4>');
  
  this.injectCheckBox("");
  this.injectCheckBox("");
  this.injectCheckBox("");
  
 
  el.append('<h4>Ltg Controls</h4>');
  
  ary = ['1', '2','3', '4', '5'];
  this.injectComboBox('Scheduling', ary, null, 0);

  var ary = ['1', '2','3', '4', '5'];
  this.injectComboBox('Occupancy', ary, null, 0);


  ary = ['1', '2','3', '4', '5'];
  this.injectComboBox('Daylighting', ary, null, 0);
  
  
  el.append('<h4>Form / orientation</h4>');
  
  el.append('<h5>Sidelighting</h5>');
  
  ary = ['1', '2','3', '4', '5'];
  this.injectComboBox('Bldg Aspect Ratio', ary, null, 0);

  ary = ['1', '2','3', '4', '5'];
  this.injectComboBox('Sidelighting - N/S', ary, null, 0);

  ary = ['1', '2','3', '4', '5'];
  this.injectComboBox('Sidelighting - E/W', ary, null, 0);
  
  
  el.append('<h5>Toplighting</h5>');
  
  ary = ['1', '2','3', '4', '5'];
  this.injectComboBox('Skylights', ary, null, 0);

  
  
  el.append('<h4>Apertures</h4>');
  el.append('<h4>int. Surfaces</h4>');
  el.append('<h4>Furniture</h4>');
  
};

lgb.view.input.DayLightingInputGUI.prototype.injectCheckBoxAll = function() {
  
}


lgb.view.input.DayLightingInputGUI.prototype.injectCheckBox = function(lbl, defaultText) {
  
  var el = this.getMainElement();
 
  var rowDiv = $('<div>').addClass('inputRow');
  
  var labelDiv = $('<div>').addClass('inputLabel');
  labelDiv.append(lbl);
  
  var textDiv = $('<div>').addClass('inputText');
  
  rowDiv.append(labelDiv);
  rowDiv.append(textDiv);
  
  this.append(rowDiv);
  
  var textBox1 = $('<input>');
  textBox1.attr( "type", "checkbox" );
  textDiv.append(textBox1);
  
  var textBox2 = $('<input>');
  textBox2.attr( "type", "checkbox" );
  textDiv.append(textBox2);
  
  var textBox3 = $('<input>');
  textBox3.attr( "type", "checkbox" );
  textDiv.append(textBox3);
  
};



lgb.view.input.DayLightingInputGUI.prototype.injectTextBox = function(lbl, defaultText) {
  
  var el = this.getMainElement();
 
  var rowDiv = $('<div>').addClass('inputRow');
  
  var labelDiv = $('<div>').addClass('inputLabel');
  labelDiv.append(lbl);
  
  var textDiv = $('<div>').addClass('inputText');
  
  rowDiv.append(labelDiv);
  rowDiv.append(textDiv);
  
  this.append(rowDiv);
  
  var textBox = $('<input>');
  
  textBox.attr( "type", "text" );
  textBox.attr( "value", defaultText );
  textBox.css( "width", "38px" );
  textBox.css( "font-size", "9pt" );
  
  textDiv.append(textBox);
  
};




lgb.view.input.DayLightingInputGUI.prototype.injectComboBox = function(lbl, textAry, valuesAry, defaultIdx) {
  
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


  