goog.provide('sim.view.TabStripView');

goog.require('sim.view.ViewBase');



sim.view.TabStripView = function(dataModel) {
  sim.view.ViewBase.call(this, dataModel);

  this._NAME = 'sim.view.TabStrip';
  
};
goog.inherits(sim.view.TabStripView, sim.view.ViewBase);


/**
 * @public
 */
sim.view.TabStripView.prototype.init = function() {
 

    this.injectHtml_();
}





/**
 * @private
 */
sim.view.TabStripView.prototype.injectHtml_ = function() {

     var element = $('<div>');
     
     var tabStrip1 = element
     .attr('id', "#tabstrip-input-2")
     .kendoTabStrip( 
         {
            dataTextField: "text",
            dataSpriteCssClass: "spriteCssClass",
            dataContentField: "content",
            dataSource: this.dataModel.dataSource
        }
        )
    .data("kendoTabStrip");
    
    
    //tabStrip1.insertAfter(
      //  { text: "New Tab" },
      //  tabStrip1.tabGroup.children("li:last")
    //);

    
    element.appendTo('body'); 
                    
      

};
