goog.provide('lgb.gui.view.SimulationResultsGUI');


lgb.gui.view.SimulationResultsGUI = function(dataModel) {

  this._TITLE = 'Results';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 94;
  this.isDirty_ = false;
  this.blockUpdates_ = false;
};
goog.inherits(lgb.gui.view.SimulationResultsGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.SimulationResultsGUI.prototype.init = function() {


    this.listenForChange_('scalarValueResultsConverted');
    this.listenForChange_('xmlParsedInfo');
    
    this.triggerLocal(e.RequestAddToParentGUI);
    
    
};



lgb.gui.view.SimulationResultsGUI.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.realVarList_ = xmlParsedInfo.scalarVariablesAll_.output_.realVarList_;
  
  var len = this.realVarList_.length;
  // for (var i=0; i < len; i++) {
    // if (this.realVarList_[i].unit_ == "K") {
      // this.realVarList_[i].unit_ = "C";
    // }
  // };
  
  
  this.makeTable_(  this.realVarList_ );
  
};


lgb.gui.view.SimulationResultsGUI.prototype.onChange_scalarValueResultsConverted_ = function(scalarValueResultsConverted) {
  
  var realList = scalarValueResultsConverted.output.realList;
  var newRecord = { time: scalarValueResultsConverted.time_};
  
  var len = realList.length;
  for (i=0;i<len;i++) {

     varName = this.idxToNameMap_[i];
     newRecord[varName] = realList[i].value_;
  }
  
  var dataItem = this.gridDS_.insert(0, newRecord );
  
  var count = this.gridDS_._data.length;
  if (count  > 500) {

    var model = this.gridDS_.at(count-1);
    this.gridDS_.remove(model);
  }
  
};



lgb.gui.view.SimulationResultsGUI.prototype.calculateLayout = function() {
  
  if (this.kendoGridContent_) {
    
    var p = this.getParentElement();
    var gp = p[0].parentElement;
    var paneHeight = gp.clientHeight;
    
    var contentHeight = paneHeight - this.totalHeaderHeight_;
    var cssStr = contentHeight + 'px';
    
    this.kendoGridContent_.css("height", cssStr);
  }
     

};



lgb.gui.view.SimulationResultsGUI.prototype.injectInto = function(parentElement) {
  

  goog.base(this,  'injectInto', parentElement);

  
};





lgb.gui.view.SimulationResultsGUI.prototype.updateAll_ = function() {
  
  this.gridDS_.read();
  this.isDirty_ = false;
  
};




lgb.gui.view.SimulationResultsGUI.prototype.makeTable_ = function(varList) {
  
  this.idxToNameMap_ ={};
  
  fields = {};
  fields['time'] = { type: "number" };
  
  columns = [];
  columns.push({ field: 'time', title: 'time' , width: "70px"});
  
  var data = {};
  
  
  len = varList.length;
  for (i=0;i<len;i++) {
    
    varName = varList[i].name;
    varName = varName.split('.').join('_');
    varName = varName.split('y_').join('');
    varName = varName.split('[').join('_');
    varName = varName.split(']').join('');
    
    fields[varName] = { type: "number" };
    
    columns.push({ field: varName, title: varName , width: "80px"});
    
    this.idxToNameMap_[i] = varName;
  }
  
  
  var ds = {
              data: {},
              schema: {
                  model: {
                    fields : fields
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
          columnResize: false,
          columns : columns
      });
      
    this.kendoGridContent_ = this.kendoGrid_.find('.k-grid-content');
    this.calculateLayout();
      
};







