/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Option');
goog.require('lgb.scenario.model.NodeBase');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Option = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Option, lgb.scenario.model.NodeBase);



lgb.scenario.model.Option.prototype.parseXmlNode_ = function() {
    
  var propertyDefaults = this.getPropertyDefaults();
  this.setPropertyDefaults_();
  
};



lgb.scenario.model.Option.prototype.setPropertyDefaults_ = function() {
    
  var propertyDefaultsObject = this.getPropertyDefaults();
  
  this.setPropertyStr_('name', propertyDefaultsObject.name);
  this.setPropertyStr_('description', propertyDefaultsObject.description);
  this.setPropertyBool_('dflt', propertyDefaultsObject.dflt);
  this.setPropertyBool_('disabled', propertyDefaultsObject.disabled);
  
};

lgb.scenario.model.Option.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        name:"{name not set}",
        description:"{description not set}",
        dflt:false,
        disabled:false
    };
    
    return propertyDefaults;
};


