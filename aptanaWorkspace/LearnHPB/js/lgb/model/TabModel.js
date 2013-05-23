goog.provide('lgb.model.TabModel');

goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.TabModel = function(title, content, cssClass) {

  
  /**@const */
  this._TITLE = 'TabModel';
  


  this.content = "Brazil, officially the Federative Republic of Brazil, is the largest country in South America. It is the world's fifth largest country, both by geographical area and by population with over 192 million people. It is the only Portuguese-speaking country in the Americas and the largest lusophone country in the world.";
  
  
  if (undefined !== title) {
      this.title = title;
  } else {
      this.title = "{title}";
  }
    
  if (undefined !== content) {
      this.content = content;
  } else {
      this.content = "{content}";
  }
  
  if (undefined !== cssClass) {
      this.cssClass = cssClass;
  } else {
      this.cssClass = "";
  }
  

};
goog.inherits(lgb.model.TabModel, lgb.model.BaseModel);





/**
 * @param {String} text
 */
lgb.model.TabModel.prototype.addChildTabStrip = function(childTabStrip) {
    
    
    this.childTabStrip = childTabStrip;
  
  
};

