goog.provide('lgb.integrated.model.MainModel');

goog.require('lgb.core.BaseModel');
goog.require('lgb.simulation.model.voManaged.XMLparsedInfo');
goog.require('lgb.integrated.model.VariableOption');
goog.require('lgb.integrated.model.Factory');
goog.require('lgb.integrated.model.System');


lgb.integrated.model.MainModel = function(  ) {
    
    lgb.core.BaseModel.call(this);

    var year2000Date = new Date(2000,0,1,0,0,0,0);
    this.year2000ms_ = year2000Date.getTime();
};
goog.inherits(lgb.integrated.model.MainModel, lgb.core.BaseModel);



lgb.integrated.model.MainModel.prototype.parseSrcObj = function(srcObj) {

    
    this.variableMap_ = {
       name : {},
       scalarVariableName : {},
       idx : {}
    };
    
    this.variableListByScope_ = {
       input : [],
       output : [],
       gui : [],
       inputAndOutput :[]
    };
    
    this.timeTicks_ = [];
    this.dateObjectTicks_ = [];
    this.timeAndDateStringTicks_ = [];
    this.systemListInput = [];
    
    this.variableListAll_ = [];
    var tagVariableAry = srcObj.scenario.getVariableList();
    this.each(tagVariableAry, this.parseOneVariable_);
    
    
    var graphListTag = srcObj.scenario.getChildren('GraphList')[0];    
    if (undefined != graphListTag) {
        var graphChildren = graphListTag.getChildren();
        this.graphModelList = [];
        this.each(graphChildren, this.makeOneGraph_);
    }
    
    var systemListObject = srcObj.scenario.getChildren('SystemList')[0];
    var systemObjectAry = systemListObject.getChildren('System');
    
    //var subSystemObject
    this.each(systemObjectAry, this.parseOneSystem_);

    return;
};


lgb.integrated.model.MainModel.prototype.parseOneSystem_ = function(systemObject) {

    var integratedSystemObject = lgb.integrated.model.Factory.translateTag2Integrated (systemObject);
    this.systemListInput.push(integratedSystemObject);
     
    return;
};

lgb.integrated.model.MainModel.prototype.parseOneVariable_ = function(srcObjVariable) {
    
    var integratedVariable = lgb.integrated.model.Factory.translateTag2Integrated (srcObjVariable);
    var scope = integratedVariable.scope;
    
    
    if (undefined != scope) {
        this.variableListByScope_[scope].push(integratedVariable);
         
        if ("input" == scope || "output" == scope) {
            this.variableListByScope_.inputAndOutput.push(integratedVariable);
        }
        
    } else {
        debugger;
    }
    
    
    if (undefined != integratedVariable.scalarVariableName) {
        this.variableMap_.scalarVariableName[integratedVariable.scalarVariableName] = integratedVariable;
    }
    
    this.variableMap_.name[integratedVariable.name] = integratedVariable;
    this.variableListAll_.push(integratedVariable);

    return;
};



lgb.integrated.model.MainModel.prototype.makeOneGraph_ = function(scenarioModelGraph) {
  
   var graphGUIModel = new lgb.chart.model.GraphModel();
   graphGUIModel.setTitle(scenarioModelGraph.name);
   
   var variableNames = scenarioModelGraph.getLineNames();
   
   graphGUIModel.setVariablesByAbbrList(variableNames);
   this.graphModelList.push(graphGUIModel);

};



lgb.integrated.model.MainModel.prototype.processXMLparsedInfo = function(xmlParsedInfo) {

    var varList = xmlParsedInfo.getAllVariables();
    this.each(varList, this.processOneScalarVariable_);
    
    return;
};






lgb.integrated.model.MainModel.prototype.getVariableListByScope = function(scope) {
    
    return this.variableListByScope_[scope];
};




lgb.integrated.model.MainModel.prototype.getVariableByName = function(name) {
    
    if (this.variableMap_.name.hasOwnProperty(name)) {
        return this.variableMap_.name[name];
    } else {
        debugger;
    }
};

lgb.integrated.model.MainModel.prototype.getVariableByIdx = function(idx) {
    
    if (this.variableMap_.idx.hasOwnProperty(idx)) {
        return this.variableMap_.idx[idx];
    } else {
        debugger;
    }
};





lgb.integrated.model.MainModel.prototype.processOneScalarVariable_ = function(scalarVariableReal) {
    
    var scalarVariableName = scalarVariableReal.getName();
    var idx = scalarVariableReal.getIdx();        
    var integratedVariable;

    //find or make the integratedVariable
    if (this.variableMap_.scalarVariableName.hasOwnProperty(scalarVariableName)) {
        
        integratedVariable = this.variableMap_.scalarVariableName[scalarVariableName];
        integratedVariable.setScalarVariable(scalarVariableReal);
        
        if (this.variableMap_.idx.hasOwnProperty(idx)) {
            debugger;
        } else {
            this.variableMap_.idx[idx] = integratedVariable;
        }

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
     this.each(valList, this.processOneScalarValue_);
     
     return;
};




lgb.integrated.model.MainModel.prototype.processOneScalarValue_ = function(scalarValue) {
    
    var idx = scalarValue.getIdx();
    
    if (this.variableMap_.idx.hasOwnProperty(idx)) {
    
        var integratedVariable = this.variableMap_.idx[idx];
    
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

    var varList = this.variableListByScope_.inputAndOutput;
    this.eachHandlerName(varList, 'calcDisplayValues');
    
    return;   
};



lgb.integrated.model.MainModel.prototype.changeOneDisplayUnitSystem_ = function(varObj, displayUnitSystem) {

    varObj.changeDisplayUnitSystem(displayUnitSystem);
    
};


lgb.integrated.model.MainModel.classTranslationMap = {
    "lgb.scenario.model.tag.System" : lgb.integrated.model.System
};



