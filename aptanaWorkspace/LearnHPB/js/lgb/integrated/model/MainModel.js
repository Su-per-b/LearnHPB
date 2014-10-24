goog.provide('lgb.integrated.model.MainModel');

goog.require('lgb.core.BaseModel');


goog.require('lgb.integrated.model.System');
goog.require('lgb.simulation.model.voManaged.XMLparsedInfo');
goog.require('lgb.integrated.model.VariableOption');




lgb.integrated.model.MainModel = function(  ) {
    
    lgb.integrated.model.NodeBaseContainer.call(this);
    
    var year2000Date = new Date(2000,0,1,0,0,0,0);
    this.year2000ms_ = year2000Date.getTime();
};
goog.inherits(lgb.integrated.model.MainModel, lgb.integrated.model.NodeBaseContainer);



lgb.integrated.model.MainModel.prototype.parseSrcObj = function(srcObj) {

    this.name = srcObj.name;
    this.makeChildren_(srcObj);
    this.leafNodes_ = this.getLeafNodes();
    
    this.integratedVariableList_ = [];
    this.integratedVariableNameMap_ = {};
    this.integratedVariableIdxMap_ = {};
    
    this.integratedVariableList_Input_ = [];
    this.integratedVariableList_Output_ = [];
    
    this.timeTicks_ = [];
    this.dateObjectTicks_ = [];
    this.timeAndDateStringTicks_ = [];
    
    this.each(this.leafNodes_, this.extractOneIntegratedVariable_);
    
};



lgb.integrated.model.MainModel.prototype.getInputVariables = function() {
    
    return this.integratedVariableList_Input_;
};


lgb.integrated.model.MainModel.prototype.getOutputVariables = function() {
    
    return this.integratedVariableList_Output_;
};



lgb.integrated.model.MainModel.prototype.extractOneIntegratedVariable_ = function(leafNode) {
    
    var isVariableOption = (leafNode instanceof lgb.integrated.model.VariableOption);
    var isVariable = (leafNode instanceof lgb.integrated.model.Variable);
     
    if (isVariable) {
        
        var name = leafNode.getNormalizedName();
        
        if (name != "{modName not set}") {
            
            //this.integratedVariableList_.push(leafNode);
            this.integratedVariableList_Input_.push(leafNode);
        
            if (this.integratedVariableNameMap_.hasOwnProperty(name)) {
                //names should be unique
                debugger;
            } else {
                this.integratedVariableNameMap_[name] = leafNode;
            }
               
        }
    }

    return;
};





lgb.integrated.model.MainModel.prototype.processXMLparsedInfo = function(xmlParsedInfo) {
    
    this.integratedVariableList_ = [];
    this.integratedVariableNameMap_ = {};
    this.integratedVariableIdxMap_ = {};
    
    this.integratedVariableList_Input_ = [];
    this.integratedVariableList_Output_ = [];
    
    var inputVarList = xmlParsedInfo.getInputVariables();
    this.each(inputVarList, this.processOneInputVariable_);
    
    var outputVarList = xmlParsedInfo.getOutputVariables();
    this.each(outputVarList, this.processOneOutputVariable_);
    
    
    return;
};


lgb.integrated.model.MainModel.prototype.setTime_ = function(time) {
    
    
    
    var msAfterYear2000 = time * 1000;
    var dateMs = msAfterYear2000 + this.year2000ms_;
    
    var date = new Date(dateMs);
    this.dateObject_ = date;
     
    this.dateObjectTicks_.push(date);
    
   // this.timeAndDateStringTicks_.push(scalarValueResults.getTimeAndDateString());
     
    return;
};


lgb.integrated.model.MainModel.prototype.getDateObject = function() {
    
    return this.dateObject_;
    
};



lgb.integrated.model.MainModel.prototype.processResultEventList = function(resultEventList) {


     var latestResult = resultEventList[resultEventList.length-1];
     var scalarValueResults = latestResult.getPayload();
     
     this.setTime_(scalarValueResults.getTime());
      var timeStr = this.getTimeStr();
      
     
     var inputValList = scalarValueResults.input.realList_;
     this.each(inputValList, this.processOneValue_);
     
     var outputValList = scalarValueResults.output.realList_;
     this.each(outputValList, this.processOneValue_);


    return;
};

lgb.integrated.model.MainModel.prototype.processOneValue_ = function(scalarValue) {
    
    var idx = scalarValue.getIdx();
    var integratedVariable = this.integratedVariableIdxMap_[idx];

    integratedVariable.setScalarValue(scalarValue);
    
    return;
};


