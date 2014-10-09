goog.provide('lgb.integrated.model.NodeBaseContainer');

goog.require('lgb.integrated.model.NodeBase');


lgb.integrated.model.NodeBaseContainer = function() {
    
    lgb.integrated.model.NodeBase.call(this);
    
    this.children_ = [];
    this.childMap_ = {};
    
};
goog.inherits(lgb.integrated.model.NodeBaseContainer, lgb.integrated.model.NodeBase);


lgb.integrated.model.NodeBaseContainer.prototype.parseSrcObj = function(srcObj) {

    this.name = srcObj.name;
    this.abbr = srcObj.abbr;
    
    this.makeChildren_(srcObj);

};




lgb.integrated.model.NodeBaseContainer.prototype.makeChildren_ = function(srcObj) {
    
    debugger;
    this.children_ = [];
    this.childMap_ = {};
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
         this.childMap_[destChild.name] = destChild;
     }
};


lgb.integrated.model.NodeBaseContainer.prototype.getChildren = function() {
  
  return this.children_;
    
};



lgb.integrated.model.NodeBaseContainer.prototype.getLeafNodes = function() {
  
    var len = this.children_.length;
    var varList = [];
    
    for (var j = 0; j < len; j++) {
        
        var child = this.children_[j];
        var childVarList = child.getLeafNodes();
        
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