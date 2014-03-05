goog.provide('lgb.gui.controller.TopMenuController');

goog.require('lgb.core.BaseController');

goog.require('lgb.gui.model.TopMenuModel');
goog.require('lgb.gui.view.TopMenuGUI');


lgb.gui.controller.TopMenuController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.TopMenuController, lgb.core.BaseController);

/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.TopMenuController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.TopMenuModel();
  this.guiView = new lgb.gui.view.TopMenuGUI(this.dataModel);
  
  this.bind_();
  
  this.guiView.init();
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);


};

lgb.gui.controller.TopMenuController.prototype.bind_ = function() {


  this.relay (this.guiView, e.RequestLayoutVisibilityChange );
  
  //this.relay(this.guiView, e.RequestAddToLayout );
  //this.relayLocal(this.guiView, e.RequestAddToParentGUI );
  
  this.listen(e.RequestAddToLayout, this.onRequestAddToLayout_);
};



lgb.gui.controller.TopMenuController.prototype.onRequestAddToLayout_ = function(event) {
  
    this.dataModel.add(event.payload);
    
};






