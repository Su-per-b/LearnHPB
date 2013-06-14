goog.provide('lgb.controller.TopMenuController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.TopMenuModel');
goog.require('lgb.view.TopMenuGUI');


lgb.controller.TopMenuController = function() {

  lgb.controller.BaseController.call(this);

  this.init_();
};
goog.inherits(lgb.controller.TopMenuController, lgb.controller.BaseController);

/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.TopMenuController.prototype.init_ = function() {

  this.dataModel = new lgb.model.TopMenuModel();
  this.guiView = new lgb.view.TopMenuGUI(this.dataModel);
  
  this.bind_();
  this.guiView.init();

  return;
};

lgb.controller.TopMenuController.prototype.bind_ = function() {


  this.relay (this.guiView, e.RequestLayoutVisibilityChange );
  this.relay (this.guiView, e.RequestAddToLayout );

  this.listen(e.RequestAddToLayout, this.onRequestAddToLayout_);
  
};



lgb.controller.TopMenuController.prototype.onRequestAddToLayout_ = function(event) {
  
    this.dataModel.add(event.payload);
    
};





