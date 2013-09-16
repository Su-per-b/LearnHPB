goog.provide('lgb.gui.controller.BuildingGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BuildingGUI');
goog.require('lgb.gui.model.BaseInputModel');

goog.require('lgb.gui.controller.BuildingGUISubController');




lgb.gui.controller.BuildingGUIController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.gui.controller.BuildingGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.BuildingGUIController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseInputModel();
  this.guiView = new lgb.gui.view.BuildingGUI(this.dataModel);
  
  this.subControllerList_ = [];
    
  this.bind_();
  this.guiView.init();
  
  this.makeSubController_('General');
  this.makeSubController_('Lighting');
  this.makeSubController_('Daylighting');
  this.makeSubController_('Enclosure');
  this.makeSubController_('HVAC');

};


lgb.gui.controller.BuildingGUIController.prototype.makeSubController_ = function(title) {

  var subController = new lgb.gui.controller.BuildingGUISubController(title);
  this.listenTo(subController, e.RequestAddToParentGUI, this.onRequestAddToParentGUI_);
  this.subControllerList_.push(subController);
  subController.init();
  
  

};

lgb.gui.controller.BuildingGUIController.prototype.bind_ = function() {
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
  
};




lgb.gui.controller.BuildingGUIController.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};



lgb.gui.controller.BuildingGUIController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

