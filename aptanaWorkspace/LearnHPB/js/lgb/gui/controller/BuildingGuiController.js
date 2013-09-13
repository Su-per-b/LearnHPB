goog.provide('lgb.gui.controller.BuildingGuiController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BuildingInputGUI');
goog.require('lgb.gui.model.BaseInputModel');

goog.require('lgb.world.controller.input.BuildingGuiSubController');




lgb.gui.controller.BuildingGuiController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.gui.controller.BuildingGuiController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.BuildingGuiController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseInputModel();
  this.guiView = new lgb.gui.view.BuildingInputGUI(this.dataModel);
  
  this.subControllerList_ = [];
    
  this.bind_();
  this.guiView.init();
  
  this.makeSubController_('General');
  this.makeSubController_('Lighting');
  this.makeSubController_('Daylighting');
  this.makeSubController_('Enclosure');
  this.makeSubController_('HVAC');

};


lgb.gui.controller.BuildingGuiController.prototype.makeSubController_ = function(title) {

  var subController = new lgb.world.controller.input.BuildingGuiSubController(title);
  this.listenTo(subController, e.RequestAddToParentGUI, this.onRequestAddToParentGUI_);
  this.subControllerList_.push(subController);
  subController.init();

};

lgb.gui.controller.BuildingGuiController.prototype.bind_ = function() {
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
  
};




lgb.gui.controller.BuildingGuiController.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};



lgb.gui.controller.BuildingGuiController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

