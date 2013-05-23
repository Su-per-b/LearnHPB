/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/

goog.provide('lgb.component.CheckBox');
goog.require('lgb.view.BaseV');


/**
 * Html component that contains a cusmtom checkbox
 * @param {string} parentHtmlID The CSS id of the parent.
 * @param {string} subID The second  part fo the CSS id.
 * @param {string} title Ysed fro the label of the component.
 * @constructor
 * @extends {lgb.view.BaseV}
 */
lgb.component.CheckBox = function(parentHtmlID, subID, title) {
    
  var htmlID = parentHtmlID + '-' + subID;
    
  lgb.view.BaseV.call(this, null, htmlID, parentHtmlID);

  this.title = title;
  this.isChecked = false;
  this.hasBeenInjected = false;

};
goog.inherits(lgb.component.CheckBox, lgb.view.BaseV);



/**
 * @return {string} The HTML taht will be injected into the DOM.
 */
lgb.component.CheckBox.prototype.getHTML = function() {

  var html = '<p><label><input id={0} type="checkbox" {1}>' +
          ' {2}</label></p>';

  var checked = '';
  if (this.isChecked) {
    checked = ' checked="checked"';
  }

  html = html.format(
    this.htmlID,
    checked,
    this.title
    );

  return html;
};

/**
 * can be used before or after injection into the DOM
 * @param {boolean} checkedFlag Sets the checked state.
 */
lgb.component.CheckBox.prototype.setChecked = function(checkedFlag) {

  if (this.isChecked == checkedFlag) return;
  this.isChecked = checkedFlag;

  if (this.hasBeenInjected) {
    if (checkedFlag) {
      this.jq(this.htmlID).attr('checked', 'checked');
    } else {
      this.jq(this.htmlID).removeAttr('checked');
    }
  }

};


/**
 * @return {boolean} The state of the checkbox.
 */
lgb.component.CheckBox.prototype.isCheckedInDom = function() {

  var checkedTxt = this.jq(this.htmlID).attr('checked');

  if (checkedTxt == 'checked') {
    return true;
  } else if (checkedTxt == '') {
    return false;
  } else {
    throw ('invalid value for checkbox');
  }
};



/**
 * injects the particle system control panel into the DOM
 */
lgb.component.CheckBox.prototype.injectHtml = function() {
  var html = this.getHTML();

  this.append(html);

  var options = {
    empty: 'images/checkbox/empty.png'
  };

  this.jq().checkbox(options);
  this.hasBeenInjected = true;
};












