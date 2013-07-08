/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.TopMenuGUI');


goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.Config');



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
  
    this.kendoMenu_.bind('select', this.d(this.onSelect_));
  
};



lgb.view.TopMenuGUI.prototype.onSelect_ = function(event) {
  

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


lgb.view.TopMenuGUI.prototype.onChange = function(event) {
  
  
  this.kendoMenu_.setOptions(
    {
      dataSource:this.dataModel.ds
    }
  );
  
  
};



