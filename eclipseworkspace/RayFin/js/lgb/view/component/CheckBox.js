goog.provide('lgb.view.component.CheckBox');
goog.require('lgb.view.ViewBase');


/**
 * Html component that contains a slider
 * @param {string} parentID
 * @param {string} subID
 * @param {string} title
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.component.CheckBox = function(parentHTMLid, subID, title) {
	lgb.view.ViewBase.call(this);
	
	/** @const */
	this.htmlID = parentHTMLid + '-' + subID;
	this.parentHTMLid = parentHTMLid;
	this.title = title;
	this.isChecked = false;
	this.hasBeenInjected = false;
	
};
goog.inherits(lgb.view.component.CheckBox, lgb.view.ViewBase);



/**
 * @return {string} The HTML taht will be injected into the DOM.
 */
lgb.view.component.CheckBox.prototype.getHTML = function(){
	
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
lgb.view.component.CheckBox.prototype.setChecked = function(checkedFlag) {
	
	if (this.isChecked == checkedFlag) return;
	this.isChecked = checkedFlag;
	
	if(this.hasBeenInjected) {
		if (checkedFlag) {
			this.jq(this.chkPlayPauseID).attr('checked', 'checked');
		} else {
			this.jq(this.chkPlayPauseID).removeAttr('checked');
		}
	}

}


/**
 * @return {boolean} The state of the checkbox.
 */
lgb.view.component.CheckBox.prototype.isCheckedInDom = function() {
	
	var checkedTxt = this.jq(this.chkPlayPauseID).attr("checked");
	
	if (checkedTxt == 'checked') {
		return true;
	} else if (checkedTxt == '') {
		return false;
	} else {
		throw ('invalid value for checkbox')
	}
};



/**
 * injects the particle system control panel into the DOM
 */
lgb.view.component.CheckBox.prototype.injectHtml = function(){
	var html = this.getHTML();

	this.append(html);
	
	var options = {
		empty: 'images/checkbox/empty.png' 
	};
	
	this.jq().checkbox(options);
	this.hasBeenInjected = true;
};












