goog.provide('lgb.gui.controller.LeftPanelGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.controller.TestController');
goog.require('lgb.gui.controller.ScenarioController');
goog.require('lgb.gui.controller.BuildingGUIController');
goog.require('lgb.gui.controller.SimulationStateControlController');

goog.require('lgb.gui.view.LeftPanelGUI');
goog.require('lgb.gui.model.BaseInputModel');
goog.require('lgb.gui.view.BottomPanelGUI');

lgb.gui.controller.LeftPanelGUIController = function() {

  lgb.core.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.gui.controller.LeftPanelGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.LeftPanelGUIController.prototype.init_ = function() {

  this.dataModel = new lgb.gui.model.BaseInputModel();
  
  this.scenarioController_ = this.makeChildController_(lgb.gui.controller.ScenarioController);
  this.buildingGUIController_ = this.makeChildController_(lgb.gui.controller.BuildingGUIController);
  this.simulationStateControlController_ = this.makeChildController_(lgb.gui.controller.SimulationStateControlController);
  this.testController_ = this.makeChildController_(lgb.gui.controller.TestController);

  this.leftPanelGUI_ = new lgb.gui.view.LeftPanelGUI(this.dataModel);

  this.bind_();
  
  this.leftPanelGUI_.init();
  this.trigger(e.RequestAddToLayout, this.leftPanelGUI_);
  
  this.scenarioController_.init();
  this.buildingGUIController_.init();
  this.testController_.init();


};


lgb.gui.controller.LeftPanelGUIController.prototype.bind_ = function() {


  this.listenTo(
    this.childControllers_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
};


lgb.gui.controller.LeftPanelGUIController.prototype.onRequestAddToParentGUI_ = function(event) {

  this.leftPanelGUI_.add(event.payload);

};


/**
 * @private
 */
lgb.gui.controller.LeftPanelGUIController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.leftPanelGUI_.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

