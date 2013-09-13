/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.TopMenuGUI');


goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.core.Config');



lgb.gui.view.TopMenuGUI = function(dataModel) {

  this._TITLE = "TopMenu";
  lgb.gui.view.BaseViewGUI.call(this, dataModel);
  
  this.listenForChange_('ds');

};
goog.inherits(lgb.gui.view.TopMenuGUI, lgb.gui.view.BaseViewGUI);




lgb.gui.view.TopMenuGUI.prototype.onChange_ds_ = function(ds) {
 
  this.kendoMenu_.setOptions(
    {
      dataSource:ds
    }
  );
  
};



/**
 * Initializes the View
 */
lgb.gui.view.TopMenuGUI.prototype.init = function() {


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


lgb.gui.view.TopMenuGUI.prototype.bind_ = function() {
  
    this.kendoMenu_.bind('select', this.d(this.onSelect_));
  
};



lgb.gui.view.TopMenuGUI.prototype.onSelect_ = function(event) {
  

    var item = event.item;
    var title = item.textContent;

    //var i = item.attributes.item();
    
        
   if (title != "TopMenu" &&
       title != "Profiles"
    ) {
   
      var guiView = this.dataModel.getGuiView(title);
      
      if(guiView == null) {
        return;
      }

      
      this.dataModel.toggleCheck(title);
      this.triggerLocal(e.RequestLayoutVisibilityChange, guiView);
     
   }

  
};





