goog.provide('lgbCharting.gui.controller.BottomPanelGUIController_04');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BottomPanelGUI');
goog.require('lgb.gui.model.BaseGuiModel');


goog.require('lgbCharting.chart.controller.GraphController');
goog.require('lgb.chart.model.GraphModel');
goog.require('lgb.chart.model.PathModel');


/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgbCharting.gui.controller.BottomPanelGUIController_04 = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgbCharting.gui.controller.BottomPanelGUIController_04, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgbCharting.gui.controller.BottomPanelGUIController_04.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BottomPanelGUI(this.dataModel);
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  this.intervalMS_ = 500;
  
  this.init2_();
};



lgbCharting.gui.controller.BottomPanelGUIController_04.prototype.init2_ = function() {
  
   this.graphModelC3List = [];
    
   this.makeGraph('ZN1', ['y_ZN_1', 'y_SYS_1', 'u_ZN_1', 'u_ZN_2']);


   this.intervalHandle_ = setInterval(
          this.d(this.addDot),this.intervalMS_);
    
};

lgbCharting.gui.controller.BottomPanelGUIController_04.prototype.addDot = function() {
  
   
   var len = this.graphModelC3List.length;
   for (var i=0; i < len; i++) {
     
      var graphModel = this.graphModelC3List[i];
      graphModel.addDot();
  
   };
   
  
};



lgbCharting.gui.controller.BottomPanelGUIController_04.prototype.makeGraph = function(title, varList) {
  

   var graphGUIModel = new lgb.chart.model.GraphModel();
   graphGUIModel.setTitle(title);
   
   var count = 3;
    
   var len = varList.length;
   for (var i=0; i < len; i++) {
     
      var name = varList[i];
      var pathModel = new lgb.chart.model.PathModel(i);
      pathModel.setName(name);
      
      graphGUIModel.addPathModel(pathModel);
   };

   graphGUIModel.makeRandomData(count);
   this.graphModelC3List.push(graphGUIModel);
   
   this.makeChildGUIcontroller_
     (lgbCharting.chart.controller.GraphController, graphGUIModel);
   

};








