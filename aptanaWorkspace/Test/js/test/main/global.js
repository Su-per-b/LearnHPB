goog.provide('test.serialization.main.global');

goog.require('lgb');
goog.require('lgb.simulation.model.voNative.ConfigStruct');
goog.require('lgb.simulation.model.voManaged.ScalarValueReal');
goog.require('lgb.simulation.events.BaseEvent');
goog.require('se.Event');
goog.require('test.main.Util');


window.voNative = lgb.simulation.model.voNative;
window.voManaged = lgb.simulation.model.voManaged;
window.simEvents = lgb.simulation.events;
window.CONSTANTS = test.main.CONSTANTS;
window.Util = test.main.Util;

window.SessionControlAction = lgb.simulation.model.voManaged.SessionControlAction;
window.Enu = lgb.simulation.model.voNative.Enu.ENUM;

