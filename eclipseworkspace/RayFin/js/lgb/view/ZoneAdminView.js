goog.provide('lgb.view.ZoneAdminView');

goog.require('lgb.component.Link');
goog.require('lgb.component.LinkDataSource');
goog.require('lgb.events.MouseClick');
goog.require('lgb.events.MouseOut');
goog.require('lgb.events.MouseOver');
goog.require('lgb.events.RequestZoneVisiblityChange');
goog.require('lgb.model.ZoneModel');
goog.require('lgb.view.ViewBase');

/**
 * @constructor
 * @param {lgb.model.ZoneModel} dataModel
 * @extends {lgb.view.ViewBase}
 */
lgb.view.ZoneAdminView = function(dataModel, parentHTMLid) {
  lgb.view.ViewBase.call(this, dataModel);

  this.parentHTMLid = parentHTMLid;
  this._NAME = 'lgb.view.ZoneAdminView';
  this.htmlID = 'ZoneAdminView';
};
goog.inherits(lgb.view.ZoneAdminView, lgb.view.ViewBase);


/**
 * Initializes the View
 * @private
 */
lgb.view.ZoneAdminView.prototype.init = function() {
  this.injectHtml();
  this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.ZoneAdminView.prototype.bind_ = function() {

  var len = this.links.length;
  for (var i = 0; i < len; i++) {

    this.links[i].bind();

    this.listenTo(
      this.links[i],
      lgb.events.MouseClick.TYPE,
      this.onMouseClick_
    );

    this.listenTo(
      this.links[i],
      lgb.events.MouseOver.TYPE,
      this.onMouseOver_
    );

    this.listenTo(
      this.links[i],
      lgb.events.MouseOut.TYPE,
      this.onMouseOut_
    );

  }
};


/**
 * event handler
 * @private
 * @parameter {lgb.events.MouseClick} event The Event.
 */
lgb.view.ZoneAdminView.prototype.onMouseClick_ = function(event) {

 // event.target.ds.
  //var x;

};


/**
 * event handler
 * @private
 * @parameter {lgb.events.MouseOver} event The Event.
 */
lgb.view.ZoneAdminView.prototype.onMouseOver_ = function(event) {
  var zoneIdx = event.target.ds.data;
  var e = new lgb.events.RequestZoneVisiblityChange(zoneIdx, true);

  this.dispatchLocal(e);
};


/**
 * event handler
 * @private
 * @parameter {lgb.events.MouseOut} event The Event.
 */
lgb.view.ZoneAdminView.prototype.onMouseOut_ = function(event) {
  var zoneIdx = event.target.ds.data;
  var e = new lgb.events.RequestZoneVisiblityChange(zoneIdx, false);

  this.dispatchLocal(e);
};


/**
 * event handler
 * @protected
 * @override
 * @parameter {good.events.Event} event The Event.
 */
lgb.view.ZoneAdminView.prototype.onChange = function(event) {


};



/**
 * injects the html into the DOM
 */
lgb.view.ZoneAdminView.prototype.injectHtml = function() {

  this.links = [];

  var linkHtml = '';
  var len = this.dataModel.z.length;
  for (var i = 0; i < len; i++) {

    var ds = new lgb.component.LinkDataSource(
      'Zone ' + (i + 1).toString(),
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
