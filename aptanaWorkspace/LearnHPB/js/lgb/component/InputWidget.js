/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.InputWidget');
goog.require('lgb.view.BaseView');


/**
 * Html component that contains a slider
 * @param {lgb.model.scenario.SysVar} dataModel Tells us what to display.
 * @constructor
 * @extends {lgb.view.BaseView}
 */
lgb.component.InputWidget = function(dataModel) {
    
  /**
   * @const
   * @type {string}
   */
  this._NAME = 'lgb.component.InputWidget';
  
  /**
   * @const
   * @type {string}
   */
  var htmlID = 'component-InputWidget-' + dataModel.name;
  
  lgb.view.BaseView.call(this, dataModel, htmlID);



};
goog.inherits(lgb.component.InputWidget, lgb.view.BaseView);



/**
 * Injects the HTML for the component into the DOM.
 * @param {string} parentSelector This is the jQuery selctor for the component's
 * parent in the DOM.
 * @param {number} idx This is used to alternate the background color.
 */
lgb.component.InputWidget.prototype.injectHtml =
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












