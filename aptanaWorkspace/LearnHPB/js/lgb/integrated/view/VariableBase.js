/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.VariableBase');

goog.require('lgb.integrated.view.NodeBaseLeaf');
goog.require('goog.events.Event');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.VariableBase = function(dataModel, debugFlag) {
      
  lgb.integrated.view.NodeBaseLeaf.call(this, dataModel, debugFlag);
  
};
goog.inherits(lgb.integrated.view.VariableBase, lgb.integrated.view.NodeBaseLeaf);




lgb.integrated.view.VariableBase.prototype.instantiateViewForModel_ = function(dataModel) {
    
    
    //var ownClass = this.getClassConstructor();
    var map = lgb.integrated.model.Factory.classModelViewMap;
      
    var fullClassName = dataModel.getFullClassName();
    var classReference;
    
    if ( map.hasOwnProperty(fullClassName)  ) {
        classReference = map[fullClassName];
        
        if (null == classReference) {
            debugger;
            return null;
        } else {
            goog.asserts.assertFunction(classReference);
            
            var destObj = new classReference(dataModel);
            return destObj;
        }

    } else {
        lgb.logSevere('no view for model: ' + fullClassName);
    }
    
 
};



lgb.integrated.view.VariableBase.prototype.bind_ = function() {
    
    var changeCallbackDelegate = this.d(this.onChange_value_);
    this.dataModel.setChangeCallback(changeCallbackDelegate);
    
    return;
    
};


lgb.integrated.view.VariableBase.prototype.onChange_value_ = function(value) {
    
    var theValue = value.getDisplayString();
    this.inputElement_.val(theValue);
    
};


lgb.integrated.view.VariableBase.prototype.appendTo = function(parentElement) {
    
    
    if (null == this.dataModel.scalarVariableName || "" == this.dataModel.scalarVariableName) {
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

        var start = this.dataModel.typeSpec.value.getDisplayString();
            
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



lgb.integrated.view.VariableBase.prototype.onGuiValueChanged_ = function(event) {
    

    var newValueStr = this.inputElement_.val();
    var newValueFloat = parseFloat(newValueStr);
    
    var currentValueFloat = this.dataModel.typeSpec.value.getDisplayValue();
    
    
    if (newValueFloat != currentValueFloat) {
        
        var newValueInternal = this.dataModel.unit.convertDisplayToInternalValue(newValueFloat);
    
         var newPayload = {
           idx : this.dataModel.getIdx(),
           value : newValueInternal
         };
        
    
        this.triggerLocal(se.RequestSimulationVariableChange, newPayload);
    }


    return;

    
};



lgb.integrated.view.VariableBase.prototype.changeDisplayUnitSystem = function() {

    this.setUnitAndRange_();
    this.setValue_();
};



lgb.integrated.view.VariableBase.prototype.setValue_ = function() {

    var theValue = this.dataModel.typeSpec.value.getDisplayString();
    this.inputElement_.val(theValue);

};



lgb.integrated.view.VariableBase.prototype.setUnitAndRange_ = function() {

      var unitString = this.dataModel.getUnitDisplaySymbol();
      var min = this.dataModel.typeSpec.min.getDisplayString();
      var max = this.dataModel.typeSpec.max.getDisplayString();
      
      if (null == unitString) {
        var html = "({0} to {1})".format( min, max);
      } else {
        var html = "{0} ({1} to {2})".format(unitString, min, max);
      }
      
      this.unitElement_.html(html);
};






lgb.integrated.view.VariableBase.showIcontentPopup = function(name) {
  
  
    var url = "info-pages/iv-{0}.html".format(name);
    
    var newWindow=window.open(url,'name','height=600,width=450');
    
    if (window.focus) {
      newWindow.focus();
    }

    return false;
};




lgb.integrated.view.VariableBase.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    
    var li = $('<li>');

    var divMore = $('<div>');
    divMore.addClass('more');
    
    var name = this.dataModel.name;
    var tooltip = 'Show info page for the variable: {0}'.format(name);
    
    var tag = '<a href="#" class="info" title="{0}"' +
    ' onclick="return lgb.integrated.view.VariableBase.showIcontentPopup (\'{1}\');"' +
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




lgb.integrated.view.VariableBase.prototype.injectDebugContent = function() {

  this.makeChildren_($("div"));
  
};

