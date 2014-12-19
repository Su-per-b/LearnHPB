/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.Graph');
goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.scenario.model.tag.Line');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.Graph = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.tag.Graph, lgb.scenario.model.tag.NodeBase);





lgb.scenario.model.tag.Graph.prototype.addLineName_ = function(line) {
  
    this.lineNames_.push(line.name);
    
};


lgb.scenario.model.tag.Graph.prototype.getLineNames = function() {
    var children = this.getChildren();
    this.lineNames_ = [];
    
    this.each(children, this.addLineName_);
    
    return this.lineNames_;
    
};




lgb.scenario.model.tag.Graph.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    },
    "description" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    }

};



lgb.scenario.model.tag.Graph.childMap = {

    "Line" : {
        classReference:lgb.scenario.model.tag.Line,
        isRequired:true
    }
    
};

