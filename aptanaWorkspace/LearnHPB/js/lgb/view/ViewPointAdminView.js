/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ViewPointAdminView');

goog.require('lgb.component.Link');
goog.require('lgb.component.LinkDataSource');
goog.require('lgb.events.MouseClick');
goog.require('lgb.events.MouseOut');
goog.require('lgb.events.MouseOver');
goog.require('lgb.events.RequestGoToViewPoint');

goog.require('lgb.model.ViewPointModel');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.ViewBase}
 */
lgb.view.ViewPointAdminView = function(dataModel, parentHtmlID) {
  lgb.view.ViewBase.call(this, dataModel);

  this.parentHtmlID = parentHtmlID;
  this._NAME = 'lgb.view.ViewPointAdminView';
  this.htmlID = 'ViewPointAdminView';
};
goog.inherits(lgb.view.ViewPointAdminView, lgb.view.ViewBase);


/**
 * Initializes the View
 */
lgb.view.ViewPointAdminView.prototype.init = function() {
  this.injectHtml();
  this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.ViewPointAdminView.prototype.bind_ = function() {

  var len = this.links.length;
  for (var i = 0; i < len; i++) {

    this.links[i].bind();

    this.listenTo(
      this.links[i],
      lgb.events.MouseClick.TYPE,
      this.onMouseClick_
    );

  }
};


/**
 * event handler
 * @private
 * @param {lgb.events.MouseClick} event The Event.
 */
lgb.view.ViewPointAdminView.prototype.onMouseClick_ = function(event) {

  var idx = event.target.ds.data;
  var node = this.dataModel.viewPointNodeList[idx];

  this.dispatchLocal(new lgb.events.RequestGoToViewPoint(node));


};




/**
 * event handler
 * @protected
 * @override
 * @param {lgb.events.DataModelChanged} event The Event.
 */
lgb.view.ViewPointAdminView.prototype.onChange = function(event) {


};


/**
 * injects the html into the DOM
 */
lgb.view.ViewPointAdminView.prototype.injectHtmlXXX = function() {

  this.links = [];

  var linkHtml = '';
  var len = this.dataModel.cameras.length;
  for (var i = 0; i < len; i++) {

    var theCam = this.dataModel.cameras[i];

    var ds = new lgb.component.LinkDataSource(
      theCam.name,
      this.htmlID,
      '-' + i.toString()
      );
    ds.data = i;

    var link = new lgb.component.Link(ds);

    this.links.push(link);

    linkHtml += link.getHTML();
  }

  var divHtml = '<div id="{0}" class="adminSubPanel">' +
          '<h3>{1}</h3>' +
          linkHtml +
        '</div>';

  divHtml = divHtml.format(
    this.htmlID,
    this.dataModel._TITLE
    );

  this.append(divHtml);

};

/**
 * injects the html into the DOM
 */
lgb.view.ViewPointAdminView.prototype.injectHtml = function() {

  this.links = [];

  var linkHtml = '';
  var len = this.dataModel.viewPointNodeList.length;
  for (var i = 0; i < len; i++) {

    var node = this.dataModel.viewPointNodeList[i];

    var ds = new lgb.component.LinkDataSource(
      node.name,
      this.htmlID,
      '-' + i.toString()
      );
    ds.data = i;

    var link = new lgb.component.Link(ds);

    this.links.push(link);

    linkHtml += link.getHTML();
  }

  var divHtml = '<div id="{0}" class="adminSubPanel">' +
          '<h3>{1}</h3>' +
          linkHtml +
        '</div>';

  divHtml = divHtml.format(
    this.htmlID,
    this.dataModel._TITLE
    );

  this.append(divHtml);

};
