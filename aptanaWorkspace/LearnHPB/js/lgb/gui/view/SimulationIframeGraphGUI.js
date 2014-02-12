goog.provide('lgb.gui.view.SimulationIframeGraphGUI');


lgb.gui.view.SimulationIframeGraphGUI = function(dataModel) {

  this._TITLE = 'Graph-Iframe';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 70;
  this.isDirty_ = false;
  this.blockUpdates_ = false;
};
goog.inherits(lgb.gui.view.SimulationIframeGraphGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.SimulationIframeGraphGUI.prototype.init = function() {

   // this.listenForChange_('scalarValueResultsConverted');
    //this.listenForChange_('xmlParsedInfo');
    
    this.data_ = [18,19];
        
    this.triggerLocal(e.RequestAddToParentGUI);
      this.makeGraph_(   );

};



lgb.gui.view.SimulationIframeGraphGUI.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.realVarList_ = xmlParsedInfo.scalarVariablesAll_.output_.realVarList_;
  
  var len = this.realVarList_.length;
  for (var i=0; i < len; i++) {
    if (this.realVarList_[i].unit_ == "K") {
      this.realVarList_[i].unit_ = "C";
    }
  };
  

  
};


lgb.gui.view.SimulationIframeGraphGUI.prototype.onChange_scalarValueResultsConverted_ = function(scalarValueResultsConverted) {
  
  var realList = scalarValueResultsConverted.output.realList;
  var newRecord = { time: scalarValueResultsConverted.time_};
  
  var testTempRealVo = scalarValueResultsConverted.output.realList[7];
  
 // var element = this.getMainElement();
  
  //element.empty();
  //this.data_.push(testTempRealVo.value_);
    
  //this.makeGraph2_(   );
    
  return;
  

};





lgb.gui.view.SimulationIframeGraphGUI.prototype.calculateLayout = function(theVar) {
  


    this.setGraphSize_();
  

        
    return;
};


lgb.gui.view.SimulationIframeGraphGUI.prototype.injectTo = function(parentElement) {
  
  this.graphContainerDiv_ = this.makeDiv();
  this.graphContainerDiv_.append('<p >SimulationIframeGraphGUI</p>');
  
  this.graphContainerDiv_.append('<iframe src="https://www.tradingview.com/embed/WJj4MnAo" width="640" height="400" frameborder="0"></iframe>');
  
  
 // this.graphContainerDiv_.append('<iframe src="https://platform.twitter.com/widgets/tweet_button.html" style="border: 0; width:700px; height:500px;"></iframe>');

  this.append(this.graphContainerDiv_);
  
  
  goog.base(this, 'injectTo', parentElement);
  


};








lgb.gui.view.SimulationIframeGraphGUI.prototype.setGraphSize_ = function() {



        

};

lgb.gui.view.SimulationIframeGraphGUI.prototype.makeGraph2_ = function() {
	
	//this.moveChart.data(this.data_);
	//this.moveChart.redraw();
	return;
};

lgb.gui.view.SimulationIframeGraphGUI.prototype.makeGraph_ = function() {
  
  
      


};







