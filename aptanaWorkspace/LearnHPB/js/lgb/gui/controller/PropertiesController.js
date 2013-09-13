
goog.provide('lgb.gui.controller.PropertiesController');


goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.PropertiesGreenGUI');
goog.require('lgb.gui.view.PropertiesButtonGreenGUI');


/**@extends lgb.core.BaseController
 */
lgb.gui.controller.PropertiesController = function() {

  lgb.core.BaseController.call(this);
    this.init_();
};
goog.inherits(lgb.gui.controller.PropertiesController,lgb.core.BaseController);


lgb.gui.controller.PropertiesController.prototype.init_ = function() {
  this.bind1_();
};


lgb.gui.controller.PropertiesController.prototype.bind1_ = function() {
    this.listenOnce(e.ScenarioParsed, this.onScenarioParsed_);
};

lgb.gui.controller.PropertiesController.prototype.bind2_ = function() {
  
  this.listenTo(this.view,
    e.ViewClosed,
    this.onClosedPanel);
    
  this.listen(
    e.RequestSelectSystemNode,
    this.onRequestSelectSystemNode_);
    
  this.relay(
    this.view,
    e.RequestSelectSystemNode
  );
  
  this.listenTo(this.buttonView,
    e.RequestActivateView,
    this.onRequestActivateView_);

};



lgb.gui.controller.PropertiesController.prototype.onRequestSelectSystemNode_ =
  function(event) {

  var id = event.payload;
  
  if (id == 'NONE') {
    //TODO (Raj) deslect all
  } else {
    this.dataModel.selectId(id);
  }


};


lgb.gui.controller.PropertiesController.prototype.onScenarioParsed_ =
  function(event) {

  this.buttonView = new lgb.gui.view.PropertiesButtonGreenGUI();
  this.buttonView.init();
  
  this.dataModel = event.payload;
  this.view = new lgb.gui.view.PropertiesGreenGUI(this.dataModel);

  this.trigger(e.RequestAddToLayout, this.buttonView);
  this.trigger(e.RequestAddToLayout, this.view);
  
  this.bind2_();
};





/**
 * @param {lgb.core.Event} event The event.
 */
lgb.gui.controller.PropertiesController.prototype.onRequestActivateView_ =
  function(event) {
    
  var showFlag = event.payload;

  this.buttonView.setSelected(showFlag);
  this.view.show(showFlag);
  

  
};




/**
 * @param {lgb.core.Event} event The event.
 */
lgb.gui.controller.PropertiesController.prototype.onClosedPanel =
  function(event) {
    
  this.buttonView.setSelected(false);
  
};
