/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.attribute.String');




lgb.scenario.model.attribute.String.getValue = function(strValue, attributeInfo) {
    
    if (null == strValue) {
        if (true == attributeInfo.isRequired) {
            debugger;
        } else {
            
            if (undefined == attributeInfo.defaultValue) {
                return lgb.scenario.model.attribute.String.defaultValue;
            } else {
                return attributeInfo.defaultValue;
            }
        }
    } else {
        return String(strValue);
    }
    
};


lgb.scenario.model.attribute.String.defaultValue = "";
