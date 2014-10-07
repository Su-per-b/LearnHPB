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


};





lgb.chart.view.GraphGUI_05.prototype.calculateLayout = function() {
    
    var content = this.calcContentArea_();
    
    var domainX = this.chartModel.getDomainX();
    var domainY = this.chartModel.getDomainY();
    
    var scaleObjectX = d3.scale.linear();
    var scaleX = scaleObjectX.domain(domainX).range([0, content.innerWidth]);

    var scaleObjectY = d3.scale.linear();
    var scaleY = scaleObjectY.domain(domainY).range([content.innerHeight, 0]); 
    
    
    this.line_  = d3.svg.line();
    
    this.line_.x(function(d, i) {
        return scaleX(i);
    });

    this.line_.y(function(d, i) {
        return scaleY(d);
    });
      
      
    this.svg_.attr("width", content.outerWidth)
        .attr("height", content.outerHeight);
      
      
    this.clipPath_.attr("width", content.innerWidth)
        .attr("height", content.innerHeight);
      
      
      
    var axisXTransformValue = "translate(0,{0})".format(scaleY(0));
    
    this.axisX_
        .attr("transform", "translate(0," + scaleY(0) + ")")
        .call(d3.svg.axis()
        .scale(scaleX)
        .orient("bottom"));
        
    this.axisY_
        .call(d3.svg.axis()
        .scale(scaleY)
        .orient("left"));
        
        
    this.path_
        .attr("d", this.line_);
        

};


lgb.chart.view.GraphGUI_05.prototype.updateValues = function() {
    
    var rndfunction = this.chartModel.generateRandomFunction();
    
    // push a new data point onto the back
    this.data_.push(rndfunction());
   
    var oneTickLeftPixelCount = this.scaleX_(-1);
   
    // redraw the line, and slide it to the left
    this.path_
        .attr("d", this.line_)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", "translate(" + oneTickLeftPixelCount + ",0)");
   
   
    // pop the old data point off the front
    this.data_.shift();
    
    
    
};



lgb.chart.view.GraphGUI_05.prototype.makeChart_ = function() {
  
    
	var parent = this.getParentElement();
	this.parent_x2_ = parent.parent();

	var chartModel = this.chartModel;
	
	this.chartModel.init();

	var domainX = this.chartModel.getDomainX();
	var domainY = this.chartModel.getDomainY();

	var n = domainX[1];
	
	var data = d3.range(n).map(this.chartModel.generateRandomFunction());

	var content = this.calcContentArea_();

	var scaleX = d3.scale.linear()
	   .domain(domainX)
	   .range([0, content.innerWidth]);
	
	
	var scaleY = d3.scale.linear()
	   .domain(domainY)
	   .range([content.innerHeight, 0]); 
	   
	   
    this.line_  = d3.svg.line();
    
	this.line_.x(function(d, i) {
		return scaleX(i);
	}); 


	this.line_.y(function(d, i) {
		return scaleY(d);
	});


    var svgTransformValue = "translate({0},{1})".format(content.marginLeft, content.marginTop);
    

    this.svg_ = d3.select(parent[0]).append("svg")
        .attr("width", content.outerWidth)
        .attr("height", content.outerHeight)
        .attr('class', 'd3chart');
        
    this.mainGroup_ = this.svg_
        .append("g")
        .attr("transform", svgTransformValue);
   
   
    this.clipPath_ = this.mainGroup_.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", content.innerWidth)
        .attr("height", content.innerHeight);
   
   
    var axisXTransformValue = "translate(0,{0})".format(scaleY(0));
    
    this.axisX_ = this.mainGroup_.append("g")
        .attr("class", "x axis")
        .attr("transform", axisXTransformValue);
        
        
    this.axisX_.call(d3.svg.axis().scale(scaleX).orient("bottom"));
   

    this.axisY_ = this.mainGroup_.append("g")
        .attr("class", "y axis");
        
    this.axisY_
        .call(d3.svg.axis()
        .scale(scaleY)
        .orient("left"));
        
   
    this.path_ = this.mainGroup_.append("g")
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", this.line_);
   
    this.data_ = data;
    this.scaleX_ = scaleX;

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







