goog.provide('lgb.view.PropertiesView');


goog.require('lgb.view.DialogView');
goog.require('lgb.event.ComponentIDSelected');

/**
 * @class this is the MVC view class for the Admin View
 * it handles the life-cycle of the subpanels, 
 * and the various AJAX components
 */
lgb.view.PropertiesView = function(dataModel){

	lgb.view.DialogView.call(this, dataModel);
	
	this.htmlID = "propertiesView";
	this.title = "Properties";
	

	this.injectHtml();
	

};

goog.inherits(lgb.view.PropertiesView , lgb.view.DialogView);


lgb.view.PropertiesView.prototype.onChange = function(event) {
	//var divSelector = $('#' + this.htmlID + '-title');
	//divSelector.text( this.dataModel.name); 
	var x= 0;
	
	
	$("#tabstrip-1").empty();
	$("#tabstrip-2").empty();
	$("#tabstrip-2").height(300);
	$("#tabstripContent").height(320);

	var ds = this.dataModel.selectedSystemNode.getFaultDataSource();
	
	var grid = $("#tabstrip-2").kendoGrid({
	     dataSource: ds,
	     height: 250
	 });
	 
	 
};

lgb.view.PropertiesView.prototype.injectHtml = function() {
		
		
		//$('div')
		//	.attr('id', this.htmlID)
		//	.appendTo(this.getParentJq());
			
		var html = 	'<div id="{0}">\
		</div>'.format(this.htmlID);
		
		this.append(html);
		
		var jq = this.getJq();
		jq.direction = 'left';
		
		jq.dialog ({
			title: this.title,
			dialogClass: this.htmlID + '-dialog',
			hide: 'fade',
			width: 300,
			height: 350,
			position: ['right','bottom'],
			autoOpen: false
		});

		jq.bind("dialogclose", this.d(this.onCloseButtonClicked));
		
		//var d = this.dataModel;
		//var systemNodeArray = this.dataModel.systemNodeArray;
		
		this.comboBoxId = this.htmlID + '-comboBox';
		
		
		var html2 = '<div class="propertiesSubPanel">\
						<input id="{0}" value="1" />\
					</div>'.format(this.comboBoxId);
		
		
		this.getJq().append(html2);
		
		

var htmlTabs = 
'<div id="tabstripContent" class="k-content">\
<div id="tabstrip">\
<ul>\
	<li class="k-state-active">Input</li>\
	<li>Faults</li>\
</ul>\
<div>\
	<p>Input Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>\
</div>\
<div></div>';

		
		this.getJq().append(htmlTabs);
		
		$("#tabstrip").kendoTabStrip();


	var x = this.dataModel.systemNodeArray.length;
	var selectArray = []
	while (x--) {
		var sysNode = this.dataModel.systemNodeArray[x];
		selectArray.push(
			{
				text : sysNode.name,
				value : sysNode.id
			}
		)
	}
	
	var jq = $('#' + this.comboBoxId);
	jq.kendoDropDownList(
			{ dataSource: selectArray,
			  change: this.d(this.onDropDownChange)
			}
		);
};

lgb.view.PropertiesView.prototype.onDropDownChange = function(event) {
	var jq = $('#' + this.comboBoxId);
	var id = jq[0].value;
	
	var e = new lgb.event.ComponentIDSelected(id);
	this.dispatchLocal(e);
};

lgb.view.PropertiesView.prototype.showObj = function(obj) {
	$("#tabstrip-1").empty();
	$("#tabstrip-2").empty();
	$("#tabstrip-2").height(300);
	$("#tabstripContent").height(320);

	var dataSource = obj.getFaultDataSource();
	
	var grid = $("#tabstrip-2").kendoGrid({
	     dataSource: dataSource,
	     height: 250
	 });

};


	
















