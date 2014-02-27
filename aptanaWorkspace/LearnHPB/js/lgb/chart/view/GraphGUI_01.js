goog.provide('lgb.chart.view.GraphGUI_01');

goog.require('lgb.gui.view.BaseGUI');


lgb.chart.view.GraphGUI_01 = function(dataModel) {

  this._TITLE = 'GraphGUI_01';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 70;
  this.isDirty_ = false;
  this.blockUpdates_ = false;
};
goog.inherits(lgb.chart.view.GraphGUI_01, lgb.gui.view.BaseGUI);



lgb.chart.view.GraphGUI_01.prototype.init = function() {

    this.listenForChange_('scalarValueResultsConverted');
    this.listenForChange_('xmlParsedInfo');
    

    


    this.data_ = [];
    
    this.contentArea_ = {}
    ;
    
    this.margins_ = {top: 20, right: 0, bottom: 20, left: 70};
      
      
    this.triggerLocal(e.RequestAddToParentGUI);

};



lgb.chart.view.GraphGUI_01.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.xmlParsedInfo = xmlParsedInfo;
  
};


lgb.chart.view.GraphGUI_01.prototype.onChange_scalarValueResultsConverted_ = function(scalarValueResultsConverted) {
  
  var realList = scalarValueResultsConverted.output.realList;
  var newRecord = { time: scalarValueResultsConverted.time_};
  
  var testTempRealVo = realList[7];
  
    

  this.data_.push([testTempRealVo, testTempRealVo+1]);
  
};





lgb.chart.view.GraphGUI_01.prototype.calculateLayout = function(theVar) {
  
  
 // this.graphContainerDiv_.empty();
    
  var p = this.getParentElement().parent();
  var width = p.width() - 36;
  var height = p.height();

  var src = "/LearnHPB/test/ChartTestwithDC.html?width={0}&height={1}".format(width, height);
  //var tag = '<iframe src="{0}" width="{1}" height="{2}" frameborder="0"></iframe>'.format(src, width, height);
  
  this.iframe.attr("src", src);
  this.iframe.attr("width", width);
  this.iframe.attr("height", height);

  
 
  return;
};


lgb.chart.view.GraphGUI_01.prototype.injectTo = function(parentElement) {
  

    goog.base(this,  'injectTo', parentElement);



    var row1 = $('<div>').
                attr('class', 'row');
                
    var div1 = $('<div>').
                appendTo(row1);
   
   
    
    var row2 = $('<div>').
                attr('class', 'row');
                
    var div2 = $('<div>').
                appendTo(row2);
   
   
    var el = this.getMainElement();
    
    el.append(row1);
    el.append(row2);
    
    this.moveChart_ = dc.lineChart(div1[0]);
    this.volumeChart_ = dc.barChart(div2[0]);
    
    
    this.calculateContentArea_();
    
    var that = this;
    

   
  d3.csv("ndx.csv", function (data) {
      /* since its a csv file we need to format the data a bit */
      var dateFormat = d3.time.format("%m/%d/%Y");
      var numberFormat = d3.format(".2f");
  
      data.forEach(function (d) {
          d.dd = dateFormat.parse(d.date);
          d.month = d3.time.month(d.dd); // pre-calculate month for better performance
          d.close = +d.close; // coerce to number
          d.open = +d.open;
      });
      

      
  
      //### Create Crossfilter Dimensions and Groups
      //See the [crossfilter API](https://github.com/square/crossfilter/wiki/API-Reference) for reference.
      var ndx = crossfilter(data);
      var all = ndx.groupAll();
  
      // dimension by year
      var yearlyDimension = ndx.dimension(function (d) {
          return d3.time.year(d.dd).getFullYear();
      });
      
      
   
  
      // dimension by full date
      var dateDimension = ndx.dimension(function (d) {
          return d.dd;
      });
  
      // dimension by month
      var moveMonths = ndx.dimension(function (d) {
          return d.month;
      });
      // group by total movement within month
      var monthlyMoveGroup = moveMonths.group().reduceSum(function (d) {
          return Math.abs(d.close - d.open);
      });
      // group by total volume within move, and scale down result
      var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
          return d.volume / 500000;
      });
      var indexAvgByMonthGroup = moveMonths.group().reduce(
          function (p, v) {
              ++p.days;
              p.total += (v.open + v.close) / 2;
              p.avg = Math.round(p.total / p.days);
              return p;
          },
          function (p, v) {
              --p.days;
              p.total -= (v.open + v.close) / 2;
              p.avg = p.days ? Math.round(p.total / p.days) : 0;
              return p;
          },
          function () {
              return {days: 0, total: 0, avg: 0};
          }
      );
  
  
  
  
  
      //### Define Chart Attributes
      //Define chart attributes using fluent methods. See the [dc API Reference](https://github.com/NickQiZhu/dc.js/blob/master/web/docs/api-1.7.0.md) for more information
      //
  
      //#### Stacked Area Chart
      //Specify an area chart, by using a line chart with `.renderArea(true)`
      that.moveChart_
          .renderArea(true)
          .width(that.contentArea_.width)
          .height(that.contentArea_.h1)
          .transitionDuration(1000)
          .margins(that.margins_)
          .dimension(moveMonths)
          .mouseZoomable(true)
          // Specify a range chart to link the brush extent of the range with the zoom focue of the current chart.
          .rangeChart(that.volumeChart_)
          
          .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
          
          .round(d3.time.month.round)
          .xUnits(d3.time.months)
          .elasticY(true)
          .renderHorizontalGridLines(true)
          .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
          .brushOn(false)
          // Add the base layer of the stack with group. The second parameter specifies a series name for use in the legend
          // The `.valueAccessor` will be used for the base layer
          .group(indexAvgByMonthGroup, "Monthly Index Average")
          .valueAccessor(function (d) {
              return d.value.avg;
          })
          // stack additional layers with `.stack`. The first paramenter is a new group.
          // The second parameter is the series name. The third is a value accessor.
          .stack(monthlyMoveGroup, "Monthly Index Move", function (d) {
              return d.value;
          })
          // title can be called by any stack layer.
          .title(function (d) {
              var value = d.value.avg ? d.value.avg : d.value;
              if (isNaN(value)) value = 0;
              return dateFormat(d.key) + "\n" + numberFormat(value);
          });
  
      that.volumeChart_.width(that.contentArea_.width)
          .height(that.contentArea_.h2)
          .margins(that.margins_)
          .dimension(moveMonths)
          .group(volumeByMonthGroup)
          .centerBar(true)
          .gap(1)
          .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
          .round(d3.time.month.round)
          .alwaysUseRounding(true)
          .xUnits(d3.time.months);

    
      
       dc.renderAll();
     return;
  });
  
   
};




lgb.chart.view.GraphGUI_01.prototype.getTag_ = function() {

  var p = parentElement.parent();
  var width = p.width() - 36;
  var height = p.height();

  var url = "/LearnHPB/test/ChartTestwithDC.html?width={0}&height={1}".format(width, height);
  var tag = '<iframe src="{0}" width="{1}" height="{2}" frameborder="0"></iframe>'.format(url, width, height);
  
  return $(tag);
  
};



lgb.chart.view.GraphGUI_01.prototype.calculateContentArea_ = function() {
  
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
    
    
    this.contentArea_.h1 = (this.contentArea_.height * 0.85);
    this.contentArea_.h2 = (this.contentArea_.height * 0.15);
    
    
};










