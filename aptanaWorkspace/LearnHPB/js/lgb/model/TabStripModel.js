goog.provide('lgb.model.TabStripModel');

goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.TabStripModel = function(tabModelArray) {

  /**@const */
  //this._NAME = 'lgb.model.TabStripModel';
  
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
goog.inherits(lgb.model.TabStripModel, lgb.model.BaseModel);