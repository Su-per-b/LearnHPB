goog.provide('lgb.simulation.model.voClient.MergedVariableOptionList');

goog.require('lgb.simulation.model.BaseModel');

goog.require('lgb.simulation.model.unit.ElectricalPower');
goog.require('lgb.simulation.model.unit.Utils');
goog.require('lgb.simulation.model.voClient.MergedVariableBase');
goog.require('lgb.scenario.model.OptionList');
goog.require('lgb.scenario.model.Option');

 /**
 * @constructor
 */
lgb.simulation.model.voClient.MergedVariableOptionList = function() {
    
    this.displayUnitSystem_ = lgb.simulation.model.DisplayUnitSystem.getInstance();
    
    this.value_internal = null;
    this.value_display = null;
    this.value_displayString = "{not set}";
    
    this.value_displayStringList = [];
    this.value_internalList = [];
    
    this.value_default = null;
    
    this.internalValue = null;
    
    this.name_simulation = "{not set}";
    this.name_scenario = "{not set}";
    
    this.unit_internal = "{not set}"; 
    this.unit_display = "{not set}"; 
    this.unit_object = null; 
    
};
goog.inherits(lgb.simulation.model.voClient.MergedVariableOptionList, lgb.simulation.model.voClient.MergedVariableBase);




lgb.simulation.model.voClient.MergedVariableOptionList.prototype.setScalarVariableReal = function(scalarVariableReal) {
    
    this.scalarVariableReal_ = scalarVariableReal;
    
};


lgb.simulation.model.voClient.MergedVariableOptionList.prototype.setScenarioVariable = function(scenarioVariable) {
    
    this.scenarioVariable_ = scenarioVariable;
    
    this.name_simulation = scenarioVariable.modName;
    this.name_scenario = scenarioVariable.abbr;
    
    this.description = scenarioVariable.name;
    
    this.setUnit_(scenarioVariable.unit);
    
    
    var children = scenarioVariable.getChildren();
    var child = children[0];
    
    if (child instanceof lgb.scenario.model.OptionList) {
        this.children_ = child.getChildren();
        
        
        
        
    } else {
        debugger;
    }
    
    
    
    //this.value_default = child.dflt;
    
    //this.updateValue(this.value_default);
    
    
    return;
    
    
};





lgb.simulation.model.voClient.MergedVariableOptionList.prototype.setUnit_ = function(unitString) {
    
    
    this.unit_internal = unitString; 
    
    this.unit_object = lgb.simulation.model.unit.Utils.makeUnitFromString(unitString);
    
    
    

};





lgb.simulation.model.voClient.MergedVariableOptionList.prototype.setInternalUnit_ = function(unitString) {
    
    this.unit_internal = unitString; 
    lgb.simulation.model.voClient.MergedVariableOptionList.makeUnitFromString(unitString);

};


lgb.simulation.model.voClient.MergedVariableOptionList.prototype.getIdx = function(sVal) {
    
    return this.idx_;
};


lgb.simulation.model.voClient.MergedVariableOptionList.prototype.updateValue = function(value) {
    
    this.value_internalList.push(value);
    this.value_internal = value;
    
    this.calcValue_display_();
};


lgb.simulation.model.voClient.MergedVariableOptionList.prototype.calcValue_display_ = function() {
    
    this.value_display = this.value_internal;
    
    
    if(undefined == this.value_display) {
        debugger;
    }
    
    
    if (this.value_display.toFixed) {
        this.value_displayString = this.value_display.toFixed(2);
        this.value_displayStringList.push(this.value_displayString);
    }else {
        debugger;
    }


};



lgb.simulation.model.voClient.MergedVariableOptionList.prototype.update = function(sVal) {
    debugger;
    this.value_internalList.push(sVal.value_);
    this.value_internal = sVal.value_;
    
    this.calcValue_display_();
};



lgb.simulation.model.voClient.MergedVariableOptionList.prototype.getValue = function(sVal) {
    
    var len = this.value_internalList.length;
    return this.value_internalList[len-1];
    
};




lgb.simulation.model.voClient.MergedVariableOptionList.prototype.updateDisplayUnitSystem = function() {
    
    this.value_display = this.internalValue;
    debugger; //should override
};


