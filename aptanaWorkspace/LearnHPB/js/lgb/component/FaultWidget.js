/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/

goog.provide('lgb.component.FaultWidget');
goog.require('lgb.world.view.BaseV');


/**
 * Html component that contains a slider
 * @param {lgb.scenario.model.SysVar} dataModel Tells us what to display.
 * @constructor
 * @extends lgb.world.view.BaseV
 */
lgb.component.FaultWidget = function(dataModel) {
    
  var htmlID = 'component-FaultWidget-' + dataModel.name;
 
  lgb.world.view.BaseV.call(this, dataModel, htmlID);


};
goog.inherits(lgb.component.FaultWidget, lgb.world.view.BaseV);



/**
 * A public function. I set it up this way so that an HTML
 * string could be built from multiple components
 * then injected into the DOM.
 * @return {jQuery|string} the kendoSlider jQuery object.
 */
lgb.component.FaultWidget.prototype.getHtml = function() {

  if (this.dataModel.faultWidgetType != 'SLIDER') {
    throw Error('unknown faultWidgetType');
  }

   var sl = $('<input>')
   .attr('id', this.htmlID + '-slider');

    this.kendoSlider = sl.data('kendoSlider');

  sl.kendoSlider({
       min: 10,
       max: 50,
       smallStep: 1,
       largeStep: 10
  });

  return sl;
};


lgb.component.FaultWidget.prototype.injectInto =
  function(parentElement, idx) {

  goog.base(this, 'injectInto', parentElement);

  if (this.dataModel.faultWidgetType != 'SLIDER') {
    throw Error('unknown faultWidgetType');
  }

  var id = this.htmlID + '-slider';
  var cl = idx % 2 ? '' : ' greyBackground'; 

  var html = '<div class="faultWidget{0}">'.format(cl) +
    '<div>' +
    '<div>' +
       this.dataModel.displayName +
      '</div>' +
        '<input id="{0}" />'.format(id) +
    '</div>' +
  '</div>';

   
  this.append(html);
  
  var sld = $('#' + id);
   
  var options = {
    min : this.dataModel.lowValue,
    max : this.dataModel.highValue,
    smallStep : 1,
    largeStep : 20,
    showButtons : false
  };
  
  this.kendoSlider = sld.kendoSlider(options).data('kendoSlider');
  
  
  


};









