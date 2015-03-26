goog.provide('lgbCharting.gui.controller.BottomPanelGUIController_03');

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
lgbCharting.gui.controller.BottomPanelGUIController_03 = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgbCharting.gui.controller.BottomPanelGUIController_03, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgbCharting.gui.controller.BottomPanelGUIController_03.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BottomPanelGUI(this.dataModel);
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.init2_();
};



lgbCharting.gui.controller.BottomPanelGUIController_03.prototype.init2_ = function() {
  
   this.graphModelC3List = [];
    
   this.makeGraph('ZN1', ['y_ZN_1', 'y_SYS_1', 'u_ZN_1', 'u_ZN_2']);
   this.makeGraph('ZN2', ['y_ZN_5', 'y_SYS_1', 'u_ZN_5', 'u_ZN_6']);
   this.makeGraph('ZN3', ['y_ZN_9', 'y_SYS_1', 'u_ZN_9', 'u_ZN_10']);
   this.makeGraph('ZN4', ['y_ZN_13', 'y_SYS_1', 'u_ZN_13', 'u_ZN_14']);
   this.makeGraph('ZN5', ['y_ZN_17', 'y_SYS_1', 'u_ZN_17', 'u_ZN_18']);
   this.makeGraph('ZN6', ['y_ZN_21', 'y_SYS_1', 'u_ZN_21', 'u_ZN_22']);
   this.makeGraph('ZN7', ['y_ZN_25', 'y_SYS_1', 'u_ZN_25', 'u_ZN_26']);
   this.makeGraph('ZN8', ['y_ZN_29', 'y_SYS_1', 'u_ZN_29', 'u_ZN_30']);
   this.makeGraph('ZN9', ['y_ZN_33', 'y_SYS_1', 'u_ZN_33', 'u_ZN_34']);

};

lgbCharting.gui.controller.BottomPanelGUIController_03.prototype.makeGraph = function(title, varList) {
  
   var dateStart = new Date(2000,5,30,9,40,00,0);
   
   var graphGUIModel = new lgb.chart.model.GraphModel();
   graphGUIModel.setTitle(title);
   
   graphGUIModel.setDomainX2(dateStart, 20);
   
   
    var dateObj = new Date(2000,5,30,9,40,00,0);
    var ms = dateObj.getTime();
    
    for ( i = 0; i < count; i++) {
        var latestDateObj = new Date(ms + (120000 * i));
        this.dateList_.push(latestDateObj);
    }
    
   var count = 40;
    
   var len = varList.length;
   for (var i=0; i < len; i++) {
     
      var name = varList[i];
      var pathModel = new lgb.chart.model.PathModel(i);
      pathModel.setName(name);
      pathModel.setDomainY(5, 25);
      
      graphGUIModel.addPathModel(pathModel);
   };


   graphGUIModel.makeRandomData(count);
   this.graphModelC3List.push(graphGUIModel);
   
   
   this.makeChildGUIcontroller_
     (lgbCharting.chart.controller.GraphController, graphGUIModel);
   
   return graphGUIModel;
};