lgb.integrated.model.MainModel.prototype.processOneInputVariable_ = function(scalarVariableReal) {
    
    var name = scalarVariableReal.getNormalizedName();
    var idx = scalarVariableReal.getIdx();        
            
    if (this.integratedVariableNameMap_.hasOwnProperty(name)) {
        var integratedVariable = this.integratedVariableNameMap_[name];
        integratedVariable.setScalarVariable(scalarVariableReal);
        
        if (!this.integratedVariableIdxMap_.hasOwnProperty(idx)) {
            this.integratedVariableIdxMap_[idx] = integratedVariable;
        }
    } else {
        
        var integratedVariable = new lgb.integrated.model.VariableReal();
        integratedVariable.setScalarVariable(scalarVariableReal);
        
        this.integratedVariableList_Input_.push(integratedVariable);
        this.integratedVariableNameMap_[name] = integratedVariable;
        this.integratedVariableIdxMap_[idx] = integratedVariable;
        
    }
    
    return;
};


lgb.integrated.model.MainModel.prototype.processOneOutputVariable_ = function(scalarVariableReal) {
    
    var name = scalarVariableReal.getNormalizedName();
    var idx = scalarVariableReal.getIdx(); 
         
    if (this.integratedVariableNameMap_.hasOwnProperty(name)) {
        debugger;

    } else {
        var integratedVariable = new lgb.integrated.model.VariableReal();
        integratedVariable.setScalarVariable(scalarVariableReal);
        
        this.integratedVariableList_Output_.push(integratedVariable);
        
        this.integratedVariableNameMap_[name] = integratedVariable;
        this.integratedVariableIdxMap_[idx] = integratedVariable;

    }
    
    return;
};




// lgb.integrated.model.MainModel.prototype.proccessOneVariable_ = function(scalarVariableReal) {
//     
    // var name = scalarVariableReal.getNormalizedName();
//             
    // if (this.integratedVariableNameMap_.hasOwnProperty(name)) {
        // //names should be unique
        // var integratedVariable = this.integratedVariableNameMap_[name];
        // integratedVariable.setScalarVariable(scalarVariableReal);
// 
    // } else {
        // var integratedVariable = new lgb.integrated.model.VariableReal();
        // integratedVariable.setScalarVariable(scalarVariableReal);
//         
        // var causality = scalarVariableReal.getCausalityAsEnum();
//         
        // if (causality == lgb.simulation.model.voNative.Enu.ENUM.enu_input) {
            // this.integratedVariableList_Input_.push(integratedVariable);
        // } else {
            // this.integratedVariableList_Output_.push(integratedVariable);
        // }
// 
// 
    // }
//     
    // return;
// };



lgb.integrated.model.MainModel.prototype.getDateStr = function() {
    
    if (null == this.dateObject_) {
        return null;
    } else {

        var fullYear = this.dateObject_.getFullYear();
        var dayOfMonth = this.dateObject_.getDate();
        var monthNumber = this.dateObject_.getMonth() + 1;
        
        var dateStr = "{0}/{1}/{2}".format(monthNumber, dayOfMonth, fullYear);
        
        return dateStr;
    }

};




lgb.integrated.model.MainModel.prototype.getTimeStr = function() {
    
    if (null == this.dateObject_) {
        return null;
    } else {

        var hours = this.dateObject_.getHours();
        var minutes = this.dateObject_.getMinutes();
        var seconds = this.dateObject_.getSeconds();
        
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
    
    
        var timeStr = "{0}:{1}:{2}".format(hours, minutes, seconds);
        
        return timeStr;
    }

};





lgb.integrated.model.MainModel.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {

    var varList = this.getLeafNodes();
    this.eachHandlerName(varList, 'changeDisplayUnitSystem', displayUnitSystem);
    
    return;   
};



lgb.integrated.model.MainModel.prototype.changeOneDisplayUnitSystem_ = function(varObj, displayUnitSystem) {

    varObj.changeDisplayUnitSystem(displayUnitSystem);
    
};




lgb.integrated.model.MainModel.prototype.makeChildren_ = function(srcObj) {
    
    this.children_ = [];
    this.childMap_ = {};
    var childList = srcObj.getChildren();
    this.each(childList, this.makeOneChild_);
    
};


lgb.integrated.model.MainModel.prototype.makeOneChild_ = function(srcObjChild) {

     var destChild = this.translateObject_(srcObjChild);
    
     if (null == destChild) {
         debugger;
     } else {
         destChild.parseSrcObj(srcObjChild);
         
         this.children_.push(destChild);
         this.childMap_[destChild.name] = destChild;
     }
};





lgb.integrated.model.MainModel.classTranslationMap = {
    "lgb.scenario.model.System" : lgb.integrated.model.System
};

