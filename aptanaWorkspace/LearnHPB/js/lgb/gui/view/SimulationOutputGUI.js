goog.provide('lgb.gui.view.SimulationOutputGUI');



/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.SimulationOutputGUI = function(dataModel) {

  this._TITLE = 'Output';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 94;

};
goog.inherits(lgb.gui.view.SimulationOutputGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.SimulationOutputGUI.prototype.init = function() {


    this.listenForChange_('scalarValueResultsConverted');
    this.listenForChange_('xmlParsedInfo');
    //this.listenForChange_('scalarValueResults');
    
    
    this.triggerLocal(e.RequestAddToParentGUI);
    
    
};



lgb.gui.view.SimulationOutputGUI.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.realVarList_ = xmlParsedInfo.scalarVariablesAll_.output_.realVarList_;
  
  var len = this.realVarList_.length;
  
  // for (var i=0; i < len; i++) {
    // if (this.realVarList_[i].unit_ == "K") {
      // this.realVarList_[i].unit_ = "C";
    // }
  // };
  
  
  this.makeTable_(  this.realVarList_ );
  

  
};

// lgb.gui.view.SimulationOutputGUI.prototype.onChange_scalarValueResults_ = function(scalarValueResults) {
//   
//   
  // this.eachIdx(scalarValueResults.output.realList, this.updateOneRow_);
  // this.gridDS_.read();
//   
// };


lgb.gui.view.SimulationOutputGUI.prototype.onChange_scalarValueResultsConverted_ = function(scalarValueResultsConverted) {
  
  
  this.eachIdx(scalarValueResultsConverted.output.realList, this.updateOneRow_);
  this.gridDS_.read();
  
};



lgb.gui.view.SimulationOutputGUI.prototype.updateOneRow_ = function(realVo, idx) {
  
/*
  var value = row.value_.toFixed(4);
  var theVar = this.realVarList_[idx];
  
  var degC = value-273.15;
  var degF = 1.8 * degC +32;
  
  switch(theVar.unit_) {
    case "C" :
      value = degC.toFixed(4);
    case "F" :
      value = degF.toFixed(4);
  }
  
 this.gridDS_.options.data[idx].value = value;
    
    */

    
  var existingValue = this.gridDS_.options.data[idx].value;
  var newValue = realVo.value_;

  if (newValue != existingValue) {
     this.gridDS_.options.data[idx].value_ = newValue;
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



/*
lgb.gui.view.SimulationOutputGUI.prototype.injectInto = function(parentElement) {
  
  goog.base(this,  'injectInto', parentElement);

};

*/



lgb.gui.view.SimulationOutputGUI.prototype.makeTable_ = function(varList) {
  
  
  
  var ds = {
              data: varList,
              schema: {
                  model: {
                      fields: {
                          causality_: { type: "number" },
                          description_: { type: "string" },
                          idx_: { type: "number" },
                          name_: { type: "string" },
                          value_: { type: "number" },
                          "typeSpecReal_.unit": { type: "string" },
                          "typeSpecReal_.min" : { type: "number" },
                          "typeSpecReal_.max" : { type: "number" },
                          "typeSpecReal_.start" : { type: "number" },
                          valueReference_: { type: "number" },
                          variability_: { type: "number" }
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
              { field: "idx_", title: "idx" , width: "40px"},
              { field: "name_", title: "Name", width: "60px" },
              { field: "value_", title: "Value", width: "60px" },
              { field: "typeSpecReal_.unit", title: "Unit", width: "60px" },
              { field: "description_", title: "Description" , width: "140px"},
              { field: "typeSpecReal_.min", title: "Min" , width: "20px"},
              { field: "typeSpecReal_.max", title: "Max" , width: "30px"},
              { field: "typeSpecReal_.start", title: "Start" , width: "30px"},
              { field: "variability_", title: "Var" , width: "20px"}
          ]
      });
      
    this.kendoGridContent_ = this.kendoGrid_.find('.k-grid-content');
    this.calculateLayout();  
      
};







