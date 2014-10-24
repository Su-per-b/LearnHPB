goog.provide('lgb.chart.view.GraphGUI_05');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.model.GraphGUImodel');




/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.chart.view.GraphGUI_05 = function(dataModel, chartModel) {

  this._TITLE = 'GraphGUI_05';
  
  this.chartModel = chartModel;
  
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.chart.view.GraphGUI_05, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphGUI_05.prototype.init = function() {

    this.chartModel.init();
    
};





lgb.chart.view.GraphGUI_05.prototype.calculateLayout = function() {

    this.contentArea_ = this.calcContentArea_();
    
    this.setSVGsize_();
   
    this.oneTickLeftPixelCount_ = this.scaleX_(-1);
    this.transformVlaue_ = "translate(" + this.oneTickLeftPixelCount_ + ",0)";  
    
  
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.chartModel.y.min));
    
    this.axisX_.attr("transform", axisXTransform);
        
    this.axisXb_.scale(this.scaleX_); 
    this.axisX_.call(this.axisXb_);
    
    this.axisYb_.scale(this.scaleY_); 
    this.axisY_.call(this.axisYb_);

    
    this.path_.attr("d", this.line_);

};


lgb.chart.view.GraphGUI_05.prototype.updateValues = function() {
    
        
    // redraw the line, and slide it to the left
    this.path_
        .attr("d", this.line_)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", this.transformVlaue_);
   
};


lgb.chart.view.GraphGUI_05.prototype.setSVGsize_ = function() {
    
    this.scaleX_.range([0, this.contentArea_.innerWidth]);
    this.scaleY_.range([this.contentArea_.innerHeight, 0]);
    
    this.svg_.attr("width", this.contentArea_.outerWidth)
        .attr("height", this.contentArea_.outerHeight);
        
    this.rect_.attr("width", this.contentArea_.innerWidth)
        .attr("height", this.contentArea_.innerHeight);
        
};



lgb.chart.view.GraphGUI_05.prototype.setScaleDomain_ = function() {
    
    this.scaleX_.domain(this.chartModel.getDomainX());
    this.scaleY_.domain(this.chartModel.getDomainY());
        
};


lgb.chart.view.GraphGUI_05.prototype.makeLine_ = function() {
    
    var that = this;
    
    //make d3 line
    this.line_  = d3.svg.line();
    this.line_.interpolate("monotone");
    
    this.line_.x(function(d, i) { 
        return that.scaleX_(d.date); 
    });
     
    this.line_.y(function(d, i) { 
        return that.scaleY_(d.value); 
    });
        
};


lgb.chart.view.GraphGUI_05.prototype.makeChart_ = function() {

	var parent = this.getParentElement();
    this.parent_x2_ = parent.parent();
    
    this.contentArea_ = this.calcContentArea_();

    this.scaleX_  = d3.time.scale();
    this.scaleY_ = d3.scale.linear();
    
    this.setScaleDomain_();
	this.makeLine_();
    
    //make svg
    this.svg_ = d3.select(parent[0]).append("svg")
        .attr('class', 'd3chart');

    //make mainGroup
    var mainGroupTransform= "translate({0},{1})".format(this.contentArea_.marginLeft, this.contentArea_.marginTop);
    
    this.mainGroup_ = this.svg_
        .append("g")
        .attr("transform", mainGroupTransform);
   
    //make clipPath
    this.defs_ = this.mainGroup_.append("defs");
    
    this.clipPath_ = this.defs_.append("clipPath")
        .attr("id", "clip");
        
    this.rect_ = this.clipPath_.append("rect");
    
    
    //this.setScaleRange_();
    this.setSVGsize_();
    
    
    //make axisX
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.chartModel.y.min));
    
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
    
    
    this.axisYb_ = d3.svg.axis();
       
    this.axisYb_.scale(this.scaleY_)
            .orient("left");
       
    this.axisY_.call(this.axisYb_);
        
    //make clip path
    this.clipPathGroup_ = this.mainGroup_.append("g")
        .attr("clip-path", "url(#clip)");

    this.path_ = this.clipPathGroup_.append("path")
        .datum(this.chartModel.data)
        .attr("class", "line")
        .attr("d", this.line_);
    
    
    this.oneTickLeftPixelCount_ = this.scaleX_(-1);
    this.transformVlaue_ = "translate(" + this.oneTickLeftPixelCount_ + ",0)";  
    
    return;
};



lgb.chart.view.GraphGUI_05.prototype.getDimensions = function() {
  
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



lgb.chart.view.GraphGUI_05.prototype.injectInto = function(parentElement) {
  
    goog.base(this,  'injectInto', parentElement);
    this.makeChart_();

};





lgb.chart.view.GraphGUI_05.prototype.calcContentArea_ = function() {
    
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







