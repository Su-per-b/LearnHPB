




/**
 * @namespace
 */
var lgb = (function(lgb) {

	lgb.model = lgb.model || {};
	
	/**
	 * @class MVC model for the building components
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.BuildingComponentModel = function(transform) {
		
		lgb.model.ModelBase.call(this);
		this.transform = transform;
		this.visibilityTags = {};
		this.visibilityTags[lgb.model.VisibilityTag.ALL] = true;
		this.isVisible = true;

	};


	lgb.model.BuildingComponentModel.prototype = {
		
		addVisibilityTags: function(tag1, tag2) {
			this.eachArg(this.addOneVisibilityTag_);
		},
		addOneVisibilityTag_: function(tag) {
			this.visibilityTags[tag] = true;
		},
		applyVisiblilityFilter : function (state) {
			var newIsVisible = this.visibilityTags[state] === true;
			
			if (newIsVisible != this.isVisible) {
				this.isVisible = newIsVisible;
				this.dispatchLocal(lgb.event.Event.DATA_MODEL_CHANGED);
			}
		}

	};
	

	lgb.model.BuildingComponentModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












