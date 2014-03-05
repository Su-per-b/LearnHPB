goog.provide('lgb.chart.view.GraphGUI_05');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.model.GraphGUImodel');


lgb.chart.view.GraphGUI_05 = function(dataModel) {

  this._TITLE = 'GraphGUI_05';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.chart.view.GraphGUI_05, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphGUI_05.prototype.init = function() {


    this.listenForChange_('scalarValueResultsConverted');
    this.listenForChange_('xmlParsedInfo');
    
    this.tickDelegate_ = this.d(this.tick_);
    
    this.contentArea_ = {};
    
    this.triggerLocal(e.RequestAddToParentGUI);

};



lgb.chart.view.GraphGUI_05.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.xmlParsedInfo = xmlParsedInfo;
   
  return;
};





lgb.chart.view.GraphGUI_05.prototype.onChange_scalarValueResultsConverted_ = function(scalarValueResultsConverted) {
  
  var realList = scalarValueResultsConverted.output.realList;
  var newRecord = { time: scalarValueResultsConverted.time_};
  
  var testTempRealVo = realList[7];
  
  this.chart_.data.push(testTempRealVo.value_);
 
  // redraw the line, and slide it to the left
  this.chart_.path
      .attr("d", this.chart_.line)
      .attr("transform", null)
    .transition()
      .duration(500)
      .ease("linear")
      .attr("transform", "translate(" + this.chart_.x(-1) + ",0)");
 
 
  // pop the old data point off the front
  this.chart_.data.shift();
    
  return;
  
};






lgb.chart.view.GraphGUI_05.prototype.makeChart_ = function() {
  
  var dm = this.dataModel;
  var n = dm.x.max;
  
  
  var data = d3.range(n).map(dm.generateRandomFunction());
  
  this.calculateContentArea_();
  
  var margin = {top: 20, right: 40, bottom: 20, left: 40},
      width = this.contentArea_.width - margin.left - margin.right,
      height = this.contentArea_.height - margin.top - margin.bottom;
   
  var scaleObjectX = d3.scale.linear();
  var x = scaleObjectX
      .domain(dm.getDomainX())
      .range([0, width]);
   
  var scaleObjectY = d3.scale.linear();
  var y = scaleObjectY
      .domain(dm.getDomainY())
      .range([height, 0]);
   
   
  var line = d3.svg.line()
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); });
   
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
  svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);
   
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + y(0) + ")")
      .call(d3.svg.axis().scale(x).orient("bottom"));
   
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("left"));
   
  var path = svg.append("g")
    .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
   
   
 this.chart_={};
 this.chart_.data =data;
 this.chart_.path =path;
 this.chart_.x = x;
 this.chart_.line = line;
 


};



lgb.chart.view.GraphGUI_05.prototype.tick_ = function() {
  
    var dm = this.chartModel;
    var rndfunction = dm.generateRandomFunction();
    
    // push a new data point onto the back
    this.chart_.data.push(rndfunction());
   
    // redraw the line, and slide it to the left
    this.chart_.path
        .attr("d", this.chart_.line)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", "translate(" + this.chart_.x(-1) + ",0)");
   
   
    // pop the old data point off the front
    this.chart_.data.shift();
    
    
};



lgb.chart.view.GraphGUI_05.prototype.injectTo = function(parentElement) {
  

    goog.base(this,  'injectTo', parentElement);
    this.makeChart_();

};







lgb.chart.view.GraphGUI_05.prototype.calculateContentArea_ = function() {
  
    var url = $.url(); // parse the current page URL
    var width = url.param('width');
    var height = url.param('height');
    
    if (undefined == width) {
      this.contentArea_.width = window.innerWidth -30;
    } else {
      this.contentArea_.width = parseFloat (width)-20 ;
    }

    if (undefined == height) {
      this.contentArea_.height = window.innerHeight -30;
    } else {
      this.contentArea_.height = parseFloat (height) -20 ;
    }
    
};










