goog.provide('lgb.gui.controller.TestController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.TestGUI');
goog.require('lgb.gui.model.BaseGuiModel');


lgb.gui.controller.TestController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.gui.controller.TestController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.TestController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();

  this.guiView = new lgb.gui.view.TestGUI(this.dataModel);
  this.bind_();
  this.guiView.init();
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
};


lgb.gui.controller.TestController.prototype.bind_ = function() {

  this.relay(
    this.guiView,
    e.RequestGoToViewpointNode);
    
  this.listen(e.RequestAddToTestingInput, this.onRequestAddToTestingInput_);
    

};


lgb.gui.controller.TestController.prototype.onRequestAddToTestingInput_ = function(event) {
  
    this.guiView.add(event.payload);
  
};