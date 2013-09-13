/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.RoofTopController');

goog.require('lgb.core.BaseController');
goog.require('lgb.world.model.RoofTopModel');
goog.require('lgb.world.view.RoofTopView');


/**
 * MVC controller for the RoofTopController
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.RoofTopController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.world.controller.RoofTopController, lgb.core.BaseController);

/**
 * @private
 */
lgb.world.controller.RoofTopController.prototype.init = function() {

  this.dataModel = new lgb.world.model.RoofTopModel();
  this.view = new lgb.world.view.RoofTopView(this.dataModel);

  this.view.init();
  this.bind_();
};





lgb.world.controller.RoofTopController.prototype.bind_ = function() {

  this.relay(this.view, 
      [
        e.VisibilityNodesLoaded,
        e.ViewpointNodesLoaded,
        e.SelectableLoaded
      ]
    );

  this.relayLocal(this.view, e.AddToWorldRequest);
  
};

