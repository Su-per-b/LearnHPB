goog.provide('lgb.view.EnvelopeAdminView');

goog.require('lgb.component.RadioButtonDataSource');
goog.require('lgb.component.RadioButtonGroup');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.DataSourceChanged');
goog.require('lgb.events.RequestDataModelChange');
goog.require('lgb.view.ViewBase');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.EnvelopeAdminView = function(dataModel, parentHTMLid) {
	lgb.view.ViewBase.call(this, dataModel);

	this.parentHTMLid = parentHTMLid;
	this._NAME = 'lgb.view.EnvelopeAdminView';
	this.htmlID = 'envelopeAdminView';
	this.init_();

};
goog.inherits(lgb.view.EnvelopeAdminView, lgb.view.ViewBase);


/**
 * Initializes the View
 * @private
 */
lgb.view.EnvelopeAdminView.prototype.init_ = function() {
	this.injectHtml();
	this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.EnvelopeAdminView.prototype.bind_ = function() {

	this.rbGroupFloorHeight.bind();
	this.rbGroupStories.bind();

	this.listenTo(this.dataSourceFloorHeight,
		lgb.events.DataSourceChanged.TYPE,
		this.onFloorHeightChanged_
		);

	this.listenTo(this.dataSourceFloorCount,
		lgb.events.DataSourceChanged.TYPE,
		this.onFloorCountChanged_
		);

};


/**
 * event handler
 * @private
 * @parameter {lgb.events.DataSourceChanged} event The Event.
 */
lgb.view.EnvelopeAdminView.prototype.onFloorCountChanged_ = function(event) {

	var e = new lgb.events.RequestDataModelChange(
		{floorCount: this.dataSourceFloorCount.theSelectedOne.value}
	);

	this.dispatchLocal(e);
};


/**
 * event handler
 * @private
 * @parameter {lgb.events.DataSourceChanged} event The Event.
 */
lgb.view.EnvelopeAdminView.prototype.onFloorHeightChanged_ = function(event) {

	var e = new lgb.events.RequestDataModelChange(
		{floorHeight: this.dataSourceFloorHeight.theSelectedOne.value}
	);

	this.dispatchLocal(e);
};



/**
 * event handler
 * @protected
 * @override
 * @parameter {good.events.Event} event The Event.
 */
lgb.view.EnvelopeAdminView.prototype.onChange = function(event) {


};



/**
 * injects the html into the DOM
 */
lgb.view.EnvelopeAdminView.prototype.injectHtml = function() {


	this.dataSourceFloorHeight = new lgb.component.RadioButtonDataSource(
			'Select Floor-To-ceiling height',
			this.htmlID + '-0',
			'floor-height');

	this.dataSourceFloorHeight.addItem('13 ft', 13);
	this.dataSourceFloorHeight.addItem('11 ft', 11, true);
	this.dataSourceFloorHeight.addItem('9 ft', 9);

	this.rbGroupFloorHeight = new lgb.component.RadioButtonGroup(this.dataSourceFloorHeight);

	this.dataSourceFloorCount = new lgb.component.RadioButtonDataSource(
			'Select Number of Stories',
			this.htmlID + '-1',
			'stories');

	this.dataSourceFloorCount.addItem('7', 7);
	this.dataSourceFloorCount.addItem('5', 5, true);
	this.dataSourceFloorCount.addItem('3', 3);

	this.rbGroupStories = new lgb.component.RadioButtonGroup(this.dataSourceFloorCount);


	var divHtml = '<div id="{0}" class="adminSubPanel">' +
					'<h3>{1}</h3>' +
			this.rbGroupFloorHeight.getHTML() +
			this.rbGroupStories.getHTML() +
				'</div>';

	divHtml = divHtml.format(
		this.htmlID,
		this.dataModel._TITLE
		);


	this.append(divHtml);

};
