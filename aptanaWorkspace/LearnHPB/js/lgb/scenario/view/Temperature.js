/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Temperature');

goog.require('lgb.scenario.view.BaseViewGUI');
goog.require('lgb.scenario.view.Decimal');


lgb.scenario.view.Temperature = function(dataModel, debugFlag) {
  lgb.scenario.view.Decimal.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.scenario.view.Temperature, lgb.scenario.view.Decimal);







