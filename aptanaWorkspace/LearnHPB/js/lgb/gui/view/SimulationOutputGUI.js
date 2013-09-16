goog.provide('lgb.gui.view.SimulationOutputGUI');


lgb.gui.view.SimulationOutputGUI = function(dataModel) {

  this._TITLE = 'Output';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 70;
};
goog.inherits(lgb.gui.view.SimulationOutputGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.SimulationOutputGUI.prototype.init = function() {

/*
  this.dataSource = new lgb.component.TabStripDaSource('simulationInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(thista.dataSource);


  this.tabTitleMap_ = {};*/

/*
    this.listenForChange_('xmlParsedInfo');
    this.listenForChange_('scalarValueResults');

    this.listenForChange_('webSocketConnectionState');
    this.listenForChange_('simStateNative');*/
   
   
    
    this.listenForChange_('scalarValueResults');
    this.listenForChange_('xmlParsedInfo');
    
    this.triggerLocal(e.RequestAddToParentGUI);
    
    
};


lgb.gui.view.SimulationOutputGUI.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
 // var el = this.getMainElement();
  //el.append(  messageStruct.msgText + '<br />');
  
  var output_= xmlParsedInfo.scalarVariablesAll_.output_;
  var internal_= xmlParsedInfo.scalarVariablesAll_.internal_;
  var input_= xmlParsedInfo.scalarVariablesAll_.input_;
  
  this.makeTable_(xmlParsedInfo.scalarVariablesAll_.output_.realVarList_);
  
  return;
};


lgb.gui.view.SimulationOutputGUI.prototype.onChange_scalarValueResults_ = function(messageStruct) {
  
 // var el = this.getMainElement();
  //el.append(  messageStruct.msgText + '<br />');
  
  return;
};



lgb.gui.view.SimulationOutputGUI.prototype.calculateLayout = function() {
  
  var p = this.getParentElement();
  var gp = p[0].parentElement;
  var paneHeight = gp.clientHeight;
  
  var contentHeight = paneHeight - this.totalHeaderHeight_;
  var cssStr = contentHeight + 'px';
  
  this.kendoGridContent_.css("height", cssStr);
     

};



lgb.gui.view.SimulationOutputGUI.prototype.injectTo = function(parentElement) {
  

  goog.base(this,  'injectTo', parentElement);

  
};



lgb.gui.view.SimulationOutputGUI.prototype.makeTable_ = function(varList) {
  

  var dataSource = {
              data: varList,
              schema: {
                  model: {
                      fields: {
                          causality_: { type: "number" },
                          description_: { type: "string" },
                          idx_: { type: "number" },
                          name_: { type: "string" },
                          type: { type: "string" },
                          valueReference_: { type: "number" },
                          variability_: { type: "number" }
                      }
                  }
              }

        };
        
        
      var el = this.getMainElement();
   
      this.kendoGrid_ = el.kendoGrid({
          dataSource: dataSource,
          scrollable: true,
          sortable: true,
          filterable: false,
          columns: [
              { field: "idx_", title: "Idx" , width: "40px"},
              { field: "name_", title: "Name", width: "60px" },
              { field: "description_", title: "Description" , width: "140px"},
              { field: "type", title: "Type" , width: "300px"},
              { field: "valueReference_", title: "Value Ref" , width: "60px"},
              { field: "variability_", title: "Variability" , width: "60px"}
          ]
      });
      
    this.kendoGridContent_ = this.kendoGrid_.find('.k-grid-content');
    this.calculateLayout();  
      
};







