
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class
	 */
	lgb.view.BuildingComponentView = function(dataModel){
		lgb.view.ViewBase.call(this, dataModel);
		this.fadeEffect = new lgb.kuda.FadeEffect(this.dataModel.transform);
	};
	
	lgb.view.BuildingComponentView.prototype = {
	
		show : function() {

		},
		onChange : function(event) {

			if(this.dataModel.isVisible) {
				this.fadeEffect.fadeIn();
			} else {
				this.fadeEffect.fadeOut();
			}

		}
		
	};

	lgb.view.BuildingComponentView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











