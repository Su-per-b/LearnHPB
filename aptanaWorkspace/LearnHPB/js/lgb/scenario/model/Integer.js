/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Integer');
goog.require('lgb.scenario.model.NodeBase');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Integer = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Integer, lgb.scenario.model.NodeBase);




lgb.scenario.model.Integer.prototype.setPropertyDefaults_ = function() {
  
  var propertyDefaultsObject = this.getPropertyDefaults();
  
  this.setPropertyInt_('min', propertyDefaultsObject.min);
  this.setPropertyInt_('max', propertyDefaultsObject.max);
  this.setPropertyInt_('dflt', propertyDefaultsObject.dflt);
  
};



lgb.scenario.model.Integer.prototype.parseXmlNode_ = function() {
  
  this.setNameAndAbbr_();
  this.setPropertyDefaults_();

};

lgb.scenario.model.Integer.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        min:0,
        max:999,
        dflt:1
    };
    
    return propertyDefaults;
};

