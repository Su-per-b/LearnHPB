goog.provide('lgb.chart.view.GraphView');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.model.GraphModel');
goog.require('lgb.chart.controller.PathController');

goog.require('lgb.chart.model.PathModel');
goog.require('lgb.chart.view.PathView');


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



// lgb.chart.view.GraphView.prototype.init = function() {
// 
// 
// };


lgb.chart.view.GraphView.prototype.bind_ = function() {

    this.listenForChange_('y');
    this.listenForChange_('x');
};



lgb.chart.view.GraphView.prototype.onChange_y_ = function(y) {
    
    var domain = this.dataModel.getDomainY();
    
    this.scaleY_.domain(domain); 
    this.axisY_.call(this.axisYc_);
    
    return;
};


lgb.chart.view.GraphView.prototype.onChange_x_ = function(y) {
    
    // redraw the line, and slide it to the left
    var domainX = this.dataModel.getDomainX();
    this.scaleX_.domain(domainX);
        
    this.axisXb_.scale(this.scaleX_)
            .orient("bottom")
            .tickFormat(d3.time.format("%H:%M"));
            
    this.axisX_.call(this.axisXb_);
    
    return;
};



lgb.chart.view.GraphView.prototype.onChange_data_ = function(data) {

    // redraw the line, and slide it to the left
    var domainX = this.dataModel.getDomainX();
    this.scaleX_.domain(domainX);
        
    this.axisXb_.scale(this.scaleX_)
            .orient("bottom")
            .tickFormat(d3.time.format("%H:%M"));
            
    this.axisX_.call(this.axisXb_);
        
    return;
};





lgb.chart.view.GraphView.prototype.updatePath_ = function(pathController) {
    
    pathController.update(this.transformValue_);
    
};




lgb.chart.view.GraphView.prototype.calculateLayout = function() {

    this.contentArea_ = this.calcContentArea_();
    
    this.setSVGsize_();
   
    this.oneTickLeftPixelCount_ = -1 * (this.contentArea_.innerWidth / 20);
    this.transformValue_ = "translate(" + this.oneTickLeftPixelCount_ + ",0)"; 
    
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.dataModel.y.min));
    this.axisX_.attr("transform", axisXTransform);
        
    this.axisYc_.scale(this.scaleY_); 
    this.axisY_.call(this.axisYc_);


};



lgb.chart.view.GraphView.prototype.setSVGsize_ = function() {
    
    this.scaleX_.range([0, this.contentArea_.innerWidth]);
    this.scaleY_.range([this.contentArea_.innerHeight, 0]);
    
    this.svg_.attr("width", this.contentArea_.outerWidth)
        .attr("height", this.contentArea_.outerHeight);
        
    this.rect_.attr("width", this.contentArea_.innerWidth)
        .attr("height", this.contentArea_.innerHeight);
        
};



lgb.chart.view.GraphView.prototype.setScaleDomain_ = function() {
    
    this.scaleX_.domain(this.dataModel.getDomainX());
    this.scaleY_.domain(this.dataModel.getDomainY());
        
};



lgb.chart.view.GraphView.prototype.add = function(guiView) {

  var className = guiView.getClassName();
  
  switch(className ) {
    
    case "PathView": {
      
      guiView.injectInto(this.clipPathGroup_, this.scaleX_, this.scaleY_);
      
      break;
    }
     default: {
      debugger;
    }
     
  }
  
};





lgb.chart.view.GraphView.prototype.getDimensions = function() {
  
    var DIMS = {
        MARGIN : {
            TOP : 40, 
            RIGHT : 40, 
            BOTTOM : 100, 
            LEFT : 40
        },
        
        MIN_WIDTH: 400,
        MIN_HEIGHT: 200
    };
  
    return DIMS;
};



lgb.chart.view.GraphView.prototype.injectInto = function(parentElement) {
  
    this.parent_x2_ = parentElement.parent();
    this.contentArea_ = this.calcContentArea_();

    this.scaleX_  = d3.time.scale();
    this.scaleY_ = d3.scale.linear();
    
    this.setScaleDomain_();
    
    //make svg
    this.svg_ = d3.select(parentElement[0]).append("svg")
        .attr('class', 'd3chart');

    //make mainGroup
    var mainGroupTransform= "translate({0},{1})".format(this.contentArea_.marginLeft, this.contentArea_.marginTop);
    
    this.mainGroup_ = this.svg_
        .append("g")
        .attr("transform", mainGroupTransform);
   
    //make clipPath
    this.defs_ = this.mainGroup_.append("defs");
    
    this.clipPath_ = this.defs_.append("clipPath")
        .attr("id", this.clipPathID_);
        
    this.rect_ = this.clipPath_.append("rect");
    
    this.setSVGsize_();
    
    
    //make axisX
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.dataModel.y.min));
    var axisYcTransform = "translate(0,{0})".format(this.scaleX_(this.dataModel.y.max));
    
    this.axisX_ = this.mainGroup_.append("g")
        .attr("class", "x axis")
        .attr("transform", axisXTransform);
        
       
    this.axisXb_ = d3.svg.axis();
    
    this.axisXb_.scale(this.scaleX_)
            .orient("bottom")
            .tickFormat(d3.time.format("%H:%M"));
            
    this.axisX_.call(this.axisXb_);
   
   
    //make axisY
    this.axisY_ = this.mainGroup_.append("g")
        .attr("class", "y axis");
    
    
    this.axisYc_ = d3.svg.axis();
    
            
    this.axisYc_.scale(this.scaleY_)
            .orient("left");
            
    this.axisY_.call(this.axisYc_);
        
        
    //make clip path
    this.clipPathGroup_ = this.mainGroup_.append("g")
        .attr("clip-path", "url(#" + this.clipPathID_ + ")");

    this.oneTickLeftPixelCount_ = -1 * (this.contentArea_.innerWidth / 20);
    this.transformValue_ = "translate(" + this.oneTickLeftPixelCount_ + ",0)"; 
    
    this.bind_();
    
    return;
};



lgb.chart.view.GraphView.prototype.getTransformValue = function() {

    return this.transformValue_;
    
};



lgb.chart.view.GraphView.prototype.calcContentArea_ = function() {
    
    var DIMS = this.getDimensions();
    
    var containerWidth = this.parent_x2_.width();
    var containerHeight = this.parent_x2_.height();

    if (containerWidth < DIMS.MIN_WIDTH) {
      containerWidth = DIMS.MIN_WIDTH;
    }

    if (containerHeight < DIMS.MIN_HEIGHT) {
      containerHeight = DIMS.MIN_HEIGHT;
    }

    var w = containerWidth - DIMS.MARGIN.LEFT - DIMS.MARGIN.RIGHT;
    var h = containerHeight - DIMS.MARGIN.TOP - DIMS.MARGIN.BOTTOM;
    
    var contentArea = {
        innerWidth:w,
        innerHeight:h,
        outerWidth:containerWidth,
        outerHeight:containerHeight,
        marginLeft:DIMS.MARGIN.LEFT,
        marginTop:DIMS.MARGIN.TOP,
    };
    
    
    return contentArea;
};


lgb.chart.view.GraphView.idx = 0;




