goog.provide('lgb.chart.view.GraphView');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.model.GraphModel');
goog.require('lgb.chart.controller.PathController');

goog.require('lgb.chart.model.PathModel');



/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.chart.view.GraphView = function(dataModel) {
    
  this.idx = lgb.chart.view.GraphView.idx++;
  
  this.clipPathID_ = 'GraphView-clippath' + this.idx;
  
  this._TITLE = dataModel.getTitle();
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.chart.view.GraphView, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphView.prototype.bind_ = function() {
    
    this.listenForChange_('columns');
    
};



lgb.chart.view.GraphView.prototype.onChange_columns_ = function(columns) {

    var columns = this.dataModel.getColumns();
    
    this.c3Chart_.load({
          columns: columns
    });
    
    
    return;
};





lgb.chart.view.GraphView.prototype.updatePath_ = function(pathController) {
    
    pathController.update(this.transformValue_);
    
};




lgb.chart.view.GraphView.prototype.calculateLayout = function(arg) {
    
    var size = this.getSize();
    this.c3Chart_.resize(size);
    
    return;
};



lgb.chart.view.GraphView.prototype.getSize = function() {
    
    var parentElement = this.getParentElement();
    var parentX2 =  parentElement.parent();
      
    var width = parentX2.width() - lgb.chart.view.GraphView.widthOffset;
    var height = parentX2.height() - lgb.chart.view.GraphView.heightOffset;
    
    var size = {
        width: width,
        height: height
    };
    
    return size;
    
};




lgb.chart.view.GraphView.prototype.injectInto = function(parentElement) {
  

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
        }
    });
    
    
    this.each(this.c3Chart_.internal.data.targets, this.tagOneTarget_);
    
    this.bind_();
};





lgb.chart.view.GraphView.prototype.tagOneTarget_ = function(target) {

    target.unit = "°C";

};


lgb.chart.view.GraphView.prototype.getTransformValue = function() {
    return this.transformValue_;
};



lgb.chart.view.GraphView.idx = 0;
lgb.chart.view.GraphView.heightOffset = 40;
lgb.chart.view.GraphView.widthOffset = 10;




