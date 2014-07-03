/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Variable');

goog.require('lgb.scenario.view.BaseView');
goog.require('lgb.scenario.view.Integer');
goog.require('lgb.scenario.view.OptionList');
goog.require('lgb.scenario.view.Decimal');
goog.require('lgb.scenario.view.Boolean');
goog.require('lgb.scenario.view.Temperature');
//goog.require('lgb.simulation.model.voNative.ScalarValueRealStruct');

goog.require('goog.events.Event');


/**
 * @constructor
 * @extends {lgb.scenario.view.BaseView}
 */
lgb.scenario.view.Variable = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
  
  lgb.scenario.view.Variable.variablesList.push(this);
  
  if(this.dataModel.modName) {
    lgb.scenario.view.Variable.variablesMap[this.dataModel.modName] = this;
  }

  
};
goog.inherits(lgb.scenario.view.Variable, lgb.scenario.view.BaseView);



lgb.scenario.view.Variable.prototype.appendTo = function(parentElement) {
    
   if (null == this.dataModel.modName || "" == this.dataModel.modName) {
     this.isEnabled = false;
   } else {
     this.isEnabled = true;
   }
       
  this.injectInto(parentElement);
  
  this.childList_ = [];
  
  if (this.debugFlag_) {
    
    this.debugProperties_();
    this.makeChildren_(this.getMainElement());
    
  } 
  else {
  
     var txt = "{0} ({1})".format(this.dataModel.name, this.dataModel.abbr);
    
      this.label_.text(txt);

      var el = this.getMainElement();
      this.makeChildrenAndListen_(el);
      
    }
  
};




lgb.scenario.view.Variable.prototype.appendChildToAndListen_ = function(childNode, parentElement) {
  

  var childClassName = childNode.getClassName();
  goog.asserts.assert("description" != childClassName);
  
  var classConstructor = this.getClassConstructor();
  goog.asserts.assertFunction(classConstructor);
  
  var childClassConstructor = classConstructor.childClassMap[childClassName];
  goog.asserts.assertFunction(childClassConstructor);
  

  var child = new childClassConstructor(childNode, this.debugFlag_);
  goog.asserts.assertInstanceof(child, childClassConstructor);
    
    
    

    
    
  this.listenTo(child, e.GuiValueChanged, this.onGuiValueChanged_);
  
  child.appendTo(parentElement);
      
    
  if ("parameter" == this.dataModel.variability) {
    
    child.setEnabled(false);
  
  }
  
};


lgb.scenario.view.Variable.prototype.onGuiValueChanged_ = function(event) {

 var newPayload = {
   modName : this.dataModel.modName,
   value : event.payload
 };
 
 this.triggerLocal(se.RequestModelicaVariableChange, newPayload);
  

};



lgb.scenario.view.Variable.showIcontentPopup = function(abbr) {
  
  
    var url = "info-pages/iv-{0}.html".format(abbr);
    
    var newWindow=window.open(url,'name','height=600,width=450');
    
    if (window.focus) {
      newWindow.focus();
    }

    return false;
};




lgb.scenario.view.Variable.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    
    var li = $('<li>');

    var divMore = $('<div>');
    divMore.addClass('more');
    
    var abbr = this.dataModel.abbr;
    var tooltip = 'Show info page for the variable: {0}'.format(abbr);
    
    var tag = '<a href="#" class="info" title="{0}"' +
    ' onclick="return lgb.scenario.view.Variable.showIcontentPopup (\'{1}\');"' +
    '></a>';
    
    
    tag = tag.format(tooltip, abbr);


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









lgb.scenario.view.Variable.prototype.injectDebugContent = function() {

  this.makeChildren_($("div"));
  
};


lgb.scenario.view.Variable.prototype.debugProperties_ = function() {
  
  this.appendDebugProperty_('name');
  this.appendDebugProperty_('abbr');
  this.appendDebugProperty_('scope');
  this.appendDebugProperty_('phase');
  this.appendDebugProperty_('variability');
  this.appendDebugProperty_('unit');
  this.appendDebugProperty_('modName');
  
};



lgb.scenario.view.Variable.childClassMap = {
    "Integer" : lgb.scenario.view.Integer,
    "OptionList" : lgb.scenario.view.OptionList,
    "Decimal" : lgb.scenario.view.Decimal,
    "Boolean" : lgb.scenario.view.Boolean,
    "Temperature" : lgb.scenario.view.Temperature
};


lgb.scenario.view.Variable.variablesList = [];
lgb.scenario.view.Variable.variablesMap = {};
