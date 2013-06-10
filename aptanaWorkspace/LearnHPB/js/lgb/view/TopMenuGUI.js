/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.TopMenuGUI');


goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.TopMenuGUI = function(dataModel) {

  this._TITLE = "TopMenu";
  this.layoutID = lgb.Config.LAYOUT_ID.TopMenu;
  lgb.view.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.TopMenuGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.TopMenuGUI.prototype.init = function() {


  var el = this.getMainElement();
  
  this.kendoMenu_ =        
      el.kendoMenu().data("kendoMenu");
        
  
  this.kendoMenu_.setOptions(
    {
      dataSource:this.dataModel.ds
    }
  );
  
  
  this.bind_();
  
  this.triggerLocal(e.RequestAddToLayout, this);
  
};


lgb.view.TopMenuGUI.prototype.bind_ = function() {
  
}