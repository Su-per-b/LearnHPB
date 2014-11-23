goog.provide('lgb.integrated.model.Category');

goog.require('lgb.scenario.model.Variable');
goog.require('lgb.scenario.model.Component');
goog.require('lgb.integrated.model.Variable');
goog.require('lgb.integrated.model.Component');
goog.require('lgb.integrated.model.Utils');

goog.require('lgb.integrated.model.NodeBaseContainer');


lgb.integrated.model.Category = function(  ) {
    
    lgb.integrated.model.NodeBaseContainer.call(this);
    
};
goog.inherits(lgb.integrated.model.Category, lgb.integrated.model.NodeBaseContainer);


lgb.integrated.model.Category.prototype.makeOneChild_ = function(srcObjChild) {
       
     if (srcObjChild instanceof lgb.scenario.model.Variable) {
         
         var destChild = lgb.integrated.model.Utils.makeVariable (srcObjChild);
         
         this.children_.push(destChild);
         
         return;
     } else {
         goog.base(this,  'makeOneChild_', srcObjChild);
     }
     
};




lgb.integrated.model.Category.prototype.makeChildren_ = function(srcObj) {
    
    this.children_ = [];
    var childList = srcObj.getChildren();
    this.each(childList, this.makeOneChild_);
    
};

lgb.integrated.model.Category.classTranslationMap = {
    "lgb.scenario.model.Component" : lgb.integrated.model.Component
};
