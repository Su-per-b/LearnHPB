/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.HvacInputGUI');

goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.input.HvacInputGUI = function(dataModel) {
  
  this._TITLE = "HVAC";
  this.layoutID = lgb.Config.LAYOUT_ID.BaseGUI;
  
  lgb.view.input.BaseViewGUI.call(this, dataModel, 'HvacInputGUI');
};
goog.inherits(lgb.view.input.HvacInputGUI, lgb.view.input.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.HvacInputGUI.prototype.init = function() {
  
    this.triggerLocal(e.RequestAddToParentGUI);
};




lgb.view.input.HvacInputGUI.prototype.calculateLayout = function(windowDimensions) {
  
 // var cssStr = "{0}px".format(windowDimensions.h-200);
 // var el = this.getMainElement();
  
 // el.css("height", cssStr);
 // el.css("height", "auto");
  //el.css("overflow", "scroll");
  //el.css("margin-bottom", "100px");

};


lgb.view.input.HvacInputGUI.prototype.inject = function(parentElement) {
  
  
  goog.base(this,  'inject', parentElement);
  
  var el = this.getMainElement();
 // el.css("height", "100%");
  //el.css("overflow", "scroll");
  
  
  
  
  var titleDiv = el.append('<h3>HVAC</h3>');
  
  el.append('<h4>System</h4>');
  
  this.injectTextBox('design room sensible heat gain', '8000');
  this.injectTextBox('Room temp heating set point', '18');
  this.injectTextBox('Outside air dry bulb', '30');
  this.injectTextBox('Supply air temp set point', '15');
  this.injectTextBox('Outside air relative humidity', '30');
  this.injectTextBox('Room temp cooling set point', '24');
  
  
  el.append('<h4>Mixing Box</h4>');
  
  this.injectTextBox('Economizer PI controller integrator time constant', '60');
  this.injectTextBox('Outside air damper min position', '10');
  this.injectTextBox('Economizer enable outside air temp', '24');
  this.injectTextBox('Economizer PI controller P gain', '1');
  
  
  el.append('<h4>Heating Coil</h4>');
  
  this.injectTextBox('heating coil design air side pressure drop', '29');
  this.injectTextBox('Heating coil valve controller P gain', '0.08');
  this.injectTextBox('Heating coil design heating capacity', '37015');
  this.injectTextBox('heating coil design air flow rate', '2');
  this.injectTextBox('Heating coil hot water design flow rate', '1');
  this.injectTextBox('Heating coil valve controller integrator time constant', '60');
  
  
  el.append('<h4>Cooling Coil</h4>');
  
  this.injectTextBox('cooling coil design air flow rate', '2');
  this.injectTextBox('Cooling coil valve controller P gain', '1');
  this.injectTextBox('cooling coil design air side pressure drop', '165');
  this.injectTextBox('Cooling coil chilled water design mass flow rate', '1');
  this.injectTextBox('Cooling coil design cooling capacity', '29454');
  this.injectTextBox('Cooling coil valve controller integrator time constant', '60');

  
  
  
  el.append('<h4>Fan</h4>');
  
  this.injectTextBox('fan volume flow rate at design operating point', '2');
  this.injectTextBox('Fan minimum speed ratio', '30');
  this.injectTextBox('Fan speed controller integrator time constant', '60');
  this.injectTextBox('fan head at design operating point', '461');
  this.injectTextBox('Fan speed controller P gain', '1');
    
    
  el.append('<h4>Vav Box</h4>');
  this.injectTextBox('VAV damper controller integrator time constant', '60');
  this.injectTextBox('VAV reheat coil controller integrator time constant', '60');
  this.injectTextBox('VAV max cooling air flow rate', '2');
  this.injectTextBox('VAV reheat coil air side pressure drop at design condition', '87');
  this.injectTextBox('VAV damper controller P gain', '87');
  this.injectTextBox('VAV air side pressure drop at max cooling', '1');
  this.injectTextBox('VAV min volume flow rate ratio', '3');
  this.injectTextBox('VAV reheat coil controller P gain', '20');
  this.injectTextBox('VAV reheat coil controller P gain', '1');
  this.injectTextBox('Reheat coil design heating capacity', '20,000');
  
  
  el.append('<h4>Boiler</h4>');
  this.injectTextBox('design hot water supply temperature', '82');
  
  el.append('<h4>Chiller</h4>');
  this.injectTextBox('design chilled water supply temperature', '7');
    
  el.append('<h4>Duct </h4>');
  
  this.injectTextBox('Supply duct static pressure set point', '190');

  
};

lgb.view.input.HvacInputGUI.prototype.injectTextBox = function(lbl, defaultText) {
  
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




lgb.view.input.HvacInputGUI.prototype.injectComboBox = function(lbl, textAry, valuesAry, defaultIdx) {
  
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


  