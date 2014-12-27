/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.ComponentDateAndTime');
goog.require('lgb.scenario.model.tag.NodeBase');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.ComponentDateAndTime = function(node) {
    
  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.ComponentDateAndTime, lgb.scenario.model.tag.NodeBase);




lgb.scenario.model.ComponentDateAndTime.prototype.parseXmlNode_ = function() {
  

  var propertyDefaults = this.getPropertyDefaults();
  this.setPropertyInt_('secondsAfter2000', propertyDefaults.secondsAfter2000);
  
  return;
};




lgb.scenario.model.ComponentDateAndTime.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        secondsAfter2000:1
    };
    
    return propertyDefaults;
};


