goog.provide('sim.model.TabModel');

goog.require('sim.model.ModelBase');


/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
sim.model.TabModel = function(title, content, cssClass) {

  /**@const */
  this._NAME = 'sim.model.TabModel';
  
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
goog.inherits(sim.model.TabModel, sim.model.ModelBase);





/**
 * @param {String} text
 */
sim.model.TabModel.prototype.addChildTabStrip = function(childTabStrip) {
    
    
    this.childTabStrip = childTabStrip;
  
  
};

