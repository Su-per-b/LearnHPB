/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Boolean');
goog.require('lgb.scenario.model.NodeBase');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Boolean = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Boolean, lgb.scenario.model.NodeBase);



lgb.scenario.model.Boolean.prototype.parseXmlNode_ = function() {
  
    this.setPropertyDefaults_();

};


lgb.scenario.model.Boolean.prototype.setPropertyDefaults_ = function() {
  
  var propertyDefaults = this.getPropertyDefaults();
  this.setPropertyBool_(dflt, propertyDefaults.dflt);
  
};



lgb.scenario.model.Boolean.prototype.parseXmlNode_ = function() {
    
  var propertyDefaults = this.getPropertyDefaults();
  this.setPropertyBool_(dflt, propertyDefaults.dflt);
  
};

lgb.scenario.model.Boolean.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        dflt:false
    };
    
    
    return propertyDefaults;
};

