goog.provide('lgb.gui.view.SimulationGraphGUI');


lgb.gui.view.SimulationGraphGUI = function(dataModel) {

  this._TITLE = 'Graph';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.totalHeaderHeight_ = 70;
  this.isDirty_ = false;
  this.blockUpdates_ = false;
};
goog.inherits(lgb.gui.view.SimulationGraphGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.SimulationGraphGUI.prototype.init = function() {

    this.listenForChange_('scalarValueResultsConverted');
    this.listenForChange_('xmlParsedInfo');
    
    this.data_ = [18,19];
        
    this.triggerLocal(e.RequestAddToParentGUI);
      this.makeGraph_(   );

};



lgb.gui.view.SimulationGraphGUI.prototype.onChange_xmlParsedInfo_ = function(xmlParsedInfo) {
  
  this.realVarList_ = xmlParsedInfo.scalarVariablesAll_.output_.realVarList_;
  
  var len = this.realVarList_.length;
  for (var i=0; i < len; i++) {
    if (this.realVarList_[i].unit_ == "K") {
      this.realVarList_[i].unit_ = "C";
    }
  };
  

  
};


lgb.gui.view.SimulationGraphGUI.prototype.onChange_scalarValueResultsConverted_ = function(scalarValueResultsConverted) {
  
  var realList = scalarValueResultsConverted.output.realList;
  var newRecord = { time: scalarValueResultsConverted.time_};
  
  var testTempRealVo = scalarValueResultsConverted.output.realList[7];
  
  var element = this.getMainElement();
  
  element.empty();
  this.data_.push(testTempRealVo.value_);
    
 // this.makeGraph_(   );
    
  return;
  

};





lgb.gui.view.SimulationGraphGUI.prototype.calculateLayout = function(theVar) {
  


    this.setGraphSize_();
  

        
    return;
};


lgb.gui.view.SimulationGraphGUI.prototype.injectTo = function(parentElement) {
  
  this.yearlyBubbleChartDiv = this.makeDiv();
  this.yearlyBubbleChartDiv.append('<a >reset</a>');
  
  goog.base(this, 'injectTo', parentElement);
  
  this.yearlyBubbleChart = dc.bubbleChart(this.yearlyBubbleChartDiv[0], "chartGroup");

};





lgb.gui.view.SimulationGraphGUI.prototype.updateAll_ = function() {
  
  this.gridDS_.read();
  this.isDirty_ = false;
  
};



lgb.gui.view.SimulationGraphGUI.prototype.setGraphSize_ = function() {

    var parent = this.getParentElement();
    var w = parent.width();
    
    
    if (w < 400) {
      w = 400;
    }
    
    this.moveChart.width(400);
    
    var h = parent.height();
    if (h < 200) {
      h = 200;
    }
    
    
 

        

};


lgb.gui.view.SimulationGraphGUI.prototype.makeGraph_ = function() {
  
  
      //var element = this.getMainElement()[0];
      var that = this;
      
      this.graphContainerDiv_ = this.makeDiv();
      
      this.append(this.graphContainerDiv_);
      


  var row1Div = $('<div>')
  				.attr('class', 'row')
  				.append(
  					$('<div>')
  					.attr('id', 'monthly-move-chart2')
  					.append(
  						$('<div>').attr('class', 'clearfix')
  						)
  				);
  				
  var row2Div = $('<div>')
  				.attr('class', 'row')
  				.append(
  					$('<div>')
  					.attr('id', 'monthly-volume-chart2')
  				);
  				
  				
  

  
  this.graphContainerDiv_.append(row1Div);
  this.graphContainerDiv_.append(row2Div);
	

this.moveChart = dc.lineChart("#monthly-move-chart2");
this.volumeChart = dc.barChart("#monthly-volume-chart2");


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
    // maintain running tallies by year as filters are applied or removed
    var yearlyPerformanceGroup = yearlyDimension.group().reduce(
        /* callback for when data is added to the current filter results */
        function (p, v) {
            ++p.count;
            p.absGain += v.close - v.open;
            p.fluctuation += Math.abs(v.close - v.open);
            p.sumIndex += (v.open + v.close) / 2;
            p.avgIndex = p.sumIndex / p.count;
            p.percentageGain = (p.absGain / p.avgIndex) * 100;
            p.fluctuationPercentage = (p.fluctuation / p.avgIndex) * 100;
            return p;
        },
        /* callback for when data is removed from the current filter results */
        function (p, v) {
            --p.count;
            p.absGain -= v.close - v.open;
            p.fluctuation -= Math.abs(v.close - v.open);
            p.sumIndex -= (v.open + v.close) / 2;
            p.avgIndex = p.sumIndex / p.count;
            p.percentageGain = (p.absGain / p.avgIndex) * 100;
            p.fluctuationPercentage = (p.fluctuation / p.avgIndex) * 100;
            return p;
        },
        /* initialize p */
        function () {
            return {count: 0, absGain: 0, fluctuation: 0, fluctuationPercentage: 0, sumIndex: 0, avgIndex: 0, percentageGain: 0};
        }
    );

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

    // create categorical dimension
    var gainOrLoss = ndx.dimension(function (d) {
        return d.open > d.close ? "Loss" : "Gain";
    });
    // produce counts records in the dimension
    var gainOrLossGroup = gainOrLoss.group();

    // determine a histogram of percent changes
    var fluctuation = ndx.dimension(function (d) {
        return Math.round((d.close - d.open) / d.open * 100);
    });
    var fluctuationGroup = fluctuation.group();

    // summerize volume by quarter
    var quarter = ndx.dimension(function (d) {
        var month = d.dd.getMonth();
        if (month <= 2)
            return "Q1";
        else if (month > 3 && month <= 5)
            return "Q2";
        else if (month > 5 && month <= 8)
            return "Q3";
        else
            return "Q4";
    });
    var quarterGroup = quarter.group().reduceSum(function (d) {
        return d.volume;
    });

    // counts per weekday
    var dayOfWeek = ndx.dimension(function (d) {
        var day = d.dd.getDay();
        var name=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        return day+"."+name[day];
     });
    var dayOfWeekGroup = dayOfWeek.group();

    //### Define Chart Attributes
    //Define chart attributes using fluent methods. See the [dc API Reference](https://github.com/NickQiZhu/dc.js/blob/master/web/docs/api-1.7.0.md) for more information
    //

   



    //#### Stacked Area Chart
    //Specify an area chart, by using a line chart with `.renderArea(true)`
    that.moveChart
        .renderArea(true)
        .width(990)
        .height(200)
        .transitionDuration(1000)
        .margins({top: 30, right: 50, bottom: 25, left: 40})
        .dimension(moveMonths)
        .mouseZoomable(true)
        // Specify a range chart to link the brush extent of the range with the zoom focue of the current chart.
        .rangeChart(volumeChart)
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

    that.volumeChart.width(990)
        .height(40)
        .margins({top: 0, right: 50, bottom: 20, left: 40})
        .dimension(moveMonths)
        .group(volumeByMonthGroup)
        .centerBar(true)
        .gap(1)
        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
        .round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.months);


    dc.dataCount(".dc-data-count")
        .dimension(ndx)
        .group(all);




    dc.renderAll();

});


};







