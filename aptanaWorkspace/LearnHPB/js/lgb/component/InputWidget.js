/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.InputWidget');
goog.require('lgb.world.view.BaseV');


/**
 * Html component that contains a slider
 * @constructor
 * @extends {lgb.world.view.BaseV}
 */
lgb.component.InputWidget = function(dataModel) {
    

  
  /**
   * @const
   * @type {string}
   */
  var htmlID = 'component-InputWidget-' + dataModel.name;
  
  lgb.world.view.BaseV.call(this, dataModel, htmlID);



};
goog.inherits(lgb.component.InputWidget, lgb.world.view.BaseV);



lgb.component.InputWidget.prototype.injectInto = function(parentElement, idx) {

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
    
    

  this.append(html);
  goog.base(this, 'injectInto', parentElement);
    

};










