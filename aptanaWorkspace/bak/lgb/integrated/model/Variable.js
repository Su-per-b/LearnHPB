goog.provide('lgb.integrated.model.Variable');


goog.require('lgb.integrated.model.NodeBaseContainer');


lgb.integrated.model.Variable = function(  ) {
    
    lgb.integrated.model.NodeBaseContainer.call(this);
};
goog.inherits(lgb.integrated.model.Variable, lgb.integrated.model.NodeBaseContainer);



// lgb.integrated.model.Variable.prototype.parseSrcObj = function(srcObj) {
// 
    // this.name = srcObj.abbr;
    // this.scalarVariableName = srcObj.modelicaName;
//     
    // this.makeChildren_(srcObj);
//     
    // return;
// };


// lgb.integrated.model.Variable.prototype.makeChildren_ = function(srcObj) {
//     
    // this.children_ = [];
    // var childList = srcObj.getChildren();
//     
    // if (undefined != childList) {
        // this.each(childList, this.makeOneChild_);  
    // }
// 
//     
// };


lgb.integrated.model.Variable.prototype.setChangeCallback = function(changeCallbackDelegate) {

    this.changeCallbackDelegate_ = changeCallbackDelegate;
    
    return;
};


// 
// lgb.integrated.model.Variable.prototype.makeUnitFromString = function(unitString) {
//     
    // var unitObject = lgb.integrated.model.unit.Factory.makeUnitFromString(unitString);
    // this.setUnitObject(unitObject);
// };



lgb.integrated.model.Variable.prototype.setUnitObject = function(unitObject) {
    
    this.unit = unitObject;
    
    this.typeSpec.setUnitObject(this.unit);
    
    //this.start.setUnitObject(this.unit);
   // this.min.setUnitObject(this.unit);
    //this.max.setUnitObject(this.unit);

};



lgb.integrated.model.Variable.prototype.changeDisplayUnitSystem = function(srcObj) {
    debugger; //should override
    return;
};



lgb.integrated.model.Variable.prototype.setScalarVariableBase_ = function(scalarVariable) {

    this.idx_ = scalarVariable.getIdx();
    this.scalarVariableName = scalarVariable.getName();
    
    return;
  
};




lgb.integrated.model.Variable.prototype.setScalarValue = function(scalarValue) {

    debugger; //should override
};



lgb.integrated.model.Variable.prototype.getIdx = function() {

    return this.idx_;
};


lgb.integrated.model.Variable.prototype.getUnitDisplaySymbol = function() {
  
    if (null == this.unit) {
        return null;
    } else {
        return this.unit.getUnitDisplaySymbol();
    }
    
};



lgb.integrated.model.Variable.prototype.setInternalValue = function(newValue) {
    
    var currentValue = this.typeSpec.value.getInternalValue();

    this.typeSpec.value.setInternalValue(newValue);
    this.valueListInternal.push(newValue);
    this.valueListDisplayString.push(this.value.getDisplayString());
    
    if (this.changeCallbackDelegate_) {
        
        if (currentValue != newValue) {
            this.changeCallbackDelegate_(this.typeSpec.value);
        }
    }
    


};

