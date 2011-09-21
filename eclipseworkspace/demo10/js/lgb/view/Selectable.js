
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Visibility
	 */
	lgb.view.Selectable = function(transform, transformBox, transformName, label) {
		lgb.Base.call(this);
		
		this.transform = transform;
		this.transformBox = transformBox;
		this.transformName = transformName;
		this.label = label;
		
		this.transformBox.visible = false;
		this.dispatch(lgb.event.SelectableEvent.REGISTER, [this]);
	};
	
	lgb.view.Selectable.prototype = {
	

		setVisible : function(isVisible) {
			this.transformBox.visible = isVisible;
		},
		isVisible : function() {
			return this.transformBox.visible;
		},
		
		
	};

	lgb.view.Selectable.inheritsFrom(lgb.Base);

	return lgb;
	
})(lgb || {});











