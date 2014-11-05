goog.provide('lgb.chart.view.PathView');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.controller.PathController');

goog.require('lgb.chart.model.PathModel');


/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.chart.view.PathView = function(dataModel) {
    
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
};
goog.inherits(lgb.chart.view.PathView, lgb.gui.view.BaseGUI);



lgb.chart.view.PathView.prototype.bind_= function() {
    
    this.listenForChange_('values');

    
};


lgb.chart.view.PathView.prototype.onChange_values_ = function(values) {
  
    var transformValue = this.dataModel.transformValue;

    this.path
        .attr("d", this.line)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", transformValue);

};



lgb.chart.view.PathView.prototype.injectInto = function(parentElement, scaleX, scaleY) {
    
    this.clipPathGroup_ = parentElement;
    this.scaleX_ = scaleX;
    this.scaleY_ = scaleY;
    
    this.bind_();
    
    this.line = d3.svg.line();
    this.line.interpolate("monotone");

    var that = this;
    
    this.line.x(function(d, i) {
        
        if (undefined == d.date) { 
            debugger;
        }
        
        return that.scaleX_(d.date);
    });


    this.line.y(function(d, i) {
        
        if (undefined == d.value) { 
            debugger;
        }

        var value = d.value;
        
        return scaleY(value);
    });
    
    
    this.path = this.clipPathGroup_.append("path")
        .datum(this.dataModel.values_)
        .attr("class", this.dataModel.getCssClassName())
        .attr("d", this.line);
    
    return;
    
};











