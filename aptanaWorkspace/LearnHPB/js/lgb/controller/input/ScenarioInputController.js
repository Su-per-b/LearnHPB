goog.provide('lgb.controller.input.ScenarioInputController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.input.BaseInputModel');
goog.require('lgb.model.scenario.Bs2');
goog.require('lgb.model.scenario.SystemList');

goog.require('lgb.view.input.ScenarioInputGUI');
goog.require('lgb.view.scenario.SystemList');

goog.require('lgb.model.scenario.SystemList');


lgb.controller.input.ScenarioInputController = function() {

  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.input.ScenarioInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.input.ScenarioInputController.prototype.init = function() {

  this.dataModel = new lgb.model.input.BaseInputModel();

  this.guiView = new lgb.view.input.ScenarioInputGUI(this.dataModel);
  this.bind_();
  this.guiView.init();
  
};


lgb.controller.input.ScenarioInputController.prototype.bind_ = function() {

  this.listen(
    e.ScenarioParsed2,
    this.onScenarioParsed2_
  );

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);


};


lgb.controller.input.ScenarioInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.input.ScenarioInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};



lgb.controller.input.ScenarioInputController.prototype.onScenarioParsed2_ = function(event) {
  

  var systemListDataModel = event.payload;
  var systemListView = new lgb.view.scenario.SystemList (systemListDataModel, true);
  
  this.guiView.add(systemListView);


  
};

