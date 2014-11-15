goog.provide('lgbCharting.gui.controller.BottomPanelGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BottomPanelGUI');
goog.require('lgb.gui.model.BaseGuiModel');


goog.require('lgb.chart.controller.GraphControllerC3');
goog.require('lgb.chart.model.GraphModelC3');



/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgbCharting.gui.controller.BottomPanelGUIController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgbCharting.gui.controller.BottomPanelGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgbCharting.gui.controller.BottomPanelGUIController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BottomPanelGUI(this.dataModel);
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.init2_();
};



lgbCharting.gui.controller.BottomPanelGUIController.prototype.init2_ = function() {
  
   this.graphModelC3List = [];
    
   this.makeGraphC3('ZN1', ['y_ZN_1', 'y_SYS_1', 'u_ZN_1', 'u_ZN_2']);
   // this.makeGraphC3('ZN2', ['y_ZN_5', 'y_SYS_1', 'u_ZN_5', 'u_ZN_6']);
   // this.makeGraphC3('ZN3', ['y_ZN_9', 'y_SYS_1', 'u_ZN_9', 'u_ZN_10']);
   // this.makeGraphC3('ZN4', ['y_ZN_13', 'y_SYS_1', 'u_ZN_13', 'u_ZN_14']);
   // this.makeGraphC3('ZN5', ['y_ZN_17', 'y_SYS_1', 'u_ZN_17', 'u_ZN_18']);
   // this.makeGraphC3('ZN6', ['y_ZN_21', 'y_SYS_1', 'u_ZN_21', 'u_ZN_22']);
   // this.makeGraphC3('ZN7', ['y_ZN_25', 'y_SYS_1', 'u_ZN_25', 'u_ZN_26']);
   // this.makeGraphC3('ZN8', ['y_ZN_29', 'y_SYS_1', 'u_ZN_29', 'u_ZN_30']);
   // this.makeGraphC3('ZN9', ['y_ZN_33', 'y_SYS_1', 'u_ZN_33', 'u_ZN_34']);
   
 
   this.makeChildGUIcontroller_
     (lgb.chart.controller.GraphControllerC3, this.graphModelC3List[0]);
     
};

lgbCharting.gui.controller.BottomPanelGUIController.prototype.makeGraphC3 = function(title, varList) {
  
   var dateStart = new Date(2000,5,30,9,40,00,0);
   
   var graphGUIModel = new lgb.chart.model.GraphModelC3();
   graphGUIModel.setTitle(title);
   graphGUIModel.setDomainY(5, 30);
   
   graphGUIModel.setDomainX2(dateStart, 20);
   
   var len = varList.length;
   for (var i=0; i < len; i++) {
      graphGUIModel.makePathModel(varList[i]);
   };

   graphGUIModel.makeRandomData(20);
   this.graphModelC3List.push(graphGUIModel);
   
   return graphGUIModel;
};
