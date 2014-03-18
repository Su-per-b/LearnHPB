goog.provide('lgb.chart.view.GraphGUI_02');

goog.require('lgb.gui.view.BaseGUI');


lgb.chart.view.GraphGUI_02 = function(dataModel) {

  this._TITLE = 'GraphGUI_02';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 70;
  this.isDirty_ = false;
  this.blockUpdates_ = false;
};
goog.inherits(lgb.chart.view.GraphGUI_02, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphGUI_02.prototype.init = function() {

    this.listenForChange_('scalarValueResultsConverted');
    this.listenForChange_('xmlParsedInfo');
    
    this.parseDate = d3.time.format("%d-%b-%y").parse;

    
    this.makeTestData_();
    

    this.contentArea_ = {};
    
    this.margins_ = {top: 20, right: 0, bottom: 20, left: 70};
    this.triggerLocal(e.RequestAddToParentGUI);

};



lgb.chart.view.GraphGUI_02.prototype.makeTestData_ = function() {
  
    this.testData = [
      ['11/1/1985',115.48,116.78,115.48,116.28,900900,0],
      ['11/1/1986',122.48,123.78,122.48,123.28,1199000,0],
      ['11/1/1987',119.48,116.78,115.48,116.28,900900,0],
      ['11/1/1988',132.48,132.78,131.48,131.28,1153000,0]
    ];
    
   // var dateFormat = d3.time.format("%m/%d/%Y");
    var dateStr = "1-May-13";
    //var dateObject = dateFormat.parse(dateStr);
   // var monthObject = d3.time.month(dateObject);
    
    this.testDataRecord = {
      close:116.28,
      date:dateStr
    }; 
    

};


lgb.chart.view.GraphGUI_02.prototype.generateNewRecord_ = function() {
  
  
    var len = this.d3Data_.length;
    var lastRecord = this.d3Data_[len-1];
    
    var rnd = (Math.random()*8.00)-4;
    var newClose = lastRecord.close + rnd;
    
    var date = lastRecord.date;
    
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    
    var newDate = new Date(year, month + 1, day);
    

    var newRecord = {
      close:newClose,
      date:newDate
    }; 
    
    return newRecord;
  
};




lgb.chart.view.GraphGUI_02.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.xmlParsedInfo = xmlParsedInfo;
  this.d3Data_.push(this.testDataRecord);
   
  return;
};





lgb.chart.view.GraphGUI_02.prototype.onChange_scalarValueResultsConverted_ = function(scalarValueResultsConverted) {
  
  var realList = scalarValueResultsConverted.output.realList;
  var newRecord = { time: scalarValueResultsConverted.time_};
  
  var testTempRealVo = realList[7];
  

    
  return;
  
};





lgb.chart.view.GraphGUI_02.prototype.calculateLayout = function(theVar) {
  
  

  return;
};


lgb.chart.view.GraphGUI_02.prototype.makeChart2_ = function(domain, interpolation, tick) {
  
  
};



lgb.chart.view.GraphGUI_02.prototype.makeChart_ = function() {
  

    var el = this.getMainElement();
    

    this.calculateContentArea_();

   var margin = {top: 20, right: 20, bottom: 30, left: 50};
   
   var width = this.contentArea_.width - margin.left - margin.right;
   var height = this.contentArea_.height - margin.top - margin.bottom;
 
  this.width_ = width;
  this.height_ = height;
  
  this.x_ = d3.time.scale()
      .range([0, width]);
  
  this.y_ = d3.scale.linear()
      .range([height, 0]);
  
  
  this.xAxis_ = d3.svg.axis()
      .scale(this.x_)
      .orient("bottom");

  this.yAxis_ = d3.svg.axis()
      .scale(this.y_)
      .orient("left");
  
  var that = this;
  this.area_ = d3.svg.area()
      .x(function(d) { return that.x_(d.date); })
      .y0(height)
      .y1(function(d) { return that.y_(d.close); });
  
  this.svg_ = d3.select(el[0]).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var delegate = this.d(this.processCSV_);
  
  d3.csv("data2.csv", delegate);



};




lgb.chart.view.GraphGUI_02.prototype.processCSV_ = function(error, data) {

    
    this.d3Data_ = data;
    
    var parseDate = d3.time.format("%d-%b-%y").parse;
    
    this.d3Data_.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });
  
   //var record = this.generateNewRecord_();
    //this.d3Data_.push(record);
  
    this.x_.domain(d3.extent(this.d3Data_, function(d) { return d.date; }));
    
    this.y_.domain([0, d3.max(this.d3Data_, function(d) { return d.close; })]);
  
    this.path_ = this.svg_.append("path")
        .datum(this.d3Data_)
        .attr("class", "area")
        .attr("d", this.area_);
  
    this.graphX_ = this.svg_.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height_ + ")")
        .call(this.xAxis_);
  
    this.graphY_ = this.svg_.append("g")
        .attr("class", "y axis")
        .call(this.yAxis_)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");
  
};


lgb.chart.view.GraphGUI_02.prototype.injectInto = function(parentElement) {
  

    goog.base(this,  'injectInto', parentElement);
    this.makeChart_();

    this.tickDelegate_ = this.d(this.tick2_);
    this.intervalHandle_ = setInterval(this.tickDelegate_,1000);
  
};


lgb.chart.view.GraphGUI_02.prototype.tick2_ = function() {
  
    var record = this.generateNewRecord_();
    this.d3Data_.push(record);
    this.d3Data_.shift();
    
      
    
     var len = this.d3Data_.length;
     var firstDate = this.d3Data_[0].date;
     var lastDate = this.d3Data_[len-1].date;
     
     domain = [0, len];

          
     var xscale = d3.scale.linear();
     xscale.range([0, this.width_]);
     
 
      xscale.domain(domain);


      


          
          
    
    var distance = xscale(5);
   
    var transformStr = "translate(" + distance + ")";
    
    
    this.path_
        .attr("d", this.area_)
        .attr("transform", null)
  .transition()
    .ease("linear")
    .attr("transform", transformStr);
    

        
};


lgb.chart.view.GraphGUI_02.prototype.tick_ = function() {

    var record = this.generateNewRecord_();
    this.d3Data_.push(record);
    
 
      
    this.path_
        .attr("d", this.area_);
      
    return;

      
/*
    this.graphX_
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);*/

      
   // this.d3Data_.shift();
    

      
/*

    .transition()
      .ease("linear")
      .attr("transform", "translate(" + this.x_(0) + ")");*/

    //this.path_.transition().attr("d", this.area_);
  
var transformValue = "translate(" + this.x_(-1) + ",0)";
  
this.path_
    .attr("transform", null)
   .transition()
    .duration(500)
    .ease("linear")
    .attr("transform", transformValue);
    
   // .each("end", function() { this.tickDelegate_(); });
    //.each("end", this.tickDelegate_);
   //   
    this.d3Data_.shift();
    
    return;
};





lgb.chart.view.GraphGUI_02.prototype.calculateContentArea_ = function() {
  
    var url = $.url(); // parse the current page URL
    var width = url.param('width');
    var height = url.param('height');
    
    if (undefined == width) {
      this.contentArea_.width = window.innerWidth;
    } else {
      this.contentArea_.width = parseFloat (width);
    }

    if (undefined == height) {
      this.contentArea_.height = window.innerHeight - (this.margins_.top + this.margins_.bottom);
    } else {
      this.contentArea_.height = parseFloat (height) - ((this.margins_.top + this.margins_.bottom) * 2);
    }
    
    


    
    
};










