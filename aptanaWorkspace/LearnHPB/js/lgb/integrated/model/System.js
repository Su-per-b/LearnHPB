goog.provide('lgb.integrated.model.System');

goog.require('lgb.integrated.model.NodeBaseContainer');
goog.require('lgb.scenario.model.SubSystem');
goog.require('lgb.integrated.model.SubSystem');



lgb.integrated.model.System = function(  ) {
    
    lgb.integrated.model.NodeBaseContainer.call(this);

};
goog.inherits(lgb.integrated.model.System, lgb.integrated.model.NodeBaseContainer);


lgb.integrated.model.System.classTranslationMap = {
    "lgb.scenario.model.SubSystem" : lgb.integrated.model.SubSystem
};


lgb.integrated.model.System.prototype.makeChildren_ = function(srcObj) {
    
    this.children_ = [];
    this.childMap_ = {};
    var childList = srcObj.getChildren();
    this.each(childList, this.makeOneChild_);
    
};