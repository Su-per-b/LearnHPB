goog.provide('lgb.view.component.InputWidget');
goog.require('lgb.view.ViewBase');


/**
 * Html component that contains a slider
 * @param {lgb.model.scenario.SysVar} dataModel Tells us what to display.
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.component.InputWidget = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  /**
   * @const
   * @type {string}
   */
  this.htmlID = 'component-InputWidget-' + dataModel.name;
  /**
   * @const
   * @type {string}
   */
  this._NAME = 'lgb.view.component.InputWidget';
};
goog.inherits(lgb.view.component.InputWidget, lgb.view.ViewBase);



/**
 * Injects the HTML for the component into the DOM.
 * @param {string} parentSelector This is the jQuery selctor for the component's
 * parent in the DOM.
 * @param {number} idx This is used to alternate the background color.
 */
lgb.view.component.InputWidget.prototype.injectHtml =
  function(parentSelector, idx) {

    var cl = idx % 2 ? '' : ' greyBackground';

    var html =
    '<div class="InputWidget{0}">'.format(cl) +
      '<div>' +
      '<div>' +
         this.dataModel.displayName +
        '</div>' +
          '<input id="{0}" />'.format(this.htmlID) +
      '</div>' +
    '</div>';

    $(parentSelector).append(html);

};












