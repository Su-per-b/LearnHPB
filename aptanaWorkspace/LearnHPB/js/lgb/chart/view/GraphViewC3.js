goog.provide('lgb.chart.view.GraphViewC3');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.model.GraphModel');
goog.require('lgb.chart.controller.PathController');

goog.require('lgb.chart.model.PathModel');
goog.require('lgb.chart.view.PathView');


/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.chart.view.GraphViewC3 = function(dataModel) {
    
  this.idx = lgb.chart.view.GraphViewC3.idx++;
  
  this.clipPathID_ = 'GraphView-clippath' + this.idx;
  
  this._TITLE = dataModel.getTitle();
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.chart.view.GraphViewC3, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphViewC3.prototype.bind_ = function() {
    
    this.listenForChange_('columns');
    
};



lgb.chart.view.GraphViewC3.prototype.onChange_columns_ = function(columns) {

    //this.c3Chart_
    var columns = this.dataModel.getColumns();
    
    this.c3Chart_.load({
          columns: columns
    });
    
    
    return;
};





lgb.chart.view.GraphViewC3.prototype.updatePath_ = function(pathController) {
    
    pathController.update(this.transformValue_);
    
};




lgb.chart.view.GraphViewC3.prototype.calculateLayout = function(arg) {
    


    var size = this.getSize();
    
    this.c3Chart_.resize(size);
    
    return;
};



lgb.chart.view.GraphViewC3.prototype.getSize = function() {
    
    var parentElement = this.getParentElement();
    var parentX2 =  parentElement.parent();
      
    var width = parentX2.width() - lgb.chart.view.GraphViewC3.widthOffset;
    var height = parentX2.height() - lgb.chart.view.GraphViewC3.heightOffset;
    
    var size = {
        width: width,
        height: height
    };
    
    return size;
    
};




lgb.chart.view.GraphViewC3.prototype.injectInto = function(parentElement) {
  

    goog.base(this,  'injectInto', parentElement);
    
    var columns = this.dataModel.getColumns();
    var size = this.getSize();
    
    this.c3Chart_ = c3.generate({
        bindto: parentElement[0],
        size: size,
        data: {
            x: 'x',
            columns: columns
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%H:%M', //axis_x_tick_format
                }
            }
        },
        subchart: {
            show: true
        },
        padding: {
            top: 4, //padding_top
            left: 22
        },
        tooltip: {
           // format: {
               // title: '%y %H:%M'
           // }
        }
    });
    
    
    this.each(this.c3Chart_.internal.data.targets, this.tagOneTarget_);
    


  
    this.bind_();
};





lgb.chart.view.GraphViewC3.prototype.tagOneTarget_ = function(target) {

    target.unit = "°C";
    
    return;
    
};


lgb.chart.view.GraphViewC3.prototype.getTransformValue = function() {

    return this.transformValue_;
    
};





lgb.chart.view.GraphViewC3.idx = 0;
lgb.chart.view.GraphViewC3.heightOffset = 40;
lgb.chart.view.GraphViewC3.widthOffset = 10;




