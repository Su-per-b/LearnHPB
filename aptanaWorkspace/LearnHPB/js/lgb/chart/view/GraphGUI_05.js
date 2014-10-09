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
    
    var content = this.calcContentArea_();
    var that = this;

    this.scaleX_.range([0, content.innerWidth]);
    this.scaleY_.range([content.innerHeight, 0]);
    
    
    this.line_.x(
        function(d, i) {
        return that.scaleX_(i);
       }
    ); 

    this.line_.y(
        function(d, i) {
        return that.scaleY_(d);
    });
    
    this.svg_.attr("width", content.outerWidth)
        .attr("height", content.outerHeight);
         
    this.rect_.attr("width", content.innerWidth)
        .attr("height", content.innerHeight);
        
        
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.chartModel.y.min));    
    this.axisX_.attr("transform", axisXTransform);
    
    this.axisX_.call(
        d3.svg.axis().scale(this.scaleX_).orient("bottom")
    );
    

    this.axisY_.call(
        d3.svg.axis().scale(this.scaleY_).orient("left")
    );

    
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
        .attr("transform", "translate(" + this.oneTickLeftPixelCount_ + ",0)");
   
    
};



lgb.chart.view.GraphGUI_05.prototype.makeChart_ = function() {
  
	var parent = this.getParentElement();
    this.parent_x2_ = parent.parent();
    
	var content = this.calcContentArea_();

    //create scaling functions
	this.scaleX_ = d3.scale.linear()
	   .domain(this.chartModel.getDomainX())
	   .range([0, content.innerWidth]);
	
	this.scaleY_ = d3.scale.linear()
	   .domain(this.chartModel.getDomainY())
	   .range([content.innerHeight, 0]); 
	   
    //make d3 line
    this.line_  = d3.svg.line();
    
    var that = this;
    
	this.line_.x(
	    function(d, i) {
		return that.scaleX_(i);
	   }
	); 

	this.line_.y(function(d, i) {
		return that.scaleY_(d);
	});

    //make svg
    this.svg_ = d3.select(parent[0]).append("svg")
        .attr("width", content.outerWidth)
        .attr("height", content.outerHeight)
        .attr('class', 'd3chart');


    //make mainGroup
    var mainGroupTransform= "translate({0},{1})".format(content.marginLeft, content.marginTop);
    
    this.mainGroup_ = this.svg_
        .append("g")
        .attr("transform", mainGroupTransform);
   
    //make clipPath
    this.defs_ = this.mainGroup_.append("defs");
    
    this.clipPath_ = this.defs_.append("clipPath")
        .attr("id", "clip");
        
    this.rect_ = this.clipPath_.append("rect")
        .attr("width", content.innerWidth)
        .attr("height", content.innerHeight);
   
    //make axisX
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.chartModel.y.min));
    
    this.axisX_ = this.mainGroup_.append("g")
        .attr("class", "x axis")
        .attr("transform", axisXTransform);
        
        
    this.axisX_.call(d3.svg.axis().scale(this.scaleX_).orient("bottom"));
   
    //make axisY
    this.axisY_ = this.mainGroup_.append("g")
        .attr("class", "y axis");
        
    this.axisY_
        .call(d3.svg.axis()
        .scale(this.scaleY_)
        .orient("left"));
        

    this.clipPathGroup_ = this.mainGroup_.append("g")
        .attr("clip-path", "url(#clip)");


    this.path_ = this.clipPathGroup_.append("path")
        .datum(this.chartModel.data)
        .attr("class", "line")
        .attr("d", this.line_);
    
    
    this.oneTickLeftPixelCount_ = this.scaleX_(-1);
    
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







