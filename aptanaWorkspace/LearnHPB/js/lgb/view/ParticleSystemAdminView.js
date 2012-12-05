/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ParticleSystemAdminView');

goog.require('lgb.events.RequestDataModelChange');
goog.require('lgb.view.ViewBase');
goog.require('lgb.view.component.CheckBox');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.PsModel} dataModel The model to display a GUI for.
 * @param {string} parentHTMLid The CSS ID of the parent in the DOM.
 */
lgb.view.ParticleSystemAdminView = function(dataModel, parentHTMLid) {
  lgb.view.ViewBase.call(this, dataModel);

  this.parentHTMLid = parentHTMLid;
  this._NAME = 'lgb.view.ParticleSystemAdminView';
  this.htmlID = 'adminSubpanel-' + dataModel.getCssID() + '-' + dataModel.id;
};
goog.inherits(lgb.view.ParticleSystemAdminView, lgb.view.ViewBase);


/**
 * Initializes the View
 */
lgb.view.ParticleSystemAdminView.prototype.init = function() {
  this.injectHtml();
  this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.ParticleSystemAdminView.prototype.bind_ = function() {
  this.cbPlayPause.jq().change(this.d(this.onPlayPauseChanged_));
  this.cbBoxes.jq().change(this.d(this.onBoxesChanged_));
  this.cbCurves.jq().change(this.d(this.onCurvesChanged_));
  this.cbEmitting.jq().change(this.d(this.onEmittingChanged_));
};


/**
 * event handler
 * @protected
 * @override
 * @param {lgb.events.DataModelChanged} event The Event.
 */
lgb.view.ParticleSystemAdminView.prototype.onChange = function(event) {
  //needed to prevent exception.
};


/**
 * event handler for checkbox this.cbEmitting
 * @private
 * @param {jQuery.event} event The Event.
 */
lgb.view.ParticleSystemAdminView.prototype.onEmittingChanged_ =
  function(event) {

  var e = new lgb.events.RequestDataModelChange({
    isEmitting: event.currentTarget.checked
  });

  this.dispatchLocal(e);
};


/**
 * event handler for checkbox this.cbCurves
 * @private
 * @param {jQuery.event} event The Event.
 */
lgb.view.ParticleSystemAdminView.prototype.onCurvesChanged_ =
  function(event) {

  var e = new lgb.events.RequestDataModelChange({
    showCurves: event.currentTarget.checked
  });

  this.dispatchLocal(e);
};


/**
 * event handler for checkbox this.cbBoxes
 * @private
 * @param {jQuery.event} event The Event.
 */
lgb.view.ParticleSystemAdminView.prototype.onBoxesChanged_ =
  function(event) {

  var e = new lgb.events.RequestDataModelChange({
    showBoxes: event.currentTarget.checked
  });

  this.dispatchLocal(e);
};


/**
 * event handler for checkbox this.cbPlayPause
 * @private
 * @param {jQuery.event} event The Event.
 */
lgb.view.ParticleSystemAdminView.prototype.onPlayPauseChanged_ =
  function(event) {

  var e = new lgb.events.RequestDataModelChange({
    isRunning: event.currentTarget.checked
  });

  this.dispatchLocal(e);
};


/**
 * @return {string} The HTML taht will be injected into the DOM.
 */
lgb.view.ParticleSystemAdminView.prototype.getHTML = function() {


  var html = '<div id="{0}" class="adminSubPanel">' +
          '<h3>{1}</h3>' +
        '</div>';

  html = html.format(
    this.htmlID,
    this.dataModel.title
    );
  return html;

};


/**
 * injects the particle system control panel into the DOM
 */
lgb.view.ParticleSystemAdminView.prototype.injectHtml = function() {
  var html = this.getHTML();
  this.append(html);

  var options = {
    empty: 'images/checkbox/empty.png'
  };

  this.cbPlayPause = new lgb.view.component.CheckBox(
    this.htmlID, 'playPause', 'Play / Pause'
  );
  this.cbBoxes = new lgb.view.component.CheckBox(
    this.htmlID, 'boxes', 'Show boxes'
  );
  this.cbCurves = new lgb.view.component.CheckBox(
    this.htmlID, 'curves', 'Show particle paths'
  );
  this.cbEmitting = new lgb.view.component.CheckBox(
    this.htmlID, 'emitting', 'Emitter Active'
  );
  this.updateFromDataModel();

  this.cbPlayPause.injectHtml();
  this.cbBoxes.injectHtml();
  this.cbCurves.injectHtml();
  this.cbEmitting.injectHtml();

};

/**
 * The runs when the dataModel changes, so it updates the GUI.
 */
lgb.view.ParticleSystemAdminView.prototype.updateFromDataModel =
  function() {
  this.cbPlayPause.setChecked(this.dataModel.isRunning);
  this.cbBoxes.setChecked(this.dataModel.showBoxes);
  this.cbCurves.setChecked(this.dataModel.showCurves);
  this.cbEmitting.setChecked(this.dataModel.isEmitting);
};



