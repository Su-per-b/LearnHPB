goog.provide('lgb.chart.view.GraphGUI_06');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.model.GraphGUImodel');




/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.chart.view.GraphGUI_06 = function(dataModel) {

  this._TITLE = 'y_ZN[1] - Zone 1 temp';
  
  
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.chart.view.GraphGUI_06, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphGUI_06.prototype.init = function() {

    this.contentArea_ = {};

};



lgb.chart.view.GraphGUI_06.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.xmlParsedInfo = xmlParsedInfo;
   
  return;
};



lgb.chart.view.GraphGUI_06.prototype.bind_ = function() {

    this.listenForChange_('data');

};

lgb.chart.view.GraphGUI_06.prototype.onChange_data_ = function(data) {
  
    this.tick_();
    
        
    return;
};




lgb.chart.view.GraphGUI_06.prototype.calculateLayout = function() {
    
    this.calculateContentArea_();
    
};




lgb.chart.view.GraphGUI_06.prototype.makeChart_ = function() {
  
  var dm = this.dataModel;
  dm.init_05(); 
    
  var domainX = dm.getDomainX();
  var domainY = dm.getDomainY();
   
  var n = domainX[1];
  
  
  var el = this.getMainElement();
  
  var data = d3.range(n).map(dm.generateRandomFunction());
  
  this.calculateContentArea_();
  
  var margin = {top: 20, right: 40, bottom: 20, left: 40};
  
  var width = this.contentArea_.width - margin.left - margin.right;
  var height = this.contentArea_.height - margin.top - margin.bottom;
   
  var scaleObjectX = d3.scale.linear();
  var x = scaleObjectX
      .domain(domainX)
      .range([0, width]);
   
  var scaleObjectY = d3.scale.linear();
  var y = scaleObjectY
      .domain(domainY)
      .range([height, 0]);
   
  var line = d3.svg.line()
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); });
   
  var svg = d3.select(el[0]).append("svg")
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
 

    this.bind_();



};



lgb.chart.view.GraphGUI_06.prototype.tick_ = function() {
  
    var dm = this.dataModel;
   // var rndfunction = dm.generateRandomFunction();
   // var rndValue = rndfunction();
    
    var actualValue = dm.getLatestValue();
    
    // push a new data point onto the back
    this.chart_.data.push(actualValue);
   
    // redraw the line, and slide it to the left
    this.chart_.path
        .attr("d", this.chart_.line)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", "translate(" + this.chart_.x(-1) + ",0)");
   
   
    // pop the old data point off the front
    if (this.chart_.data.length > 20) {
        this.chart_.data.shift();
    }

    
    
};



lgb.chart.view.GraphGUI_06.prototype.injectInto = function(parentElement) {
  

    goog.base(this,  'injectInto', parentElement);
    this.makeChart_();

};







lgb.chart.view.GraphGUI_06.prototype.calculateContentArea_ = function() {
  
  
    var parent = this.getParentElement();
    var parent_x2 = parent.parent();
    
    // var w1 = parent.innerWidth();
    // var w2 = parent.outerWidth();
    // var w3 = parent.width();
    // var w4 = parent_x2.innerWidth();
    // var w5 = parent_x2.outerWidth();
    var w6 = parent_x2.width();
    
    
    // var h1 = parent.innerHeight();
    // var h2 = parent.outerHeight();
    // var h3 = parent.height();
//     
    // var h4 = parent_x2.innerHeight();
    // var h5 = parent_x2.outerHeight();
    var h6 = parent_x2.height();
    
    
    if (w6 < 400) {
      w6 = 400;
    }
    
   // var h = parent.height();
   
    if (h6 < 200) {
      h6 = 200;
    }
  
  
    this.contentArea_.width = w6;
    this.contentArea_.height = h6;
  
    return;

    
};










