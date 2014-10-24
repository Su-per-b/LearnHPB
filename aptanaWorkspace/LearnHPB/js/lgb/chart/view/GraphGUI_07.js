goog.provide('lgb.chart.view.GraphGUI_07');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.model.GraphGUImodel');




/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.chart.view.GraphGUI_07 = function(dataModel) {

  this._TITLE = 'y_ZN[5] - Zone 2 temp';
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.chart.view.GraphGUI_07, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphGUI_07.prototype.init = function() {

    this.dataModel.init();
};

lgb.chart.view.GraphGUI_07.prototype.bind_ = function() {

    this.listenForChange_('data');
    //this.listenForChange_('x');
    this.listenForChange_('y');

};



lgb.chart.view.GraphGUI_07.prototype.onChange_y_ = function(y) {
    
    var that = this;
    var content = this.calcContentArea_();
    
    this.scaleY_ = d3.scale.linear()
       .domain(this.dataModel.getDomainY())
       .range([content.innerHeight, 0]); 
       
    this.line_.y(
        function(d, i) {
        return that.scaleY_(d);
    });
    
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.dataModel.y.min));    
    this.axisX_.attr("transform", axisXTransform);
    
    this.axisY_.call(
        d3.svg.axis().scale(this.scaleY_).orient("left")
    );
    
    return;
};



lgb.chart.view.GraphGUI_07.prototype.onChange_data_ = function(data) {
  

  
    // redraw the line, and slide it to the left
    this.path_
        .attr("d", this.line_)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", "translate(" + this.oneTickLeftPixelCount_ + ",0)");
        
    return;
};




lgb.chart.view.GraphGUI_07.prototype.calculateLayout = function() {
    
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
        
        
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.dataModel.y.min));    
    this.axisX_.attr("transform", axisXTransform);
    
    this.axisX_.call(
        d3.svg.axis().scale(this.scaleX_).orient("bottom")
    );
    

    this.axisY_.call(
        d3.svg.axis().scale(this.scaleY_).orient("left")
    );

    
    this.path_.attr("d", this.line_);

};




    

lgb.chart.view.GraphGUI_07.prototype.makeChart2_ = function() {

    var parent = this.getParentElement();
    this.parent_x2_ = parent.parent();
    
    var content = this.calcContentArea_();

    //create scaling functions
    this.scaleX_ = d3.scale.linear()
       .domain(this.dataModel.getDomainX())
       .range([0, content.innerWidth]);
    
    this.scaleY_ = d3.scale.linear()
       .domain(this.dataModel.getDomainY())
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
        .attr("id", "clip07");
        
    this.rect_ = this.clipPath_.append("rect")
        .attr("width", content.innerWidth)
        .attr("height", content.innerHeight);
   
    //make axisX
    var axisXTransform = "translate(0,{0})".format(this.scaleY_(this.dataModel.y.min));
    
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
        
    //make clip path
    this.clipPathGroup_ = this.mainGroup_.append("g")
        .attr("clip-path", "url(#clip07)");


    this.path_ = this.clipPathGroup_.append("path")
        .datum(this.dataModel.data)
        .attr("class", "line")
        .attr("d", this.line_);
    
    
    this.oneTickLeftPixelCount_ = this.scaleX_(-1);
    
    
    this.transformVlaue_ = "translate(" + this.oneTickLeftPixelCount_ + ",0)";  
    this.bind_();
    

    return;
};



lgb.chart.view.GraphGUI_07.prototype.getDimensions = function() {
  
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



lgb.chart.view.GraphGUI_07.prototype.injectInto = function(parentElement) {
  
    goog.base(this,  'injectInto', parentElement);
    this.makeChart2_();

};




lgb.chart.view.GraphGUI_07.prototype.calcContentArea_ = function() {
    
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







