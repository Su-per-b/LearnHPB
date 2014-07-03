goog.provide('lgb.chart.view.GraphGUIStandAlone');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.chart.model.GraphGUImodel');




/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.chart.view.GraphGUIStandAlone = function(dataModel, chartModel) {

  this._TITLE = 'GraphGUIStandAlone';
  
  this.chartModel = chartModel;
  
  lgb.gui.view.BaseGUI.call(this, dataModel);

};
goog.inherits(lgb.chart.view.GraphGUIStandAlone, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphGUIStandAlone.prototype.init = function() {


    this.listenForChange_('scalarValueResultsConverted');
    this.listenForChange_('xmlParsedInfo');
    
    this.tickDelegate_ = this.d(this.tick_);
    
    this.contentArea_ = {};
    
    this.triggerLocal(e.RequestAddToParentGUI);

};



lgb.chart.view.GraphGUIStandAlone.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.xmlParsedInfo = xmlParsedInfo;
   
   
  return;
};





lgb.chart.view.GraphGUIStandAlone.prototype.onChange_scalarValueResultsConverted_ = function(scalarValueResultsConverted) {
  

  
  this.chartModel.extractFromResults(scalarValueResultsConverted);
  

  //redraw the line
  this.chart_.path
      .attr("d", this.chart_.line);


  
};





lgb.chart.view.GraphGUIStandAlone.prototype.makeChart_ = function() {
  
  var chartModel = this.chartModel;

  var el = this.getMainElement();
  
  
  this.calculateContentArea_();
  
  var margin = {top: 20, right: 40, bottom: 20, left: 40},
      width = this.contentArea_.width - margin.left - margin.right,
      height = this.contentArea_.height - margin.top - margin.bottom;
   
   
  var scaleObjectX = d3.time.scale();
  var domainX = chartModel.getDomainX(); 
  
  var x = scaleObjectX
      .domain(domainX)
      .range([0, width]);
   
  var scaleObjectY = d3.scale.linear();
  
  
  
  var domainY = chartModel.getDomainY();
  var y = scaleObjectY
      .domain(domainY)
      .range([height, 0]);
   
   
  var line = d3.svg.line()
      .x(function(d, i) { return x(d.dateObj); })
      .y(function(d, i) { return y(d.value); });
   

   
   
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
      .call(d3.svg.axis().scale(x).orient("bottom"));
   
  //make the y axis
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("left"));
   
   
  var path = svg.append("g")
    .append("path")
      .datum(chartModel.data)
      .attr("class", "line")
      .attr("d", line);
   

      
      
 this.chart_={};
 this.chart_.data = chartModel.data;
 this.chart_.path = path;
 this.chart_.x = x;
 this.chart_.line = line;
 


};



lgb.chart.view.GraphGUIStandAlone.prototype.tick_ = function() {
  
    var chartModel = this.chartModel_;
    var rndfunction = chartModel.generateRandomFunction();
    
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



lgb.chart.view.GraphGUIStandAlone.prototype.injectInto = function(parentElement) {
  
    goog.base(this,  'injectInto', parentElement);
    this.makeChart_();
};







lgb.chart.view.GraphGUIStandAlone.prototype.calculateContentArea_ = function() {
  

      this.contentArea_.width = window.innerWidth -30;
      this.contentArea_.height = window.innerHeight -150;

};










