/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.input.TopMenuModel');

goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.input.TopMenuModel = function() {

  this._TITLE = 'TopMenu';
  this.init_();

  this.viewTitleToEnabledMap_ = {};
  this.viewTitleToIdxMap_ = {};
  this.viewTitleToGuiMap_ = {};
  
};
goog.inherits(lgb.model.input.TopMenuModel, lgb.model.BaseModel);


/**
 * Sets default properties.
 * @private
 */
lgb.model.input.TopMenuModel.prototype.init_ = function() {

  this.viewItems_ = [];
                   
 
  this.ds =
      [
          {
              text: "Profiles",
              items: []
          },
          
          {
             text: "View",
             encoded: false,
             items: this.viewItems_
          }
      ];

     
};




lgb.model.input.TopMenuModel.prototype.getGuiView = function(title) {
  
    var guiView = this.viewTitleToGuiMap_[title];
    
    return guiView;
    
};

lgb.model.input.TopMenuModel.prototype.toggleCheck = function(title) {
    

    
    this.viewTitleToEnabledMap_[title] = !this.viewTitleToEnabledMap_[title];
    
    var isCheckeded = this.viewTitleToEnabledMap_[title];
    var idx = this.viewTitleToIdxMap_[title];
    

    
    if (isCheckeded) {
      this.viewItems_[idx].imageUrl = "images/check.png";
    } else {
      this.viewItems_[idx].imageUrl = null;
    }
    
    this.dispatchChangedEx('ds', this.ds);
    

};


lgb.model.input.TopMenuModel.prototype.add = function(guiView) {
    
  var title = guiView.getTitle();
  
  
  
  if (title != 'TopMenu') {
    
    
    if ( this.viewTitleToEnabledMap_.hasOwnProperty(title) ) {
      
      debugger;
  
    } else {
      
      this.viewTitleToEnabledMap_[title] = true;
      
      this.viewItems_.push({ 
        text: '' + title,
        imageUrl: "images/check.png"
      });
      
      this.viewTitleToIdxMap_[title] = this.viewItems_.length - 1;
      this.viewTitleToGuiMap_[title] = guiView;
      
    }
    
    this.dispatchChangedEx('ds', this.ds);
  }

}



