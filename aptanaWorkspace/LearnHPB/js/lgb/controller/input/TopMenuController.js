goog.provide('lgb.controller.input.TopMenuController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.input.TopMenuModel');
goog.require('lgb.view.input.TopMenuGUI');


lgb.controller.input.TopMenuController = function() {

  lgb.controller.BaseController.call(this);

  this.init_();
};
goog.inherits(lgb.controller.input.TopMenuController, lgb.controller.BaseController);

/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.input.TopMenuController.prototype.init_ = function() {

  this.dataModel = new lgb.model.input.TopMenuModel();
  this.guiView = new lgb.view.input.TopMenuGUI(this.dataModel);
  
  this.bind_();
  this.guiView.init();

  return;
};

lgb.controller.input.TopMenuController.prototype.bind_ = function() {


  this.relay (this.guiView, e.RequestLayoutVisibilityChange );
  this.relay (this.guiView, e.RequestAddToLayout );

  this.listen(e.RequestAddToLayout, this.onRequestAddToLayout_);
  
};



lgb.controller.input.TopMenuController.prototype.onRequestAddToLayout_ = function(event) {
  
    this.dataModel.add(event.payload);
    
};





