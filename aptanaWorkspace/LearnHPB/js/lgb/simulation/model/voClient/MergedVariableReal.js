goog.provide('lgb.simulation.model.voClient.MergedVariableReal');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.unit.ElectricalPower');
goog.require('lgb.simulation.model.unit.Utils');
goog.require('lgb.simulation.model.voClient.MergedVariableBase');


 /**
 * @constructor
 */
lgb.simulation.model.voClient.MergedVariableReal = function() {
    
    this.displayUnitSystem_ = lgb.simulation.model.DisplayUnitSystem.getInstance();
    
    this.value_internal = null;
    this.value_display = null;
    this.value_displayString = "{not set}";
    
    this.value_displayStringList = [];
    this.value_internalList = [];
    
    
    this.value_default = null;
    this.value_min = null;
    this.value_max = null;
    
    this.internalValue = null;
    
    this.name_simulation = "{not set}";
    this.name_scenario = "{not set}";
    
    this.unit_internal = "{not set}"; 
    this.unit_display = "{not set}"; 
    this.unit_object = null; 
    
};
goog.inherits(lgb.simulation.model.voClient.MergedVariableReal, lgb.simulation.model.voClient.MergedVariableBase);




lgb.simulation.model.voClient.MergedVariableReal.prototype.setScalarVariableReal = function(scalarVariableReal) {
    
    this.scalarVariableReal_ = scalarVariableReal;
    
};


lgb.simulation.model.voClient.MergedVariableReal.prototype.setScenarioVariable = function(scenarioVariable) {
    
    this.scenarioVariable_ = scenarioVariable;
    
    this.name_simulation = scenarioVariable.modName;
    this.name_scenario = scenarioVariable.abbr;
    
    this.description = scenarioVariable.name;
    
    this.setUnit_(scenarioVariable.unit);
    
    
    var children = scenarioVariable.getChildren();
    var child = children[0];
    
    this.value_min = child.min;
    this.value_max = child.max;
    this.value_default = child.dflt;
    
    
    this.updateValue(this.value_default);
    
    
    return;
    
    
};





lgb.simulation.model.voClient.MergedVariableReal.prototype.setUnit_ = function(unitString) {
    
    
    this.unit_internal = unitString; 
    
    this.unit_object = lgb.simulation.model.unit.Utils.makeUnitFromString(unitString);
    
    
    

};





lgb.simulation.model.voClient.MergedVariableReal.prototype.setInternalUnit_ = function(unitString) {
    
    this.unit_internal = unitString; 
    lgb.simulation.model.voClient.MergedVariableReal.makeUnitFromString(unitString);

};


lgb.simulation.model.voClient.MergedVariableReal.prototype.getIdx = function(sVal) {
    
    return this.idx_;
};


lgb.simulation.model.voClient.MergedVariableReal.prototype.updateValue = function(value) {
    
    this.value_internalList.push(value);
    this.value_internal = value;
    
    this.calcValue_display_();
};


lgb.simulation.model.voClient.MergedVariableReal.prototype.calcValue_display_ = function() {
    
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



lgb.simulation.model.voClient.MergedVariableReal.prototype.update = function(sVal) {
    debugger;
    this.value_internalList.push(sVal.value_);
    this.value_internal = sVal.value_;
    
    this.calcValue_display_();
};



lgb.simulation.model.voClient.MergedVariableReal.prototype.getValue = function(sVal) {
    
    var len = this.value_internalList.length;
    return this.value_internalList[len-1];
    
};




lgb.simulation.model.voClient.MergedVariableReal.prototype.updateDisplayUnitSystem = function() {
    
    this.value_display = this.internalValue;
    debugger; //should override
};


