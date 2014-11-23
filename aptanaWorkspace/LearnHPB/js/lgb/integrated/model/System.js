goog.provide('lgb.integrated.model.System');

goog.require('lgb.integrated.model.NodeBaseContainer');
goog.require('lgb.scenario.model.SubSystem');
goog.require('lgb.integrated.model.SubSystem');



lgb.integrated.model.System = function(  ) {
    
    lgb.integrated.model.NodeBaseContainer.call(this);

};
goog.inherits(lgb.integrated.model.System, lgb.integrated.model.NodeBaseContainer);

lgb.integrated.model.System.prototype.parseSrcObj = function(srcObj) {
            
    this.name = srcObj.name;
    this.name_scenario = srcObj.abbr;
    
    this.makeChildren_(srcObj);

};


lgb.integrated.model.System.classTranslationMap = {
    "lgb.scenario.model.SubSystem" : lgb.integrated.model.SubSystem
};


