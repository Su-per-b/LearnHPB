goog.provide('lgb.gui.controller.ScenarioInputController');

goog.require('lgb.core.BaseController');

goog.require('lgb.gui.model.BaseInputModel');
goog.require('lgb.scenario.model.Bs2');
goog.require('lgb.scenario.model.SystemList');

goog.require('lgb.gui.view.ScenarioInputGUI');
goog.require('lgb.scenario.view.SystemList');

goog.require('lgb.scenario.model.SystemList');


lgb.gui.controller.ScenarioInputController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.gui.controller.ScenarioInputController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.ScenarioInputController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseInputModel();

  this.guiView = new lgb.gui.view.ScenarioInputGUI(this.dataModel);
  this.bind_();
  this.guiView.init();
  
};


lgb.gui.controller.ScenarioInputController.prototype.bind_ = function() {

  this.listen(
    e.ScenarioParsed2,
    this.onScenarioParsed2_
  );

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);


};


lgb.gui.controller.ScenarioInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.gui.controller.ScenarioInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};



lgb.gui.controller.ScenarioInputController.prototype.onScenarioParsed2_ = function(event) {
  

  var systemListDataModel = event.payload;
  var systemListView = new lgb.scenario.view.SystemList (systemListDataModel, true);
  
  this.guiView.add(systemListView);


  
};

