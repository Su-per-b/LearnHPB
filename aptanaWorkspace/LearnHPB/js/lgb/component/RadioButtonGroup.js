/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.RadioButtonGroup');
goog.require('lgb.component.RadioButtonDataSource');


/**
 * Html radio button group that will be inserted into the DOM
 * @constructor
 * @extends {lgb.view.BaseV}
 * @param {lgb.component.RadioButtonDataSource} ds the datasource
 * for this component.
 */
lgb.component.RadioButtonGroup = function(ds) {

  lgb.view.BaseV.call(this);
  this.ds = ds;
};
goog.inherits(lgb.component.RadioButtonGroup, lgb.view.BaseV);

/**
 * @return {string} The html string.
 */
lgb.component.RadioButtonGroup.prototype.getHTML = function() {

  var htmlAry = [];
  var len = this.ds.selectionItems.length;


  for (var i = 0; i < len; i++) {
    var item = this.ds.selectionItems[i];
    var str = '<input type="radio" id="{0}" name="{1}" value="{2}"{3}>' +
    '<span class="radioButtonText">{4}</span>';

    var buttonId = this.ds.htmlID + '-' + i.toString();
    this.ds.selectionItems[i].htmlID = buttonId;
    var chk = '';
    if (item.isSelected) {
      chk = ' checked="checked"';
    }

    str = str.format(buttonId,
       this.ds.htmlID,
       item.value.toString(),
       chk,
       item.label);

    htmlAry.push(str);
  }

  var title = '<h5>{0}</h5>'.format(this.ds.title);
  var radioButtons = htmlAry.join('<br />');
  var htmlStr = '<div class="radioButtonGroup">' +
    title + radioButtons + '</div>';

  return htmlStr;
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 */
lgb.component.RadioButtonGroup.prototype.bind = function() {
  var delegate = this.d(this.onClick_);
  var len = this.ds.selectionItems.length;

  for (var i = 0; i < len; i++) {
    var item = this.ds.selectionItems[i];
    var selector = '#{0}'.format(item.htmlID);
    $(selector).click({idx: i}, delegate);
  }

};



/**'
 * Event handler for when any of the radio buttons are clicked.
 * @param {jQuery.event} event The event fired when a button
 * is selected.
 * @private
 */
lgb.component.RadioButtonGroup.prototype.onClick_ = function(event) {

  var idx = (/**@type {number} */ event.data.idx);
  this.ds.selectIdx(idx);

};
