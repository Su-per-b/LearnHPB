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
       
  this.injectTo(parentElement);
  
  this.childList_ = [];
  
  if (this.debugFlag_) {
    
    this.debugProperties_();
    this.makeChildren_(this.getMainElement());
    
  } 
  else {
  
    var html = "{0} ({1}) - {2}".format(this.dataModel.name, this.dataModel.abbr, this.dataModel.modName);
    this.append(html);
    
    

      var el = this.getMainElement();
      this.makeChildren_(el);
      
      
      if (null != this.dataModel.unit) {
        var c = el.children();
        c.append(' ' + this.dataModel.unit);
      }



    }
  
};


lgb.scenario.view.Variable.prototype.appendChildTo_ = function(childNode, parentElement) {
  

  var childClassName = childNode.getClassName();


  if ("description" == childClassName) {
    
    
  } else {

    var classConstructor = this.getClassConstructor();
    var childClassConstructor = classConstructor.childClassMap[childClassName];
    
    if(childClassConstructor) {
      var child = new childClassConstructor(childNode, this.debugFlag_);
      
      
      this.listenTo(child, e.GuiValueChanged, this.onGuiValueChanged_);
      child.setEnabled(this.isEnabled);
              
      
      this.childList_.push(child);
      
      
      child.appendTo(parentElement);
      
    } else {
      debugger;
    }
  }
  
};



lgb.scenario.view.Variable.prototype.onGuiValueChanged_ = function(event) {

  //this.triggerLocal(e.RequestModelicaVariableChange, event.payload);
  
 // var struct = new lgb.simulation.model.voNative.ScalarValueRealStruct(event.getPayload());
 
 var newPayload = {
   modName : this.dataModel.modName,
   value : event.payload,
 };
 

  var event = new lgb.core.Event(e.RequestModelicaVariableChange, newPayload);
  goog.events.dispatchEvent(lgb.globalEventBus, event);
  
  return;
};



lgb.scenario.view.Variable.prototype.injectDebugContent = function() {

  this.makeChildren_(div);
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
