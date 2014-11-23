goog.provide('lgb.integrated.model.MainModel');

goog.require('lgb.core.BaseModel');


goog.require('lgb.integrated.model.System');
goog.require('lgb.simulation.model.voManaged.XMLparsedInfo');
goog.require('lgb.integrated.model.VariableOption');




lgb.integrated.model.MainModel = function(  ) {
    
    lgb.core.BaseModel.call(this);

    var year2000Date = new Date(2000,0,1,0,0,0,0);
    this.year2000ms_ = year2000Date.getTime();
};
goog.inherits(lgb.integrated.model.MainModel, lgb.core.BaseModel);



lgb.integrated.model.MainModel.prototype.parseSrcObj = function(srcObj) {

    
    this.name_scenario2integratedVariable_ = {};
    this.name_simulation2integratedVariable_ = {};
    this.idx2integratedVariable_ = {};
    
    this.integratedVariableList_input_ = [];
    this.integratedVariableList_output_ = [];
    this.integratedVariableList_all_ = [];
    
    this.systemListInput = [];
    this.parseSystemListInput_(srcObj.systemListInput);
    
    this.integratedVariableList_input_ = this.calcAndGetintegratedVariableList_input_();
    this.calcAndIntegratedVariableList_output_(srcObj.variableListOutput);  //this.integratedVariableList_output_ = 
    
    this.variableListAll = this.integratedVariableList_output_.concat(this.integratedVariableList_input_.slice(0));
    
    this.timeTicks_ = [];
    this.dateObjectTicks_ = [];
    this.timeAndDateStringTicks_ = [];
    
    this.graphModelList = srcObj.graphModelList;
    
    this.each(this.variableListAll, this.indexOneVariable_);
    
    return;
};


lgb.integrated.model.MainModel.prototype.processXMLparsedInfo = function(xmlParsedInfo) {

    var varList = xmlParsedInfo.getAllVariables();
    this.each(varList, this.processOneScalarVariable_);
    
    return;
};


lgb.integrated.model.MainModel.prototype.parseSystemListInput_ = function(systemListInput) {
    
    var childList = systemListInput.getChildren();
    this.each(childList, this.parseOneSystemInput_);
    
};


lgb.integrated.model.MainModel.prototype.parseOneSystemInput_ = function(srcObjChild) {

     var destChild = this.translateObject_(srcObjChild);
    
     if (null == destChild) {
         debugger;
     } else {
         destChild.parseSrcObj(srcObjChild);
         this.systemListInput.push(destChild);
     }
};






lgb.integrated.model.MainModel.prototype.calcAndIntegratedVariableList_output_ = function(variableListOutput) {
        
    if (null != variableListOutput) {
        var childList = variableListOutput.getChildren();
        this.each(childList, this.parseOneVariableOutput_);
    }

};

lgb.integrated.model.MainModel.prototype.parseOneVariableOutput_ = function(srcObjVariable) {
    
    var destChild = lgb.integrated.model.Utils.makeVariable (srcObjVariable);
    
     if (null == destChild) {
         debugger;
     } else {
         this.integratedVariableList_output_.push(destChild);
     }

};





lgb.integrated.model.MainModel.prototype.getInputVariables = function() {
    
    return this.integratedVariableList_input_;
};


lgb.integrated.model.MainModel.prototype.getOutputVariables = function() {
    
    return this.integratedVariableList_output_;
};



lgb.integrated.model.MainModel.prototype.indexOneVariable_ = function(integratedVariable) {
    
    
    var name_simulation = integratedVariable.name_simulation;
    var name_scenario = integratedVariable.name_scenario;
    
    
    if (name_scenario != "") {
        if (this.name_scenario2integratedVariable_.hasOwnProperty(name_scenario)) {
            //name_simulation should be unique
            debugger;
        } else {
            this.name_scenario2integratedVariable_[name_scenario] = integratedVariable;
        }
    }
    
    if (name_simulation != "") {
        if (this.name_simulation2integratedVariable_.hasOwnProperty(name_simulation)) {
            //name_simulation should be unique
            debugger;
        } else {
            this.name_simulation2integratedVariable_[name_simulation] = integratedVariable;
        }
    }
    
    this.integratedVariableList_all_.push(integratedVariable);
    
    return;
};




lgb.integrated.model.MainModel.prototype.getVariableBy_name_scenario = function(name_scenario) {
    
    if (this.name_scenario2integratedVariable_.hasOwnProperty(name_scenario)) {
        return this.name_scenario2integratedVariable_[name_scenario];
    } else {
        debugger;
    }
        
    
};




lgb.integrated.model.MainModel.prototype.processOneScalarVariable_ = function(scalarVariableReal) {
    
    var name_simulation = scalarVariableReal.getName();
    var idx = scalarVariableReal.getIdx();        
    var integratedVariable;    

    //find or make the integratedVariable
    if (this.name_simulation2integratedVariable_.hasOwnProperty(name_simulation)) {
        
        integratedVariable = this.name_simulation2integratedVariable_[name_simulation];
        integratedVariable.setScalarVariable(scalarVariableReal);
        
        if (this.idx2integratedVariable_.hasOwnProperty(idx)) {
            debugger;
        } else {
            this.idx2integratedVariable_[idx] = integratedVariable;
        }

    } else {
        
        //we are going to ignore these variables from now on.
        //debugger;
    }
    

    return;
};



lgb.integrated.model.MainModel.prototype.setTime_ = function(time) {
    
    var msAfterYear2000 = time * 1000;
    var dateMs = msAfterYear2000 + this.year2000ms_;
    
    var date = new Date(dateMs);
    this.dateObject_ = date;
     
    this.dateObjectTicks_.push(date);
    
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
      
     var valList = scalarValueResults.getAllReal();
     this.each(valList, this.processOneValue_);
     
     return;
};




lgb.integrated.model.MainModel.prototype.processOneValue_ = function(scalarValue) {
    
    var idx = scalarValue.getIdx();
    
    if (this.idx2integratedVariable_.hasOwnProperty(idx)) {
    
        var integratedVariable = this.idx2integratedVariable_[idx];
    
        if (undefined === integratedVariable) {
            debugger;
        } else {
            integratedVariable.setScalarValue(scalarValue);
        }
        
    } else {
       // ignore
    }
        
    return;
};







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




lgb.integrated.model.MainModel.prototype.calcAndGetintegratedVariableList_input_ = function() {
  
    var len = this.systemListInput.length;
    var integratedVariables = [];
    
    for (var j = 0; j < len; j++) {
        
        var child = this.systemListInput[j];
        var childVarList = child.calcAndGetIntegratedVariables();
        
        if(null != childVarList) {
            integratedVariables = childVarList.concat(integratedVariables);
        }
    }
    
    return integratedVariables;
    

 
};




lgb.integrated.model.MainModel.prototype.calcAndGetLeafNodes = function() {
  
    var len = this.children_.length;
    var leafNodes = [];
    
    for (var j = 0; j < len; j++) {
        
        var child = this.children_[j];
        var childVarList = child.calcAndGetLeafNodes();
        
        if(null != childVarList) {
            leafNodes = childVarList.concat(leafNodes);
        }
    }
    
    if (0 == leafNodes.length ) {
        return null;
    } else {
        return leafNodes;
    }
};




lgb.integrated.model.MainModel.prototype.getLeafNodes = function() {
    return this.leafNodes_;
};



lgb.integrated.model.MainModel.classTranslationMap = {
    "lgb.scenario.model.System" : lgb.integrated.model.System
};

