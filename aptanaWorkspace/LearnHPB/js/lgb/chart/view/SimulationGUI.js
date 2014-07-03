goog.provide('lgb.chart.view.SimulationGUI');




/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.chart.view.SimulationGUI = function(dataModel) {

  this._TITLE = 'Input';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 70;
  this.blockUpdates_ = false;
};
goog.inherits(lgb.chart.view.SimulationGUI, lgb.gui.view.BaseGUI);



lgb.chart.view.SimulationGUI.prototype.init = function() {

   // this.listenForChange_('xmlParsedInfo');
    //this.listenForChange_('scalarValueResultsConverted');
    
    this.triggerLocal(e.RequestAddToParentGUI);
    
};



lgb.chart.view.SimulationGUI.prototype.onChange_scalarValueResultsConverted_ = function(scalarValueResultsConverted) {
  
  this.updateTable_(scalarValueResultsConverted.input.realList);
  
};


lgb.chart.view.SimulationGUI.prototype.updateTable_ = function(realList) {
  
  this.eachIdx(realList, this.updateRow_);
  this.gridDS_.read();

};


lgb.chart.view.SimulationGUI.prototype.updateRow_ = function(realVo, idx) {
  
  var existingValue = this.gridDS_.options.data[idx].value;
  var newValue = realVo.value_;

  if (newValue != existingValue) {
     this.gridDS_.options.data[idx].value = newValue;
  }
   
};





lgb.chart.view.SimulationGUI.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  
/*
  var Input_= xmlParsedInfo.scalarVariablesAll_.Input_;
  var internal_= xmlParsedInfo.scalarVariablesAll_.internal_;
  var input_= xmlParsedInfo.scalarVariablesAll_.input_;*/

  this.realVarList_ = xmlParsedInfo.scalarVariablesAll_.input_.realVarList_;
  
  var len = this.realVarList_.length;
  for (var i=0; i < len; i++) {
    if (this.realVarList_[i].unit_ == "K") {
      this.realVarList_[i].unit_ = "C";
    }
  };
  
  
  this.makeTable_(  this.realVarList_ );
  
  

};




lgb.chart.view.SimulationGUI.prototype.calculateLayout = function() {
  
  if (this.kendoGridContent_) {
    
    var p = this.getParentElement();
    var gp = p[0].parentElement;
    var paneHeight = gp.clientHeight;
    
    var contentHeight = paneHeight - this.totalHeaderHeight_;
    var cssStr = contentHeight + 'px';
    
    this.kendoGridContent_.css("height", cssStr);
  }

     

};



lgb.chart.view.SimulationGUI.prototype.injectInto = function(parentElement) {
  

  goog.base(this,  'injectInto', parentElement);

  
};



lgb.chart.view.SimulationGUI.prototype.makeTable_ = function(varList) {
  


  var ds = {
              data: varList,
              schema: {
                  model: {
                      fields: {
                          causality: { type: "number" },
                          description: { type: "string" },
                          idx: { type: "number" },
                          name: { type: "string" },
                          value: { type: "number" },
                          unit: { type: "string" },
                          "typeSpecReal.min" : { type: "number" },
                          "typeSpecReal.max" : { type: "number" },
                          "typeSpecReal.start" : { type: "number" },
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
              { field: "name, title: "Name", width: "60px" },
              { field: "value", title: "Value", width: "60px" },
              { field: "unit", title: "Unit", width: "60px" },
              { field: "description", title: "Description" , width: "140px"},
              { field: "typeSpecReal.min", title: "Min" , width: "20px"},
              { field: "typeSpecReal.max", title: "Max" , width: "30px"},
              { field: "typeSpecReal.start", title: "Start" , width: "30px"},
              { field: "variability", title: "Var" , width: "20px"}
          ]
      });
      
    this.kendoGridContent_ = this.kendoGrid_.find('.k-grid-content');
    this.calculateLayout();  
      
      
};







