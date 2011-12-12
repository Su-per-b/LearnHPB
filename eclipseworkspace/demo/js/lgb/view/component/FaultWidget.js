/**
 * @author Raj Dye - raj@rajdye.com
*/

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
  this._NAME = 'lgb.view.component.FaultWidget';
};
goog.inherits(lgb.view.component.FaultWidget, lgb.view.ViewBase);



/**
 * A public function. I set it up this way so that an HTML
 * string could be built from multiple components
 * then injected into the DOM.
 * @return {jQuery|string} the kendoSlider jQuery object.
 */
lgb.view.component.FaultWidget.prototype.getHtml = function() {

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

/**
 * Injects the HTML for the component into the DOM.
 * @param {string} parentSelector This is the jQuery selctor for the component's
 * parent in the DOM.
 * @param {number} idx This is used to alternate the background color.
 */
lgb.view.component.FaultWidget.prototype.injectHtml =
  function(parentSelector, idx) {

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

    $(parentSelector).append(html);

    this.kendoSlider = $('#' + id).kendoSlider({
       min: this.dataModel.lowValue,
       max: this.dataModel.highValue,
       smallStep: 1,
       largeStep: 20,
       showButtons: false
         }).data('kendoSlider');




};












