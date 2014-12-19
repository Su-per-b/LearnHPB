/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.vo.Option');
goog.require('lgb.scenario.model.tag.NodeBase');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.vo.Option = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.vo.Option, lgb.scenario.model.tag.NodeBase);



lgb.scenario.model.vo.Option.prototype.parseXmlNode_ = function() {
    
  var propertyDefaults = this.getPropertyDefaults();
  this.setPropertyDefaults_();
  
};



lgb.scenario.model.vo.Option.prototype.setPropertyDefaults_ = function() {
    
  var propertyDefaultsObject = this.getPropertyDefaults();
  
  this.setPropertyStr_('name', propertyDefaultsObject.name);
  this.setPropertyStr_('description', propertyDefaultsObject.description);
  this.setPropertyBool_('start', propertyDefaultsObject.start);
  this.setPropertyBool_('disabled', propertyDefaultsObject.disabled);
  
};

lgb.scenario.model.vo.Option.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        name:"{name not set}",
        description:"{description not set}",
        start:false,
        disabled:false
    };
    
    return propertyDefaults;
};


