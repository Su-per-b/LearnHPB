goog.provide('lgb.gui.view.SimulationTestGUI');

goog.require('lgb.gui.view.BaseGUI');


/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
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
     
  //var data = this.gridDS_.options.data[0].idx += 1;
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
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  
  {
    causality : 8,
    description :  "outputs related to hot  ",
    idx : 61807,
    name : "y_BOI[2]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  },
  
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  
  {
    causality : 8,
    description :  "outputs related to hot  ",
    idx : 61807,
    name : "y_BOI[2]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  },
  
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  {
    causality : 7,
    description :  "outputs related to hot water system",
    idx : 61807,
    name : "y_BOI[1]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }, 
  
  {
    causality : 8,
    description :  "outputs related to hot  ",
    idx : 61807,
    name : "y_BOI[2]",
    type : "com.sri.straylight.fmuWrapper.voManaged.ScalarVariableReal"
    
  }
  ];
  
  
  
  
   var el = this.getMainElement();
  
  
  var ds = {
              data: variables,
              schema: {
                  model: {
                      fields: {
                          causality: { type: "number" },
                          description: { type: "string" },
                          idx: { type: "number" },
                          name: { type: "string" },
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
              { field: "idx", title: "Idx" , width: "50px"},
              { field: "name", title: "Name", width: "60px" },
              { field: "description", title: "Description" , width: "180px"},
              { field: "type", title: "Type" , width: "300px"}
          ]
      });
      
      
    this.kendoGridContent_ = this.kendoGrid_.find('.k-grid-content');
    this.calculateLayout();
    
    return;
                
  
};





  



