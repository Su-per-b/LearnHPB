/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.VariableNumber');

goog.require('lgb.integrated.view.VariableBase');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.VariableNumber = function(variableReference, debugFlag) {
  
  var varibleName = variableReference.name;
  var integratedController = lgb.integrated.controller.IntegratedController.getInstance();
  var dataModel = integratedController.getVariableByName(varibleName);
      
  lgb.integrated.view.VariableBase.call(this, dataModel, debugFlag);

};
goog.inherits(lgb.integrated.view.VariableNumber, lgb.integrated.view.VariableBase);






lgb.integrated.view.VariableNumber.prototype.bind_ = function() {
    
    var changeCallbackDelegate = this.d(this.onChange_value_);
    this.dataModel.setChangeCallback(changeCallbackDelegate);
    
    return;
    
};


lgb.integrated.view.VariableNumber.prototype.onChange_value_ = function(value) {
    
    var theValue = value.getDisplayString();
    this.inputElement_.val(theValue);
    
};


lgb.integrated.view.VariableNumber.prototype.appendTo = function(parentElement) {

	if (null == this.dataModel.modelicaName || "" == this.dataModel.modelicaName) {
		this.isEnabled = false;
	} else {
		this.isEnabled = true;
	}

	this.injectInto(parentElement);
	this.children_ = [];

	if (this.debugFlag_) {

		this.debugProperties_();
		// this.append('type : VariableReal <br />');
		// this.appendDebugProperty_('min');
		// this.appendDebugProperty_('max');
		// this.appendDebugProperty_('start');

	} else {

		var txt = "{0} ({1})".format(this.dataModel.description, this.dataModel.name);

		this.label_.text(txt);

        var start = this.dataModel.value.getDisplayString();
            
		this.inputElement_ = $('<input>')
    		.addClass('input-Integer-textbox')
    		.attr("type", "text")
    		.attr("size", "6")
    		.attr("maxlength", "10")
    		.attr("value", start);


		this.append(this.inputElement_);

		this.unitElement_ = $('<span>');
		this.setUnitAndRange_();

		this.append(this.unitElement_);
		this.inputElement_.blur(this.d(this.onGuiValueChanged_));

	}


  this.bind_();
};



lgb.integrated.view.VariableNumber.prototype.onGuiValueChanged_ = function(event) {
    
    var newValueDisplayStr = this.inputElement_.val();
    var newValueDisplay = parseFloat(newValueDisplayStr);

    
     var newPayload = {
       integratedVariable : this.dataModel,
       newValueDisplay : newValueDisplay
     };
         
         
    this.triggerLocal(e.RequestIntegratedVariableChange, newPayload);
        
        
    // var newValueInternal = parseFloat(newValueStr);
// 
	// var newValueStr = this.inputElement_.val();
	// var isNewValue = this.dataModel.isNewValue(newValueStr);
// 	
	// //var currentValueStr = this.dataModel.value.getDisplayString();
// 	
// 	
	// if (isNewValue) {
// 	    
         // var newValueInternal = parseFloat(newValueStr);
//     
         // // var newPayload = {
           // // idx : this.dataModel.getIdx(),
           // // value : newValueInternal
         // // };
//         
//     
//     
        // //this.triggerLocal(se.RequestSimulationVariableChange, newPayload);
        // this.triggerLocal(se.RequestIntegratedVariableChange, newPayload);
	// }
// 
// 
	// return;

    
};



lgb.integrated.view.VariableNumber.prototype.changeDisplayUnitSystem = function() {

    this.setUnitAndRange_();
    this.setValue_();
};



lgb.integrated.view.VariableNumber.prototype.setValue_ = function() {

    var theValue = this.dataModel.value.getDisplayString();
    this.inputElement_.val(theValue);

};



lgb.integrated.view.VariableNumber.prototype.setUnitAndRange_ = function() {

      var unitString = this.dataModel.getUnitDisplaySymbol();
      var min = this.dataModel.min.getDisplayString();
      var max = this.dataModel.max.getDisplayString();
      
      if (null == unitString) {
        var html = "({0} to {1})".format( min, max);
      } else {
        var html = "{0} ({1} to {2})".format(unitString, min, max);
      }
      
      this.unitElement_.html(html);
};






lgb.integrated.view.VariableNumber.showIcontentPopup = function(name) {
  
  
    var url = "info-pages/iv-{0}.html".format(name);
    
    var newWindow=window.open(url,'name','height=600,width=450');
    
    if (window.focus) {
      newWindow.focus();
    }

    return false;
};




lgb.integrated.view.VariableNumber.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    
    var li = $('<li>');

    var divMore = $('<div>');
    divMore.addClass('more');
    
    var name = this.dataModel.name;
    var tooltip = 'Show info page for the variable: {0}'.format(name);
    
    var tag = '<a href="#" class="info" title="{0}"' +
    ' onclick="return lgb.integrated.view.VariableNumber.showIcontentPopup (\'{1}\');"' +
    '></a>';
    
    tag = tag.format(tooltip, name);
    divMore.append (tag);
    
    if ("parameter" == this.dataModel.variability) {
      divMore.append ('<a href="#" class="param"></a>');  
    } else {
      divMore.append ('<a href="#" class="param disabled"></a>');  
    }
    
    li.append(divMore);
    this.label_ = $('<label for="textfield">');
    li.append(this.label_);
    
    this.mainElement_ = li;
    
    if (undefined != this.htmlID) {
      this.mainElement_.attr('id', this.htmlID);
    }

  }

  return this.mainElement_;
};




lgb.integrated.view.VariableNumber.prototype.injectDebugContent = function() {

  this.makeChildren_($("div"));
  
};


