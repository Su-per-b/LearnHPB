goog.provide('lgb.component.RadioButtonGroup');
goog.require('lgb.component.RadioButtonDataSource');


/**
 * Html radio button group that will be inserted into the DOM
 * @constructor
 * @param {lgb.component.RadioButtonDataSource}
 */
lgb.component.RadioButtonGroup = function(ds){
	this.ds = ds;
};
goog.inherits(lgb.component.RadioButtonGroup, lgb.view.ViewBase);

/**
 * @public
 * @return {string} The html string.
 */
lgb.component.RadioButtonGroup.prototype.getHTML = function() {
			
	var htmlAry = [];
	var len = this.ds.selectionItems.length;
	
	
	for (var i=0; i<len; i++) {
		var item = this.ds.selectionItems[i];
		var str = '<input type="radio" id="{0}" name="{1}" value="{2}"{3}>' +
		'<span class="radioButtonText">{4}</span>';
		
		var buttonId = this.ds.htmlID + '-'+ i.toString();
		this.ds.selectionItems[i].htmlID = buttonId;
		var chk ='';
		if (item.isSelected) {
			chk=' checked="checked"';
		}
				
		str = str.format(buttonId,
			 this.ds.htmlID,
			 item.value.toString(), 
			 chk, 
			 item.label );
			 
		htmlAry.push(str);
	}
				
	var title = '<h5>{0}</h5>'.format(this.ds.title);
	var radioButtons = htmlAry.join('<br />');
	var htmlStr ='<div class="radioButtonGroup">' + title + radioButtons + '</div>';

	return htmlStr;	
};


lgb.component.RadioButtonGroup.prototype.bind = function() {
	var delegate = this.d(this.onClick_);
	var len = this.ds.selectionItems.length;
	
	for (var i=0; i<len; i++) {
		var item = this.ds.selectionItems[i];
		var selector = '#{0}'.format(item.htmlID);
		$(selector).click(i, delegate );
	};

};




lgb.component.RadioButtonGroup.prototype.selectByIdx = function(idx) {
	var x = $('#' + this.htmlID + ' input');
	
	var y =0;
};

/**'
 * Event handler for when any of the radio buttons are clicked.
 * @private
 */
lgb.component.RadioButtonGroup.prototype.onClick_ = function(event) {
	
	var idx = event.data;
	//var item = this.ds.selectionItems[idx];
	
	this.ds.selectIdx(idx);
	
};









