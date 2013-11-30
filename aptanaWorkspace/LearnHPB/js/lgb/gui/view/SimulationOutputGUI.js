goog.provide('lgb.gui.view.SimulationOutputGUI');


lgb.gui.view.SimulationOutputGUI = function(dataModel) {

  this._TITLE = 'Output';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 70;
  this.isDirty_ = false;
  this.blockUpdates_ = false;
};
goog.inherits(lgb.gui.view.SimulationOutputGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.SimulationOutputGUI.prototype.init = function() {


    this.listenForChange_('scalarValueResults');
    this.listenForChange_('xmlParsedInfo');
    
    this.triggerLocal(e.RequestAddToParentGUI);
    
    
};



lgb.gui.view.SimulationOutputGUI.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.makeTable_(xmlParsedInfo.scalarVariablesAll_.output_.realVarList_);
  
};


lgb.gui.view.SimulationOutputGUI.prototype.onChange_scalarValueResults_ = function(scalarValueResults) {
  
  this.processUpdate_(scalarValueResults.output.realList);
  
};



lgb.gui.view.SimulationOutputGUI.prototype.processUpdate_ = function(varList) {
  
  this.eachIdx(varList, this.updateRowData_);
  
  if (false == this.blockUpdates_) {
      this.blockUpdates_ = true;
      this.updateAll_();
      setInterval(this.d(this.checkUpdate_),1000);
  }
};


lgb.gui.view.SimulationOutputGUI.prototype.updateRowData_ = function(row, idx) {
  
  this.gridDS_.options.data[idx].value = row.value_.toFixed(4);
    
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



lgb.gui.view.SimulationOutputGUI.prototype.injectTo = function(parentElement) {
  

  goog.base(this,  'injectTo', parentElement);

  
};





lgb.gui.view.SimulationOutputGUI.prototype.checkUpdate_ = function() {
  
  this.blockUpdates_ = false;


  if (true == this.isDirty_) {
      this.blockUpdates_ = true;
      this.updateAll_();
      setInterval(this.d(this.checkUpdate_),1000);
  }
  
    
};

lgb.gui.view.SimulationOutputGUI.prototype.updateAll_ = function() {
  
  this.gridDS_.read();
  this.isDirty_ = false;
};




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
                          value: { type: "number" },
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
              { field: "value", title: "Value", width: "60px" },
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







