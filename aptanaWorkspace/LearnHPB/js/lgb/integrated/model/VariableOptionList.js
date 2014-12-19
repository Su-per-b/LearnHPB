goog.provide('lgb.integrated.model.VariableOptionList');


goog.require('lgb.integrated.model.VariableOption');
goog.require('lgb.integrated.model.NodeBaseContainer');


lgb.integrated.model.VariableOptionList = function(  ) {
    
    lgb.integrated.model.NodeBaseContainer.call(this);
     
};
goog.inherits(lgb.integrated.model.VariableOptionList, lgb.integrated.model.NodeBaseContainer);



lgb.integrated.model.VariableOptionList.prototype.makeChildren_ = function(srcObj) {

    var child = srcObj.getChildren()[0];
    var childList = child.getChildren();
    
    this.each(childList, this.makeOneChild_);
    return;
};


lgb.integrated.model.VariableOptionList.prototype.calcAndGetLeafNodes = function() {
    return [this];
};



