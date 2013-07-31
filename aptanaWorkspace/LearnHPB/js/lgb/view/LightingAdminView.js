/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/

goog.provide('lgb.view.LightingAdminView');

goog.require('lgb.component.Link');
goog.require('lgb.component.LinkDataSource');

goog.require('lgb.model.LightingModel');
goog.require('lgb.view.input.BaseViewGUI');

/**
 * @constructor
 * @param {lgb.model.LightingModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.LightingAdminView = function(dataModel, parentHtmlID) {
    

  lgb.view.input.BaseViewGUI.call(this, dataModel, 'LightingAdminView', parentHtmlID);

  this.init_();
};
goog.inherits(lgb.view.LightingAdminView, lgb.view.input.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.LightingAdminView.prototype.init_ = function() {
  this.injectHtml();
  this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.LightingAdminView.prototype.bind_ = function() {
  
  
  this.rbLightingType.bind();



  this.listenTo(this.dataSourceLightingType,
    e.DataSourceChanged,
    this.onLightingTypeChanged_
    );
    
    

};


lgb.view.LightingAdminView.prototype.onLightingTypeChanged_ = function(event) {

  this.requestDataModelChange('lightingType', this.dataSourceLightingType.theSelectedOne.value);
  
};




/**
 * injects the html into the DOM
 */
lgb.view.LightingAdminView.prototype.injectHtml = function() {


  this.dataSourceLightingType = new lgb.component.RadioButtonDataSource(
      'Select Lighting Type',
      this.htmlID + '-0',
      'lighting-type');


  this.dataSourceLightingType.addItem('Pendant', 0);
  this.dataSourceLightingType.addItem('Recessed', 1, true);


  this.rbLightingType = new lgb.component.RadioButtonGroup(
    this.dataSourceLightingType
  );
  
  
  var divHtml = '<div id="{0}" class="adminSubPanel">' +
          '<h3>{1}</h3>' +
      this.rbLightingType.getHTML() +
        '</div>';

  divHtml = divHtml.format(
    this.htmlID,
    this.dataModel._TITLE
    );


  this.append(divHtml);
     this.inject();
};
