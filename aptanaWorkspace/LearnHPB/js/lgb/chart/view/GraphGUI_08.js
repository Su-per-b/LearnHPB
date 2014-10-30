goog.provide('lgb.chart.view.GraphGUI_08');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.model.GraphGUImodel');




/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.chart.view.GraphGUI_08 = function(dataModel) {

  this._TITLE = dataModel.getTitle();
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.chart.view.GraphGUI_08, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphGUI_08.prototype.init = function() {

    return;
};

lgb.chart.view.GraphGUI_08.prototype.bind_ = function() {

    this.listenForChange_('data');
    this.listenForChange_('y');

};



lgb.chart.view.GraphGUI_08.prototype.onChange_y_ = function(y) {
    
    this.scaleY_.domain(this.dataModel.getDomainY()); 
    this.axisY_.call(this.axisYc_);
    
    return;
};



lgb.chart.view.GraphGUI_08.prototype.onChange_data_ = function(data) {

    // redraw the line, and slide it to the left
    var domainX = this.dataModel.getDomainX();
    this.scaleX_.domain(domainX);
        
    this.axisXb_.scale(this.scaleX_)
            .orient("bottom")
            .tickFormat(d3.time.format("%H:%M"));
            
    this.axisX_.call(this.axisXb_);
    
    this.path_
        .attr("d", this.line_)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", this.transformVlaue_);
        
    this.path2_
        .attr("d", this.line2_)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", this.transformVlaue_);
    
    return;
};


lgb.chart.view.GraphGUI_08.prototype.calculateLayout = function() {

    this.contentArea_ = this.calcContentArea_();
    
    this.setSVGsize_();
   
    this.oneTickLeftPixelCount_ = -1 * (this.contentArea_.innerWidth / 20);
    this.transformVlaue_ = "translate(" + this.oneTickLeftPixelCount_ + ",0)"; 
    
  
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.dataModel.y.min));
    
    this.axisX_.attr("transform", axisXTransform);
        
    
    this.axisYc_.scale(this.scaleY_); 
    this.axisY_.call(this.axisYc_);

    this.path_.attr("d", this.line_);
    this.path2_.attr("d", this.line2_);

};



lgb.chart.view.GraphGUI_08.prototype.setSVGsize_ = function() {
    
    this.scaleX_.range([0, this.contentArea_.innerWidth]);
    this.scaleY_.range([this.contentArea_.innerHeight, 0]);
    
    this.svg_.attr("width", this.contentArea_.outerWidth)
        .attr("height", this.contentArea_.outerHeight);
        
    this.rect_.attr("width", this.contentArea_.innerWidth)
        .attr("height", this.contentArea_.innerHeight);
        
};



lgb.chart.view.GraphGUI_08.prototype.setScaleDomain_ = function() {
    
    this.scaleX_.domain(this.dataModel.getDomainX());
    this.scaleY_.domain(this.dataModel.getDomainY());
        
};



lgb.chart.view.GraphGUI_08.prototype.makeOneLine_ = function() {
    

        
};



lgb.chart.view.GraphGUI_08.prototype.makeLine_ = function() {
    
    var that = this;
    
    //make d3 line
    this.line_  = d3.svg.line();
    this.line_.interpolate("monotone");
    
    this.line_.x(function(d, i) { 
        return that.scaleX_(d.date); 
    });
     
    this.line_.y(function(d, i) { 
        if (undefined == d.valueList) {
            debugger;
        }
        
        return that.scaleY_(d.valueList[0]); 
    });
    
    this.line2_  = d3.svg.line();
    this.line2_.interpolate("monotone");
    
    this.line2_.x(function(d, i) { 
        return that.scaleX_(d.date); 
    });
    
    
    this.line2_.y(function(d, i) { 
        if (undefined == d.valueList) {
            debugger;
        }
        
        return that.scaleY_(d.valueList[1]); 
    });
        
};

lgb.chart.view.GraphGUI_08.prototype.makeChart_ = function() {

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
        .attr("id", "clip08");
        
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
        .attr("clip-path", "url(#clip08)");

    this.path_ = this.clipPathGroup_.append("path")
        .datum(this.dataModel.data)
        .attr("class", "line")
        .attr("d", this.line_);
    
    this.path2_ = this.clipPathGroup_.append("path")
        .datum(this.dataModel.data)
        .attr("class", "lineRed")
        .attr("d", this.line2_);
    
    
    this.oneTickLeftPixelCount_ = -1 * (this.contentArea_.innerWidth / 20);
    this.transformVlaue_ = "translate(" + this.oneTickLeftPixelCount_ + ",0)"; 

    this.bind_();
    
    return;
};


   


lgb.chart.view.GraphGUI_08.prototype.getDimensions = function() {
  
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



lgb.chart.view.GraphGUI_08.prototype.injectInto = function(parentElement) {
  
    goog.base(this,  'injectInto', parentElement);
    this.makeChart_();

};




lgb.chart.view.GraphGUI_08.prototype.calcContentArea_ = function() {
    
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







