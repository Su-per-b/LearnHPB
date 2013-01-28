goog.provide('sim.model.TabStripModel');

goog.require('sim.model.ModelBase');


/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
sim.model.TabStripModel = function() {

  /**@const */
  this._NAME = 'sim.model.TabStripModel';
  
  /**@const */
  this._TITLE = 'TabStripModel';
  

  
    this.tab1 = {
                    text: "INPUTS",
                    spriteCssClass: "tabA",
                    content: "Brazil, officially the Federative Republic of Brazil, is the largest country in South America. It is the world's fifth largest country, both by geographical area and by population with over 192 million people. It is the only Portuguese-speaking country in the Americas and the largest lusophone country in the world."
            };
 
 
    this.tab2 = {
                    text: "INPUTS2",
                    spriteCssClass: "tabA",
                    content: "Brazil, officially the Federative Republic of Brazil, is the largest country in South America. It is the world's fifth largest country, both by geographical area and by population with over 192 million people. It is the only Portuguese-speaking country in the Americas and the largest lusophone country in the world."
            };
            
    this.dataSource = [this.tab1,this.tab2 ];
  
};
goog.inherits(sim.model.TabStripModel, sim.model.ModelBase);