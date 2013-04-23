goog.provide('sim.model.TabStripModel');

goog.require('sim.model.ModelBase');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
sim.model.TabStripModel = function(tabModelArray) {

  /**@const */
  this._NAME = 'sim.model.TabStripModel';
  
  /**@const */
  this._TITLE = 'TabStripModel';
  

  
  if (undefined === tabModelArray || tabModelArray.length == 0) {
      
    this.tab1 = {
                    title: "{title}",
                    cssClass: "",
                    content: "{content}"
            };
 
 
            
    this.dataSource = [this.tab1];
      
  } else {
      
      var len = tabModelArray.length;
      this.dataSource = [];
      
      for (var i=0; i < len; i++) {
          
        var tabModel = tabModelArray[i];
        
        var obj = {
            title: tabModel.title,
            content: tabModel.content,
            cssClass: tabModel.cssClass
        };
        
        this.dataSource.push(obj);
        
      };
      
  }
  

  
};
goog.inherits(sim.model.TabStripModel, sim.model.ModelBase);