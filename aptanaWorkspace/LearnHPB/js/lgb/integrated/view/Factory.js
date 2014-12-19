goog.provide('lgb.integrated.view.Factory');

goog.require('lgb.core.BaseClass');

goog.require('lgb.integrated.view.System');
goog.require('lgb.integrated.view.SubSystem');
goog.require('lgb.integrated.view.Category');
goog.require('lgb.integrated.view.VariableOption');
goog.require('lgb.integrated.view.VariableBaseNumber');


lgb.integrated.view.Factory = function() {};


lgb.integrated.view.Factory.classModelViewMap_DefinedUnit = {
    "SecondsAfter2000" : lgb.integrated.view.SecondsAfter2000,
    "Temperature" : lgb.integrated.view.VariableBaseNumber
};


lgb.integrated.view.Factory.classModelViewMap = {
    "lgb.integrated.model.System" : lgb.integrated.view.System,
    "lgb.integrated.model.SubSystem" : lgb.integrated.view.SubSystem,
    "lgb.integrated.model.Category" : lgb.integrated.view.Category,
    "lgb.integrated.model.VariableOption" : lgb.integrated.view.VariableOption,
    "lgb.integrated.model.VariableReal" : lgb.integrated.view.VariableBaseNumber,
    "lgb.integrated.model.VariableInteger" : lgb.integrated.view.VariableBaseNumber
};





