goog.provide('lgb.integrated.model.SubSystem');

goog.require('lgb.integrated.model.NodeBaseContainer');

goog.require('lgb.scenario.model.Category'); 
goog.require('lgb.scenario.model.Variable');
goog.require('lgb.integrated.model.Category'); 
goog.require('lgb.integrated.model.Variable'); 
goog.require('lgb.integrated.model.Utils'); 



lgb.integrated.model.SubSystem = function(  ) {

    lgb.integrated.model.NodeBaseContainer.call(this);
      
};
goog.inherits(lgb.integrated.model.SubSystem, lgb.integrated.model.NodeBaseContainer);


lgb.integrated.model.SubSystem.prototype.parseSrcObj = function(srcObj) {
            
    this.name = srcObj.name;
    this.name_scenario = srcObj.abbr;
    
    this.makeChildren_(srcObj);

};

lgb.integrated.model.SubSystem.prototype.makeOneChild_ = function(srcObjChild) {
       
       
     if (srcObjChild instanceof lgb.scenario.model.Variable) {
         
         var destChild = lgb.integrated.model.Utils.makeVariable (srcObjChild);
         
         this.children_.push(destChild);
         
         return;
     } else {
         goog.base(this,  'makeOneChild_', srcObjChild);
     }
     
};



lgb.integrated.model.SubSystem.classTranslationMap = {
    "lgb.scenario.model.Category" : lgb.integrated.model.Category,
    "lgb.scenario.model.Variable" : lgb.integrated.model.Variable
};





