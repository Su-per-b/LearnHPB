/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.VariableReal');

goog.require('lgb.integrated.view.Variable');



/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.VariableReal = function(dataModel, debugFlag) {
  lgb.integrated.view.Variable.call(this, dataModel, debugFlag);

};
goog.inherits(lgb.integrated.view.VariableReal, lgb.integrated.view.Variable);






lgb.integrated.view.VariableReal.prototype.bind_ = function() {
    
    var changeCallbackDelegate = this.d(this.onChange_value_);
    this.dataModel.setChangeCallback(changeCallbackDelegate);
    
    return;
    
};


lgb.integrated.view.VariableReal.prototype.onChange_value_ = function(value) {
    
    var theValue = value.getDisplayString();
    this.inputElement_.val(theValue);
    
};


lgb.integrated.view.VariableReal.prototype.appendTo = function(parentElement) {

	if (null == this.dataModel.modName || "" == this.dataModel.modName) {
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
		// this.appendDebugProperty_('dflt');

	} else {

		var txt = "{0} ({1})".format(this.dataModel.name, this.dataModel.name_scenario);

		this.label_.text(txt);

        var dflt = this.dataModel.value.getDisplayString();
            
		this.inputElement_ = $('<input>')
    		.addClass('input-Integer-textbox')
    		.attr("type", "text")
    		.attr("size", "6")
    		.attr("maxlength", "10")
    		.attr("value", dflt);


		this.append(this.inputElement_);

		this.unitElement_ = $('<span>');
		this.setUnitAndRange_();

		this.append(this.unitElement_);
		this.inputElement_.blur(this.d(this.onblur_));

	}


  this.bind_();
};




lgb.integrated.view.VariableReal.prototype.changeDisplayUnitSystem = function() {

    this.setUnitAndRange_();
    this.setValue_();
};



lgb.integrated.view.VariableReal.prototype.setValue_ = function() {

    var theValue = this.dataModel.value.getDisplayString();
    this.inputElement_.val(theValue);

};



lgb.integrated.view.VariableReal.prototype.setUnitAndRange_ = function() {

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





lgb.integrated.view.VariableReal.prototype.onGuiValueChanged_ = function(event) {

 var newPayload = {
   modName : this.dataModel.modName,
   value : event.payload
 };
 
 this.triggerLocal(se.RequestModelicaVariableChange, newPayload);
  

};



lgb.integrated.view.VariableReal.showIcontentPopup = function(name_scenario) {
  
  
    var url = "info-pages/iv-{0}.html".format(name_scenario);
    
    var newWindow=window.open(url,'name','height=600,width=450');
    
    if (window.focus) {
      newWindow.focus();
    }

    return false;
};




lgb.integrated.view.VariableReal.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    
    var li = $('<li>');

    var divMore = $('<div>');
    divMore.addClass('more');
    
    var name_scenario = this.dataModel.name_scenario;
    var tooltip = 'Show info page for the variable: {0}'.format(name_scenario);
    
    var tag = '<a href="#" class="info" title="{0}"' +
    ' onclick="return lgb.integrated.view.VariableReal.showIcontentPopup (\'{1}\');"' +
    '></a>';
    
    tag = tag.format(tooltip, name_scenario);
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




lgb.integrated.view.VariableReal.prototype.injectDebugContent = function() {

  this.makeChildren_($("div"));
  
};


