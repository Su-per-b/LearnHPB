goog.provide('lgb.integrated.model.NodeBaseContainer');

goog.require('lgb.integrated.model.NodeBase');


lgb.integrated.model.NodeBaseContainer = function() {
    
    lgb.integrated.model.NodeBase.call(this);
    
    this.children_ = [];
    
};
goog.inherits(lgb.integrated.model.NodeBaseContainer, lgb.integrated.model.NodeBase);


lgb.integrated.model.NodeBaseContainer.prototype.parseSrcObj = function(srcObj) {
    this.name_simulation = srcObj.modName;
    this.name_scenario = srcObj.abbr;
    
    this.makeChildren_(srcObj);

};



lgb.integrated.model.NodeBaseContainer.prototype.makeChildren_ = function(srcObj) {
    
    this.children_ = [];
    var childList = srcObj.getChildren();
    this.each(childList, this.makeOneChild_);
    
};


lgb.integrated.model.NodeBaseContainer.prototype.makeOneChild_ = function(srcObjChild) {
     var destChild = this.translateObject_(srcObjChild);
    
     if (null == destChild) {
         debugger;
     } else {
         destChild.parseSrcObj(srcObjChild);
         
         this.children_.push(destChild);
     }
};


lgb.integrated.model.NodeBaseContainer.prototype.getChildren = function() {
  
  return this.children_;
    
};



lgb.integrated.model.NodeBaseContainer.prototype.calcAndGetIntegratedVariables = function() {
  
    var len = this.children_.length;
    var integratedVariables = [];
    
    for (var j = 0; j < len; j++) {
        
        var child = this.children_[j];
        var childVarList = child.calcAndGetIntegratedVariables();
        
        if(null != childVarList) {
            integratedVariables = childVarList.concat(integratedVariables);
        }
    }
    
    if (0 == integratedVariables.length ) {
        return null;
    } else {
        return integratedVariables;
    }
    
};


lgb.integrated.model.NodeBaseContainer.prototype.calcAndGetLeafNodes = function() {
  
    var len = this.children_.length;
    var varList = [];
    
    for (var j = 0; j < len; j++) {
        
        var child = this.children_[j];
        var childVarList = child.calcAndGetLeafNodes();
        
        if(null != childVarList) {
            varList = childVarList.concat(varList);
        }
    }
    
    if (0 == varList.length ) {
        return null;
    } else {
        return varList;
    }
    
};