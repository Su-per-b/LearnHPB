/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Temperature');

goog.require('lgb.view.scenario.BaseViewGUI');
goog.require('lgb.view.scenario.Decimal');


lgb.view.scenario.Temperature = function(dataModel, debugFlag) {
  lgb.view.scenario.Decimal.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.view.scenario.Temperature, lgb.view.scenario.Decimal);







