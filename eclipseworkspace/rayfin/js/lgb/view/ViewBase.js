goog.provide('lgb.view.ViewBase');

goog.require ("lgb.BaseClass");
goog.require ("lgb.utils");



/**
 * MVC View for the RoofTop Unit
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.ViewBase = function(dataModel) {
	lgb.BaseClass.call(this);

	if (null !== dataModel && undefined !== dataModel) {
		this.dataModel = dataModel;
		this.listenForChange();
	}
	
	this.parentHTMLid = "theBody";
	this.htmlID = null;

};

goog.inherits(lgb.view.ViewBase, lgb.BaseClass);


lgb.view.ViewBase.prototype.append = function(html) {
	this.getParentJq().append(html);
};

//lgb.BaseClass.prototype.dispatch = function(event) {
	
	//alert('You should not do a ')
	
	//throw Error('You should not do a global event dispatch from a View object');
//};



lgb.view.ViewBase.prototype.getJq = function(id) {
	if (lgb.utils.isNull(id)) {
		id = this.htmlID;
	}
	
	var selector = jQuery('#{0}'.format(id));
	return selector;
};


lgb.view.ViewBase.prototype.getParentJq = function() {
	var selector = jQuery('#{0}'.format(this.parentHTMLid));
	return selector;
};

lgb.view.ViewBase.prototype.listenForChange = function() {
	//var delegate = jQuery.proxy( this.onChange, this );
	//jQuery(this.dataModel).bind(lgb.event.DataModelChanged , delegate);
	
	//var e = new lgb.event.DataModelChanged();
	
	this.listenHelper_(this.dataModel, lgb.event.DataModelChanged, this,  this.onChange );
	
	
};






        




		




