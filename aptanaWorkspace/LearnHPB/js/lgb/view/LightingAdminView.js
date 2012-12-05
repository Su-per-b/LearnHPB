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
goog.require('lgb.events.MouseClick');
goog.require('lgb.events.MouseOut');
goog.require('lgb.events.MouseOver');
goog.require('lgb.events.RequestLightingChange');
goog.require('lgb.model.LightingModel');
goog.require('lgb.view.ViewBase');

/**
 * @constructor
 * @param {lgb.model.LightingModel} dataModel The data model to display.
 * @param {string} parentHTMLid the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.ViewBase}
 */
lgb.view.LightingAdminView = function(dataModel, parentHTMLid) {
  lgb.view.ViewBase.call(this, dataModel);

  this.parentHTMLid = parentHTMLid;
  this._NAME = 'lgb.view.LightingAdminView';
  this.htmlID = 'LightingAdminView';
  this.init_();
};
goog.inherits(lgb.view.LightingAdminView, lgb.view.ViewBase);


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
    lgb.events.DataSourceChanged.TYPE,
    this.onLightingTypeChanged_
    );
    
    

};

/**
 * event handler
 * @private
 * @param {lgb.events.DataSourceChanged} event The Event.
 */
lgb.view.LightingAdminView.prototype.onLightingTypeChanged_ = function(event) {

  var e = new lgb.events.RequestDataModelChange(
    {lightingType: this.dataSourceLightingType.theSelectedOne.value}
  );

  this.dispatchLocal(e);
};




/**
 * event handler
 * @protected
 * @override
 * @param {lgb.events.DataModelChanged} event The Event.
 */
lgb.view.LightingAdminView.prototype.onChange = function(event) {


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
};