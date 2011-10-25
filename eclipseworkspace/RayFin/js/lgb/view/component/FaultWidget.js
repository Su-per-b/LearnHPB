goog.provide('lgb.view.component.FaultWidget');
goog.require('lgb.view.ViewBase');


/**
 * Html component that contains a slider
 * @param {lgb.model.scenario.SysVar} dataModel Tells us what to display.
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.component.FaultWidget = function(dataModel) {
	lgb.view.ViewBase.call(this, dataModel);
	
	/** @const */
	this.htmlID = 'component-FaultWidget-' + dataModel.name;
};
goog.inherits(lgb.view.component.FaultWidget, lgb.view.ViewBase);

lgb.view.component.FaultWidget.prototype.getCss = function() {



};



lgb.view.component.FaultWidget.prototype.getHtml = function() {

	if (this.dataModel.faultWidgetType != 'SLIDER') {
		throw Error ('unknown faultWidgetType');
	}
	
   var sl = $('<input>')
   .attr('id', this.htmlID + '-slider');
    	
    this.kendoSlider = sl.data("kendoSlider");	
    //lgb.logInfo(hh.html2string());
    
  //  hh.appendTo('#tabstrip-4');
    
    
	sl.kendoSlider({
	     min:10,
	     max:50,
	     smallStep: 1,
	     largeStep: 10
	});
  
	
	return sl;
};

lgb.view.component.FaultWidget.prototype.injectHtml = function(parentSelector, idx) {

	if (this.dataModel.faultWidgetType != 'SLIDER') {
		throw Error ('unknown faultWidgetType');
	}
	
   var id = this.htmlID + '-slider';
   
 //  var input = $('<input>')
     // 	.attr('id', id);
      	
 //  var sl = $('<div>')
  // 	  .addClass('faultWidget')
  // 	  .append('<div>name</div>')
  //    .append(input)
	//  .appendTo(parentId);
		//var isGrey = (idx % 2 == 0);
		
	  var cl = idx % 2 ? '' : ' greyBackground';
	  
	  
	  var html = '<div class="faultWidget{0}">'.format(cl) +
		  '<div>' +
			'<div>' +
		 		this.dataModel.displayName + 
		  	'</div>' +  
		  		'<input id="{0}" />'.format(id) +	
		  '</div>' + 
	  '</div>'; 
	  
	  $(parentSelector).append(html);
	  
	  this.kendoSlider = $('#' + id).kendoSlider({
	     min:this.dataModel.lowValue,
	     max:this.dataModel.highValue,
	     smallStep: 1,
	     largeStep: 20,
	     showButtons:false
	     	}).data("kendoSlider");	
	     	


	  /*
     this.kendoSlider = sl.kendoSlider({
	     min:1,
	     max:10,
	     smallStep: 1,
	     largeStep: 10
	     	}).data("kendoSlider");	
   
   */
    //	$("#slider").kendoSlider();
 //   this.kendoSlider = sl.data("kendoSlider");	
    //lgb.logInfo(hh.html2string());
    

    
    

  
	
};












