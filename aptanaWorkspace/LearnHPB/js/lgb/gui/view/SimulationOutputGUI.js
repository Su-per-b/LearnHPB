goog.provide('lgb.gui.view.SimulationOutputGUI');



goog.require('lgb.scenario.model.tag.Real');


/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.SimulationOutputGUI = function(dataModel) {

  this._TITLE = 'Output';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 94;
  this.displayUnitSystem = lgb.integrated.model.DisplayUnitSystem.getInstance();
  this.realVarListConverted = [];
  this.xmlParsedInfo_ = null;
  
};
goog.inherits(lgb.gui.view.SimulationOutputGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.SimulationOutputGUI.prototype.init = function() {

    this.listenForChange_('xmlParsedInfo');

    this.listenTo(this.displayUnitSystem, e.DataModelChangedEx, this.onChange_displayUnitSystemValue_);
    
    this.triggerLocal(e.RequestAddToParentGUI);
    
};


lgb.gui.view.SimulationOutputGUI.prototype.updateIntegratedDataModelVariables = function(integratedDataModelOutputVariables) {
  
  
  this.makeTable2_(  integratedDataModelOutputVariables );
  
  return;
  this.xmlParsedInfo_ = xmlParsedInfo;
  
  this.realVarList_ = xmlParsedInfo.scalarVariablesAll_.output_.realVarList_;
  //this.realVarListConverted = xmlParsedInfo.scalarVariablesAll_.output_.getRealVarListConverted();
  

  
};


lgb.gui.view.SimulationOutputGUI.prototype.onChange_mergedResults_ = function(mergedResults) {
  
  this.mergedResults_ = mergedResults;
  this.eachIdx(mergedResults.mergedVariableListOutput_, this.updateOneRowMerged_);
  this.gridDS_.read();
  
};


lgb.gui.view.SimulationOutputGUI.prototype.updateOneRowMerged_ = function(mergedVariable, idx) {
  
  if (mergedVariable.displayString != this.gridDS_.options.data[idx].displayString) {
     this.gridDS_.options.data[idx].displayString = mergedVariable.displayString;
  }
  
  return;
};




lgb.gui.view.SimulationOutputGUI.prototype.onChange_displayUnitSystemValue_ = function(displayUnitSystem) {
  
    if (undefined != this.gridDS_) {
        this.eachIdx(this.realVarListConverted, this.changeOneRowDisplayUnit_);
        this.gridDS_.read();
    }

};


lgb.gui.view.SimulationOutputGUI.prototype.changeOneRowDisplayUnit_ = function(displayUnitSystem, idx) {
  
  this.realVarListConverted[idx].updateDisplayUnits();
  
};



lgb.gui.view.SimulationOutputGUI.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  // this.xmlParsedInfo_ = xmlParsedInfo;
//   
  // this.realVarList_ = xmlParsedInfo.scalarVariablesAll_.output_.realVarList_;
  // this.realVarListConverted = xmlParsedInfo.scalarVariablesAll_.output_.getRealVarListConverted();
//   
  // this.makeTable_(  this.realVarListConverted );
  
};






lgb.gui.view.SimulationOutputGUI.prototype.updateOneRow_ = function(scalarValueReal, idx) {
  
  var realVarConverted = this.realVarListConverted[idx];

  realVarConverted.setInternalValue(realVo);
  

  if (realVarConverted.displayValue != this.gridDS_.options.data[idx].displayValue) {
     this.gridDS_.options.data[idx].displayValue = realVarConverted.displayValue;
  }
   

};



lgb.gui.view.SimulationOutputGUI.prototype.calculateLayout = function() {
  
  if (this.kendoGridContent_) {
    
    var p = this.getParentElement();
    var gp = p[0].parentElement;
    var paneHeight = gp.clientHeight;
    
    var contentHeight = paneHeight - this.totalHeaderHeight_;
    var cssStr = contentHeight + 'px';
    
    this.kendoGridContent_.css("height", cssStr);
  }
     

};





lgb.gui.view.SimulationOutputGUI.prototype.makeTable2_ = function(outputVariables) {
  
  
  var ds = {
        data: outputVariables,
        schema: {
            model: {
                fields: {
                    scalarVariableName: { type: "string" },
                    'value.displayString_': { type: "string" }
                }
            }
        }

  };
        
    this.gridDS_ = new kendo.data.DataSource(ds);
    
    
      var el = this.getMainElement();
   
      this.kendoGrid_ = el.kendoGrid({
          dataSource: this.gridDS_,
          scrollable: true,
          sortable: true,
          filterable: false,
          columnResize: true,
          columns: [
              { field: "scalarVariableName", title: "Name" , width: "80px"},
              { field: 'value.displayString_', title: "Value", width: "60px" }
          ]
      });
      
    this.kendoGridContent_ = this.kendoGrid_.find('.k-grid-content');
    this.calculateLayout();  
  
  
  

      
};






lgb.gui.view.SimulationOutputGUI.prototype.makeTable_ = function(realVarListConverted) {
  
  
  var ds = {
        data: realVarListConverted,
        schema: {
            model: {
                fields: {
                    causality: { type: "number" },
                    description: { type: "string" },
                    idx: { type: "number" },
                    name: { type: "string" },
                    displayString: { type: "number" },
                    displayUnit: { type: "string" },
                    displayMin : { type: "number" },
                    displayMax : { type: "number" },
                    displayStart : { type: "number" },
                    valueReference: { type: "number" },
                    variability: { type: "number" }
                }
            }
        }

  };
        
    this.gridDS_ = new kendo.data.DataSource(ds);
    
    
      var el = this.getMainElement();
   
      this.kendoGrid_ = el.kendoGrid({
          dataSource: this.gridDS_,
          scrollable: true,
          sortable: true,
          filterable: false,
          columnResize: true,
          columns: [
              { field: "idx", title: "idx" , width: "40px"},
              { field: "name", title: "Name", width: "60px" },
              { field: "displayString", title: "Value", width: "60px" },
              { field: "displayUnit", title: "Unit", width: "60px" },
              { field: "description", title: "Description" , width: "140px"},
              { field: "displayMin", title: "Min" , width: "20px"},
              { field: "displayMax", title: "Max" , width: "30px"},
              { field: "displayStart", title: "Start" , width: "30px"},
              { field: "variability", title: "Var" , width: "20px"}
          ]
      });
      
    this.kendoGridContent_ = this.kendoGrid_.find('.k-grid-content');
    this.calculateLayout();  
      
};







