goog.provide('lgb.view.BaseV');

goog.require('lgb.BaseClass');
goog.require('lgb.utils');


/**
 * MVC View base class
 * @constructor
 * @extends {lgb.BaseClass}
 * @param {lgb.model.BaseModel=} dataModel that the view with display.
 */
lgb.view.BaseV = function(dataModel, htmlID, parentHtmlID) {
  lgb.BaseClass.call(this);

  if (null !== dataModel && undefined !== dataModel) {
    this.dataModel = dataModel;

    if (this.onChange && this.dataModel) {
      this.listenHelper_(this.dataModel, e.DataModelChanged, this, this.onChange);
    }

  }
  
 // if (htmlID || parentHtmlID) {
    this.setIds_(htmlID, parentHtmlID);
 // }



};
goog.inherits(lgb.view.BaseV, lgb.BaseClass);


/**
 * appends html to the main element
 * @param {string} html the HTML string to append.
 * @protected
 */
lgb.view.BaseV.prototype.append = function(html) {

  var el = this.getMainElement();

  if (!el) {

    return;
  }
  el.append(html);

};


lgb.view.BaseV.prototype.inject = function(parentElement) {

  var el = this.getMainElement();


  if (null != parentElement) {
    this.parentElement_ = parentElement;
  }

  this.jqParent().append(el);
};


lgb.view.BaseV.prototype.makeDiv = function(id) {
  
  var div = $('<div>');
  
  if (id) {
    div.attr('id', id);
  }

  return div;
};


/**
 * makes a unique css ID for a child element
 * @param {!string} id The last part of the CSS ID.
 * @return {string} The generated ID.
 */
lgb.view.BaseV.prototype.makeID = function(id) {
  lgb.assert(this.htmlID);
  var newID = '{0}-{1}'.format(this.htmlID, id);
  return newID;
};


lgb.view.BaseV.prototype.setMainElement = function(el) {

  this.mainElement_ = el;

  return;
};


lgb.view.BaseV.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    this.mainElement_ = this.makeDiv(this.htmlID);
  }

  return this.mainElement_;
};


lgb.view.BaseV.prototype.setIds_ = function(htmlID, parentHtmlID) {

  this.parentHtmlID = parentHtmlID || 'theBody';

  if (this._TITLE) {
    this.htmlID = htmlID || this._TITLE;

  } else {
    this.htmlID = htmlID;
  }

};


/**
 * converts and id into a Jquery element
 * @param {string=} id The css id.
 * @return {jQuery} Element.
 */
lgb.view.BaseV.prototype.jq = function(id) {

  if (undefined == id) {
    lgb.assert(this.htmlID);
    id = this.htmlID;
  }

  var cssID = id;
  var selector = '#{0}'.format(cssID);
  var jqElement = $(selector);

  return jqElement;
};


/**
 * converts an id into a Jquery object
 * refers to the parent in the DOM
 * @return {jQuery} Jquery object.
 */
lgb.view.BaseV.prototype.jqParent = function() {

  if (undefined == this.parentElement_) {
    this.parentElement_ = $('#{0}'.format(this.parentHtmlID));
  }

  return this.parentElement_;
};


lgb.view.BaseV.prototype.requestDataModelChange = function(propertyName, propertyValue) {
  var payload = {name:propertyName, value:propertyValue};
  this.triggerLocal(e.RequestDataModelChange, payload);
};


lgb.view.BaseV.prototype.getTitle = function() {
  return this._TITLE;
};
