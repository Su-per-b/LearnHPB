goog.provide('lgb.gui.view.SimulationTestGUI');

goog.require('lgb.gui.view.BaseGUI');

lgb.gui.view.SimulationTestGUI = function(dataModel) {

  this._TITLE = 'Test';
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 70;
  
};
goog.inherits(lgb.gui.view.SimulationTestGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.SimulationTestGUI.prototype.init = function() {

    this.triggerLocal(e.RequestAddToParentGUI);

};



lgb.gui.view.SimulationTestGUI.prototype.calculateLayout = function() {
  
  var p = this.getParentElement();
  var gp = p[0].parentElement;
  var paneHeight = gp.clientHeight;
  
  var contentHeight = paneHeight - this.totalHeaderHeight_;
  var cssStr = contentHeight + 'px';
  
  this.kendoGridContent_.css("height", cssStr);
     
  //var data = this.gridDS_.options.data[0].idx_ += 1;
  //this.gridDS_.read();
  
  return;
};





lgb.gui.view.SimulationTestGUI.prototype.injectInto = function(parentElement) {
  
  goog.base(this,  'injectInto', parentElement);
  this.makeVariablesTest_();
  
};


lgb.gui.view.SimulationTestGUI.prototype.makeVariablesTest_ = function() {
  

var variables = [
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  
  {
    causality_ : 8,
    description_ :  "outputs related to hot  ",
    idx_ : 61807,
    name_ : "y_BOI[2]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  },
  
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  
  {
    causality_ : 8,
    description_ :  "outputs related to hot  ",
    idx_ : 61807,
    name_ : "y_BOI[2]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  },
  
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality_ : 7,
    description_ :  "outputs related to hot water system",
    idx_ : 61807,
    name_ : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  
  {
    causality_ : 8,
    description_ :  "outputs related to hot  ",
    idx_ : 61807,
    name_ : "y_BOI[2]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }
  ];
  
  
  
  
   var el = this.getMainElement();
  
  
  var ds = {
              data: variables,
              schema: {
                  model: {
                      fields: {
                          causality_: { type: "number" },
                          description_: { type: "string" },
                          idx_: { type: "number" },
                          name_: { type: "string" },
                          type: { type: "string" }
                      }
                  }
              }
        };
        
        

    
    this.gridDS_ = new kendo.data.DataSource(ds);
  
        
  
      this.kendoGrid_ = el.kendoGrid({
          resizable : "true",
          dataSource: this.gridDS_,
          scrollable: true,
          sortable: true,
          filterable: false,
          columns: [
              { field: "idx_", title: "Idx" , width: "50px"},
              { field: "name_", title: "Name", width: "60px" },
              { field: "description_", title: "Description" , width: "180px"},
              { field: "type", title: "Type" , width: "300px"}
          ]
      });
      
      
    this.kendoGridContent_ = this.kendoGrid_.find('.k-grid-content');
    this.calculateLayout();
    
    return;
                
  
};





  



