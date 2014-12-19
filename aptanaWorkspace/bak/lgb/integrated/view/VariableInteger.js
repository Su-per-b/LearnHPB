/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.VariableInteger');

goog.require('lgb.integrated.view.Variable');



/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.VariableInteger = function(dataModel, debugFlag) {
  lgb.integrated.view.Variable.call(this, dataModel, debugFlag);
  
  lgb.integrated.view.VariableInteger.variablesList.push(this);
  
  if(this.dataModel.modelicaName) {
    lgb.integrated.view.VariableInteger.variablesMap[this.dataModel.modelicaName] = this;
  }

  
};
goog.inherits(lgb.integrated.view.VariableInteger, lgb.integrated.view.Variable);



lgb.integrated.view.VariableInteger.prototype.appendTo = function(parentElement) {

	if (null == this.dataModel.modelicaName || "" == this.dataModel.modelicaName) {
		this.isEnabled = false;
	} else {
		this.isEnabled = true;
	}

	this.injectInto(parentElement);
	this.children_ = [];

	if (this.debugFlag_) {

		this.debugProperties_();
		// this.append('type : VariableInteger <br />');
		// this.appendDebugProperty_('min');
		// this.appendDebugProperty_('max');
		// this.appendDebugProperty_('start');

	} else {

		var txt = "{0} ({1})".format(this.dataModel.name, this.dataModel.name);

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
		this.inputElement_.blur(this.d(this.onblur_));

	}

  
};




lgb.integrated.view.VariableInteger.prototype.changeDisplayUnitSystem = function() {

    this.setUnitAndRange_();
    this.setValue_();
};



lgb.integrated.view.VariableInteger.prototype.setValue_ = function() {

    var theValue = this.dataModel.value.getDisplayString();
    this.inputElement_.val(theValue);

};



lgb.integrated.view.VariableInteger.prototype.setUnitAndRange_ = function() {

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





lgb.integrated.view.VariableInteger.prototype.onGuiValueChanged_ = function(event) {

 var newPayload = {
   modelicaName : this.dataModel.modelicaName,
   value : event.payload
 };
 
 this.triggerLocal(se.RequestSimulationVariableChange, newPayload);
  

};



lgb.integrated.view.VariableInteger.showIcontentPopup = function(abbr) {
  
  
    var url = "info-pages/iv-{0}.html".format(name);
    
    var newWindow=window.open(url,'name','height=600,width=450');
    
    if (window.focus) {
      newWindow.focus();
    }

    return false;
};




lgb.integrated.view.VariableInteger.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    
    var li = $('<li>');

    var divMore = $('<div>');
    divMore.addClass('more');
    
    var name = this.dataModel.name;
    var tooltip = 'Show info page for the variable: {0}'.format(name);
    
    var tag = '<a href="#" class="info" title="{0}"' +
    ' onclick="return lgb.integrated.view.VariableInteger.showIcontentPopup (\'{1}\');"' +
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




lgb.integrated.view.VariableInteger.prototype.injectDebugContent = function() {

  this.makeChildren_($("div"));
  
};



lgb.integrated.view.VariableInteger.variablesList = [];
lgb.integrated.view.VariableInteger.variablesMap = {};
